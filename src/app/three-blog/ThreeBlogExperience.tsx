"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  Gauge,
  Play,
  Square,
  X,
} from "lucide-react";
import type { MoveControls, NearbyTargetId } from "./ThreeBlogScene";
import { landmarks, playerStart, worldToMap, type LandmarkId } from "./content";

const ThreeBlogScene = dynamic(() => import("./ThreeBlogScene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});

const keyToControl: Record<string, keyof MoveControls> = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "backward",
  KeyS: "backward",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

const VISITED_STORAGE_KEY = "three-blog-visited-v1";
const COMPLETION_HASH = "#explorer-record";
const landmarkIdSet = new Set<LandmarkId>(landmarks.map((landmark) => landmark.id));
const playerStartMap = worldToMap({ x: playerStart[0], z: playerStart[2] });

function getHashLandmark(): LandmarkId | null {
  const id = window.location.hash.slice(1) as LandmarkId;
  return landmarkIdSet.has(id) ? id : null;
}

function getPageUrl(hash = "") {
  return `${window.location.pathname}${window.location.search}${hash}`;
}

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest("a, button, input, textarea, select, [contenteditable='true']"),
  );
}

function NavigationFallback({ onSelect }: { onSelect: (id: LandmarkId) => void }) {
  return (
    <div className="tb-fallback" role="region" aria-label="2D 탐색 화면">
      <p className="tb-fallback-kicker">2D navigation mode</p>
      <h2>이 브라우저에서는 가벼운 탐색 화면을 보여드려요.</h2>
      <p>아래 장소를 선택하면 같은 콘텐츠로 이동할 수 있습니다.</p>
      <div className="tb-fallback-grid">
        {landmarks.map((landmark) => (
          <button key={landmark.id} type="button" onClick={() => onSelect(landmark.id)}>
            <span style={{ background: landmark.color }} />
            {landmark.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="tb-scene-loading" role="status">
      <span className="tb-loading-orbit" aria-hidden="true" />
      <p>Building interactive world</p>
      <small>3D 공간을 준비하고 있습니다.</small>
    </div>
  );
}

export default function ThreeBlogExperience() {
  const controls = useRef<MoveControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [nearbyId, setNearbyId] = useState<NearbyTargetId | null>(null);
  const [selectedId, setSelectedId] = useState<LandmarkId | null>(null);
  const [introCompact, setIntroCompact] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [mobileControl, setMobileControl] = useState<keyof MoveControls | null>(null);
  const [visitedIds, setVisitedIds] = useState<LandmarkId[]>([]);
  const [visitNoticeId, setVisitNoticeId] = useState<LandmarkId | null>(null);
  const [completionOpen, setCompletionOpen] = useState(false);
  const nearbyIdRef = useRef<NearbyTargetId | null>(null);
  const mobileControlRef = useRef<keyof MoveControls | null>(null);
  const selectedIdRef = useRef<LandmarkId | null>(null);
  const visitedIdsRef = useRef<LandmarkId[]>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const panelHistoryOwnedRef = useRef(false);
  const completionOpenRef = useRef(false);
  const completionHistoryOwnedRef = useRef(false);
  const completionReturnFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const completionCloseButtonRef = useRef<HTMLButtonElement>(null);
  const progressButtonRef = useRef<HTMLButtonElement>(null);
  const recordNearbyButtonRef = useRef<HTMLButtonElement>(null);
  const dockButtonRefs = useRef<Partial<Record<LandmarkId, HTMLButtonElement | null>>>({});
  const mapPlayerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const selected = useMemo(
    () => landmarks.find((landmark) => landmark.id === selectedId) ?? null,
    [selectedId],
  );
  const nearby = useMemo(
    () => nearbyId === "record"
      ? null
      : landmarks.find((landmark) => landmark.id === nearbyId) ?? null,
    [nearbyId],
  );
  const recordNearby = nearbyId === "record";
  const selectedIndex = selected
    ? landmarks.findIndex((landmark) => landmark.id === selected.id)
    : -1;
  const visitedCount = visitedIds.length;
  const explorationComplete = visitedCount === landmarks.length;
  const visitNotice = visitNoticeId
    ? landmarks.find((landmark) => landmark.id === visitNoticeId) ?? null
    : null;

  const stopMovement = useCallback(() => {
    Object.keys(controls.current).forEach((key) => {
      controls.current[key as keyof MoveControls] = false;
    });
    mobileControlRef.current = null;
    setMobileControl(null);
  }, []);

  const handleNearbyChange = useCallback((id: NearbyTargetId | null) => {
    nearbyIdRef.current = id;
    setNearbyId(id);
    if (id && mobileControlRef.current) stopMovement();
  }, [stopMovement]);

  const handleMovementBlocked = useCallback(() => {
    if (mobileControlRef.current) stopMovement();
  }, [stopMovement]);

  const markVisited = useCallback((id: LandmarkId) => {
    if (visitedIdsRef.current.includes(id)) return;

    const next = [...visitedIdsRef.current, id];
    visitedIdsRef.current = next;
    setVisitedIds(next);
    setVisitNoticeId(id);

    try {
      window.sessionStorage.setItem(VISITED_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 탐험 기록은 세션 편의 기능이므로 저장 실패 시 메모리 상태만 유지합니다.
    }
  }, []);

  const restorePanelFocus = useCallback((fallbackId: LandmarkId | null) => {
    const opener = returnFocusRef.current;
    returnFocusRef.current = null;

    window.requestAnimationFrame(() => {
      if (opener?.isConnected) {
        opener.focus();
        return;
      }
      if (fallbackId) dockButtonRefs.current[fallbackId]?.focus();
    });
  }, []);

  const clearSelection = useCallback((restoreFocus = true) => {
    const returnTarget = selectedIdRef.current;
    selectedIdRef.current = null;
    setSelectedId(null);
    stopMovement();

    if (restoreFocus) restorePanelFocus(returnTarget);
  }, [restorePanelFocus, stopMovement]);

  const openSelectionState = useCallback((id: LandmarkId) => {
    stopMovement();
    completionOpenRef.current = false;
    completionReturnFocusRef.current = null;
    setCompletionOpen(false);
    setIntroCompact(true);
    selectedIdRef.current = id;
    setSelectedId(id);
    markVisited(id);
  }, [markVisited, stopMovement]);

  const handleSelect = useCallback((id: LandmarkId) => {
    const hadPanel = Boolean(selectedIdRef.current);
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement
      && activeElement !== document.body
      && !activeElement.closest(".tb-info-panel")
    ) {
      returnFocusRef.current = activeElement;
    }

    openSelectionState(id);

    if (window.location.hash === `#${id}`) return;

    const currentState = window.history.state && typeof window.history.state === "object"
      ? { ...window.history.state }
      : {};
    const nextUrl = getPageUrl(`#${id}`);

    if (!hadPanel) {
      panelHistoryOwnedRef.current = true;
      window.history.pushState({ ...currentState, threeBlogPlace: id }, "", nextUrl);
      return;
    }

    if (panelHistoryOwnedRef.current) {
      window.history.replaceState({ ...currentState, threeBlogPlace: id }, "", nextUrl);
    } else {
      delete currentState.threeBlogPlace;
      window.history.replaceState(currentState, "", nextUrl);
    }
  }, [openSelectionState]);

  const closePanel = useCallback(() => {
    stopMovement();
    if (panelHistoryOwnedRef.current && getHashLandmark()) {
      panelHistoryOwnedRef.current = false;
      window.history.back();
      return;
    }

    const currentState = window.history.state && typeof window.history.state === "object"
      ? { ...window.history.state }
      : {};
    delete currentState.threeBlogPlace;
    window.history.replaceState(currentState, "", getPageUrl());
    clearSelection();
  }, [clearSelection, stopMovement]);

  const openCompletionState = useCallback(() => {
    if (
      completionOpenRef.current
      || visitedIdsRef.current.length !== landmarks.length
      || selectedIdRef.current
    ) return;

    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement
      && activeElement !== document.body
      && !activeElement.closest(".tb-info-panel")
    ) {
      completionReturnFocusRef.current = activeElement;
    }

    stopMovement();
    completionOpenRef.current = true;
    setCompletionOpen(true);
  }, [stopMovement]);

  const clearCompletion = useCallback((restoreFocus = true) => {
    const opener = completionReturnFocusRef.current;
    completionReturnFocusRef.current = null;
    completionOpenRef.current = false;
    setCompletionOpen(false);

    if (!restoreFocus) return;
    window.requestAnimationFrame(() => {
      if (opener?.isConnected) {
        opener.focus();
        return;
      }
      if (nearbyIdRef.current === "record" && recordNearbyButtonRef.current) {
        recordNearbyButtonRef.current.focus();
        return;
      }
      progressButtonRef.current?.focus();
    });
  }, []);

  const openCompletion = useCallback(() => {
    if (visitedIdsRef.current.length !== landmarks.length || selectedIdRef.current) return;
    openCompletionState();

    if (window.location.hash === COMPLETION_HASH) return;
    const currentState = window.history.state && typeof window.history.state === "object"
      ? { ...window.history.state }
      : {};
    completionHistoryOwnedRef.current = true;
    window.history.pushState(
      { ...currentState, threeBlogCompletion: true },
      "",
      getPageUrl(COMPLETION_HASH),
    );
  }, [openCompletionState]);

  const closeCompletion = useCallback(() => {
    stopMovement();
    if (completionHistoryOwnedRef.current && window.location.hash === COMPLETION_HASH) {
      completionHistoryOwnedRef.current = false;
      window.history.back();
      return;
    }

    const currentState = window.history.state && typeof window.history.state === "object"
      ? { ...window.history.state }
      : {};
    delete currentState.threeBlogCompletion;
    window.history.replaceState(currentState, "", getPageUrl());
    clearCompletion();
  }, [clearCompletion, stopMovement]);

  const handlePositionChange = useCallback((position: { x: number; z: number }) => {
    if (!mapPlayerRef.current) return;
    const mapPosition = worldToMap(position);
    mapPlayerRef.current.style.left = `${mapPosition.left}%`;
    mapPlayerRef.current.style.top = `${mapPosition.top}%`;
  }, []);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(VISITED_STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        const validIds = stored.filter((id): id is LandmarkId => landmarkIdSet.has(id));
        visitedIdsRef.current = [...new Set(validIds)];
        setVisitedIds(visitedIdsRef.current);
      }
    } catch {
      visitedIdsRef.current = [];
      setVisitedIds([]);
    }

    const syncLocationState = () => {
      const id = getHashLandmark();
      if (id) {
        completionHistoryOwnedRef.current = false;
        if (completionOpenRef.current) clearCompletion(false);
        panelHistoryOwnedRef.current = Boolean(window.history.state?.threeBlogPlace);
        openSelectionState(id);
        return;
      }

      if (
        window.location.hash === COMPLETION_HASH
        && visitedIdsRef.current.length === landmarks.length
      ) {
        panelHistoryOwnedRef.current = false;
        if (selectedIdRef.current) clearSelection(false);
        completionHistoryOwnedRef.current = Boolean(window.history.state?.threeBlogCompletion);
        openCompletionState();
        return;
      }

      panelHistoryOwnedRef.current = false;
      completionHistoryOwnedRef.current = false;
      if (selectedIdRef.current) clearSelection();
      if (completionOpenRef.current) clearCompletion();
    };

    syncLocationState();
    window.addEventListener("popstate", syncLocationState);
    window.addEventListener("hashchange", syncLocationState);
    return () => {
      window.removeEventListener("popstate", syncLocationState);
      window.removeEventListener("hashchange", syncLocationState);
    };
  }, [clearCompletion, clearSelection, openCompletionState, openSelectionState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedIdRef.current) {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key === "Escape" && completionOpen) {
        event.preventDefault();
        closeCompletion();
        return;
      }
      if (selectedIdRef.current || completionOpen) return;
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isInteractiveTarget(event.target)) return;

      const control = keyToControl[event.code];
      if (control) {
        event.preventDefault();
        if (mobileControlRef.current) {
          stopMovement();
        }
        controls.current[control] = true;
        setIntroCompact(true);
      }

      if (event.key === "Enter" && nearbyIdRef.current) {
        event.preventDefault();
        if (nearbyIdRef.current === "record") {
          openCompletion();
          return;
        }
        handleSelect(nearbyIdRef.current);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const control = keyToControl[event.code];
      if (control) controls.current[control] = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopMovement();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", stopMovement);
    window.addEventListener("pagehide", stopMovement);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", stopMovement);
      window.removeEventListener("pagehide", stopMovement);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [closeCompletion, closePanel, completionOpen, handleSelect, openCompletion, stopMovement]);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
  }, [selected]);

  useEffect(() => {
    if (!completionOpen) return;
    completionCloseButtonRef.current?.focus();
  }, [completionOpen]);

  useEffect(() => {
    if (!visitNoticeId) return;
    const timeout = window.setTimeout(() => setVisitNoticeId(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [visitNoticeId]);

  const beginExploration = () => {
    setIntroCompact(true);
    window.requestAnimationFrame(() => dockButtonRefs.current.career?.focus());
  };

  const toggleMobileControl = (control: keyof MoveControls) => {
    if (selectedIdRef.current || completionOpen) return;
    const nextControl = mobileControlRef.current === control ? null : control;
    stopMovement();

    if (nextControl) {
      controls.current[nextControl] = true;
      mobileControlRef.current = nextControl;
      setMobileControl(nextControl);
      setIntroCompact(true);
    }
  };

  return (
    <div className={`three-blog-page${selected || completionOpen ? " has-panel" : ""}`}>
      <a className="tb-skip-link" href="#tb-place-nav">2D 탐색 메뉴로 이동</a>
      <p className="tb-sr-only" id="three-blog-controls">
        키보드에서는 W, A, S, D 또는 방향키로 이동하고 가까운 공간은 Enter로 엽니다.
        모바일에서는 방향 버튼을 한 번 눌러 이동하고 가운데 버튼으로 멈춥니다.
      </p>
      <div
        className="tb-canvas-layer"
        inert={Boolean(selected || completionOpen)}
      >
        <ThreeBlogScene
          controls={controls}
          reducedMotion={Boolean(prefersReducedMotion) || lowPowerMode}
          lowPowerMode={lowPowerMode}
          visitedIds={visitedIds}
          onMovementBlocked={handleMovementBlocked}
          onNearbyChange={handleNearbyChange}
          onOpenCompletion={openCompletion}
          onPositionChange={handlePositionChange}
          onSelect={handleSelect}
          fallback={<NavigationFallback onSelect={handleSelect} />}
        />
      </div>

      <header className="tb-topbar">
        <Link href="/" className="tb-brand" aria-label="기본 홈페이지로 돌아가기">
          <span className="tb-brand-mark">K</span>
          <span>
            ksungz
            <small>interactive space</small>
          </span>
        </Link>
        <div className="tb-top-actions">
          <button
            className="tb-quality-toggle"
            type="button"
            aria-label="저사양 모드"
            aria-pressed={lowPowerMode}
            onClick={() => setLowPowerMode((current) => !current)}
          >
            <Gauge size={14} aria-hidden="true" />
            {lowPowerMode ? "저사양" : "고화질"}
          </button>
          <button
            ref={progressButtonRef}
            className={`tb-progress${explorationComplete ? " is-complete" : ""}`}
            type="button"
            disabled={!explorationComplete || completionOpen}
            aria-controls="tb-completion-panel"
            aria-expanded={completionOpen}
            aria-label={
              explorationComplete
                ? "탐험 기록 4개 완료, 완주 기록 열기"
                : `탐험 기록 ${visitedCount} / ${landmarks.length}`
            }
            onClick={openCompletion}
          >
            <Compass size={14} aria-hidden="true" />
            <span aria-live="polite">
              <strong>{visitedCount} / {landmarks.length}</strong>
              <small>{explorationComplete ? "기록 열기" : "탐험 기록"}</small>
            </span>
          </button>
          <div className="tb-status">
            <span />
            3D navigation experiment
          </div>
        </div>
      </header>

      <section className={`tb-intro${introCompact ? " is-compact" : ""}`} aria-labelledby="three-blog-title">
        <p>Portfolio navigation experiment</p>
        <h1 id="three-blog-title">
          작업을 담은
          <br />
          3D 공간.
        </h1>
        <span>
          AI 도구를 활용해 만든 탐색 화면입니다. 네 공간을 둘러보면 중앙의 탐험 기록이 완성됩니다.
        </span>
        <button type="button" onClick={beginExploration}>
          <Play size={13} fill="currentColor" aria-hidden="true" />
          탐색 시작
        </button>
      </section>

      <div className="tb-minimap" aria-hidden="true">
        <span className="tb-map-label">World map · {visitedCount}/{landmarks.length}</span>
        <div className="tb-map-island">
          {landmarks.map((landmark) => {
            const mapPosition = worldToMap({ x: landmark.position[0], z: landmark.position[2] });
            return (
              <i
                key={landmark.id}
                className={`tb-map-landmark${visitedIds.includes(landmark.id) ? " is-visited" : ""}`}
                style={{
                  left: `${mapPosition.left}%`,
                  top: `${mapPosition.top}%`,
                  background: landmark.color,
                }}
              />
            );
          })}
          <i className={`tb-map-record${explorationComplete ? " is-complete" : ""}`} />
          <i
            ref={mapPlayerRef}
            className="tb-map-player"
            style={{ left: `${playerStartMap.left}%`, top: `${playerStartMap.top}%` }}
          />
        </div>
      </div>

      <div className="tb-key-guide" aria-hidden="true">
        <div>
          <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </div>
        <span>또는 방향키로 이동</span>
      </div>

      {recordNearby && !selected && !completionOpen && (
        <button ref={recordNearbyButtonRef} className="tb-nearby" type="button" onClick={openCompletion}>
          <span style={{ background: "#ffca59" }} />
          <strong>Explorer Record</strong>
          <small>Enter로 열기</small>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      )}

      {nearby && !selected && !completionOpen && (
        <button className="tb-nearby" type="button" onClick={() => handleSelect(nearby.id)}>
          <span style={{ background: nearby.color }} />
          <strong>{nearby.label}</strong>
          <small>Enter로 열기</small>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      )}

      {visitNotice && (
        <div className="tb-visit-toast" role="status">
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>
            <strong>{visitNotice.label}</strong>
            <small>기록 완료 · {visitedCount}/{landmarks.length}</small>
          </span>
        </div>
      )}

      {!completionOpen && <nav className="tb-place-dock" id="tb-place-nav" aria-label="작업 공간 바로가기" tabIndex={-1}>
        {landmarks.map((landmark, index) => (
          <button
            key={landmark.id}
            ref={(node) => {
              dockButtonRefs.current[landmark.id] = node;
            }}
            type="button"
            className={`${selectedId === landmark.id ? "is-active" : ""}${visitedIds.includes(landmark.id) ? " is-visited" : ""}`}
            aria-label={`${index + 1}. ${landmark.label}: ${landmark.title}${visitedIds.includes(landmark.id) ? ", 방문 완료" : ""}`}
            aria-controls="tb-info-panel"
            aria-expanded={selectedId === landmark.id}
            aria-haspopup="dialog"
            onClick={() => {
              if (selectedId === landmark.id) {
                closePanel();
                return;
              }
              handleSelect(landmark.id);
            }}
          >
            <span style={{ background: landmark.color }} />
            <em>{landmark.label}</em>
            <small aria-hidden="true">{String(index + 1).padStart(2, "0")}</small>
          </button>
        ))}
      </nav>}

      {!selected && !completionOpen && <div className="tb-mobile-controls" role="group" aria-label="캐릭터 이동 컨트롤">
        <p className="tb-mobile-hint" aria-live="polite">
          {mobileControl ? "이동 중 · 가운데를 눌러 정지" : "한 번 눌러 이동"}
        </p>
        <div className="tb-mobile-dpad">
          <button
            className={`tb-move-forward${mobileControl === "forward" ? " is-active" : ""}`}
            type="button"
            aria-label="앞으로 계속 이동"
            aria-pressed={mobileControl === "forward"}
            onClick={() => toggleMobileControl("forward")}
          >
            <ChevronUp aria-hidden="true" />
          </button>
          <button
            className={`tb-move-left${mobileControl === "left" ? " is-active" : ""}`}
            type="button"
            aria-label="왼쪽으로 계속 이동"
            aria-pressed={mobileControl === "left"}
            onClick={() => toggleMobileControl("left")}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="tb-mobile-stop" type="button" aria-label="이동 정지" onClick={stopMovement}>
            <Square size={13} fill="currentColor" aria-hidden="true" />
          </button>
          <button
            className={`tb-move-right${mobileControl === "right" ? " is-active" : ""}`}
            type="button"
            aria-label="오른쪽으로 계속 이동"
            aria-pressed={mobileControl === "right"}
            onClick={() => toggleMobileControl("right")}
          >
            <ChevronRight aria-hidden="true" />
          </button>
          <button
            className={`tb-move-backward${mobileControl === "backward" ? " is-active" : ""}`}
            type="button"
            aria-label="뒤로 계속 이동"
            aria-pressed={mobileControl === "backward"}
            onClick={() => toggleMobileControl("backward")}
          >
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      </div>}

      {selected && (
        <aside
          id="tb-info-panel"
          className="tb-info-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="tb-panel-title"
          aria-describedby="tb-panel-description"
          style={{ "--panel-accent": selected.color } as React.CSSProperties}
        >
          <button
            ref={closeButtonRef}
            className="tb-panel-close"
            type="button"
            onClick={closePanel}
            aria-label="정보 패널 닫기"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="tb-panel-index">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(landmarks.length).padStart(2, "0")}
          </div>
          <p>{selected.eyebrow}</p>
          <h2 id="tb-panel-title">{selected.title}</h2>
          <span id="tb-panel-description">{selected.description}</span>
          <ul>
            {selected.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="tb-panel-tags" aria-label="관련 기술과 주제">
            {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <Link href={selected.href}>
            {selected.action}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      )}

      {completionOpen && (
        <aside
          id="tb-completion-panel"
          className="tb-info-panel tb-completion-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="tb-completion-title"
          aria-describedby="tb-completion-description"
        >
          <button
            ref={completionCloseButtonRef}
            className="tb-panel-close"
            type="button"
            onClick={closeCompletion}
            aria-label="완주 기록 닫기"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="tb-completion-badge">
            <CheckCircle2 size={18} aria-hidden="true" />
            Explorer record complete
          </div>
          <h2 id="tb-completion-title">네 개의 작업 기록을 모두 확인했습니다.</h2>
          <span id="tb-completion-description">
            제가 UI를 다룰 때 중요하게 생각하는 기준을 하나의 탐험 기록으로 정리했습니다.
          </span>
          <ol className="tb-principles">
            <li>
              <strong>01 · Structure</strong>
              <span>오래 운영할 수 있는 구조와 단계적인 전환을 설계합니다.</span>
            </li>
            <li>
              <strong>02 · Quality</strong>
              <span>접근성, 예외 상태와 모바일 흐름까지 함께 검증합니다.</span>
            </li>
            <li>
              <strong>03 · Record</strong>
              <span>선택의 이유와 시행착오를 문서와 글로 남깁니다.</span>
            </li>
          </ol>
          <div className="tb-completion-actions">
            <Link href="/portfolio">
              프로젝트 보기
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/tech">기술 글 보기</Link>
          </div>
        </aside>
      )}

      <p className="tb-corner-note">AI 도구를 활용해 만든 포트폴리오 탐색 실험 · 2026</p>
    </div>
  );
}
