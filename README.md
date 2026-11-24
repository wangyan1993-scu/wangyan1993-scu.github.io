# Yan Wang Personal Homepage

Static GitHub Pages site for Yan Wang, hosted at <https://wangyan1993-scu.github.io/>.

The homepage contains three sections:

- Profile
- News
- Publications

The website supports English and Chinese through the language switch in the header.
It remembers the selected language locally. News entries stay in English in both
languages. Publication titles, authors, and venues retain their original wording.
The static HTML remains readable without JavaScript.

The stylesheet and language script URLs in `index.html` include a `v` query
parameter. Bump the corresponding version whenever changing either asset so
returning visitors load the updated files instead of a cached copy.

## Visit Analytics

Cloudflare Web Analytics records page views without displaying a visitor counter
on the homepage. Sign in to the owning Cloudflare account and open Web Analytics
for `wangyan1993-scu.github.io` to view reports.

The site token in the HTML is a public collection identifier, not an account API
key. Keep account credentials out of this repository. Statistics start after
installation; browser blocking or network failures can prevent collection.
