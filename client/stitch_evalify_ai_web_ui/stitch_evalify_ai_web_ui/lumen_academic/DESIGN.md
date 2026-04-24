# Design System Specification: The Academic Edge

## 1. Overview & Creative North Star
**Creative North Star: "The Intelligent Canvas"**

This design system is built to bridge the gap between rigorous academic tradition and the fluid intelligence of modern AI. Moving away from the "template" look of standard SaaS, this system adopts a philosophy of **High-End Editorial Precision**. 

We achieve this by breaking the rigid grid through intentional asymmetry—such as wide, airy margins juxtaposed with dense, data-rich sidebars. We lean into "Negative Space as a Feature," where the absence of elements directs the faculty member’s focus toward critical evaluation tasks. By combining the organizational clarity of Notion with the sleek, high-performance aesthetic of Linear, we create an environment that feels both authoritative and effortless.

---

## 2. Colors: Tonal Architecture
The palette is not merely decorative; it is functional. We utilize a "Tonal Layering" approach to guide the eye without the clutter of traditional UI dividers.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. 
- Use `surface-container-low` (#f2f4f6) for the main workspace.
- Use `surface-container-lowest` (#ffffff) for active content modules.
- Transitioning between `background` (#f7f9fb) and `surface-container` tiers creates a natural "soft-edge" separation that feels premium and breathable.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
1.  **Level 0 (Base):** `background` (#f7f9fb) – The desk surface.
2.  **Level 1 (Sections):** `surface-container-low` (#f2f4f6) – Large navigational areas.
3.  **Level 2 (Active Cards):** `surface-container-lowest` (#ffffff) – The specific exam or student data being viewed.

### The "Glass & Gradient" Rule
To inject the "Cutting-Edge AI" vibe, use glassmorphism for floating elements (like command palettes or hover-state popovers).
- **Glass Effect:** Background color `surface-container-lowest` at 70% opacity with a `24px` backdrop-blur.
- **Signature Textures:** Main CTAs or AI-generated insights should use a subtle linear gradient: `primary` (#2036bd) to `primary_container` (#3e52d5). This provides a sense of depth and "digital soul."

---

## 3. Typography: Editorial Authority
We utilize two distinct typefaces to balance modern utility with academic structure.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision and slightly wider stance. It feels "engineered" yet approachable.
    *   *Usage:* Use `display-lg` to `headline-sm` for page titles and high-level dashboard metrics.
*   **Body & UI (Inter):** The workhorse. Inter provides maximum legibility for long-form feedback and exam grading.
    *   *Usage:* Use `body-md` for student responses and `label-md` for metadata.

**Hierarchy Note:** To achieve the "Editorial" look, maximize the contrast between weights. Use `display-md` (Semibold) for titles and `body-sm` (Medium) for secondary captions. Avoid "middle-ground" sizes; go big for impact or small for utility.

---

## 4. Elevation & Depth
In this system, depth is a tool for cognition, not just decoration.

*   **The Layering Principle:** Instead of shadows, stack `surface-container-low` on `surface`. The change in hex code provides enough contrast to signify a new layer without the visual "noise" of a drop shadow.
*   **Ambient Shadows:** For floating elements (Modals, Tooltips), use an "Atmospheric Shadow": 
    *   `box-shadow: 0 12px 40px rgba(25, 28, 30, 0.06);` (Using a tinted version of `on-surface`).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-density data tables), use `outline-variant` (#c5c5d7) at **15% opacity**. It should be felt, not seen.
*   **AI Glow:** For AI-active states, apply a soft, diffused outer glow using `secondary` (#712ae2) at 10% opacity.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** `primary` (#2036bd) fill with `on-primary` (#ffffff) text. Use the `lg` (1rem) corner radius. 
- **Secondary:** `secondary_fixed` (#eaddff) background with `on_secondary_fixed` (#25005a) text.
- **States:** On hover, primary buttons should shift to a subtle gradient rather than a simple color darken.

### Input Fields
- **Styling:** Minimalist. No border. Use `surface_container_highest` (#e0e3e5) as the background fill.
- **Focus State:** A 2px "Ghost Border" of `primary` at 40% opacity.
- **Error:** Background shifts to `error_container` (#ffdad6).

### Cards & Lists
- **Prohibition:** **No dividers.**
- **Separation:** Use `48px` of vertical white space to separate major sections. For list items, use a background color change on hover (`surface-container-high`) rather than a line.

### Additional Signature Component: "The Insights Rail"
A vertical, semi-transparent container using the **Glassmorphism** rule. This rail sits on the right side of the screen, housing AI-suggested scores and feedback. It should overlap the main content area slightly, using a `surface-container-lowest` background at 80% opacity to maintain the "layered glass" feel.

---

## 6. Do's and Don'ts

### Do
- **Do** prioritize white space. If a layout feels crowded, increase the padding, don't add a border.
- **Do** use `secondary` (#712ae2) sparingly to highlight AI-generated content.
- **Do** use `sm` (0.25rem) corner radius for small elements (chips) and `lg` (1rem) for containers (cards).

### Don't
- **Don't** use pure black (#000000). Always use `on-surface` (#191c1e) for text to maintain a high-end, softer feel.
- **Don't** use 100% opaque borders. They break the "Liquid UI" illusion.
- **Don't** use traditional icons for everything. Let the typography (Inter) do the talking; only use outline icons for primary navigation.