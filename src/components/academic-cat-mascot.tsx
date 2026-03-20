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

    const followStrength = 0.115 - idleRef.current * 0.035;
    lookRef.current.x += (pointerRef.current.x - lookRef.current.x) * followStrength;
    lookRef.current.y += (pointerRef.current.y - lookRef.current.y) * followStrength;

    const bodyBob = Math.sin(time * 2.35) * (2.2 - idleRef.current * 0.8);
    const headNod = Math.sin(time * 1.8 + 0.5) * 1.75;
    const tailSwing = Math.sin(time * (2.7 + idleRef.current * 1.9)) * (15 + idleRef.current * 14);
    const pawPhase = idleRef.current > 0.04 ? (Math.sin(time * 8.2) * 0.5 + 0.5) : 0;
    const lickPhase = idleRef.current > 0.04 ? (Math.sin(time * 8.2 + 0.9) * 0.5 + 0.5) : 0;
    const blinkGate = Math.max(0, Math.sin(time * 0.82 + Math.sin(time * 0.19) * 0.7) - 0.94);
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
        viewBox="0 0 430 470"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="catCartoonFur" x1="140" x2="290" y1="90" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC765" />
            <stop offset="0.55" stopColor="#F59E34" />
            <stop offset="1" stopColor="#D87C22" />
          </linearGradient>
          <linearGradient id="catCartoonFurDark" x1="158" x2="276" y1="90" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A95C20" stopOpacity="0.84" />
            <stop offset="1" stopColor="#844514" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="catCartoonCream" x1="168" x2="255" y1="176" y2="348" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF9F2" />
            <stop offset="1" stopColor="#F6E4D2" />
          </linearGradient>
          <linearGradient id="catCartoonBag" x1="118" x2="292" y1="160" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7BC7FF" />
            <stop offset="1" stopColor="#2D74F0" />
          </linearGradient>
          <linearGradient id="catCartoonPocket" x1="176" x2="246" y1="226" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A8D9FF" />
            <stop offset="1" stopColor="#5A95FB" />
          </linearGradient>
          <linearGradient id="catCartoonCap" x1="150" x2="282" y1="44" y2="112" gradientUnits="userSpaceOnUse">
            <stop stopColor="#45464E" />
            <stop offset="1" stopColor="#16171B" />
          </linearGradient>
          <radialGradient id="catCartoonShadow" cx="0" cy="0" r="1" gradientTransform="translate(214 420) rotate(90) scale(28 126)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1F2937" stopOpacity="0.24" />
            <stop offset="1" stopColor="#1F2937" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="catCartoonBlush" cx="0" cy="0" r="1" gradientTransform="translate(0.5 0.5) scale(0.5)" gradientUnits="objectBoundingBox">
            <stop stopColor="#FFB7AF" />
            <stop offset="1" stopColor="#FFB7AF" stopOpacity="0" />
          </radialGradient>
          <filter id="catCartoonSoftShadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="480" width="430" x="0" y="-4">
            <feDropShadow dx="0" dy="18" floodColor="#1F2937" floodOpacity="0.16" stdDeviation="16" />
          </filter>
          <filter id="catCartoonCapShadow" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="118" width="192" x="120" y="18">
            <feDropShadow dx="0" dy="8" floodColor="#111827" floodOpacity="0.22" stdDeviation="7" />
          </filter>
        </defs>

        <ellipse className="academic-cat-mascot__shadow" cx="214" cy="420" fill="url(#catCartoonShadow)" rx="126" ry="28" />

        <g className="academic-cat-mascot__sparkle academic-cat-mascot__sparkle--one">
          <path d="M84 132L89 118L94 132L108 137L94 142L89 156L84 142L70 137L84 132Z" fill="#F7C948" />
        </g>
        <g className="academic-cat-mascot__sparkle academic-cat-mascot__sparkle--two">
          <path d="M338 122L342 110L346 122L358 126L346 130L342 142L338 130L326 126L338 122Z" fill="#7C8DF1" />
        </g>

        <g className="academic-cat-mascot__tail">
          <path d="M123 316C73 307 57 252 87 218C111 190 162 193 174 228C183 257 163 280 138 292C123 300 114 313 116 334" stroke="url(#catCartoonFur)" strokeLinecap="round" strokeWidth="34" />
          <path d="M110 311C95 294 95 254 119 237" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="11" />
          <path d="M126 326C116 311 121 293 134 285" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="9" />
        </g>

        <g className="academic-cat-mascot__torso" filter="url(#catCartoonSoftShadow)">
          <g className="academic-cat-mascot__bag">
            <path d="M139 184C139 163 156 146 177 146H247C270 146 287 163 287 184V294C287 307 276 318 263 318H163C150 318 139 307 139 294V184Z" fill="url(#catCartoonBag)" />
            <path d="M180 146C180 121 194 106 214 106C234 106 248 121 248 146" stroke="#2058CB" strokeLinecap="round" strokeWidth="14" />
            <path d="M170 223C170 213 178 205 188 205H240C250 205 258 213 258 223V274C258 284 250 292 240 292H188C178 292 170 284 170 274V223Z" fill="url(#catCartoonPocket)" />
            <path d="M172 210C158 227 151 241 148 258" stroke="#1246A7" strokeLinecap="round" strokeOpacity="0.65" strokeWidth="10" />
            <path d="M256 210C270 227 277 241 280 258" stroke="#1246A7" strokeLinecap="round" strokeOpacity="0.65" strokeWidth="10" />
            <circle cx="214" cy="248" fill="#FDE68A" r="16" />
            <path d="M214 235L217 243H226L219 248L222 257L214 252L206 257L209 248L202 243H211L214 235Z" fill="#FFF8E8" />
          </g>

          <g className="academic-cat-mascot__legs">
            <g className="academic-cat-mascot__leg academic-cat-mascot__leg--left">
              <ellipse cx="182" cy="350" fill="url(#catCartoonCream)" rx="34" ry="53" />
              <ellipse cx="182" cy="389" fill="#FFFDF8" rx="40" ry="22" />
              <circle cx="167" cy="388" fill="#F5C4D2" r="4" />
              <circle cx="182" cy="392" fill="#F5C4D2" r="4" />
              <circle cx="196" cy="388" fill="#F5C4D2" r="4" />
            </g>
            <g className="academic-cat-mascot__leg academic-cat-mascot__leg--right">
              <ellipse cx="247" cy="350" fill="url(#catCartoonCream)" rx="34" ry="53" />
              <ellipse cx="247" cy="389" fill="#FFFDF8" rx="40" ry="22" />
              <circle cx="232" cy="388" fill="#F5C4D2" r="4" />
              <circle cx="247" cy="392" fill="#F5C4D2" r="4" />
              <circle cx="261" cy="388" fill="#F5C4D2" r="4" />
            </g>
          </g>

          <g className="academic-cat-mascot__body">
            <ellipse cx="214" cy="272" fill="url(#catCartoonFur)" rx="92" ry="98" />
            <ellipse cx="214" cy="286" fill="url(#catCartoonCream)" rx="60" ry="74" />
            <path d="M183 218C174 235 169 249 167 265" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="11" />
            <path d="M245 218C254 235 259 249 261 265" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="11" />
            <path d="M214 224V347" stroke="#FFFDF8" strokeLinecap="round" strokeOpacity="0.28" strokeWidth="5" />
          </g>
        </g>

        <g className="academic-cat-mascot__left-arm">
          <ellipse cx="144" cy="264" fill="url(#catCartoonCream)" rx="24" ry="58" transform="rotate(-16 144 264)" />
          <ellipse cx="126" cy="316" fill="#FFFDF8" rx="27" ry="19" />
        </g>

        <g className="academic-cat-mascot__right-arm">
          <ellipse cx="284" cy="267" fill="url(#catCartoonCream)" rx="24" ry="62" transform="rotate(18 284 267)" />
          <ellipse cx="302" cy="319" fill="#FFFDF8" rx="28" ry="20" />
          <circle cx="290" cy="319" fill="#F6C6CF" r="4.4" />
          <circle cx="302" cy="323" fill="#F6C6CF" r="4.4" />
          <circle cx="312" cy="317" fill="#F6C6CF" r="4.4" />
        </g>

        <g className="academic-cat-mascot__head" filter="url(#catCartoonSoftShadow)">
          <g className="academic-cat-mascot__ear academic-cat-mascot__ear--left">
            <path d="M136 128C128 87 145 62 180 56C189 89 188 118 176 144L136 128Z" fill="url(#catCartoonFur)" />
            <path d="M149 123C145 96 155 79 176 72C180 94 178 112 169 129L149 123Z" fill="#F7B2C7" />
          </g>
          <g className="academic-cat-mascot__ear academic-cat-mascot__ear--right">
            <path d="M292 128C300 87 283 62 248 56C239 89 240 118 252 144L292 128Z" fill="url(#catCartoonFur)" />
            <path d="M279 123C283 96 273 79 252 72C248 94 250 112 259 129L279 123Z" fill="#F7B2C7" />
          </g>

          <ellipse className="academic-cat-mascot__head-shell" cx="214" cy="162" fill="url(#catCartoonFur)" rx="106" ry="92" />
          <path d="M214 86C203 101 196 118 194 136" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="13" />
          <path d="M179 101C169 113 164 126 163 142" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="9" />
          <path d="M249 101C259 113 264 126 265 142" stroke="url(#catCartoonFurDark)" strokeLinecap="round" strokeWidth="9" />

          <g className="academic-cat-mascot__cap" filter="url(#catCartoonCapShadow)">
            <path d="M149 76L214 46L282 76L217 103L149 76Z" fill="url(#catCartoonCap)" />
            <path d="M176 83C176 62 192 45 214 45C236 45 252 62 252 83V97H176V83Z" fill="url(#catCartoonCap)" />
            <circle cx="214" cy="77" fill="#F2C94C" r="6" />
            <path className="academic-cat-mascot__tassel" d="M214 77C238 92 253 114 258 142" stroke="#F2C94C" strokeLinecap="round" strokeWidth="5" />
            <circle className="academic-cat-mascot__tassel-end" cx="260" cy="145" fill="#F2C94C" r="9" />
          </g>

          <g className="academic-cat-mascot__eyes">
            <g className="academic-cat-mascot__eye academic-cat-mascot__eye--left">
              <ellipse cx="173" cy="160" fill="#FFFDF9" rx="31" ry="34" />
              <ellipse cx="173" cy="167" fill="#F1F5F9" opacity="0.7" rx="26" ry="20" />
              <g className="academic-cat-mascot__pupil academic-cat-mascot__pupil--left">
                <ellipse cx="173" cy="164" fill="#1F2937" rx="13" ry="18" />
                <circle cx="179" cy="157" fill="#FFF" r="5" />
                <circle cx="168" cy="169" fill="#FFF" opacity="0.95" r="2.6" />
              </g>
            </g>
            <g className="academic-cat-mascot__eye academic-cat-mascot__eye--right">
              <ellipse cx="255" cy="160" fill="#FFFDF9" rx="31" ry="34" />
              <ellipse cx="255" cy="167" fill="#F1F5F9" opacity="0.7" rx="26" ry="20" />
              <g className="academic-cat-mascot__pupil academic-cat-mascot__pupil--right">
                <ellipse cx="255" cy="164" fill="#1F2937" rx="13" ry="18" />
                <circle cx="261" cy="157" fill="#FFF" r="5" />
                <circle cx="250" cy="169" fill="#FFF" opacity="0.95" r="2.6" />
              </g>
            </g>
          </g>

          <path d="M148 132C155 127 163 126 171 129" stroke="#7E4415" strokeLinecap="round" strokeWidth="5" />
          <path d="M280 132C273 127 265 126 257 129" stroke="#7E4415" strokeLinecap="round" strokeWidth="5" />
          <ellipse cx="168" cy="203" fill="url(#catCartoonBlush)" opacity="0.9" rx="27" ry="20" />
          <ellipse cx="260" cy="203" fill="url(#catCartoonBlush)" opacity="0.9" rx="27" ry="20" />
          <ellipse cx="214" cy="202" fill="url(#catCartoonCream)" rx="57" ry="39" />
          <ellipse cx="189" cy="204" fill="url(#catCartoonCream)" rx="28" ry="21" />
          <ellipse cx="239" cy="204" fill="url(#catCartoonCream)" rx="28" ry="21" />
          <path d="M214 187L203 198H225L214 187Z" fill="#F59DB4" />
          <path d="M213 199V212" stroke="#6A3B21" strokeLinecap="round" strokeWidth="3.5" />
          <path d="M214 212C205 213 199 218 197 225" stroke="#6A3B21" strokeLinecap="round" strokeWidth="3.5" />
          <path d="M214 212C223 213 229 218 231 225" stroke="#6A3B21" strokeLinecap="round" strokeWidth="3.5" />
          <path className="academic-cat-mascot__tongue" d="M207 225C207 238 221 238 221 225C221 241 207 241 207 225Z" fill="#F48FB1" />

          <path d="M145 196H92" stroke="#7A7285" strokeLinecap="round" strokeWidth="3" />
          <path d="M148 208H88" stroke="#7A7285" strokeLinecap="round" strokeWidth="3" />
          <path d="M283 196H336" stroke="#7A7285" strokeLinecap="round" strokeWidth="3" />
          <path d="M280 208H340" stroke="#7A7285" strokeLinecap="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
