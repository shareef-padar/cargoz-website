'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Confetti } from './Confetti';

/* ─── Types ──────────────────────────────────────────────────── */
type From = 'bot' | 'user';
type Message = { id: string; from: From; text: string; chips?: string[] };
type Step = 'location' | 'type' | 'size' | 'duration' | 'name' | 'phone' | 'done';

/* ─── Helpers ────────────────────────────────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2);
}
function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

/* ─── Conversation script ────────────────────────────────────── */
type StepDef = {
  step: Step;
  en: string;
  ar: string;
  chips?: string[];
};

const SCRIPT: StepDef[] = [
  {
    step: 'location',
    en: 'Which city are you looking for storage in?',
    ar: 'في أي مدينة تبحث عن مساحة تخزين؟',
    chips: ['Riyadh • الرياض', 'Jeddah • جدة', 'Dammam • الدمام', 'Khobar • الخبر', 'Other • أخرى'],
  },
  {
    step: 'type',
    en: 'What type of storage are you looking for?',
    ar: 'ما نوع التخزين الذي تبحث عنه؟',
    chips: ['Blocks • بلوكات', 'Cages • أقفاص', 'Ambient • مستودع مفتوح'],
  },
  {
    step: 'size',
    en: 'How much space do you need?',
    ar: 'كم مساحة التخزين التي تحتاجها؟',
    chips: ['< 100 SQM', '100–500 SQM', '500–1,000 SQM', '1,000+ SQM'],
  },
  {
    step: 'duration',
    en: 'How long do you need the storage?',
    ar: 'كم المدة التي تحتاج فيها للتخزين؟',
    chips: ['1 month • شهر', '3 months • 3 أشهر', '6 months • 6 أشهر', '12+ months • سنة+'],
  },
  {
    step: 'name',
    en: 'Great! Almost done. What\'s your name?',
    ar: 'ممتاز! ما اسمك؟',
  },
  {
    step: 'phone',
    en: 'What\'s the best phone number to reach you on?',
    ar: 'ما رقم هاتفك للتواصل معك؟',
  },
];

const GREETING_EN = `Hi! 👋 I'm the Cargoz AI Assistant.\nI'll help you find the right warehouse in just a few steps.`;
const GREETING_AR = `مرحباً! 👋 أنا مساعد كارجوز الذكي.\nسأساعدك في إيجاد المستودع المناسب في خطوات بسيطة.`;

/* ─── Typing indicator ───────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="tw-flex tw-items-center tw-gap-1 tw-px-4 tw-py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-gray-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export function ChatBot() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIdx, setStepIdx] = useState(-1); // -1 = greeting not sent
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll on new message */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(false);
    }
  }, [open]);

  /* Send greeting when panel first opens */
  useEffect(() => {
    if (open && stepIdx === -1) {
      setTyping(true);
      setTimeout(() => {
        const greet: Message = {
          id: uid(),
          from: 'bot',
          text: `${GREETING_EN}\n\n${GREETING_AR}`,
        };
        setMessages([greet]);
        setTyping(false);
        // Ask first question after short delay
        setTimeout(() => {
          setTyping(true);
          setTimeout(() => {
            const firstStep = SCRIPT[0];
            setMessages((prev) => [
              ...prev,
              {
                id: uid(),
                from: 'bot',
                text: `${firstStep.en}\n${firstStep.ar}`,
                chips: firstStep.chips,
              },
            ]);
            setStepIdx(0);
            setTyping(false);
          }, 900);
        }, 600);
      }, 800);
    }
  }, [open, stepIdx]);

  function sendBotMessage(text: string, chips?: string[]) {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: uid(), from: 'bot', text, chips }]);
      setTyping(false);
      if (!open) setUnread(true);
    }, 900);
  }

  function handleAnswer(value: string) {
    if (!value.trim()) return;
    const arabicInput = isArabic(value);
    if (arabicInput) setArabic(true);

    const currentStep = SCRIPT[stepIdx];
    if (!currentStep) return;

    // Add user message
    setMessages((prev) => [...prev, { id: uid(), from: 'user', text: value }]);
    setInput('');

    const newAnswers = { ...answers, [currentStep.step]: value };
    setAnswers(newAnswers);

    const nextIdx = stepIdx + 1;

    if (nextIdx < SCRIPT.length) {
      const next = SCRIPT[nextIdx];
      const lang = arabicInput || arabic;
      const question = lang ? `${next.en}\n${next.ar}` : `${next.en}\n${next.ar}`;
      sendBotMessage(question, next.chips);
      setStepIdx(nextIdx);
    } else {
      // All answers collected — show confirmation
      const name = newAnswers['name'] || 'there';
      const phone = newAnswers['phone'] || value;
      const confirmEn = `Thank you, ${name}! ✅\n\nOur team will call you at ${phone} within 3 hours to discuss your storage needs in ${newAnswers['location'] || 'your city'}.`;
      const confirmAr = `شكراً لك، ${name}! ✅\n\nسيتواصل معك فريقنا على ${phone} خلال 3 ساعات لمناقشة احتياجاتك التخزينية.`;
      sendBotMessage(`${confirmEn}\n\n${confirmAr}`);
      setStepIdx(SCRIPT.length); // done
    }
  }

  const currentChips =
    stepIdx >= 0 && stepIdx < SCRIPT.length ? SCRIPT[stepIdx].chips : undefined;
  const isDone = stepIdx >= SCRIPT.length;
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [showGreetBubble, setShowGreetBubble] = useState(false);

  // Fire confetti when conversation completes
  useEffect(() => {
    if (isDone && !confettiTrigger) {
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  // Show proactive greeting bubble after 3s (only once, only if chat not opened)
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setShowGreetBubble(true);
    }, 5000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide bubble when chat opens
  useEffect(() => {
    if (open) setShowGreetBubble(false);
  }, [open]);

  return (
    <>
      <Confetti trigger={confettiTrigger} />
      {/* ── Chat panel ───────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="tw-fixed tw-bottom-[5.5rem] tw-right-4 md:tw-right-6 tw-z-[110] tw-w-[min(380px,calc(100vw-2rem))] tw-flex tw-flex-col tw-rounded-[1.75rem] tw-overflow-hidden tw-shadow-[0_24px_80px_-20px_rgba(0,0,0,0.3)] tw-border tw-border-white/60 tw-bg-white/80 tw-backdrop-blur-xl"
            style={{ maxHeight: 'min(560px, calc(100dvh - 9rem))' }}
          >
            {/* Header */}
            <div className="tw-flex tw-items-center tw-gap-3 tw-px-5 tw-py-4 tw-bg-gradient-to-r tw-from-teal-600 tw-via-blue-600 tw-to-purple-600 tw-shrink-0">
              <div className="tw-relative tw-w-9 tw-h-9 tw-rounded-full tw-bg-white/20 tw-flex tw-items-center tw-justify-center tw-shrink-0">
                <svg viewBox="0 0 24 24" className="tw-w-5 tw-h-5 tw-text-white" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="tw-absolute -tw-bottom-0.5 -tw-right-0.5 tw-w-3 tw-h-3 tw-rounded-full tw-bg-green-400 tw-border-2 tw-border-white" />
              </div>
              <div className="tw-flex-1 tw-min-w-0">
                <div className="tw-text-white tw-font-bold tw-text-sm tw-leading-tight">Cargoz AI Assistant</div>
                <div className="tw-text-white/70 tw-text-xs">مساعد كارجوز الذكي · Online</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tw-w-8 tw-h-8 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-white/80 hover:tw-text-white hover:tw-bg-white/15 tw-transition-colors"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" className="tw-w-4 tw-h-4" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="tw-flex-1 tw-overflow-y-auto tw-px-4 tw-py-4 tw-space-y-3 tw-min-h-0"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`tw-flex ${msg.from === 'user' ? 'tw-justify-end' : 'tw-justify-start'}`}
                  >
                    <div
                      className={[
                        'tw-max-w-[82%] tw-rounded-2xl tw-px-4 tw-py-2.5 tw-text-sm tw-leading-6 tw-whitespace-pre-wrap',
                        msg.from === 'bot'
                          ? 'tw-bg-gray-100 tw-text-gray-800 tw-rounded-tl-sm'
                          : 'tw-bg-gradient-to-br tw-from-purple-500 tw-to-purple-600 tw-text-white tw-rounded-tr-sm',
                      ].join(' ')}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="tw-flex tw-justify-start"
                  >
                    <div className="tw-bg-gray-100 tw-rounded-2xl tw-rounded-tl-sm">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick reply chips */}
            <AnimatePresence>
              {currentChips && !typing && !isDone && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="tw-px-4 tw-pb-2 tw-flex tw-flex-wrap tw-gap-2 tw-shrink-0"
                >
                  {currentChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleAnswer(chip)}
                      className="tw-rounded-full tw-border tw-border-purple-200 tw-bg-purple-50 tw-px-3 tw-py-1 tw-text-xs tw-font-semibold tw-text-purple-700 hover:tw-bg-purple-100 tw-transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            {!isDone && (
              <div className="tw-px-4 tw-pb-4 tw-pt-2 tw-shrink-0 tw-border-t tw-border-gray-100">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleAnswer(input); }}
                  className="tw-flex tw-items-center tw-gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your answer… / اكتب إجابتك"
                    className="tw-flex-1 tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-px-4 tw-py-2.5 tw-text-sm tw-text-gray-900 placeholder:tw-text-gray-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-300"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="tw-w-10 tw-h-10 tw-rounded-2xl tw-bg-purple-500 tw-flex tw-items-center tw-justify-center tw-shrink-0 hover:tw-bg-purple-600 tw-transition-colors disabled:tw-opacity-40"
                    aria-label="Send"
                  >
                    <svg viewBox="0 0 24 24" className="tw-w-4 tw-h-4 tw-text-white tw-rotate-90" fill="none">
                      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {isDone && (
              <div className="tw-px-4 tw-pb-4 tw-pt-2 tw-shrink-0 tw-border-t tw-border-gray-100 tw-text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setStepIdx(-1);
                    setAnswers({});
                    setArabic(false);
                  }}
                  className="tw-text-xs tw-text-gray-400 hover:tw-text-gray-600 tw-transition-colors"
                >
                  Start a new conversation · بدء محادثة جديدة
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Proactive greeting bubble ─────────────────────── */}
      <AnimatePresence>
        {showGreetBubble && !open && (
          <motion.div
            key="greet-bubble"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { setShowGreetBubble(false); setOpen(true); }}
            className="tw-fixed tw-bottom-[9rem] md:tw-bottom-24 tw-right-4 md:tw-right-6 tw-z-[110] tw-max-w-[260px] tw-text-left tw-cursor-pointer"
          >
            {/* Shake nudge after appearing */}
            <motion.div
              animate={{ x: [0, -4, 4, -3, 3, 0] }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="tw-relative tw-bg-white tw-rounded-2xl tw-rounded-br-sm tw-shadow-[0_12px_40px_-8px_rgba(124,58,237,0.22)] tw-border tw-border-purple-100 tw-px-4 tw-py-4">
                {/* Gradient accent bar */}
                <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-1 tw-rounded-t-2xl tw-bg-gradient-to-r tw-from-teal-500 tw-via-blue-500 tw-to-purple-600" />
                {/* Close */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowGreetBubble(false); }}
                  className="tw-absolute -tw-top-2 -tw-right-2 tw-w-5 tw-h-5 tw-rounded-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center tw-text-gray-500 hover:tw-bg-gray-300 tw-transition-colors"
                  aria-label="Dismiss"
                >
                  <svg viewBox="0 0 24 24" className="tw-w-3 tw-h-3" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
                <p className="tw-text-sm tw-font-bold tw-text-slate-900 tw-leading-snug tw-mt-1">
                  👋 Need a warehouse in KSA?
                </p>
                <p className="tw-text-xs tw-text-slate-500 tw-mt-1.5 tw-leading-relaxed">
                  Get matched to the right storage space in under 2 minutes — no calls, no hassle.
                </p>
                <div className="tw-mt-3 tw-flex tw-items-center tw-gap-1.5">
                  <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-400 tw-animate-pulse tw-flex-shrink-0" />
                  <span className="tw-text-xs tw-font-bold tw-text-purple-600">Chat now — we reply instantly →</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ───────────────────────────────── */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="tw-fixed tw-bottom-[5.5rem] md:tw-bottom-6 tw-right-4 md:tw-right-6 tw-z-[110] tw-w-14 tw-h-14 tw-rounded-full tw-bg-gradient-to-br tw-from-teal-500 tw-via-blue-500 tw-to-purple-600 tw-shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)] tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white"
        aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
      >
        {/* Pulse ring when bubble is showing */}
        {showGreetBubble && !open && (
          <span className="tw-absolute tw-inset-0 tw-rounded-full tw-animate-ping tw-bg-purple-500 tw-opacity-30" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="tw-w-6 tw-h-6 tw-text-white"
              fill="none"
            >
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="tw-w-6 tw-h-6 tw-text-white"
              fill="none"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="tw-absolute -tw-top-1 -tw-right-1 tw-w-4 tw-h-4 tw-rounded-full tw-bg-red-500 tw-border-2 tw-border-white"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
