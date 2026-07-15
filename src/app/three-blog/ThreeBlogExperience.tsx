"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import ThreeBlogScene, { type MoveControls } from "./ThreeBlogScene";
import { landmarks, type LandmarkId } from "./content";

const keyToControl: Record<string, keyof MoveControls> = {
  ArrowUp: "forward",
  w: "forward",
  W: "forward",
  ArrowDown: "backward",
  s: "backward",
  S: "backward",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
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
export default function ThreeBlogExperience() {
  const controls = useRef<MoveControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [nearbyId, setNearbyId] = useState<LandmarkId | null>(null);
  const [selectedId, setSelectedId] = useState<LandmarkId | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const selected = useMemo(
    () => landmarks.find((landmark) => landmark.id === selectedId) ?? null,
    [selectedId],
  );
  const nearby = useMemo(
    () => landmarks.find((landmark) => landmark.id === nearbyId) ?? null,
    [nearbyId],
  );

  const handleNearbyChange = useCallback((id: LandmarkId | null) => {
    setNearbyId(id);
  }, []);

  const handleSelect = useCallback((id: LandmarkId) => {
    setSelectedId(id);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const control = keyToControl[event.key];
      if (control) {
        event.preventDefault();
        controls.current[control] = true;
      }

      if (event.key === "Enter" && nearbyId) {
        setSelectedId(nearbyId);
      }
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const control = keyToControl[event.key];
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
  }, [nearbyId]);

  const setControl = (control: keyof MoveControls, active: boolean) => {
    controls.current[control] = active;
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
      <div className="tb-canvas-layer">
        <ThreeBlogScene
          controls={controls}
          reducedMotion={Boolean(prefersReducedMotion)}
          onNearbyChange={handleNearbyChange}
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
        <div className="tb-status">
          <span />
          3D portfolio lab
        </div>
      </header>

      <section className="tb-intro" aria-labelledby="three-blog-title">
        <p>Service UI · Frontend · Systems</p>
        <h1 id="three-blog-title">
          Explore my
          <br />
          frontend world.
        </h1>
        <span>캐릭터를 움직여 네 개의 작업 공간을 둘러보세요.</span>
      </section>

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

      <nav className="tb-place-dock" aria-label="작업 공간 바로가기">
        {landmarks.map((landmark) => (
          <button
            key={landmark.id}
            type="button"
            className={selectedId === landmark.id ? "is-active" : ""}
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
        <aside className="tb-info-panel" aria-live="polite" style={{ "--panel-accent": selected.color } as React.CSSProperties}>
          <button className="tb-panel-close" type="button" onClick={() => setSelectedId(null)} aria-label="정보 패널 닫기">
            <X size={18} aria-hidden="true" />
          </button>
          <p>{selected.eyebrow}</p>
          <h2>{selected.title}</h2>
          <span>{selected.description}</span>
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
