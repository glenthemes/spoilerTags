![spoilerTags: a tag-filtering plugin written by glenthemes](https://user-images.githubusercontent.com/45606634/210123004-0344acf6-75b4-44e7-a204-e3cd1af1739e.png)

### <sub>TABLE OF CONTENTS:</sub>

* ┈┈ [About](#about)
* ┈┈ [Requirements](#requirements)
* ┈┈ [Demo](#demo)
* ┈┈ [Install / How to Use](#how-to-use)
* ┈┈ [Help / Troubleshooting](#need-help)

---

### <sub>ABOUT:</sub>

Originally created for Tumblr use, **spoilerTags()** is a tag-filtering plugin for blog themes based on the [existing tag filtering system for the Tumblr dashboard](https://tumblr.zendesk.com/hc/en-us/articles/115015814708-Tag-filtering). You can set your own tags to filter, and if a post contains those tags, it will cover it up with a warning message, which readers can dismiss by clicking a button if they still wish to proceed. This is helpful for your followers or passers-by who wish to go through your blog without being spoiled, or seeing something they potentially might not want to see.

※ this plugin is not exclusive to Tumblr, and can also be used on other sites for temporarily hiding particular content.

---

### <sub>REQUIREMENTS:</sub>

* As of October 2023, jQuery is no longer required :tada:
* Basic CSS & HTML knowledge is a plus.

---

### <sub>DEMO:</sub>

![spoilerTags screenshot GIF demo.](https://64.media.tumblr.com/9ece0c790a4d9c31ab9f3337593a833c/64ba7621e0cde398-03/s640x960/8d2dd876cc4345bd1e9da0780c66cea52221aaaf.gif)

**Demo Preview:**  
:mag: [jsfiddle.net/glenthemes/4h1n3g7r/show](https://jsfiddle.net/glenthemes/4h1n3g7r/show)

**Demo Code:**  
:pencil: [jsfiddle.net/glenthemes/4h1n3g7r/](https://jsfiddle.net/glenthemes/4h1n3g7r/)

---

### <sub>HOW TO USE:</sub>

<sup>※ The following instructions are for Tumblr users.</sup>

:cherry_blossom: **Step 1 &mdash; Find your posts:**

Start by finding `{block:Posts}` or `{block:Posts` in your theme code.  
If you see `{block:PostSummary}`, ignore that.  
Once you've found it, add `posts-selector`, like so:
```html
<div class="posts" posts-selector>
```

---

:cherry_blossom:&ensp;**Step 2 &mdash; Find your tags:**

Find `{Tag}` in your theme. That line and its surrounding lines should look something like this:
```html
{block:Tags}
<a href="{TagURL}">{Tag}</a>
{/block:Tags}
```

Add `init-tags`, like so:
```html
{block:Tags}
<a href="{TagURL}" init-tags>{Tag}</a>
{/block:Tags}
```

---

:cherry_blossom:&ensp;**Step 3 &mdash; Adding the essentials:**

Paste the following after `<head>`:
```html
<!--✻✻✻✻✻✻  spoilerTags by @glenthemes  ✻✻✻✻✻✻-->
<script src="//spoilertags.gitlab.io/s/v2/filter.js"></script>
<link href="//spoilertags.gitlab.io/s/v2/style.css" rel="stylesheet">
<script>
document.addEventListener("DOMContentLoaded", () => {
    spoilerTagsV2({
        filter: [
            "#spoiler",
            "#spoilers",
        ],
        
        message: "This post contains the following:",
        includeHashtag: "yes",
        tagSeparator: ", ",
        viewPostText: "show anyway",
        shrinkPosts: "yes"
    })
})
</script>
<style spoilertags>
:root {
    --Spoiler-Overlay-Color:#ffffff;
    
    --Spoiler-Warning-Padding:25px;
    --Spoiler-Warning-Color:#50586c;
    --Spoiler-Warning-Row-Spacing:1em;
    
    --Spoiler-Tags-Color:#222222;
    
    --Spoiler-Button-Padding:0.7rem;
    --Spoiler-Button-Background:#ffffff;
    --Spoiler-Button-Border:#eeeeee;
    --Spoiler-Button-Roundness:4px;
    --Spoiler-Button-Text-Color:#444444;
    --Spoiler-Button-HOVER-Border:#222222;
    --Spoiler-Button-HOVER-Background:#222222;
    --Spoiler-Button-HOVER-Text-Color:#efefef;
    --Spoiler-Button-HOVER-Speed:0.25s;
    
    --Spoiler-Fade-Speed:0.4s;
    --Shrink-Posts-Speed:0.8s;
}
</style>
```
---

:cherry_blossom:&ensp;**Step 4 &mdash; Change the tags you want filtered:**

From the code we pasted from the previous step, you can set your tags here:

<img width="217" alt="Screenshot of the section of code where you can assign your filter tags." src="https://github.com/glenthemes/spoilerTags/assets/45606634/3cfe77df-d24a-4c10-9025-711146416416">


Things to note:
* Each line represents one tag.
* Make sure that each tag *stays inside the quotation marks*.
* Make sure each tag has a comma `,` at the end.
* Your list of tags should stay inside the square brackets area `[ ]`.

---

:cherry_blossom:&ensp;**Step 5 &mdash; Warning message:**

<img width="369" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/bd208a44-48dc-4e49-9eeb-6b6c1cecfce0">

Things to note:
* Make sure that message *stays inside the quotation marks*.
* Do not remove the comma `,` at the end.

---

:cherry_blossom:&ensp;**Step 6 &mdash; Include/Exclude hashtag:**

Declare whether you want a hashtag `#` to precede each tag or not.

<img width="182" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/660c8a6f-6c6b-4a10-b65a-9bc54c0f1472">

| Available Options: | What it looks like |
| ----------------- | ------------------------------------------------------------------ |
| `yes` | <img width="147" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/4c6a1b8c-4ed6-4b7e-820e-680e9fa22fed"> |
| `no` | <img width="139" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/4d3a884a-6dd5-497c-bbfe-a45a5f9e6b75"> |

Things to note:
* Make sure that `yes` or `no` *stays inside the quotation marks*.
* Do not remove the comma `,` at the end.

---

:cherry_blossom:&ensp;**Step 7 &mdash; Tag separator:**

Declare how you want multiple tags to be separated.

<img width="163" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/286b8593-a650-4ac4-9caf-291277a9cfc5">

Things to note:
* Make sure that your separator (including any spaces) *stays inside the quotation marks*.
* Do not remove the comma `,` at the end.

---

:cherry_blossom:&ensp;**Step 8 &mdash; "Show Anyway" button text:**

<img width="237" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/4e5f1b14-ca67-4587-97a0-946952baadbe">

Things to note:
* Make sure that your button text *stays inside the quotation marks*.
* Do not remove the comma `,` at the end.

---

:cherry_blossom:&ensp;**Step 9 &mdash; Shrink posts**

Declare whether or not you want long posts to shrink/shorten.

<img width="167" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/73912a12-da8a-4c23-b290-9d0702dd3aa4">

---

:cherry_blossom:&ensp;**Step 10 &mdash; Customize Appearance**

Colors, padding, hover speeds etc can be customized in this list called `:root`:  
<img width="380" alt="image" src="https://github.com/glenthemes/spoilerTags/assets/45606634/b7c4db19-eb1d-4924-8aff-824e256f89b7">

---

### <sub>NEED HELP?</sub>

Please contact me on Discord ([discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)) either through DM or in the **#theme-help** channel of my server!

When asking for help, please remember to include:
* What theme you're using (if applicable), and by who.
* Full theme code, you can paste it through [pastery.net](https://pastery.net).
* Summary of what you're trying to do / what you're stuck on!

---

### <sub>THANK YOU :gift_heart:</sub>

If you found **spoilerTags** useful, please consider dropping me a tip! :sparkles:  
:coffee:&ensp;[ko-fi.com/glenthemes](https://ko-fi.com/glenthemes)
