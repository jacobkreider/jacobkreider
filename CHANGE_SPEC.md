# Change Spec: jacobkreider site cleanup

Static HTML/CSS/JS site (hosted on Neocities, repo `jacobkreider/jacobkreider`, branch `master`). There is no build step. Edit files directly and check by opening the pages in a browser or a local static server.

**Convention to follow:** the repo's recent commits ("Commented out unused sections...") hide content by wrapping it in HTML comments rather than deleting it. Do the same for items 1 and 2, so nothing is lost and it can be restored later.

**Do not** commit or push unless asked. Make one logical commit per numbered item if asked to commit.

---

## 0. URGENT, before anything else: leaked GitHub token

`config/guestbook-config.js` contains a live-looking GitHub personal access token (`ghp_...`) committed to a public repo (it has been in history since "Caught up to website"). Removing the file (item 5) does **not** remove it from git history.

- Tell the user to **revoke the token** in GitHub, under Settings → Developer settings → Personal access tokens. This is the only real fix. The agent cannot do it.
- Do not repeat the token value in any output, commit message or doc.
- Rewriting history is not required once the token is revoked. Don't do it without asking.

---

## 1. Hide Baking (bread making)

Files that link to it: `index.html`, `bbs.html`, `teddy.html`, `baking.html`, `amazing-tales.html`, `test.html`.

1. In every top nav (`<nav id="navbar">` in `index.html`; `<nav class="top-nav">` in `bbs.html`, `teddy.html`, `amazing-tales.html`, `baking.html`), comment out `<li><a href="baking.html">Baking</a></li>`.
2. In `index.html`, comment out the whole `<div class="section section-baking">` block ("Baking Adventures") in the right column.
3. In the `index.html` intro paragraph, remove or reword the sentence that says "My baking page is different from the pages with my son's artwork and the role-playing games we play." It should no longer mention baking or role-playing games. Keep the BBS/mIRC part.
4. **Leave these in place, unlinked:** `baking.html`, `baking/`, `css/baking*.{css,js}`, `pages/baking/`, `dev/baking/`. Nothing deleted.
5. Do **not** edit `robots.txt` (decided by the user).

## 2. Hide Amazing Tales

Same approach as item 1.

1. Comment out `<li><a href="amazing-tales.html">Amazing Tales</a></li>` in every nav listed above.
2. In `index.html`, comment out the `<div class="section section-tales">` block ("Amazing Tales Adventures").
3. Leave `amazing-tales.html`, `pages/amazing-tales/`, `css/tales_styles.css`, `js/tales.js` in place, unlinked.
4. `not_found.html` only links to Home and the BBS, so it needs no change.

After items 1 and 2 the main nav should read: Home, Projects and Hobbies BBS (item 3), Teddy Gallery, About Me.

## 3. Rebrand the BBS: "Projects and Hobbies BBS"

Stop using the "madp0e7ix" name everywhere on the site: visible text **and** URLs, file names, folder names, CSS file names and class/id names. The new neutral name is **`bbs`**. See the rename table below; do the renames with `git mv` so history follows the files.

**Renames (do these first, then fix every reference):**

| Old | New |
|---|---|
| `madp0e7ix.html` | `bbs.html` |
| `madp0e7ix_bbs/` (folder) | `bbs/` |
| `css/madp0e7ix_styles.css` | `css/bbs_styles.css` |
| `pages/madp0e7ix/` and `dev/madp0e7ix/` (old blog drafts) | `pages/bbs/` and `dev/bbs/` |
| CSS class `section-madp0e7ix` (in `index.html`, `test.html` and any stylesheet) | `section-bbs` |
| any other class/id/comment containing `madp0e7ix` | `bbs`-based equivalent |

References to update after renaming: every `href`/`src` in the HTML files, `css/navigation.js`, `not_found.html` (the links and its `window.location` key handlers around lines 112–132), the `<link>` tags to the stylesheet, and the stylesheet's own selectors. Final check: `grep -rniI madp0e7ix --exclude-dir=.git .` must only return the exceptions listed under "Do not change" below.

**Redirects:** do **not** leave a `madp0e7ix.html` stub behind, since the user doesn't want the name in the URLs. Old links will 404 (the site's `not_found.html` handles that). Mention it in the summary.

Visible-text changes:

| File | Change |
|---|---|
| `bbs.html` | `<title>` → `Projects and Hobbies BBS`; `<h1>` "madp0e7ix BBS" → "Projects and Hobbies BBS"; `<h2>` "Welcome to madp0e7ix BBS" → "Welcome to Projects and Hobbies BBS"; "1. madp0e7ix Home" → new menu (item 4) |
| `bbs/projects.html`, `bbs/thoughts.html` | same `<title>`, `<h1>`, menu, and nav-link text changes |
| `index.html` | nav `<a href="bbs.html">madp0e7ix</a>` → link text "Projects and Hobbies BBS"; right-column card `<h2>madp0e7ix BBS</h2>` → "Projects and Hobbies BBS"; reword the intro paragraph (decided by the user): drop "madp0e7ix was my IRC name when I was 12!" and the sentence about turning off mouse navigation if it only makes sense with the handle; keep a short line about the BBS being a throwback to the BBS and mIRC days of middle school and that the number keys navigate it |
| `bbs.html`, `teddy.html` (and the other pages' navs) | same nav link-text change |
| `not_found.html` line ~122 | "view madp0e7ix BBS" → "view Projects and Hobbies BBS" |

Do **not** change (these legitimately keep the name; flag them in the summary):

- The "About Me" link to `https://neocities.org/site/madp0e7ix`. It's the Neocities account URL and can't be renamed from the repo.
- Nothing about the webring is left to preserve: it is being replaced (see "Webring" below).
- The blog text that tells the story of the handle ("madp0e7ix was the very first handle I chose at 13..."). That is content, not branding. Ask the user rather than editing it.

Also fix while there: `bbs.html` has a stray `<<div class="navigation-menu">` (double `<`) in the sidebar. Correct it to `<div ...>`.

## 4. BBS numeric menu and key navigation

New menu, shown in both places in `bbs.html` (sidebar and `#menu` block) and in the sidebar of `projects.html` and `thoughts.html`:

```
1. BBS Home
2. Coding and Research
3. Go Back to Main Site
```

Film Photography is **not** in the BBS. It is a separate page on the main site (item 7). The menu was originally four items with Film Photography as #2; it is now three. Remove the old "Thoughts / Projects / About" options and the commented-out "COMING SOON Things I'm Learning" lines. Update the status line text `[Press 1-5 to navigate]` → `[Press 1-3 to navigate]` everywhere (3 files).

Update `css/navigation.js`:

- `hiddenInput.pattern = '[1-5]*'` → `'[1-3]*'` and the comment above it.
- Rewrite the `switch` to:
  - `'1'` → `/bbs.html`
  - `'2'` → the Coding and Research page (see below)
  - `'3'` → `/index.html`
- Remove `case '4'`, `case '5'` and the hard-coded `https://madp0e7ix.neocities.org/...` URL. All targets should be same-site root-relative paths.

**Destination page that needs a decision.** The old nav referenced `bbs/learning.html`, which doesn't exist.

- **Coding and Research:** the existing `projects.html` (retrogaming/electronics project plans) and `thoughts.html` (the BBS blog post) are the closest content. **Default:** create `bbs/coding-research.html` from `projects.html`, retitled "Coding and Research", keeping its project list. Leave `thoughts.html` in place but unlinked. If the user prefers, they can say to reuse `projects.html` directly.

The new page uses the same layout, CSS (`/css/bbs_styles.css`), and `<script src="/css/navigation.js">` as the other BBS subpages, and carries the new menu.

## 5. Teddy's Art Gallery → teddykreider.com

- `index.html` right-column card `section-teddy`: change `<a href="teddy.html" class="section-link">Visit Gallery →</a>` to `href="https://teddykreider.com"`. Use `target="_blank" rel="noopener"` only if it matches how other external links on the page behave (they don't, so leave them off).
- The nav links to Teddy already point at `https://teddykreider.com` everywhere. Verify each, and fix any that point at `teddy.html`. `bbs/projects.html` and `thoughts.html` currently use `/teddy.html` in their `top-nav`, so change those to `https://teddykreider.com` too.
- The old BBS subpage navs still have "Main Site / Baking / madp0e7ix / Teddy Gallery / About Me". Align them with the main nav after items 1–3: Home, Projects and Hobbies BBS, Teddy Gallery, About Me.
- **Delete `teddy.html` and `css/teddy-styles.css`** (decided by the user: the homepage card and the nav send people straight to teddykreider.com, so the local page is not needed). First `grep -rn "teddy.html\|teddy-styles" .` to make sure nothing still references them; every nav link must point at `https://teddykreider.com`. Because `teddy.html` is deleted, ignore it in any list of pages to edit elsewhere in this spec. **Keep `teddy_art/`** (Teddy's artwork; it is not site code). Mention in the summary that it is now unused and the user may want to remove or archive it.

## 6. Simplify the guestbook to Atabook only

Current state: `index.html` already embeds the Atabook guestbook (`<iframe src="https://jacobkreider.atabook.org" class="guestbook-frame">`) and that is the one to keep. There is also an older, unused GitHub-Issues-based guestbook, which is the "too complex" part. **There is no `.github/` directory or workflow file in the repo.** The "GitHub actions" are really that script, which calls the GitHub API from the browser.

1. Delete `config/guestbook-config.js`. It holds the leaked token (see item 0).
2. Delete `css/guestbook.js` (reads issues via the GitHub API) and `css/guestbook.css`.
3. Remove the `config/` directory if it's then empty.
4. **Delete `test.html`** (decided by the user). It's a scratch page that loads the three guestbook files above.
5. **Delete `css_test.css`** once `grep -rn css_test .` shows nothing else uses it (decided by the user).
6. Keep the iframe in `index.html` and its CSS in `css/styles.css` (`.guestbook-frame*`, `.section-guestbook`). No changes needed there.
7. Verify with `grep -rniE "github_token|GUESTBOOK_CONFIG|api.github.com" .` that no references remain (excluding `.git`).

## 7. Film Photography: a standalone gallery on the main site

A place to post photos while learning a film camera: a grid of thumbnails with short descriptions, click to enlarge. It is **not** part of the BBS and must not look like it (no green-on-black, no terminal text, no `bbs_styles.css`, no `navigation.js` number-key handling). Like `teddy.html` and `baking.html`, it is a main-site page with its own look.

### Files

- `film.html` (landing page at the site root: favorites plus a menu of rolls)
- `film/roll-template.html` (a copy-me template for a single roll's page; not linked from anywhere; see "Roll pages")
- `css/film-styles.css` (all styling; do not touch `teddy-styles.css` or `bbs_styles.css`)
- `js/film-gallery.js` (lightbox; vanilla JS, no libraries, no build step)
- `film_photos/full/`, `film_photos/thumbs/`, `film_photos/README.md`, `film_photos/manifest.json`, `tools/add-photos.py` (see "Images")

### Linking it into the site

- Add `<li><a href="film.html">Film Photography</a></li>` to every top nav, in this order: Home, Projects and Hobbies BBS, **Film Photography**, Teddy Gallery, About Me. The navs are in `index.html`, `bbs.html`, `bbs/*.html`, `teddy.html`, `baking.html`, `amazing-tales.html` (use absolute paths like `/film.html` in the `bbs/` subpages) and the new `film.html` itself, so it marks "current page" like the others do.
- Add a card to the right column of `index.html`, in the slot freed by the hidden Baking and Amazing Tales cards, styled like the existing `section-*` cards: heading "Film Photography", one line such as "Notes and frames from learning to shoot film.", link "View Photos →". Add a matching `.section-film` rule to `css/styles.css`, with an accent colour from the palette below.
- Do not link it from the BBS menu.

### Style (decided by the user): "contact sheet / darkroom"

The existing pages each have their own identity (Teddy: bright pastel coral and teal; baking: warm cream and brown; BBS: green on black). A film page should be the quiet one, and it should let the photos carry the colour. Colour film looks best on a neutral surround, and Teddy's coral and the BBS green would both fight the photos. So the look is a photographer's contact sheet viewed under darkroom light:

- **Palette (define as CSS variables on `:root` in `film-styles.css`):**
  - page background: warm charcoal `#1d1b19`
  - card/panel surface: `#262320`
  - body text: soft off-white `#ece6da`
  - muted text (captions, metadata): `#9a9387`
  - single accent: Kodak-style amber `#e8a33d`, used for frame numbers, links, hover rings and the lightbox close control. Nothing else is coloured.
- **Type (Google Fonts, same loading pattern the site already uses for VT323):**
  - headings: a classic serif, `"DM Serif Display", Georgia, serif`
  - body/caption: `"DM Sans", system-ui, sans-serif`
  - frame labels and metadata only: `"Space Mono", "Courier New", monospace`, which is the film edge-code touch. Keep it to small labels, not paragraphs.
- **Motifs, kept subtle:**
  - each thumbnail has a thin off-white mat/border like a print, with a small amber frame number underneath such as `12A` in Space Mono (a nod to edge markings)
  - an optional thin sprocket-hole strip (CSS repeating dots, no images) as a divider under the page header and between rolls
  - roll tiles and roll-page headings read like "Roll 01 · Portra 400" in the serif/mono pairing (the camera is shown per photo only when it is not the default Pentax 17, so it isn't repeated); newest roll first
- **No** grain overlays, heavy textures, faux-scratch effects, or filters on the photos. Never recolour the images.

### Layout: `film.html` is a landing page

1. Header: page title "Film Photography" in the serif, a subtitle (placeholder: "Notes from learning to shoot film"), and the site nav above it.
2. Short intro paragraph (placeholder text the user will replace): the camera is a **Pentax 17**, a half-frame 35mm camera, so each exposure is a vertical 3:4 frame and a 36-exposure roll yields about 72 photos. Say so in a sentence, and add that each photo's film stock and month are in its caption. Do not name a specific film stock in the intro.
3. **Roll menu** ("Rolls"), directly under the intro, above the favorites. A row/grid of roll tiles, newest first. Each tile shows: roll number (amber, Space Mono, e.g. `ROLL 03`), film stock, `YYYY-MM` shot (or "developing"), and a frame count. Each tile is a link to that roll's page (see "Roll pages"). Ship with **three placeholder tiles** (for example `ROLL 03 · Portra 400 · developing`, `ROLL 02 · Ektar 100 · developing`, `ROLL 01 · Gold 200 · developing`), each styled as disabled (muted text, no hover lift, `aria-disabled="true"`, a small "coming soon" label, and **no `href`**) so nobody lands on a 404. When a roll is ready, the user changes a tile into a link by adding its `href` and removing the disabled class (document this in the template comment). Mobile: tiles stack in a single column at ≤ 480px and wrap two across at ≤ 768px.
4. **Favorites** ("Favorites"): the grid of the user's best photos, across all rolls. At first **every photo is a favorite**, so this grid holds all photos. Ship with 3 placeholder cards (see "Placeholders"). Each favorite card also shows a small amber roll label (e.g. `ROLL 01 · 12A`), which will link to that roll's page once it exists (unlinked while the roll is still a disabled tile). Grid: `display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;`. Each card holds the thumbnail (`<img loading="lazy">` with `aspect-ratio: 3/4; object-fit: cover` (half-frame photos are portrait by default; do not crop them to landscape. A photo shot in landscape orientation may carry a `.landscape` class on its card that switches that card's thumbnail to `4/3` and lets the card span two grid columns), inside a link/button to the full image so it works without JS), a title (optional), an amber frame label, a **caption line giving the film stock and year-month, written like `Kodak Portra 400 · 2026-10`** (required on every photo; `YYYY-MM`, in Space Mono, muted colour; the user fills this in for each photo), and an optional short description or "what I learned" note. Camera/lens appears after the caption only when different from the default Pentax 17 and its stock lens (e.g. `Kodak Portra 400 · 2026-10 · Pentax K1000`). Hover/focus: lift the card slightly and show an amber ring. No colour inversion.

5. Lightbox (`js/film-gallery.js`), used on the landing page and every roll page: click, tap or Enter on a card opens a dark overlay showing the full image (`max-width: 92vw; max-height: 78vh; object-fit: contain; portrait images will be the common case, so size the caption beside or below the image so it never pushes the photo off screen on a short desktop window`), with the title, frame label, the film-and-year-month caption and description below it. Close with a click outside, Esc, or a visible close button (amber `×`, at least 44px touch target). Add previous/next arrows and ←/→ keys to step through the photos in the current grid (favorites on the landing page, the roll on a roll page). Keep the cards focusable and manage focus (return it to the card on close). The lightbox loads the full image only when opened.
6. Footer: same simple footer as the other main-site pages.
7. Mobile: single column at ≤ 480px, two columns at ≤ 768px, no horizontal scrolling at 375px width.

### Images

`teddy_art/` is ~103 MB for 18 files (up to ~7 MB each), which is too heavy for a thumbnail grid. For this page:

- store full-size images in `film_photos/full/` (long edge ~1600–2000 px; for portrait half-frame shots this is the height, JPEG ~80–85%) and thumbnails in `film_photos/thumbs/` (~440 px wide)
- the grid loads only the thumbs; the lightbox loads the full image on click
- **Import script `tools/add-photos.py`** (new; Python 3 standard library plus ImageMagick `magick`/`convert` for resizing; the script checks that ImageMagick is installed and prints how to install it if not). Run as `python3 tools/add-photos.py` from the repo root, with no arguments needed:
  - **Source (built in as the default):** the zip `~/Downloads/2026_Favorite_Film.zip`. The path lives in one constant at the top of the script. An optional `--zip PATH` flag overrides it for future years (e.g. `2027_Favorite_Film.zip`). If the zip is missing, the script says so and exits without changing anything.
  - **What it does:** it reads the zip directly (it does not need to be extracted by hand; it extracts each new image to a temporary folder, processes it, and deletes the temp copy). It handles JPEG, PNG, TIFF and HEIC entries, ignores folders, `__MACOSX/`, hidden files and non-images, and processes entries in sorted name order.
  - **Output per photo:** `film_photos/full/<name>.jpg` (~1800 px on the long side, JPEG quality 82, metadata stripped, orientation applied) and `film_photos/thumbs/<name>.jpg` (440 px wide, quality 80). `<name>` is the original zip filename, lowercased, extension removed, spaces and punctuation replaced with `-` (e.g. `IMG 0042.JPG` → `img-0042.jpg`). If two entries would collide, append `-2`, `-3`, and so on, and record that in the manifest.
  - **Manifest (so nothing is reprocessed):** the script keeps `film_photos/manifest.json`, **committed to git**, mapping each zip entry to its output name, plus the entry's CRC-32 and size from the zip index (no need to read the whole file to check). On each run:
    1. entries already in the manifest with the same CRC-32 and size are skipped, so adding photos to the zip and re-running only processes the new ones
    2. an entry whose name is known but whose CRC-32 changed (the user replaced a photo with an edited version) is reprocessed and the manifest updated, and the script says so
    3. an entry that has disappeared from the zip is **not** deleted from `film_photos/` or the manifest; the script only reports it (a removed photo is deleted by hand)
    4. if a manifest entry exists but its output files are missing from disk, they are regenerated
  - **Output of each run:** a short summary (`3 new, 12 skipped, 0 changed, 0 missing from zip`), then the list of new output filenames, ready to paste into the page, plus a reminder that the user must add the `<figure class="photo-card">` blocks with each photo's film-and-year-month caption. A `--dry-run` flag shows what would be processed without writing anything.
  - **Never** modifies the zip or anything else in `~/Downloads`. **Does not** edit any HTML. Writes only under `film_photos/`.
  - Naming note: because all favorites come from one zip, filenames no longer encode roll and frame (the `roll01_frame12.jpg` idea is dropped). The roll a photo belongs to, its film stock and year-month are set in the page's caption block, never in the filename. Don't rename zip entries, since the manifest keys on the entry name.
- `film_photos/README.md` documents the folder layout, the `manifest.json` file (what it is, and "don't edit by hand"), how to run `tools/add-photos.py`, and a worked example (add 3 photos to the zip, run the script, see "3 new, N skipped").
- **Photos must be tracked in git** (the user publishes the site via GitHub Actions, so anything not committed never goes live). `.gitignore` currently has `*.jpg` and `*.png`, which would silently exclude new photos. Add negation lines at the end of `.gitignore`: `!film_photos/**/*.jpg` and `!film_photos/**/*.png`. Verify with `git status` / `git check-ignore -v film_photos/full/x.jpg` that new files are not ignored. (Existing images such as `teddy_art/` and `baking/images/` are already tracked, so they are unaffected.) Keep the repo light: only the resized `full/` and `thumbs/` versions go in git, never original scans or camera files.

### Roll pages (template only for now)

Each roll gets its own page at `film/roll-NN.html` (e.g. `film/roll-01.html`), in the same look as `film.html`: a heading with roll number, stock and `YYYY-MM`, a back link "← All rolls" to `/film.html`, a short note about the roll, and a full grid of that roll's photos (not just favorites), using the same cards and lightbox. **Do not create real roll pages yet.** Create only `film/roll-template.html`, a copy-me template with a comment at the top explaining the steps in "Adding content". It must not be linked from anywhere. Use absolute paths (`/css/film-styles.css`, `/js/film-gallery.js`, `/film_photos/...`) in the template so it works from the `film/` folder.

### Adding content

- **A new photo:** put the resized files in `film_photos/full/` and `film_photos/thumbs/`, then copy one `<figure class="photo-card">…</figure>` block into the roll's page, and, if it's a favorite, into the Favorites grid on `film.html`. Edit the filename and text. A commented template card sits at the top of the Favorites grid showing exactly what to edit.
- **A new roll:** copy `film/roll-template.html` to `film/roll-NN.html`, fill it in, then on `film.html` turn the matching placeholder tile into a link (add `href="film/roll-NN.html"`, remove the disabled class and the "coming soon" label). Add a new tile at the top if it doesn't exist yet.
- No generator script or data file.

### Placeholders

Ship with 3 placeholder photo cards in Favorites that point at small generated placeholder images (plain charcoal rectangles with "PLACEHOLDER" text, vertical 3:4) and say so in their descriptions, so the page can be reviewed visually before real photos exist, plus the three placeholder roll tiles described above. Do not use `teddy_art` images.

### Accessibility

Alt text on every image (title plus a short description). Text contrast ≥ 4.5:1 against the surfaces above (the muted `#9a9387` on `#262320` passes; check anything new). Don't rely on hover for anything.

### Acceptance

- [ ] `film.html` looks like its own page: charcoal and amber, serif headings, no BBS or Teddy styling.
- [ ] "Film Photography" is in every main nav (in the order above) and on a card on the homepage, and is not in the BBS menu.
- [ ] `film.html` shows a roll menu with three disabled placeholder tiles (no links, no 404s) and a Favorites grid below it.
- [ ] `film/roll-template.html` exists, is unlinked, and renders correctly when copied to `film/roll-01.html`.
- [ ] Thumbnails load fast; the full image loads only in the lightbox.
- [ ] Click, tap, Enter, Esc, ←/→ and the close button all work, and focus returns to the card.
- [ ] Usable at 375 px wide with no horizontal scroll.
- [ ] Adding a photo is a copy-paste of one block; adding a roll is a copy of the template plus enabling its tile.

---

## Verification checklist

- [ ] Open `index.html`: nav has no Baking or Amazing Tales; no Baking or Amazing Tales cards; Teddy card goes to teddykreider.com; the Atabook iframe still loads; the BBS card reads "Projects and Hobbies BBS".
- [ ] Open `bbs.html`, `projects.html`, `thoughts.html`, plus the new Coding and Research page: title/header/menu show the new name and exactly three options; the status line says 1–3.
- [ ] Press keys 1, 2, 3 on each BBS page. Each goes to the right place and nothing 404s. Keys 4 and 5 do nothing.
- [ ] `grep -rniE "madp0e7ix" --include=*.html .` and review every hit. Only the allowed exceptions in item 3 should remain (the Neocities URL and the story text in the blog entry). No file, folder, class or URL should contain the old name.
- [ ] No dangling references to deleted files (`grep` for `guestbook`, `config/`).
- [ ] The user has been told to revoke the token.

## Webring (new registration code)

The user re-registered the site with the webring and was given new links, keyed to the site root instead of the BBS:

```html
<a href='https://webring.dinhe.net/prev/https://jacobkreider.com'>Previous</a>
<a href='https://webring.dinhe.net/next/https://jacobkreider.com'>Next</a>
```

- Remove the old webring links (`.../JacobKreider.com/madp0e7ix`) from `bbs.html`. They are the only content of its `<div id="topBar">`, so remove that div too (and check `css/bbs_styles.css` for a `#topBar` rule that is then unused).
- Put the new links on the **main site**, in the `index.html` footer, next to the Neocities line, as `Previous | Next` (or "← Previous webring site | Next webring site →"), using exactly the URLs above. Also put them in the footer of `film.html` so the ring is reachable from both main pages. Do not change the URLs, the quoting or the domain case.
- The webring check likely looks for these links on the registered page (the homepage), so they must be present in the served `index.html`, not hidden in a comment.

## Decisions already made by the user

- The BBS is renamed `bbs` (URLs, folder, CSS) and titled "Projects and Hobbies BBS". Menu has three items.
- Coding and Research is a retitled copy of `projects.html`.
- `test.html`, `css_test.css`, `teddy.html` and `css/teddy-styles.css` are deleted; the Teddy card and nav link straight to teddykreider.com. `teddy_art/` stays.
- Homepage intro is reworded to talk about the BBS as a throwback only, with no handle story.
- `robots.txt` is not changed.
- No film stock named in the placeholder intro; keep it generic ("the film stock for each photo is in its caption").
- Photos import from `~/Downloads/2026_Favorite_Film.zip` via `tools/add-photos.py`; photos and `manifest.json` are tracked in git.
- Site is deployed with GitHub Actions using the repo secret `NEOCITIES_API_TOKEN` (see "Deployment" below).

## Deployment (GitHub Actions to Neocities)

Goal: every push to the main branch publishes the site to Neocities automatically.

**Facts to check first**

- The branch is called **`master`**, not `main` (`git branch` and the GitHub remote both show `master`). Trigger the workflow on `master`. If the user later renames the branch to `main`, list both so it keeps working: `branches: [master, main]`.
- `NEOCITIES_API_TOKEN` is a **repository** secret (confirmed by the user). The workflow therefore must **not** have an `environment:` line.
- There is currently **no workflow file in the repo** (`master` and `amazing` have no `.github/`; GitHub lists zero workflows). Check `.github/workflows/` locally first; if something is there, update it instead of duplicating.

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to Neocities

on:
  push:
    branches: [master]
  workflow_dispatch:

concurrency:
  group: deploy-neocities
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Stage site files
        run: |
          mkdir dist
          rsync -a \
            --exclude='.git*' --exclude='.github/' --exclude='dev/' \
            --exclude='tools/' --exclude='dist/' --exclude='*.md' \
            --exclude='*.py' --exclude='*.sh' \
            ./ dist/

      - name: Deploy to Neocities
        uses: bcomnes/deploy-to-neocities@v3
        with:
          api_token: ${{ secrets.NEOCITIES_API_TOKEN }}
          dist_dir: dist
          cleanup: false
```

- The agent should confirm the current action inputs and latest `v3` tag from the action's README and pin to a tag, and check that `actions/checkout@v4` is still current. The YAML above is the intended shape, not a verified copy.
- Staging into `dist/` keeps non-site files (this spec, scripts, drafts) from being uploaded. Neocities rejects some file types on free accounts, which would fail a deploy that included them. If the first run fails on a file type, add that extension to the excludes rather than uploading it.
- `film_photos/manifest.json` and all site images are published normally.
- **Cleanup is off on purpose for the first run.** With it off, the renamed and deleted files (`madp0e7ix.html`, `madp0e7ix_bbs/`, `css/madp0e7ix_styles.css`, `teddy.html`, `test.html`, guestbook files) stay live on Neocities. After the first deploy succeeds and the user has checked the live site, tell the user that turning `cleanup: true` on will delete **everything on the live site that isn't in the repo**, including files uploaded by hand in the Neocities dashboard, and only flip it with the user's OK, then push and confirm the old pages are gone.
- Never print or echo the token, never commit it, and never put it in `workflow_dispatch` inputs.
- The `workflow_dispatch` trigger lets the user re-run the deploy from the Actions tab without a new commit.
- Do not push to `master` to test this without the user's say-so. Push is what publishes.

**After the first deploy, check the live site:** `/`, `/bbs.html`, `/film.html`, a CSS-dependent page (that styling loads), the guestbook iframe on the homepage, and the webring links in the footer. Report any failures from the Actions run log.

## Open questions

1. **Where did the old publishing workflow go?** None exists in this repo. If another repo or script still publishes the site, running both could conflict, so the user should turn that off.
