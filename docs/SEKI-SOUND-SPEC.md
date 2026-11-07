# SEKI SOUND Design Specification & Aesthetic Architecture
**Canonical Design System for Sialki Labs Desktop & Web Applications**

> **Authoritative Source**: `sialki-enterprise-architecture`  
> **Target Products**: Sialki Beta, Sialki Labs Flagship Interfaces, SEKI SOUND Studio Systems

---

## 1. Mathematical Color & Contrast System

The SEKI SOUND aesthetic is built on an **Obsidian & Brushed Brass** luxury-hardware theme, engineered for deep focus, native OLED black levels, and strict WCAG AAA contrast compliance.

| Role | Name | Hex Code | Contrast Ratio / Description |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | **Obsidian Core** | `#08090C` | Ultra-deep slate/black base; 0% glare |
| **Primary Accent** | **Brushed Brass** | `#DAA158` | Warm metallic gold/brass; buttons, active pills, wordmark accents |
| **Primary Typography** | **Champagne White**| `#E6E4DF` | **15.6:1 AAA contrast** on Obsidian Core; high legibility |
| **High-Contrast Text** | **Platinum White** | `#FFFFFF` | Critical headers, tooltips, emphasis |
| **Secondary Accent** | **Raw Copper** | `#A56622` | Muted metallic border, secondary states, warnings |
| **Surface Elevation 1**| **Obsidian Surface**| `#101218` | Sidebar panels, card containers, dialog backgrounds |
| **Surface Elevation 2**| **Obsidian Overlay**| `#181B24` | Input fields, active list rows, dropdown menus |
| **Subtle Borders** | **Muted Brass Border**| `rgba(218, 161, 88, 0.15)` | Hairline borders (`1px solid`) with subtle metallic tint |

---

## 2. Vector & Typography Purity

1. **Brand Marks & Vector Hygiene**:
   - All brand marks (including the Sialki Bull Horn emblem and wordmarks) must be **100% self-contained pure mathematical SVG bezier paths** with zero external font dependencies.
   - Vector paths must use cubic bezier coordinates with zero raster dependencies.

2. **Typography Hierarchy**:
   - **Primary UI Typeface**: `Sora` or `Source Sans 3` (clean geometric sans-serif with open apertures).
   - **Code & Terminal Typeface**: System Monospace (`JetBrains Mono`, `IBM Plex Mono`, `Cascadia Code`).
   - Self-hosted with `font-display: swap` and zero cumulative layout shift (CLS: `0`).

---

## 3. UI Component Directives for Sialki Desktop

- **Frame Budget**: Native 60–120 FPS (<16ms frame budget). No heavy blur filters on animated layers.
- **Corners**: Precision hardware radiuses (`6px` for controls, `10px` for dialogs/cards).
- **Easing**: Custom cubic bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`) for all drawer, modal, and tray transitions.
