"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Gauge, Play, X } from "lucide-react";
import type { MoveControls } from "./ThreeBlogScene";
import { landmarks, type LandmarkId } from "./content";

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

function NavigationFallback({ onSelect }: { onSelect: (id: LandmarkId) => void }) {
  return (
    <div className="tb-fallback" role="status">
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
  const [nearbyId, setNearbyId] = useState<LandmarkId | null>(null);
  const [selectedId, setSelectedId] = useState<LandmarkId | null>(null);
  const [introCompact, setIntroCompact] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const nearbyIdRef = useRef<LandmarkId | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mapPlayerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const selected = useMemo(
    () => landmarks.find((landmark) => landmark.id === selectedId) ?? null,
    [selectedId],
  );
  const nearby = useMemo(
    () => landmarks.find((landmark) => landmark.id === nearbyId) ?? null,
    [nearbyId],
  );
  const selectedIndex = selected
    ? landmarks.findIndex((landmark) => landmark.id === selected.id)
    : -1;

  const handleNearbyChange = useCallback((id: LandmarkId | null) => {
    nearbyIdRef.current = id;
    setNearbyId(id);
  }, []);

  const handleSelect = useCallback((id: LandmarkId) => {
    setIntroCompact(true);
    setSelectedId(id);
  }, []);

  const handlePositionChange = useCallback((position: { x: number; z: number }) => {
    if (!mapPlayerRef.current) return;
    mapPlayerRef.current.style.left = `${((position.x + 17) / 34) * 100}%`;
    mapPlayerRef.current.style.top = `${((position.z + 13) / 26) * 100}%`;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const control = keyToControl[event.code];
      if (control) {
        event.preventDefault();
        controls.current[control] = true;
        setIntroCompact(true);
      }

      if (event.key === "Enter" && nearbyIdRef.current) {
        setSelectedId(nearbyIdRef.current);
      }
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const control = keyToControl[event.code];
      if (control) controls.current[control] = false;
    };

    const resetControls = () => {
      Object.keys(controls.current).forEach((key) => {
        controls.current[key as keyof MoveControls] = false;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", resetControls);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", resetControls);
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    closeButtonRef.current?.focus();
  }, [selected]);

  const setControl = (control: keyof MoveControls, active: boolean) => {
    controls.current[control] = active;
    if (active) setIntroCompact(true);
  };

  const controlButtonProps = (control: keyof MoveControls) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setControl(control, true);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setControl(control, false);
    },
    onPointerCancel: () => setControl(control, false),
  });

  return (
    <div className="three-blog-page">
      <a className="tb-skip-link" href="#tb-place-nav">2D 탐색 메뉴로 이동</a>
      <div className="tb-canvas-layer">
        <ThreeBlogScene
          controls={controls}
          reducedMotion={Boolean(prefersReducedMotion) || lowPowerMode}
          lowPowerMode={lowPowerMode}
          onNearbyChange={handleNearbyChange}
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
            aria-pressed={lowPowerMode}
            onClick={() => setLowPowerMode((current) => !current)}
          >
            <Gauge size={14} aria-hidden="true" />
            {lowPowerMode ? "저사양 모드" : "효과 켜짐"}
          </button>
          <div className="tb-status">
            <span />
            3D portfolio lab
          </div>
        </div>
      </header>

      <section className={`tb-intro${introCompact ? " is-compact" : ""}`} aria-labelledby="three-blog-title">
        <p>Service UI · Frontend · Systems</p>
        <h1 id="three-blog-title">
          Explore my
          <br />
          frontend world.
        </h1>
        <span>캐릭터를 움직여 네 개의 작업 공간을 둘러보세요.</span>
        <button type="button" onClick={() => setIntroCompact(true)}>
          <Play size={13} fill="currentColor" aria-hidden="true" />
          탐색 시작
        </button>
      </section>

      <div className="tb-minimap" aria-hidden="true">
        <span className="tb-map-label">World map</span>
        <div className="tb-map-island">
          {landmarks.map((landmark) => (
            <i
              key={landmark.id}
              className="tb-map-landmark"
              style={{
                left: `${((landmark.position[0] + 17) / 34) * 100}%`,
                top: `${((landmark.position[2] + 13) / 26) * 100}%`,
                background: landmark.color,
              }}
            />
          ))}
          <i ref={mapPlayerRef} className="tb-map-player" style={{ left: "50%", top: "80.77%" }} />
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

      {nearby && !selected && (
        <button className="tb-nearby" type="button" onClick={() => handleSelect(nearby.id)}>
          <span style={{ background: nearby.color }} />
          <strong>{nearby.label}</strong>
          <small>Enter로 열기</small>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      )}

      <nav className="tb-place-dock" id="tb-place-nav" aria-label="작업 공간 바로가기" tabIndex={-1}>
        {landmarks.map((landmark) => (
          <button
            key={landmark.id}
            type="button"
            className={selectedId === landmark.id ? "is-active" : ""}
            aria-pressed={selectedId === landmark.id}
            onClick={() => handleSelect(landmark.id)}
          >
            <span style={{ background: landmark.color }} />
            <em>{landmark.label}</em>
          </button>
        ))}
      </nav>

      <div className="tb-mobile-controls" aria-label="캐릭터 이동 컨트롤">
        <button type="button" aria-label="앞으로 이동" {...controlButtonProps("forward")}>
          <ChevronUp aria-hidden="true" />
        </button>
        <button type="button" aria-label="왼쪽으로 이동" {...controlButtonProps("left")}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="뒤로 이동" {...controlButtonProps("backward")}>
          <ChevronDown aria-hidden="true" />
        </button>
        <button type="button" aria-label="오른쪽으로 이동" {...controlButtonProps("right")}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {selected && (
        <aside
          className="tb-info-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="tb-panel-title"
          style={{ "--panel-accent": selected.color } as React.CSSProperties}
        >
          <button
            ref={closeButtonRef}
            className="tb-panel-close"
            type="button"
            onClick={() => setSelectedId(null)}
            aria-label="정보 패널 닫기"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="tb-panel-index">{String(selectedIndex + 1).padStart(2, "0")} / 04</div>
          <p>{selected.eyebrow}</p>
          <h2 id="tb-panel-title">{selected.title}</h2>
          <span>{selected.description}</span>
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

      <p className="tb-corner-note">A small playable index of my work · 2026</p>
    </div>
  );
}
