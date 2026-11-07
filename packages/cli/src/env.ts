import { Config } from "effect"

// Every environment variable the CLI reads, in one place. Consumers yield
// these instead of touching process.env so the full surface stays visible,
// typed, and redacted where secret.

// The Sialki server password: sent by clients connecting to an explicit
// --server, and adopted by a manually run or standalone server. Legacy
// OpenCode names are retained for compatibility.
export const password = Config.Redacted("SIALKI_PASSWORD").pipe(
  Config.orElse(() => Config.Redacted("SIALKI_SERVER_PASSWORD")),
  Config.orElse(() => Config.Redacted("OPENCODE_PASSWORD")),
  Config.orElse(() => Config.Redacted("OPENCODE_SERVER_PASSWORD")),
  Config.withDefault(undefined),
)

export function session() {
  return Object.fromEntries(
    Object.entries(process.env).filter(
      (entry): entry is [string, string] =>
        entry[1] !== undefined &&
        entry[0] !== "SIALKI_PASSWORD" &&
        entry[0] !== "SIALKI_SERVER_PASSWORD" &&
        entry[0] !== "OPENCODE_PASSWORD" &&
        entry[0] !== "OPENCODE_SERVER_PASSWORD",
    ),
  )
}

export * as Env from "./env"
