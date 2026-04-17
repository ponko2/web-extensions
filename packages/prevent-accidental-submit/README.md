# Prevent Accidental Submit

Prevent accidental form submissions by disabling Enter-to-submit behavior and using Ctrl/Cmd + Enter for submission.

## How it works

This extension intercepts `keydown` events in supported input areas and adjusts the default Enter behavior to prevent accidental submissions while typing.

### Behavior changes

- Pressing plain `Enter` no longer triggers submission
- `Ctrl/Cmd + Enter` is used to submit content
- IME input is ignored to avoid interfering with text composition

### Supported services

This extension works with:

- ChatGPT
- Claude
- Gemini
- GitHub

Submissions are triggered by Ctrl/Cmd + Enter.
