import { type Accessor } from "solid-js"
import type { WordmarkEvent, WordmarkState } from "./wordmark-machine"
import "./wordmark.css"

/** The lodger curled up as the brick breaker ball. Positions are the ball's centre, relative to the new session panel. */
export type LodgerBall = {
  radius: () => number
  at: () => { x: number; y: number }
  place: (
    x: number,
    y: number,
    pose: { look: number; lookAngle: number; stretch: number; angle: number; squint: number; curl: number },
  ) => void
  blink: () => void
  /** Uncurls and hops back to its perch beside the pin board. */
  done: () => void
}

/**
 * Renders the Sialki Horn Logo, clean "Sialki" wordmark, and "Beta" pill badge on the New Session screen.
 */
export function NewSessionWordmark(props: {
  ref: (element: HTMLDivElement) => void
  state: Accessor<WordmarkState>
  onEvent: (event: WordmarkEvent) => void
  play?: boolean
  sound?: () => boolean
}) {
  return (
    <div
      data-component="new-session-wordmark"
      aria-label="Sialki Beta"
      class="pointer-events-none mx-auto flex w-full max-w-[720px] items-center justify-center select-none"
    >
      <div
        ref={(el) => props.ref(el)}
        data-slot="wordmark-box"
        class="relative mx-auto flex items-center justify-center gap-3.5 py-1"
      >
        <svg
          viewBox="0 0 256 256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="size-12 shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
          aria-hidden="true"
        >
          <rect x="19" y="22" width="218" height="215" rx="48" fill="#1D1B19" />
          <path
            d="M47 204C46.5 166 75 141 118 129C164 116 205.5 91 203.7 43.1C214 78 199 127 144 148C103 164 94 196 110 216L54 216C49 216 47 212 47 204Z"
            fill="#B67A41"
          />
          <path
            d="M176.2 105.5C194.5 89.5 204.8 68 203.7 43.1C209.5 59 209.8 74 206.8 86.5C199.5 98.5 189 104 176.2 105.5Z"
            fill="#E4B660"
          />
        </svg>
        <div class="flex items-baseline gap-2.5">
          <span class="text-[38px] font-[650] leading-none tracking-[-0.035em] text-v2-text-text-base">
            Sialki
          </span>
          <span
            data-slot="sialki-beta-badge"
            class="inline-flex items-center rounded-[6px] border border-[#B67A41]/40 bg-[#B67A41]/14 px-2 py-0.5 text-[11px] font-[650] uppercase leading-4 tracking-[0.08em] text-[#D1A16B]"
          >
            Beta
          </span>
        </div>
      </div>
    </div>
  )
}
