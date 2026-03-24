"use client";

import { FormEvent, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { siteMeta } from "@/data/site-content";

export function ContactForm() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mailSubject = encodeURIComponent(subject || "School enquiry");
    const mailBody = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    );

    setNotice(
      language === "bn"
        ? "আপনার মেইল অ্যাপ খুলছে। সেখান থেকে বার্তাটি পাঠিয়ে দিন।"
        : "Your mail app is opening. Please send the message from there.",
    );

    window.location.href = `mailto:${siteMeta.schoolEmail}?subject=${mailSubject}&body=${mailBody}`;
  }

  return (
    <article className="contact-form-card stack">
      <p className="eyebrow">
        {language === "bn" ? "যোগাযোগ ফর্ম" : "Contact Form"}
      </p>
      <h3>{language === "bn" ? "একটি বার্তা পাঠান" : "Send a message"}</h3>
      <p className="helper-text">
        {language === "bn"
          ? "এই ফর্মটি আপনার ইমেল অ্যাপ খুলে দেবে, যাতে বিদ্যালয়ের ঠিকানায় সহজে বার্তা পাঠানো যায়।"
          : "This form opens your email app with the message addressed to the school office."}
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>{language === "bn" ? "নাম" : "Name"}</span>
          <input
            onChange={(event) => setName(event.target.value)}
            placeholder={language === "bn" ? "আপনার নাম" : "Your name"}
            required
            type="text"
            value={name}
          />
        </label>

        <label className="field">
          <span>{language === "bn" ? "ইমেল" : "Email"}</span>
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="field">
          <span>{language === "bn" ? "বিষয়" : "Subject"}</span>
          <input
            onChange={(event) => setSubject(event.target.value)}
            placeholder={language === "bn" ? "বিষয় লিখুন" : "Subject"}
            required
            type="text"
            value={subject}
          />
        </label>

        <label className="field">
          <span>{language === "bn" ? "বার্তা" : "Message"}</span>
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            placeholder={language === "bn" ? "আপনার বার্তা লিখুন" : "Write your message"}
            required
            value={message}
          />
        </label>

        <button className="btn btn--accent" type="submit">
          {language === "bn" ? "বার্তা প্রস্তুত করুন" : "Prepare Email"}
        </button>
      </form>

      {notice ? <p className="status-banner">{notice}</p> : null}
    </article>
  );
}
