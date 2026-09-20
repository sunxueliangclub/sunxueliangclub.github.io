Zhou Group static site replica
================================

Entry:
  index.html  (same page as Home.html)

Independent pages:
  Home.html
  News.html
  Research.html
  Publications.html
  People.html
  Photos.html
  Opening.html

Requested mapping:
  Home   <- Welcome to Prof. Tong Zhou's Research Group.html
  People <- Welcome to Zhou Group.html

What was preserved:
- Original uploaded HTML, inline CSS/JS, page content, animations, images and page-specific styles.
- Genuine external links such as journals, DOI pages, faculty pages and institution websites.

What was localized:
- The seven main navigation endpoints now point to the local independent HTML files.
- Uploaded resource bundles are organized under assets/<page>/.
- The favicon points to a bundled local logo.
- Publication PDFs that were referenced but not included in the uploaded ZIP stay functional via https://zhouphy.com/articles/....

Resource fallback:
- The uploaded style.css files reference image/groupleader.jpg, but that file was absent from all uploaded resource ZIPs.
- assets/image/groupleader.jpg is therefore populated from the provided People-page portrait assets/people/tzhou.jpg so the static bundle has no broken local CSS resource.

Validation:
- Missing HTML local references: 0
- Missing CSS local references: 0
- Main navigation is localized on all seven pages.

CSS / JS optimization (v2)
--------------------------
- Seven byte-identical page copies of style.css were deduplicated into assets/css/common.css.
- Genuine page-specific inline CSS was extracted into assets/css/<page>.css.
- Inline JavaScript was extracted into assets/js/.
- The Research/Openings menu-toggle scripts were consolidated into assets/js/site.js.
- Home, Publications and Photos keep separate page JS so pages do not download unrelated logic/data.
- Saved-page browser-extension CSS/shadow-DOM (Immersive Translate and unrelated injected UI styles) was removed.
- No inline <style> or inline <script> blocks remain in the seven delivered pages.

Runtime verification (v2)
-------------------------
- All 7 pages load into a browser DOM without JavaScript page errors.
- Home slider next-button behavior passed.
- Publications rendered 68 items and search filtering passed.
- Photos rendered 18 cards and lightbox open/close passed.
- HTML/CSS local-reference validation reports 0 missing resources.
- JavaScript syntax validation passed for all generated JS files.
- Text payload reduction (HTML+CSS+JS): 73.0%.

Publications data separation
----------------------------
- 68 publication records are stored in assets/data/publications-data.js.
- assets/js/publications.js now contains only de-duplication, sorting, rendering and search behavior.
- To add/update publications, edit publications-data.js only.
- See assets/data/README-publications.txt for the maintenance format.
