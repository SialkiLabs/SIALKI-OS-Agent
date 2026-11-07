<p align="center">
  <a href="https://sialki.com">
    <img src="packages/app/public/sialki-logo.png" width="120" height="120" alt="Sialki logo">
  </a>
</p>
<h1 align="center">Sialki <sup style="font-size: 0.55em; padding: 2px 6px; border: 1px solid #B67A41; border-radius: 4px; color: #E4B660;">BETA</sup></h1>
<p align="center">Put strength into precision — The sovereign AI coding & systems engineering agent by <a href="https://sialki.com">Sialki Labs</a>.</p>

---

### Overview

**Sialki** (`Beta`) is the flagship desktop and terminal AI agent platform developed by **Sialki Labs**, featuring native multi-workspace orchestration, integrated terminal/worktree isolation, and MCP bridge extensibility.

### Built-in Agents

Sialki includes built-in agents you can switch between with the `Tab` key:

- **build** — Default, full-access agent for development and engineering work
- **plan** — Read-only agent for architecture analysis and code exploration
  - Denies file edits by default
  - Asks permission before running shell commands
  - Ideal for exploring codebases or planning changes
- **general** — Subagent for complex multi-step searches and research tasks (`@general`)

### Development & Desktop Preview

```bash
# Install dependencies
bun install

# Start web/app UI preview
bun run --cwd packages/app dev

# Start Electron desktop application
bun run --cwd packages/desktop dev
```

### License

Released under the [MIT License](./LICENSE).
Copyright (c) 2026 SialkiLabs (`https://sialki.com`). Portions Copyright (c) 2025 opencode.
