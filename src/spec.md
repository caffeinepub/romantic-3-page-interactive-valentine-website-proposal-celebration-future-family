# Specification

## Summary
**Goal:** Make the Celebration page’s autoplay-blocked music prompt clearer and ensure the intended audio asset is used from static public assets.

**Planned changes:**
- Update the on-screen prompt shown when the browser blocks autoplay to be explicit and reassuring, instructing the user to tap a button to start the music (English-only text).
- Keep the prompt visible until music playback successfully starts or an audio load/play error is detected.
- Ensure the Celebration page references/uses the intended background music audio asset from `frontend/public/assets/generated` without changing the existing Play Music handler flow.

**User-visible outcome:** If autoplay is blocked, users see a clear message telling them to tap to start the Celebration music, and the music plays using the correct included audio file once started.
