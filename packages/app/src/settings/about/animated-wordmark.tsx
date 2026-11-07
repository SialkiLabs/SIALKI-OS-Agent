export function AnimatedWordmark(props: { active: boolean }) {
  return (
    <svg
      class="settings-about-wordmark"
      viewBox="0 0 260 56"
      fill="none"
      aria-hidden="true"
      data-active={props.active ? "true" : "false"}
    >
      <g transform="translate(2, 2) scale(0.203125)">
        <rect x="19" y="22" width="218" height="215" rx="48" fill="#1D1B19" />
        <path
          d="M47 204C46.5 166 75 141 118 129C164 116 205.5 91 203.7 43.1C214 78 199 127 144 148C103 164 94 196 110 216L54 216C49 216 47 212 47 204Z"
          fill="#B67A41"
        />
        <path
          d="M176.2 105.5C194.5 89.5 204.8 68 203.7 43.1C209.5 59 209.8 74 206.8 86.5C199.5 98.5 189 104 176.2 105.5Z"
          fill="#E4B660"
        />
      </g>
      <text
        x="64"
        y="38"
        fill="currentColor"
        font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        font-size="34"
        font-weight="650"
        letter-spacing="-0.03em"
      >
        Sialki
      </text>
      <g transform="translate(162, 16)">
        <rect
          x="0.5"
          y="0.5"
          width="49"
          height="22"
          rx="6"
          fill="rgba(182, 122, 65, 0.14)"
          stroke="#B67A41"
          stroke-opacity="0.45"
        />
        <text
          x="25"
          y="15"
          text-anchor="middle"
          fill="#D1A16B"
          font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="11"
          font-weight="650"
          letter-spacing="0.06em"
        >
          BETA
        </text>
      </g>
    </svg>
  )
}
