import { type ComponentProps } from "solid-js"

export function Wordmark(
  props: Pick<ComponentProps<"svg">, "class"> & { fade?: boolean; muted?: boolean; outline?: boolean },
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 120"
      fill="none"
      classList={{
        [props.class ?? ""]: !!props.class,
        "overflow-visible": props.outline,
      }}
    >
      <g opacity={props.muted === false ? 1 : 0.92}>
        <g transform="translate(56, 12) scale(0.375)">
          <rect x="19" y="22" width="218" height="215" rx="48" fill="#1D1B19" />
          <path
            pathLength={props.outline ? 1 : undefined}
            d="M47 204C46.5 166 75 141 118 129C164 116 205.5 91 203.7 43.1C214 78 199 127 144 148C103 164 94 196 110 216L54 216C49 216 47 212 47 204Z"
            fill="#B67A41"
          />
          <path
            pathLength={props.outline ? 1 : undefined}
            d="M176.2 105.5C194.5 89.5 204.8 68 203.7 43.1C209.5 59 209.8 74 206.8 86.5C199.5 98.5 189 104 176.2 105.5Z"
            fill="#E4B660"
          />
        </g>
        <text
          x="168"
          y="78"
          fill="currentColor"
          font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="64"
          font-weight="650"
          letter-spacing="-0.035em"
        >
          Sialki
        </text>
        <g transform="translate(346, 42)">
          <rect
            x="0.5"
            y="0.5"
            width="68"
            height="28"
            rx="8"
            fill="rgba(182, 122, 65, 0.14)"
            stroke="#B67A41"
            stroke-opacity="0.45"
          />
          <text
            x="34"
            y="19"
            text-anchor="middle"
            fill="#D1A16B"
            font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="13"
            font-weight="650"
            letter-spacing="0.08em"
          >
            BETA
          </text>
        </g>
      </g>
    </svg>
  )
}
