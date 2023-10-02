![spoilerTags: a tag-filtering plugin written by glenthemes](https://user-images.githubusercontent.com/45606634/210123004-0344acf6-75b4-44e7-a204-e3cd1af1739e.png)

### <sub>TABLE OF CONTENTS:</sub>

* ┈┈ [ᴀʙᴏᴜᴛ](#about)
* ┈┈ [ᴅᴇᴍᴏ](https://jsfiddle.net/glenthemes/m2qsevh0/show)
* ┈┈ [ғᴇᴀᴛᴜʀᴇs](#features)
* ┈┈ [ʜᴏᴡ ᴛᴏ ᴜsᴇ](#how-to-use)
* ┈┈ [ɴᴇᴇᴅ ʜᴇʟᴘ?](#help--troubleshooting)

---

### <sub>ABOUT:</sub>

Originally created for Tumblr use, **.spoilerTags()** is a tag-filtering plugin for blog themes based on the [existing tag filtering system for the Tumblr dashboard](https://tumblr.zendesk.com/hc/en-us/articles/115015814708-Tag-filtering). You can set your own tags to filter, and if a post contains those tags, it will cover it up with a warning message, which readers can dismiss by clicking a button if they still wish to proceed. This is helpful for your followers or passers-by who wish to go through your blog without being spoiled, or seeing something they potentially might not want to see.

※ this plugin is not exclusive to Tumblr, and can also be used on other sites for temporarily hiding particular content.

| ▼ ᴘʟᴇᴀsᴇ ɴᴏᴛᴇ:     |                 |
|:--------------------|-----------------|
| **Requirements:**   | jQuery             |
| **Not supported:**  | [infinite scroll](https://infiniteajaxscroll.com/infinite-scroll-faq)    |

┏━━━━━━━━━━━━━━━┓  
  
˗ˋˏ┈┈┈┈  [**VIEW DEMO**](https://jsfiddle.net/glenthemes/m2qsevh0/show)  ┈┈┈┈ˎˊ˗  
  
┗━━━━━━━━━━━━━━━┛

---

### <sub>FEATURES:</sub>

- filter anything from spoilers to content warnings!
- custom warning message
- option to include or exclude ‘#’ before tags
- custom tags separator
- custom ‘<kbd>show anyway</kbd>’ text
- option to shrink posts until click expand
- adjustable colors

---


### <sub>HOW TO USE:</sub>

These instructions cater specifically to using this plugin on Tumblr blogs.  
If you are using this plugin *outside* of Tumblr, please refer to my [demo](https://jsfiddle.net/glenthemes/m2qsevh0)'s code!  

───────────・ʚɞ・────────────

### <sub>STEP 1 — locating your POSTS:</sub>

Search for `{block:Posts}` in your theme's code.

On the next line or so, you should see something that looks like (or at least starts with) the following:
```
<div class="posts">
```

Add `posts-selector` at the end like this:
```
<div class="posts" posts-selector>
```

───────────・ʚɞ・────────────

### <sub>STEP 2 — locating your TAGS:</sub>

Search for `{block:Tags}` in your theme's code.

On the next line or so, you should find `#{Tag}`  
This may or may not come with a `#` before it, though it doesn't really matter.

On this line, add `init-tags` like this:
```
{block:Tags}
<a href="{TagURL}" init-tags>#{Tag}</a>
{/block:Tags}
```

───────────・ʚɞ・────────────

### <sub>STEP 3 — jQuery:</sub>

This plugin requires jQuery, but you can skip this step if you already have it installed.

To check if your theme has jQuery in it or not, search for `ajax.googleapis.com/ajax/libs/jquery` or just `jquery`.  
If you find it as a link that ends in `.js`, great! Skip to **step 4**.

If you **can't** find it, add this under `<head>`:
```
<script src="https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"></script>
```

───────────・ʚɞ・────────────

### <sub>STEP 4 — insert the required files:</sub>

Paste this under `<head>`. Please also make sure this comes *after* the jQuery!
```
<!--------- HIDE POSTS WITH SPOILER TAGS | @glenthemes -------->
<script src="//spoilertags.gitlab.io/s/filter.js"></script>
<link href="//spoilertags.gitlab.io/s/style.css" rel="stylesheet">
<script>
$(function(){
    $("[init-tags]").spoilerTags({
        filter:[
            "#spoiler",
            "#spoilers"
        ],
        
        message: "This post contains the following:",
        includeHashtag: "yes",
        tagSeparator: ",",
        viewPostText: "show anyway",
        shrinkPosts: "yes"
    });
});
</script>

<style>
:root {
    --Spoiler-Overlay-Color: #fcfcfc;
    --Spoiler-Overlay-Transparency: 0%; /* MUST be in % */
    
    --Warning-Text-Size: 12px;
    --Warning-Text-Color: #222;
    --Spoiler-Tags-Color: #222;
    
    --ViewPost-Button-Padding: 10px;
    --ViewPost-Button-Border: #eee;
    --ViewPost-Button-Roundness: 3px;
    --ViewPost-Button-Background: #fefefe;
    --ViewPost-Button-FontSize: 80%;
    --ViewPost-Button-Text-Color: #222;
    
    --ViewPost-Button-HOVER-Border: #222;
    --ViewPost-Button-HOVER-Background: #222;
    --ViewPost-Button-HOVER-Text-Color: #eee;
    
    --ShrinkPost-Transition-Speed: 699ms; /* can be in ms or s */
}
</style>
```
You can customize the cover overlay and text appearance options in the above list (called `:root`)!


───────────・ʚɞ・────────────

### <sub>STEP 5 — set your custom tags:</sub>

Look for `.spoilerTags` – this should take you back up to where we pasted our stuff earlier:  
  
![image](https://user-images.githubusercontent.com/45606634/210124376-59f50348-b69a-4f38-8438-ab513130d652.png)  
  
The tags `#spoiler` and `#spoilers` have been automatically selected for you, but you can add or change them to whatever your own spoiler tags are.

Make sure that:
- each tag goes between quotation marks.  
  do NOT remove them / forget to close them
- always put a comma after each `"#tag"`.  
  your last tag doesn't have to have a comma but you can include it if you want
- do not remove the `closing square bracket & its comma` after the tags: `],`
- type in your tags *exactly* as how you did them when you originally made or reblogged a post.  
  so if e.g. you want to filter `#bnha spoilers`, that's exactly what you type in; there's no need to swap out the <kbd>space</kbd> with a hyphen <kbd>-</kbd> for this


───────────・ʚɞ・────────────

### <sub>STEP 6 — more settings:</sub>

After setting the tags that you want filtered, directly below that are 5 options:  
  
![image](https://user-images.githubusercontent.com/45606634/210124501-1922a3e0-7a03-4b17-a1c3-08bb490cdc7b.png)  
  
Here is a description of what each of them are, and what you can do with them:

| ▼ ᴏᴘᴛɪᴏɴ ɴᴀᴍᴇ:  | What it does: |
|:-----------------|:---------------|
| `message`        | The warning message you want to display to your readers when a post contains a spoiler tag.<br>Remember to keep the sentence within the quotation marks.<br><br>**Examples:**<br>❃ `message: "This post contains spoilers!",`<br>❃ `message: "Spoilers ahead!",`<br>❃ `message: "This post contains the following warnings:",`|
| `includeHashtag`  | This controls whether your filter tags (in the warning message) will appear with a `#` before the tag, or without it.<br><br>❃ `includeHashtag: "yes",` — will show as `#spoiler, #long post`<br>❃ `includeHashtag: "no",` — will show as `spoiler, long post` |
| `tagSeparator`   | If a post contains more than one spoiler tag, they are separated by a comma by default.<br>You can change this to another symbol.<br><br>e.g. you want to change it to the vertical line `┋`, ideally we'd want a `space` on either side of it (e.g. `#spoilers ┋ #food mention`). Since this plugin automatically puts a space after the character and not before, you will need to manually insert a `space` before the `┋` to make it look as you want it to.<br><br>**Examples:**<br>❃ `tagSeparator: " ┋",`<br>❃ `tagSeparator: " /",`<br>❃ `tagSeparator: ";",`<br>❃ `tagSeparator: " +",` |
| `viewPostText`   | This is the text that you want your button to show. when clicked, the warning overlay fades out and reveals the post.<br><br>**Examples:**<br>❃ `viewPostText: "view post",`<br>❃ `viewPostText: "view anyway",` |
| `shrinkPosts`    | Some spoiler posts (especially metas) can get quite long and when you have the spoiler overlay over it, you'll just see a massive chunk of whitespace before you see the actual spoiler warning (since it's located in the center).<br>This `shrinkPosts` option is on by default, but you can turn it off you wish.<br><br>**Examples:**<br>❃ `shrinkPosts: "yes"` — make spoiler posts compact<br>❃ `shrinkPosts: "no"` — normal post height |


───────────・ʚɞ・────────────

### <sub>STEP 7 — final checks:</sub>

Exit the customize page and try and go to a post of yours that has one of the tags you filtered, and see if the warning overlay works properly.
If nothing happens, go through this guide again and double-check that you've done all the steps. If your theme breaks or if it doesn't work, you can contact me below for help.

───────────・ʚɞ・────────────

### <sub>HELP / TROUBLESHOOTING:</sub>

Things I need in order to help you:
- your blog username/url
- your *full* theme code; you can create a copy on [pastery.net](https://pastery.net) and send it over.

Where to ask:
- Discord, through **#theme-help** or **DM**: [discord.gg/RcMKnwz](https://discord.gg/RcMKnwz)
- email: `glenthemes.exe@gmail.com`
