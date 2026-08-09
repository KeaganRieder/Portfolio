# How to Add Content to the Portfolio

This site is built so that adding content — a new project, a new project category, or a whole new
top-level app/section — never requires touching the app registry (`src/system/registery/`). Everything
is discovered automatically via `import.meta.glob`. You just need to drop files in the right place,
following the shape the loaders expect.

All imports below use the `@/` alias for `src/` (configured in `vite.config.ts`).

---

## 1. Adding a new project

Every project lives under `src/projects/entries/`, grouped by category folder:

```
src/projects/entries/
├── projectsEntries.ts        # auto-discovers everything below — don't edit this
├── video_games/
│   ├── soul_sync/
│   │   ├── information.ts
│   │   └── soul_sync_title.png
│   └── tic_tac_toe/
│       ├── information.ts
│       └── board.png
├── websites/
│   └── portfolio/
│       ├── information.ts
│       └── portfolio_pic.png
└── ...
```

`projectsEntries.ts` globs both `./*/information.ts` (a project directly inside a category folder)
and `./*/**/information.ts` (a project nested one level deeper, e.g. `video_games/soul_sync/information.ts`).
So you can either add a project straight inside an existing category, or give it its own subfolder — both work.

### Steps

1. **Pick (or create) a category folder** under `src/projects/entries/`, e.g. `src/projects/entries/video_games/`.
   - The folder name becomes the category's `id` **and** its displayed name (categories are grouped by
     `categoryID` and the display name is just the id verbatim — see `buildCategories` in
     `src/system/registery/buildRegistryEntries.tsx`). Use a name you're happy to show as-is, e.g.
     `video_games` will display as "video_games". If you want a nicer display name you'll need to add
     formatting there.
   - Creating a brand-new folder name automatically creates a brand-new category — no registration needed.

2. **Create a subfolder for your project** (recommended) and add an `information.ts` file plus any
   images/media it needs, e.g. `src/projects/entries/video_games/my_new_game/information.ts`.

3. **Write `information.ts`**, exporting one `ProjectEntryProperties` object (shape defined in
   `src/projects/models.ts`):

   ```ts
   import type { ProjectEntryProperties } from '@/projects/models';
   import { readImageGroup } from '@/shared/types/sectionType';
   import icon from '@/assets/icons/text_doc_icon.png';

   // Eagerly import every PNG in this project's folder for the overview gallery.
   const images = import.meta.glob('./*.png', { eager: true, import: 'default' });

   export const MyNewGameInfo: ProjectEntryProperties = {
       id: 'my_new_game',              // must be unique across ALL projects
       categoryID: 'video_games',      // must match the folder name from step 1
       name: 'My New Game',
       tags: [
           { skill: { id: 'csharp', name: 'C#' } }, // links to a Skill (see below)
           { name: 'Godot' },                        // or just a free-text tag
       ],
       iconPath: icon,
       overviewContents: {
           imagePaths: readImageGroup(images, false), // false/true = isPixelated
           description: 'A one-line description shown on the overview card.',
           links: [
               { label: 'GitHub', url: 'https://github.com/you/my-new-game' },
           ],
       },
       // Optional: only needed if the project should open as its own detailed window.
       // Omit `content` and the overview card renders as a static, non-clickable card.
       content: [
           { sectionInfo: { type: 'header', text: 'About the Game' } },
           { sectionInfo: { type: 'body', text: 'More detail about the project...' } },
           { sectionInfo: { type: 'video', src: 'https://www.youtube.com/embed/XXXXXXX', alt: 'Gameplay Video' } },
       ],
   };
   ```

4. **That's it.** `id` must be unique; everything else (category grouping, the project's card in its
   category window, its own window if `content` is set) is wired up automatically the next time the
   app rebuilds/reloads.

### Available `content` section types

Defined in `src/shared/types/sectionType.ts` (`SectionType`). Each entry in `content` is
`{ sectionInfo: SectionType; styleName?: string }`:

| `type`                 | Fields                                              | Use for                          |
|-------------------------|------------------------------------------------------|-----------------------------------|
| `header`                | `text`                                                | Section heading                   |
| `subHeader`             | `text`                                                | Sub-heading                       |
| `body`                  | `text`                                                | Paragraph text                    |
| `code`                  | `language`, `code`                                    | Code snippet                      |
| `image`                 | `imageData: ImageData`                                | A single image                    |
| `gallery`               | `imageData: ImageData[]`                              | Multiple images                   |
| `imageWithDescription`  | `imageData`, `description`, `enlargeable?`            | Image + caption, optional lightbox|
| `readMe`                | `link`, `alt`                                         | Embedded markdown/readme          |
| `video`                 | `src`, `alt?`                                         | Embedded video (e.g. YouTube)     |
| `embed`                 | `src`, `title`, `height?`, `sandbox?`                 | Arbitrary iframe embed            |
| `link`                  | `label`, `url`                                        | External link                     |

`ImageData` is `{ name, src, caption?, isPixelated? }`. Use `readImageGroup(imageGroup, isPixelated)`
(from `src/shared/types/sectionType.ts`) to convert an `import.meta.glob` result into `ImageData[]`
with names/captions auto-derived from filenames.

### Linking a project tag to a Skill

If a tag should link back to the About Me skills list (and show up as an example project under that
skill's hover card), reference an existing skill id from `src/windows/about_me/assets/skills.ts`:

```ts
tags: [{ skill: { id: 'react', name: 'React' } }]
```

The `id` must match a `Skills[].skill.id` entry exactly — matching is done in
`buildSkillExamples` in `src/system/registery/buildRegistryEntries.tsx`.

---

## 2. Adding a new project category

There's no separate registration step — a category is just a folder name. Creating
`src/projects/entries/<new_category>/` and putting at least one project's `information.ts` inside it
(with matching `categoryID`) is enough for a new "Projects" folder button, category window, and
category icon to appear automatically.

If you want a category to exist with zero projects in it (unusual), you'd need to seed
`buildCategories` manually — not currently supported by the glob-based flow.

---

## 3. Adding a new top-level app/section (like About Me or Email)

Top-level apps (desktop icons that aren't projects) live under `src/windows/`, one folder per app,
and are auto-discovered by `src/system/registery/appsEntries.ts` via
`import.meta.glob("../../windows/*/appEntry.ts", { eager: true })`.

```
src/windows/
├── about_me/
│   ├── appEntry.ts       # <- what makes it show up
│   ├── aboutMe.tsx
│   ├── aboutMe.css
│   └── assets/
└── email/
    ├── appEntry.ts
    ├── email.tsx
    └── email.css
```

### Steps

1. **Create a new folder** under `src/windows/`, e.g. `src/windows/blog/`.

2. **Build your app component.** It should accept the same props `Application`-wrapped components
   receive (see `src/windows/about_me/aboutMe.tsx` for a real example): `info`, `visibilityControls`,
   `containers`, `shortcuts`, and — if you need project/skill data — `projectRegistry` (see
   `ProjectHelpers` in `src/system/registery/types.ts`). Internally, render your content inside the
   shared `Application` window chrome (`src/system/window/application.tsx`), the same way
   `ProjectShowcase` (`src/projects/showcase.tsx`) or `AboutMe` do.

3. **Export an `appEntry.ts`** from your new folder:

   ```ts
   import type { AppRegistryEntry } from '@/system/registery/appRegistry';
   import { Blog } from './blog';
   import blogIcon from '@/assets/icons/text_doc_icon.png';

   export const BlogAppEntry: AppRegistryEntry = {
       id: 'blog',
       name: 'Blog',
       icon: blogIcon,
       component: Blog,
   };
   ```

4. **That's it.** `appsEntries.ts` picks up any exported `AppRegistryEntry` from every
   `windows/*/appEntry.ts` file; `buildRegistryEntries.tsx` turns each one into a desktop/taskbar
   shortcut and window automatically. No import list to edit.

---

## 4. Adding a new skill (About Me)

Skills shown in the About Me app and referenced by project tags live in
`src/windows/about_me/assets/skills.ts` as a flat `Skills: SkillEntryInfo[]` array:

```ts
{
    skill: { id: 'rust', name: 'Rust' },
    categoryID: 'languages',   // groups skills under a heading in the UI
    hover: { usage: 'Weekly' }, // optional; example projects are derived automatically
},
```

`categoryID` here is a free-text grouping label (e.g. `languages`, `tools`, `engines`) rendered as a
heading by `skillCategory.tsx` — add a new value to create a new heading. Any project that tags itself
with `{ skill: { id: 'rust', ... } }` will automatically appear as an example under this skill.

---

## Quick reference

| I want to...                          | Do this                                                                                     |
|-----------------------------------------|-----------------------------------------------------------------------------------------------|
| Add a project to an existing category   | New folder + `information.ts` under `src/projects/entries/<category>/`                        |
| Add a brand-new category                | Use a new folder name under `src/projects/entries/`; first project's `categoryID` must match  |
| Add a top-level app (desktop section)   | New folder under `src/windows/` with a component + `appEntry.ts` exporting `AppRegistryEntry`  |
| Add a new skill                         | Add an entry to `Skills` in `src/windows/about_me/assets/skills.ts`                            |
| Link a project to a skill               | Use `tags: [{ skill: { id, name } }]` with a matching skill `id`                               |

No file outside of the folder you're adding needs to change for any of the above — that's the point
of the glob-based auto-discovery in `projectsEntries.ts` and `appsEntries.ts`.
