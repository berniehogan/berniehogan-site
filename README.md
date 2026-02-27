# berniehogan.me

Academic website with multi-thematic bibliography structure.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

## Deployment

Push to GitHub → Netlify auto-deploys from `main` branch.

## Content Structure

### Adding a new publication

1. Create `src/content/works/slug-name-year.md`:

```markdown
---
title: "Full Title of the Paper"
year: 2024
authors:
  - Bernie Hogan
  - Co-Author Name
venue: "Journal or Conference Name"
doi: "10.xxxx/xxxxx"
pdf: "/pdfs/paper-name.pdf"  # optional, if self-hosting
themes:
  - platforms-and-power
  - semantic-structures
---

Brief abstract or description of the work.
```

2. Add theme-specific annotations to `src/data/annotations.ts`:

```typescript
'slug-name-year': {
  'platforms-and-power': `Annotation for this theme...`,
  'semantic-structures': `Different annotation for this theme...`,
},
```

3. Commit and push.

### Adding a new theme

1. Create `src/content/themes/theme-slug.md`:

```markdown
---
title: "Theme Display Name"
order: 6  # determines nav order
focus: "brief descriptor"
---

2-3 sentence description of the thematic lens.
```

2. Add annotations for existing works under this theme in `annotations.ts`.

### Adding an artifact (interactive React component)

1. Place your React component in `src/components/artifacts/YourComponent.tsx`

2. Import and use in any `.astro` page:

```astro
---
import YourComponent from '../components/artifacts/YourComponent';
---

<YourComponent client:load />
```

The `client:load` directive tells Astro to hydrate the component on page load.

## File Structure

```
src/
├── content/
│   ├── works/           # Publication markdown files
│   └── themes/          # Theme description markdown files
├── data/
│   └── annotations.ts   # Theme-specific annotations (the magic)
├── pages/
│   ├── index.astro      # Homepage
│   ├── cv.astro         # CV page
│   ├── themes/
│   │   └── [theme].astro    # Dynamic theme pages
│   └── works/
│       ├── index.astro      # All works chronologically
│       └── [work].astro     # Individual work pages
├── components/
│   └── artifacts/       # React components for interactive elements
└── layouts/
    └── Base.astro       # Shared layout with styles
```

## Maintenance with Claude Code

When working with Claude Code:

1. **Adding works**: I can create the markdown file and add annotations
2. **Updating annotations**: I edit `src/data/annotations.ts`
3. **Styling changes**: I edit `src/layouts/Base.astro`
4. **Adding artifacts**: I create React components in `src/components/artifacts/`

Build test: `npm run build`

## Design Philosophy

- **Austere aesthetic**: Typography-focused, minimal decoration
- **Complexity through discovery**: Same work appears in multiple themes with different annotations
- **Trust the pattern**: The structure demonstrates the argument without explaining it

See `CLAUDE.md` for full UX specification.
