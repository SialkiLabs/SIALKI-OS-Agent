import { expect, test } from "bun:test"
import { ConfigProvider, Effect, Redacted } from "effect"
import { Env } from "../src/env"

test("session environment omits server credentials", () => {
  const previousSialkiPassword = process.env.SIALKI_PASSWORD
  const previousSialkiServerPassword = process.env.SIALKI_SERVER_PASSWORD
  const previousPassword = process.env.OPENCODE_PASSWORD
  const previousLegacyPassword = process.env.OPENCODE_SERVER_PASSWORD
  const previousValue = process.env.OPENCODE_SESSION_ENV_TEST
  process.env.SIALKI_PASSWORD = "sialki"
  process.env.SIALKI_SERVER_PASSWORD = "sialki-server"
  process.env.OPENCODE_PASSWORD = "password"
  process.env.OPENCODE_SERVER_PASSWORD = "legacy"
  process.env.OPENCODE_SESSION_ENV_TEST = "included"

  const environment = Env.session()

  if (previousSialkiPassword === undefined) delete process.env.SIALKI_PASSWORD
  else process.env.SIALKI_PASSWORD = previousSialkiPassword
  if (previousSialkiServerPassword === undefined) delete process.env.SIALKI_SERVER_PASSWORD
  else process.env.SIALKI_SERVER_PASSWORD = previousSialkiServerPassword
  if (previousPassword === undefined) delete process.env.OPENCODE_PASSWORD
  else process.env.OPENCODE_PASSWORD = previousPassword
  if (previousLegacyPassword === undefined) delete process.env.OPENCODE_SERVER_PASSWORD
  else process.env.OPENCODE_SERVER_PASSWORD = previousLegacyPassword
  if (previousValue === undefined) delete process.env.OPENCODE_SESSION_ENV_TEST
  else process.env.OPENCODE_SESSION_ENV_TEST = previousValue

  expect(environment.SIALKI_PASSWORD).toBeUndefined()
  expect(environment.SIALKI_SERVER_PASSWORD).toBeUndefined()
  expect(environment.OPENCODE_PASSWORD).toBeUndefined()
  expect(environment.OPENCODE_SERVER_PASSWORD).toBeUndefined()
  expect(environment.OPENCODE_SESSION_ENV_TEST).toBe("included")
})

const passwordCases: Array<{ env: Record<string, string>; expected: string | undefined }> = [
  {
    env: { SIALKI_PASSWORD: "primary", SIALKI_SERVER_PASSWORD: "secondary", OPENCODE_PASSWORD: "legacy" },
    expected: "primary",
  },
  { env: { SIALKI_SERVER_PASSWORD: "secondary", OPENCODE_PASSWORD: "legacy" }, expected: "secondary" },
  { env: { OPENCODE_PASSWORD: "legacy", OPENCODE_SERVER_PASSWORD: "older" }, expected: "legacy" },
  { env: { OPENCODE_SERVER_PASSWORD: "older" }, expected: "older" },
  { env: {}, expected: undefined },
]

test.each(passwordCases)("server password precedence", async ({ env, expected }) => {
  const value = await Effect.runPromise(
    Env.password.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromEnv({ env })))),
  )
  expect(value === undefined ? undefined : Redacted.value(value)).toBe(expected)
})
