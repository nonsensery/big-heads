# Big Heads for Google Hangouts

Sometimes in a group hangout, it's nicer to see everyone all the time, rather than just the person who is currently "speaking".

The solution is to click on your own thumbnail (so that you are always the "speaker"), and then zoom and pan the page content so that the thumbnails fill the whole width of the window. This can be done pretty easily by applying `translate()` and `scale()` CSS `transform`s to the body element.

This project generates a bookmarklet does just that.

## Using Big Heads

1. After joining a hangout, run the bookmarklet code to install Big Heads.
2. Then, click on your own thumbnail to select it. That way, everyone else's video will appear in their thumbnails.
3. Now you can zoom in on everyone else's thumbnails by typing `+` (no modifiers).
4. You can zoom back out by typing `-`.

**Tips:**

- You use either the main keyboard, or the number pad to type the `+` and `-`.
- You can also type `=` to zoom in, since that's the `+` key without shift held down on my keyboard layout.

## Building

We use Gulp to minify the code and create the bookmarklet. To get started, just run `npm install`.

Use `npm run build` to build once; `npm run watch` for continuous builds.

The bookmarklet output is stored in `dist/bookmarklet.js`.

## Installing

Just create a new bookmarklet from it!
