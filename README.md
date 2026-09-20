# forceproductions.ca

A one-page marketing site for Force Productions, built with Jekyll and hosted on
GitHub Pages.

---

## Making changes without touching code

Almost everything on the site lives in the `_data/` folder as plain text. Open a
file on GitHub, click the pencil icon, edit, and commit — the site rebuilds and
goes live in about a minute.

| What you want to change | File to edit |
|---|---|
| Email address, company name, service area | `_config.yml` |
| Social media links | `_data/social.yml` |
| The videos in the portfolio | `_data/portfolio.yml` |
| The four service descriptions | `_data/services.yml` |
| The About text and mission | `_data/about.yml` |
| The client list | `_data/clients.yml` |
| The client quote | `_data/testimonial.yml` |

### Adding a social link

Open `_data/social.yml` and paste the URL between the quotes:

```yaml
- name: Instagram
  icon: instagram
  url: "https://instagram.com/yourhandle"
```

Links left blank do not appear on the site. Nothing else needs changing.

### Adding a video

Open `_data/portfolio.yml`, copy an existing block, and change the fields:

```yaml
- title: Name of the piece
  client: Who it was for
  year: 2026
  provider: vimeo          # vimeo or youtube
  id: "123456789"          # the number at the end of the Vimeo URL,
                           # or the part after "v=" on YouTube
  poster: /assets/img/portfolio/vimeo-123456789.jpg
  show: true
  blurb: >-
    Optional couple of sentences about the project.
```

For the poster image, save a still into `assets/img/portfolio/` and point
`poster:` at it. A 16:9 image around 1280x720 works best.

To hide a video without deleting it, change `show: true` to `show: false`.
To reorder the grid, move the blocks up or down.

---

## About the content

The text on this site was carried over from the old WordPress site as close to
word-for-word as possible. The only changes made were:

- **Typos fixed.** In the client quote, "what sets there productions apart" →
  "their", and "a very unique was of positioning questions" → "way". In one
  blurb, "gender, of period in history" → "or period in history".
- **Trimmed for length.** The case-study blurbs under each video are excerpts
  from the original blog posts, not the full posts.
- **Newly written** (there was no original to carry over): the navigation
  labels, section headings ("What we make", "The reel", "Who we've worked
  with", "Let's tell your story"), image alt text, and the search-engine
  description. The H1 — "Video production in Cambridge, Kitchener & Waterloo" —
  was written for local search.

Everything else — the mission statement, the four service descriptions, the
About text, the client quote, the tagline "Stories that Spark Conversation." —
is Andy's own wording.

### Videos that did not survive

Five videos linked from the old blog posts have been deleted or made private on
YouTube and could not be included:

`eCwBK2aGDIU` (Seishin main film), `C4wH3i81A2o` (ADHD and Activity),
`lxvS88MUWRo` (Next Level Performance), `ruOtsgAuZew` (Dynamic Camera Movement),
`oMFIO-_z2zM` (Life is Cooler in Slow Motion).

If copies exist anywhere, re-uploading them and adding the new IDs to
`_data/portfolio.yml` would bring those case studies back.

### Old post URLs

The old blog posts are not carried over. If redirects are ever wanted, these are
the slugs that existed:

```
about                          production-services
contact                        life-is-cooler-in-slow-motion
please-dont-squirt-me          you-should-have-a-video-made
next-level-performance-client-success
3-act-structure-for-inbound-video-production-success
inbound-video-creation-camera-movement
lights-camera-active           you-outside-in-naturecbc-30x30-success
recruiting-for-the-active-city-season-3
hd-real-estate-video-production
adhd-and-activity-success      new-portfolio-added-to-vimeo
brawl-video-production-bts     video-production-osteoporosis-canada
video-production-karate-by-jesse
```

---

## Running it locally

Requires Ruby and Bundler.

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000>.

> **On macOS**, if `bundle install` fails while compiling `eventmachine` with
> `fatal error: 'iostream' file not found`, point it at the system SDK:
>
> ```sh
> bundle config set --local build.eventmachine \
>   "--with-cppflags=-I$(xcrun --show-sdk-path)/usr/include/c++/v1"
> bundle install
> ```

## How it deploys

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

**One-time setup in the repo settings:** under *Settings → Pages*, set *Source*
to **GitHub Actions**. Then point the domain's DNS at GitHub:

- Four `A` records for `forceproductions.ca` → `185.199.108.153`,
  `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- A `CNAME` record for `www` → `<username>.github.io`

Once DNS resolves, tick **Enforce HTTPS** in *Settings → Pages*. The `CNAME`
file in this repo already holds the domain.

## Notes on how it's built

- **No third-party requests until a click.** Video embeds are click-to-load
  facades: a local poster image and a play button. Nothing is requested from
  YouTube or Vimeo until a visitor actually presses play.
- **Structured data.** `_includes/schema.html` emits JSON-LD describing the
  business, its service area and every video, so search engines and AI
  assistants can read the site accurately. It is generated from the same data
  files, so it stays correct when content is edited.
- **`llms.txt`** at the site root is a plain-text summary for AI assistants.
  Worth updating if the services or service area change.
