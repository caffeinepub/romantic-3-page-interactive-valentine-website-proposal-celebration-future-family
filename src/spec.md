# Specification

## Summary
**Goal:** Create a romantic, responsive 3-page interactive Valentine website with playful proposal interactions, a celebration slideshow with music, and a final “future family” hero scene.

**Planned changes:**
- Implement a 3-page client-side navigation flow: Page 1 (default) → Page 2 (on any “Yes”) → Page 3 (on “Continue”).
- Build Page 1 UI with a tulips/roses patterned background, a top header image, the text “Will you be my Valentine?”, and “Yes” + “No” buttons (large red stationary “Yes”).
- Add Page 1 “No” behavior: jump to random nearby positions on hover/tap (stay within viewport and not covering “Yes”); on successful “No” clicks cycle text “Think again” → “Last chance” → convert “No” into a second “Yes”.
- Build Page 2 with immediate background audio playback using `AUD-20251006-WA0007.mp3` (and a clear user action fallback if autoplay is blocked).
- On Page 2, animate a center-screen popup slideshow cycling through the specified 30 uploaded images sequentially; after completion, transition them into a top-to-bottom grid background with a glassmorphism text overlay and a “Continue” button.
- Build Page 3 with a single hero image matching the provided “future family” scene description, and show the caption text exactly: “Our sweet little palak lokesh vishwakrma dubey family🧿❤️🤞🏻🤗🥹”.
- Apply a cohesive romantic theme (warm palette, consistent typography/buttons/overlays) across all pages.
- Place required generated static assets in `frontend/public/assets/generated` and reference them directly from the frontend (no backend image/audio routing).

**User-visible outcome:** Users land on an interactive proposal page with playful “No” behavior; choosing “Yes” triggers a music-backed celebration slideshow that becomes a photo-grid message screen with “Continue”; then they reach a final page with a future-family hero image and the provided caption.
