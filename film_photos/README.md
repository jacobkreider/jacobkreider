# film_photos

Images for the Film Photography gallery (`film.html` and `film/roll-NN.html`).

## Layout

```
film_photos/
├── full/           full-size JPEGs (~1800 px on the long side, quality 82), loaded only in the lightbox
├── thumbs/         thumbnails (440 px wide, quality 80), loaded by the grids
├── manifest.json   record of what tools/add-photos.py has imported (don't edit by hand)
├── import-options.json   zip entries to skip on import (edit by hand)
└── README.md       this file
```

Only these resized copies go in git. Never commit original scans or camera files.

`placeholder-01.jpg` to `placeholder-03.jpg` (in both `full/` and `thumbs/`) are the
charcoal "PLACEHOLDER" frames used by the three sample cards on `film.html`. Delete them
along with those cards once real photos are on the page.

## manifest.json

`tools/add-photos.py` writes this file so it never processes the same photo twice. For
each zip it imports from, it maps every zip entry name to:

- `name`: the output filename (without `.jpg`) in `full/` and `thumbs/`
- `crc32` and `size`: taken from the zip's index, used to spot edited photos

It is committed to git. **Don't edit it by hand.** To re-import a photo from scratch, delete
its two JPEGs; the script regenerates missing files on the next run.

## import-options.json

Hand-edited, per zip. `skip` lists zip entries never to import, for example a raw scan that
already has an edited copy (`~2`) in the zip:

```json
{
  "2026_Favorite_Film.zip": {
    "skip": ["2026 Favorite Film/009377470028.jpg"]
  }
}
```

Adding an already-imported entry to `skip` leaves its files in place; delete them by hand.
Removing an entry from `skip` imports it on the next run. Photos are turned upright from
their EXIF orientation automatically, so a scan that looks sideways in some viewers is
usually fine.

## Adding photos

1. Add the photos to `~/Downloads/2026_Favorite_Film.zip`. Don't rename entries that are
   already in the zip: the manifest keys on the entry name.
2. From the repo root, run:

   ```
   python3 tools/add-photos.py
   ```

   Add `--dry-run` to see what would happen without writing anything, or
   `--zip ~/Downloads/2027_Favorite_Film.zip` to import a different zip.
   Resizing needs ImageMagick (`sudo apt install imagemagick`; the script tells you if it's
   missing).
3. The script prints the new filenames. For each one, copy a
   `<figure class="photo-card">…</figure>` block into the roll's page (and into the
   Favorites grid on `film.html` if it's a favorite), then set the filename, frame label and
   the film-and-year-month caption (for example `Kodak Portra 400 · 2026-10`).
4. Commit `film_photos/` (including `manifest.json`) along with the HTML changes, then push.

What the script does on each run:

- entries already in the manifest with the same CRC-32 and size are **skipped**
- an entry whose CRC-32 or size changed (you replaced a photo with an edited version) is
  **reprocessed** under the same name, and reported as changed
- an entry that has gone from the zip is **only reported**; its files stay here until you
  delete them by hand (and remove its card from the page)
- if a known entry's output files are missing, they are **regenerated**
- two entries that would get the same name get `-2`, `-3`, … appended
- entries in `import-options.json`'s `skip` list are left out

It never modifies the zip or anything else in `~/Downloads`, and never edits HTML.

### Worked example

You've already imported 50 photos and add three more to the zip:

```
$ python3 tools/add-photos.py
3 new, 50 skipped, 0 changed, 0 missing from zip

New photos:
  img-0101.jpg
  img-0102.jpg
  img-0103.jpg

Next: add a <figure class="photo-card"> block for each new photo ...
```

`full/` and `thumbs/` now each contain `img-0101.jpg`, `img-0102.jpg` and `img-0103.jpg`,
and `manifest.json` has three new entries. Running the script again prints
`0 new, 53 skipped, 0 changed, 0 missing from zip`.

Names come from the zip filename, lowercased, with the extension dropped and spaces and
punctuation replaced by `-`: `IMG 0042.JPG` becomes `img-0042.jpg`. Which roll a photo
belongs to, its film stock and the month are set in the card's caption on the page, never in
the filename.
