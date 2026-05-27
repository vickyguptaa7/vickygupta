"use client";

import { useCallback, useEffect, useRef } from "react";

// =============================================================================
// CONSTANTS
// =============================================================================
const SPRITE_SIZE = 32;
const NEKO_SPEED = 10;
const STOP_DISTANCE = 64;

const ONEKO_SPRITE_URL = "/images/oneko.gif";

// =============================================================================
// SPRITE SETS — Maps animation names to [col, row] offsets (oneko layout)
// =============================================================================
const spriteSets: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Classic oneko cat that follows the cursor around the screen.
 * Uses the original oneko.gif sprite sheet.
 * Features 8-directional walking, idle animations (sleeping, scratching),
 * and click interactions. On mobile, it sits idle in the bottom-right.
 */
export function CursorPet() {
  const nekoRef = useRef<HTMLDivElement>(null);
  const nekoPosRef = useRef({ x: 32, y: 32 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const frameCountRef = useRef(0);
  const idleTimeRef = useRef(0);
  const idleAnimRef = useRef<string | null>(null);
  const idleAnimFrameRef = useRef(0);
  const lastFrameRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const isMobileRef = useRef(false);

  // Click interaction state
  const clickAnimRef = useRef(false);
  const clickAnimFrameRef = useRef(0);
  const clickAnimTypeRef = useRef<string>("scratchSelf");

  const setSprite = useCallback((name: string, frame: number) => {
    const el = nekoRef.current;
    if (!el) return;
    const sprites = spriteSets[name];
    if (!sprites) return;
    const sprite = sprites[frame % sprites.length];
    el.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${sprite[1] * SPRITE_SIZE}px`;
  }, []);

  const resetIdleAnimation = useCallback(() => {
    idleAnimRef.current = null;
    idleAnimFrameRef.current = 0;
  }, []);

  const handleIdle = useCallback(() => {
    idleTimeRef.current += 1;

    if (
      idleTimeRef.current > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimRef.current === null
    ) {
      const pos = nekoPosRef.current;
      const available: string[] = ["sleeping", "scratchSelf"];

      if (pos.x < 32) available.push("scratchWallW");
      if (pos.y < 32) available.push("scratchWallN");
      if (pos.x > window.innerWidth - 32) available.push("scratchWallE");
      if (pos.y > window.innerHeight - 32) available.push("scratchWallS");

      idleAnimRef.current =
        available[Math.floor(Math.random() * available.length)];
    }

    switch (idleAnimRef.current) {
      case "sleeping":
        if (idleAnimFrameRef.current < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimFrameRef.current / 4));
        if (idleAnimFrameRef.current > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimRef.current, idleAnimFrameRef.current);
        if (idleAnimFrameRef.current > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimFrameRef.current += 1;
  }, [setSprite, resetIdleAnimation]);

  const frame = useCallback(() => {
    frameCountRef.current += 1;
    const el = nekoRef.current;
    if (!el) return;

    // Handle click animation
    if (clickAnimRef.current) {
      setSprite(clickAnimTypeRef.current, clickAnimFrameRef.current);
      clickAnimFrameRef.current += 1;
      if (clickAnimFrameRef.current > 12) {
        clickAnimRef.current = false;
        clickAnimFrameRef.current = 0;
      }
      return;
    }

    const pos = nekoPosRef.current;
    const mouse = mousePosRef.current;
    const diffX = pos.x - mouse.x;
    const diffY = pos.y - mouse.y;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < NEKO_SPEED || distance < STOP_DISTANCE) {
      handleIdle();
      return;
    }

    idleAnimRef.current = null;
    idleAnimFrameRef.current = 0;

    if (idleTimeRef.current > 1) {
      setSprite("alert", 0);
      idleTimeRef.current = Math.min(idleTimeRef.current, 7);
      idleTimeRef.current -= 1;
      return;
    }

    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";

    if (direction) {
      setSprite(direction, frameCountRef.current);
    }

    pos.x -= (diffX / distance) * NEKO_SPEED;
    pos.y -= (diffY / distance) * NEKO_SPEED;

    pos.x = Math.min(Math.max(16, pos.x), window.innerWidth - 16);
    pos.y = Math.min(Math.max(16, pos.y), window.innerHeight - 16);

    el.style.left = `${pos.x - 16}px`;
    el.style.top = `${pos.y - 16}px`;
  }, [handleIdle, setSprite]);

  const handleClick = useCallback(() => {
    const animations = ["scratchSelf", "scratchWallN", "scratchWallS"];
    clickAnimTypeRef.current =
      animations[Math.floor(Math.random() * animations.length)];
    clickAnimRef.current = true;
    clickAnimFrameRef.current = 0;

    idleTimeRef.current = 0;
    idleAnimRef.current = null;
    idleAnimFrameRef.current = 0;
  }, []);

  useEffect(() => {
    const el = nekoRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      el.style.display = "none";
      return;
    }

    el.style.backgroundImage = `url(${ONEKO_SPRITE_URL})`;

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();

    if (isMobileRef.current) {
      nekoPosRef.current = {
        x: window.innerWidth - 48,
        y: window.innerHeight - 48,
      };
      el.style.left = `${nekoPosRef.current.x - 16}px`;
      el.style.top = `${nekoPosRef.current.y - 16}px`;
      mousePosRef.current = { ...nekoPosRef.current };
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      checkMobile();
      if (isMobileRef.current) {
        nekoPosRef.current = {
          x: window.innerWidth - 48,
          y: window.innerHeight - 48,
        };
        mousePosRef.current = { ...nekoPosRef.current };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    el.addEventListener("click", handleClick);

    const tick = (timestamp: number) => {
      const currentEl = nekoRef.current;
      if (!currentEl || !currentEl.isConnected) return;

      if (!lastFrameRef.current) {
        lastFrameRef.current = timestamp;
      }

      if (timestamp - lastFrameRef.current > 100) {
        lastFrameRef.current = timestamp;
        frame();
      }

      animFrameRef.current = window.requestAnimationFrame(tick);
    };

    animFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("click", handleClick);
      if (animFrameRef.current) {
        window.cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [frame, handleClick]);

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      style={{
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        position: "fixed",
        pointerEvents: "auto",
        cursor: "pointer",
        imageRendering: "pixelated",
        left: 16,
        top: 16,
        zIndex: 2147483647,
        overflow: "visible",
      }}
    />
  );
}
