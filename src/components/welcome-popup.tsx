"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, FileDown } from "lucide-react";
import { LocalizedText } from "@/components/language-provider";

const downloadText = {
  en: "Download Admission Form",
  bn: "ভর্তি ফর্ম ডাউনলোড করুন",
};

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show the popup once per session
    if (!sessionStorage.getItem("welcome-popup-seen")) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("welcome-popup-seen", "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 38, 0.75)",
        backdropFilter: "blur(4px)",
        padding: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          maxWidth: "540px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            color: "#333",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div style={{ position: "relative", width: "100%", height: "70vh", maxHeight: "600px" }}>
          <Image
            src="/media/Popup.jpeg"
            alt="Welcome Notice"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 540px) 100vw, 540px"
            priority
          />
        </div>

        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fffdf9",
            borderTop: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <a
            href="/forms/kms-admission-form.pdf"
            download
            className="btn btn--accent"
            onClick={() => setIsOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <FileDown size={18} />
            <LocalizedText text={downloadText} />
          </a>
        </div>
      </div>
    </div>
  );
}
