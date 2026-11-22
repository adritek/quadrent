# Domain Docs

How the engineering skills should consume this repo's domain documentation.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root, if it exists.
- **`docs/adr/`**: read ADRs that touch the area being worked on.

If these files do not exist, proceed silently. `/domain-modeling` creates them lazily when terms or decisions are resolved.

## File structure

Single-context repository:

```
/
├── GLOSSARY.md
├── docs/adr/
├── frontend/src/
└── backend/src/
```

## Use the glossary's vocabulary

Use terms exactly as defined in `GLOSSARY.md`. If a needed concept is absent, note it for `/domain-modeling` rather than silently inventing terminology.

## Flag ADR conflicts

If proposed work contradicts an existing ADR, surface it explicitly rather than silently overriding it.
