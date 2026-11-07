# PROJECT-STATE: Sialki (Autonomous Desktop AI Coding Workstation)

> **Canonical Repository**: [https://github.com/SialkiLabs/sialki](https://github.com/SialkiLabs/sialki)  
> **Workstation Path**: `C:\Users\Getko\DEVIN-VAULT\TEMPORARY-WORKSPACE\ACTIVE-PROJECTS\SOFTWARE-DEVELOPMENT\SIALKI-OS-Agent`  
> **Installed Location**: `C:\Users\Getko\AppData\Local\Programs\Sialki Beta\Sialki Beta.exe`  
> **System CLI Binary**: `C:\Users\Getko\.sialki\bin\sialki.exe` (`sialki v1.0.1`)  
> **Owner & Architect**: George AK Neihsial (Product Architect & System Engineer)  
> **Organization**: Sialki Labs Private Limited (Lamka, Churachandpur District, Manipur - 795128)  
> **Current Version**: `1.0.1` (Beta Channel)  
> **Last Updated**: November 7, 2026

---

## 1. Executive Summary & Vision

Sialki is an autonomous, native-performance (<16ms frame budget), local-first desktop AI coding assistant and developer workstation. While originally initialized from the open-source OpenCode foundation, the project is undergoing a full architectural decoupling and redesign to establish it as a 100% sovereign Sialki Labs proprietary product.

---

## 2. Current Implementation Status

### A. Surface & Presentation Layer (✅ Complete)
- **Branding**: Native window title, splash screen, and taskbar icons show **Sialki Beta**.
- **Logos & Vector Assets**: Bull Horn emblem embedded across all resolutions in `packages/ui`, `packages/app`, and `packages/desktop` (`favicon.svg`, `icon.ico`, `dock.png`, app manifests).
- **Settings > About Attribution**: 
  - Version `1.0.1`
  - Attribution: *"Written by Product architect and system engineer **George AK Neihsial** in favour of the Sole Open Source Community contribution."*
  - Address: *"Honing from Lamka, Churachandpur, Manipur, North East India. Office Address: Mual Veng, Hiangtam Lamka, Churachandpur District, Manipur - 795128"*
  - Third-party open-source license modal intact for legal MIT compliance.
- **Auto-Updater**: Disabled in `packages/gui-plugins/src/updater/platform.ts` to prevent any unauthorized background pings or binary overwrites from upstream repositories.

### B. Network & Endpoint Severance (✅ Complete — Commit `e00c09d`)
- **Outbound URLs Purged**: Rerouted all documentation, theme links, and feedback endpoints from `opencode.ai` to `https://sialki.com/docs`, `https://sialki.com/feedback`, and `https://github.com/SialkiLabs/sialki/issues/new`.
- **OAuth Metadata**: Changed client metadata endpoint in `packages/core/src/mcp/oauth.ts` to `https://sialki.com/oauth/sialki/client.json`.
- **Console Server**: `defaultServer` in `packages/core/src/console-access.ts` updated to `https://sialki.com/console`.
- **Provider Catalog Sanitized**:
  - Filtered `opencode` and `opencode-go` completely out of the Provider Picker dialog and settings list.
  - Featured direct, sovereign providers: **Anthropic (Claude)**, **OpenAI (GPT)**, **Google (Gemini)**, **GitHub Copilot**, **OpenRouter**, **DeepSeek**, **Ollama**, and **NVIDIA NIM**.
- **Repository Cleaned**: Purged 21 legacy foreign-language README files (`README.zh.md`, `README.ru.md`, etc.).

### C. Extensibility & Tool Bridges (✅ Verified 100% Operational)
- **Model Context Protocol (MCP)**: Native `@modelcontextprotocol/sdk` client connects directly via local stdio process pipes. Independent of all external cloud servers.
- **Creative DCC Bridges**: REAPER (Lua bridge), Adobe After Effects (CEP panel), and DaVinci Resolve (Python API) run via local inter-process communication without internet reliance.
- **Direct Model APIs**: Anthropic, OpenAI, NVIDIA NIM, DeepSeek, and Ollama communicate directly with vendor endpoints using user-provided API keys.

---

## 3. Key Paths & File Map

| Path | Purpose |
| :--- | :--- |
| `packages/app/src/settings/about/about.tsx` | About dialog, author attribution, and company address |
| `packages/app/src/providers/connect/dialog.tsx` | Provider picker and Popular providers list |
| `packages/app/src/providers/catalog/order.ts` | Ranking and order of featured AI model providers |
| `packages/app/src/shell/commands/desktop-menu.ts` | Desktop application menus and documentation links |
| `packages/core/src/plugin/provider/` | 35 modular AI provider plugins (direct HTTPS connections) |
| `packages/core/src/mcp/client.ts` | Local Model Context Protocol engine |
| `packages/desktop/electron-builder.config.ts` | Windows packaging, icons, product name (`Sialki Beta`) |
| `install-sialki.ps1` | Portable automated Windows installer & shortcut creator |
| `Start-Sialki-Web.ps1` | Browser-based standalone runner (ports 4096 / 3000) |

---

## 4. Build & Deployment Commands

```powershell
# Environment setup (Bun binary from local vault environment)
$env:PATH = "C:\Users\Getko\.gemini\antigravity\brain\971b7441-5368-445d-9e17-214f16666fd0\scratch\bun\node_modules\bun\bin;" + $env:PATH
$env:OPENCODE_VERSION = "1.0.1"
$env:OPENCODE_CHANNEL = "beta"

# 1. Build Web/SolidJS App
Set-Location "packages/app"
bun run build

# 2. Build CLI Binary (sialki v1.0.1)
Set-Location "../cli"
bun run script/build.ts --single --skip-install --skip-web-ui

# 3. Build Desktop Main/Renderer
Set-Location "../desktop"
bun run script/build.ts

# 4. Package Windows App
bun run script/pack.ts

# 5. Deploy to Local Program Files & Shortcuts
Set-Location "../.."
.\install-sialki.ps1
```

---

## 5. Next Steps Roadmap for Subsequent Agent

1. **Part 2 — Configuration & State Directory Migration**:
   - Change daemon configuration and local storage folder from `~/.opencode/` to `~/.sialki/`.
   - Update environment variable prefix from `OPENCODE_*` to `SIALKI_*` across runtime configs.
2. **Part 3 — Single-File NSIS Installer (`Sialki-Setup-1.0.1.exe`)**:
   - Configure electron-builder NSIS target (`oneClick: true`, `perMachine: false`).
   - Run production installer build and configure Authenticode signing pipeline.
3. **Part 4 — Proprietary UI & Design System Overhaul**:
   - Implement custom SEKI SOUND color palette and bespoke typography across the SolidJS shell.
   - Refactor navigation layout to create a unique Sialki desktop interface completely distinct from any upstream template.
