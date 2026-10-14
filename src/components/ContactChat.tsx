"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, inquiries, profile } from "@/content";
import { LocalTime } from "./LocalTime";

type Message = { from: "me" | "you"; text: string };

function mailto(subject: string, body: string) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Chat-style contact box. Picking a quick reply or sending a message opens
 * the visitor's email app with it filled in, and "Jamaica" answers in the chat.
 */
export function ContactChat() {
  const [messages, setMessages] = useState<Message[]>([{ from: "me", text: contact.greeting }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep the newest message in view (scrolls the chat only, never the page).
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function send(text: string, reply: string, href: string) {
    // Open the email app straight from the click so browsers allow it.
    window.location.assign(href);
    setMessages((m) => [...m, { from: "you", text }]);
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "me", text: reply }]);
    }, 900);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    send(text, contact.typedReply, mailto(contact.typedSubject, `Hi Jamaica,\n\n${text}\n`));
    setDraft("");
  }

  return (
    <div className="flex h-[min(640px,85vh)] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] sm:rounded-[2rem]">
      {/* header */}
      <div className="flex items-center gap-3.5 border-b border-line px-5 py-4 sm:px-6">
        <div className="relative">
          {profile.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- local portrait from /public
            <img src={profile.photo} alt="" className="size-12 rounded-full object-cover" />
          ) : (
            <div className="grid size-12 place-items-center rounded-full bg-accent font-serif text-on-accent italic">jm</div>
          )}
          <span className="absolute right-0 bottom-0 size-3 rounded-full bg-[#2fbf71] ring-2 ring-surface" />
        </div>
        <div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-sm text-muted">
            <span className="text-[#2fbf71]">Online</span> · <LocalTime timeZone={profile.timeZone} hour12={false} /> in Cebu
          </div>
        </div>
      </div>

      {/* messages */}
      <div ref={list} className="flex-1 space-y-3 overflow-y-auto bg-bg-2/60 px-4 py-5 sm:px-6" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <p
              className={`greet max-w-[85%] rounded-3xl px-5 py-3.5 leading-relaxed ${
                m.from === "you" ? "rounded-br-lg bg-fg text-bg" : "rounded-bl-lg border border-line bg-surface"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start" aria-label={`${profile.firstName} is typing`}>
            <span className="flex gap-1 rounded-3xl rounded-bl-lg border border-line bg-surface px-5 py-4">
              {[0, 150, 300].map((d) => (
                <span key={d} className="size-2 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      {/* quick replies */}
      <div className="flex flex-wrap gap-2 border-t border-line bg-bg-2/60 px-4 py-4 sm:px-6">
        {inquiries.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => send(`${q.emoji} ${q.label}`, q.reply, mailto(q.subject, q.body))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-[15px] transition-colors hover:border-fg hover:bg-fg hover:text-bg"
          >
            <span aria-hidden="true">{q.emoji}</span>
            {q.label}
          </button>
        ))}
      </div>

      {/* composer */}
      <form onSubmit={onSubmit} className="flex items-center gap-3 border-t border-line px-4 py-4 sm:px-5">
        <label htmlFor="chat-message" className="sr-only">
          Message
        </label>
        <input
          id="chat-message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write me a message…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full bg-bg-2 px-5 py-3.5 text-[16px] outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-fg text-bg transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
