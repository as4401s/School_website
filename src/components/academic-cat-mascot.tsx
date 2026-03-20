"use client";

import { useEffect, useEffectEvent, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function AcademicCatMascot() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const lookRef = useRef({ x: 0, y: 0 });
  const idleRef = useRef(0);
  const lastMoveRef = useRef(0);

  const renderFrame = useEffectEvent((nowMs: number) => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (lastMoveRef.current === 0) {
      lastMoveRef.current = nowMs;
    }

    const time = nowMs / 1000;
    const idleTarget = nowMs - lastMoveRef.current > 2600 ? 1 : 0;
    const idleLerp = idleTarget > idleRef.current ? 0.03 : 0.08;

    idleRef.current += (idleTarget - idleRef.current) * idleLerp;

    const followStrength = 0.11 - idleRef.current * 0.04;
    lookRef.current.x += (pointerRef.current.x - lookRef.current.x) * followStrength;
    lookRef.current.y += (pointerRef.current.y - lookRef.current.y) * followStrength;

    const bodyBob = Math.sin(time * 2.4) * (1.9 - idleRef.current * 0.7);
    const headNod = Math.sin(time * 1.7 + 0.4) * 1.5;
    const tailSwing = Math.sin(time * (2.2 + idleRef.current * 1.7)) * (13 + idleRef.current * 12);
    const pawPhase = idleRef.current > 0.05 ? (Math.sin(time * 7.4) * 0.5 + 0.5) : 0;
    const lickPhase = idleRef.current > 0.05 ? (Math.sin(time * 7.4 + 0.9) * 0.5 + 0.5) : 0;
    const blinkGate = Math.max(0, Math.sin(time * 0.82 + Math.sin(time * 0.19) * 0.65) - 0.94);
    const blink = blinkGate / 0.06;

    root.style.setProperty("--cat-look-x", lookRef.current.x.toFixed(4));
    root.style.setProperty("--cat-look-y", lookRef.current.y.toFixed(4));
    root.style.setProperty("--cat-idle", idleRef.current.toFixed(4));
    root.style.setProperty("--cat-body-bob", `${bodyBob.toFixed(2)}px`);
    root.style.setProperty("--cat-head-nod", `${headNod.toFixed(2)}deg`);
    root.style.setProperty("--cat-tail-swing", `${tailSwing.toFixed(2)}deg`);
    root.style.setProperty("--cat-paw-phase", pawPhase.toFixed(4));
    root.style.setProperty("--cat-lick-phase", lickPhase.toFixed(4));
    root.style.setProperty("--cat-blink", clamp(blink, 0, 1).toFixed(4));
  });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1),
        y: clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1),
      };
      lastMoveRef.current = performance.now();
    };

    const handleBlur = () => {
      pointerRef.current = { x: 0, y: 0 };
    };

    let frameId = 0;

    const loop = (nowMs: number) => {
      renderFrame(nowMs);
      frameId = window.requestAnimationFrame(loop);
    };

    lastMoveRef.current = performance.now();
    frameId = window.requestAnimationFrame(loop);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handleBlur);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleBlur);
    };
  }, [renderFrame]);

  return (
    <div aria-hidden="true" className="academic-cat-mascot" ref={rootRef}>
      <svg
        className="academic-cat-mascot__svg"
        fill="none"
        viewBox="0 0 420 460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cat-fur" x1="114" x2="300" y1="94" y2="336" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFBF63" />
            <stop offset="0.52" stopColor="#F59A32" />
            <stop offset="1" stopColor="#D9791C" />
          </linearGradient>
          <linearGradient id="cat-fur-dark" x1="156" x2="272" y1="92" y2="246" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8F4E1B" stopOpacity="0.8" />
            <stop offset="1" stopColor="#A95E21" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="cat-cream" x1="168" x2="246" y1="180" y2="346" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF8EF" />
            <stop offset="1" stopColor="#F7E8D8" />
          </linearGradient>
          <linearGradient id="cat-bag" x1="130" x2="292" y1="142" y2="282" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67B1FF" />
            <stop offset="1" stopColor="#215CD8" />
          </linearGradient>
          <linearGradient id="cat-bag-pocket" x1="168" x2="246" y1="214" y2="272" gradientUnits="userSpaceOnUse">
            <stop stopColor="#96CCFF" />
            <stop offset="1" stopColor="#4E86F3" />
          </linearGradient>
          <linearGradient id="cat-cap" x1="148" x2="272" y1="58" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A4A50" />
            <stop offset="1" stopColor="#19191C" />
          </linearGradient>
          <radialGradient id="cat-shadow" cx="0" cy="0" r="1" gradientTransform="translate(210 408) rotate(90) scale(30 122)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1F2937" stopOpacity="0.24" />
            <stop offset="1" stopColor="#1F2937" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cat-cheek" cx="0" cy="0" r="1" gradientTransform="translate(0.5 0.5) scale(0.5)" gradientUnits="objectBoundingBox">
            <stop stopColor="#FFB7B0" />
            <stop offset="1" stopColor="#FFB7B0" stopOpacity="0" />
          </radialGradient>
          <filter id="cat-soft-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="472" width="420" x="0" y="-2">
            <feDropShadow dx="0" dy="18" floodColor="#1F2937" floodOpacity="0.18" stdDeviation="16" />
          </filter>
          <filter id="cat-cap-shadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="112" width="176" x="122" y="30">
            <feDropShadow dx="0" dy="6" floodColor="#111827" floodOpacity="0.2" stdDeviation="6" />
          </filter>
        </defs>

        <ellipse className="academic-cat-mascot__shadow" cx="210" cy="412" fill="url(#cat-shadow)" rx="122" ry="30" />

        <g className="academic-cat-mascot__sparkle academic-cat-mascot__sparkle--one">
          <path d="M76 130L80 118L84 130L96 134L84 138L80 150L76 138L64 134L76 130Z" fill="#F7C948" />
        </g>
        <g className="academic-cat-mascot__sparkle academic-cat-mascot__sparkle--two">
          <path d="M332 104L335 95L338 104L347 107L338 110L335 119L332 110L323 107L332 104Z" fill="#8B6FD4" />
        </g>

        <g className="academic-cat-mascot__tail">
          <path d="M121 311C61 314 50 228 117 204C168 186 196 232 163 269C143 292 125 301 117 328" stroke="url(#cat-fur)" strokeLinecap="round" strokeWidth="34" />
          <path d="M113 315C80 299 78 257 113 233" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="12" />
        </g>

        <g className="academic-cat-mascot__torso" filter="url(#cat-soft-shadow)">
          <g className="academic-cat-mascot__bag">
            <path d="M139 180C139 160 155 145 175 145H245C267 145 283 160 283 180V291C283 302 274 311 263 311H159C148 311 139 302 139 291V180Z" fill="url(#cat-bag)" />
            <path d="M175 145C175 122 191 108 211 108C231 108 247 122 247 145" stroke="#1D4ED8" strokeLinecap="round" strokeWidth="14" />
            <path d="M168 215C168 206 175 198 184 198H238C247 198 254 206 254 215V268C254 277 247 285 238 285H184C175 285 168 277 168 268V215Z" fill="url(#cat-bag-pocket)" />
            <path d="M168 201C156 216 148 233 145 252" stroke="#0F3CAA" strokeLinecap="round" strokeOpacity="0.68" strokeWidth="10" />
            <path d="M252 201C264 216 272 233 275 252" stroke="#0F3CAA" strokeLinecap="round" strokeOpacity="0.68" strokeWidth="10" />
            <circle cx="211" cy="242" fill="#FDE68A" r="16" />
            <path d="M211 229L214 238H224L216 244L219 254L211 248L203 254L206 244L198 238H208L211 229Z" fill="#FFF7ED" />
          </g>

          <g className="academic-cat-mascot__legs">
            <g className="academic-cat-mascot__leg academic-cat-mascot__leg--left">
              <ellipse cx="175" cy="350" fill="url(#cat-cream)" rx="30" ry="48" />
              <ellipse cx="175" cy="384" fill="#FFFDF8" rx="37" ry="22" />
              <path d="M156 384H194" stroke="#EBCFB3" strokeLinecap="round" strokeWidth="3" />
            </g>
            <g className="academic-cat-mascot__leg academic-cat-mascot__leg--right">
              <ellipse cx="246" cy="350" fill="url(#cat-cream)" rx="30" ry="48" />
              <ellipse cx="246" cy="384" fill="#FFFDF8" rx="37" ry="22" />
              <path d="M227 384H265" stroke="#EBCFB3" strokeLinecap="round" strokeWidth="3" />
            </g>
          </g>

          <g className="academic-cat-mascot__body">
            <ellipse cx="210" cy="269" fill="url(#cat-fur)" rx="90" ry="104" />
            <ellipse cx="210" cy="288" fill="url(#cat-cream)" rx="58" ry="76" />
            <path d="M173 224C164 238 157 254 154 272" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="11" />
            <path d="M247 224C256 238 263 254 266 272" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="11" />
            <path d="M210 222V352" stroke="#FFFDF8" strokeLinecap="round" strokeOpacity="0.32" strokeWidth="5" />
          </g>
        </g>

        <g className="academic-cat-mascot__left-arm">
          <ellipse cx="143" cy="256" fill="url(#cat-cream)" rx="23" ry="58" transform="rotate(-15 143 256)" />
          <ellipse cx="126" cy="309" fill="#FFFDF8" rx="25" ry="18" />
        </g>

        <g className="academic-cat-mascot__right-arm">
          <ellipse cx="281" cy="258" fill="url(#cat-cream)" rx="23" ry="60" transform="rotate(16 281 258)" />
          <ellipse cx="295" cy="310" fill="#FFFDF8" rx="24" ry="18" />
          <circle cx="286" cy="309" fill="#F6C6CF" r="4" />
          <circle cx="297" cy="313" fill="#F6C6CF" r="4" />
          <circle cx="305" cy="306" fill="#F6C6CF" r="4" />
        </g>

        <g className="academic-cat-mascot__head" filter="url(#cat-soft-shadow)">
          <g className="academic-cat-mascot__ear academic-cat-mascot__ear--left">
            <path d="M131 120C121 84 137 61 168 52C177 82 176 112 164 138L131 120Z" fill="url(#cat-fur)" />
            <path d="M143 116C138 91 148 75 167 68C171 90 169 109 160 125L143 116Z" fill="#F9B3C6" />
          </g>
          <g className="academic-cat-mascot__ear academic-cat-mascot__ear--right">
            <path d="M289 120C299 84 283 61 252 52C243 82 244 112 256 138L289 120Z" fill="url(#cat-fur)" />
            <path d="M277 116C282 91 272 75 253 68C249 90 251 109 260 125L277 116Z" fill="#F9B3C6" />
          </g>

          <ellipse className="academic-cat-mascot__head-shell" cx="210" cy="159" fill="url(#cat-fur)" rx="104" ry="88" />
          <path d="M210 84C198 99 191 117 189 136" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="14" />
          <path d="M176 97C166 109 161 122 160 138" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="10" />
          <path d="M244 97C254 109 259 122 260 138" stroke="url(#cat-fur-dark)" strokeLinecap="round" strokeWidth="10" />

          <g className="academic-cat-mascot__cap" filter="url(#cat-cap-shadow)">
            <path d="M151 78L209 53L272 77L213 100L151 78Z" fill="url(#cat-cap)" />
            <path d="M173 84C173 63 189 47 210 47C231 47 247 63 247 84V96H173V84Z" fill="url(#cat-cap)" />
            <circle cx="211" cy="77" fill="#F2C94C" r="6" />
            <path className="academic-cat-mascot__tassel" d="M211 77C231 92 244 113 250 138" stroke="#F2C94C" strokeLinecap="round" strokeWidth="5" />
            <circle className="academic-cat-mascot__tassel-end" cx="252" cy="141" fill="#F2C94C" r="9" />
          </g>

          <g className="academic-cat-mascot__eyes">
            <g className="academic-cat-mascot__eye academic-cat-mascot__eye--left">
              <ellipse cx="171" cy="156" fill="#FFFDF8" rx="26" ry="24" />
              <g className="academic-cat-mascot__pupil academic-cat-mascot__pupil--left">
                <ellipse cx="171" cy="159" fill="#1F2937" rx="10" ry="14" />
                <circle cx="176" cy="154" fill="#FFF" r="4.5" />
                <circle cx="167" cy="163" fill="#FFF" opacity="0.9" r="2.5" />
              </g>
            </g>
            <g className="academic-cat-mascot__eye academic-cat-mascot__eye--right">
              <ellipse cx="249" cy="156" fill="#FFFDF8" rx="26" ry="24" />
              <g className="academic-cat-mascot__pupil academic-cat-mascot__pupil--right">
                <ellipse cx="249" cy="159" fill="#1F2937" rx="10" ry="14" />
                <circle cx="254" cy="154" fill="#FFF" r="4.5" />
                <circle cx="245" cy="163" fill="#FFF" opacity="0.9" r="2.5" />
              </g>
            </g>
          </g>

          <ellipse cx="165" cy="193" fill="url(#cat-cheek)" opacity="0.85" rx="24" ry="18" />
          <ellipse cx="255" cy="193" fill="url(#cat-cheek)" opacity="0.85" rx="24" ry="18" />
          <ellipse cx="210" cy="196" fill="url(#cat-cream)" rx="52" ry="36" />
          <ellipse cx="186" cy="198" fill="url(#cat-cream)" rx="26" ry="20" />
          <ellipse cx="234" cy="198" fill="url(#cat-cream)" rx="26" ry="20" />
          <path d="M210 183L200 193H220L210 183Z" fill="#F59DB4" />
          <path d="M209 194V206" stroke="#6B3F2B" strokeLinecap="round" strokeWidth="3" />
          <path d="M210 206C202 206 197 210 195 216" stroke="#6B3F2B" strokeLinecap="round" strokeWidth="3" />
          <path d="M210 206C218 206 223 210 225 216" stroke="#6B3F2B" strokeLinecap="round" strokeWidth="3" />
          <path className="academic-cat-mascot__tongue" d="M203 216C203 227 217 227 217 216C217 230 203 230 203 216Z" fill="#F48FB1" />

          <path d="M144 191H98" stroke="#6B7280" strokeLinecap="round" strokeWidth="3" />
          <path d="M146 202H96" stroke="#6B7280" strokeLinecap="round" strokeWidth="3" />
          <path d="M276 191H322" stroke="#6B7280" strokeLinecap="round" strokeWidth="3" />
          <path d="M274 202H324" stroke="#6B7280" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
