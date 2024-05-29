/*---------------------------------------------------------

    spoilerTags @glenthemes
    github.com/glenthemes/spoilerTags

    [#] v3.0.0: 2024-05-28
    [#] Last updated: 2024-05-28 6:29PM [PDT]
    
---------------------------------------------------------*/

window.spoilerTagsV3 = function(params){
    let spoilerTagsInit = (params) => {
        // check the arguments
        let spoilerFilters = params.filter;
        let spoilerMessage = params.message;
        let spoilerHashtag = params.includeHashtag;
        let spoilerSeparator = params.tagSeparator;
        let spoilerViewText = params.viewPostText;
        let spoilerShrink = params.shrinkPosts;

        if(spoilerFilters && Array.isArray(spoilerFilters)){
            for(let i=0; i<spoilerFilters.length; i++){
                // #food --> food
                if(spoilerFilters[i].indexOf("#") > -1){
                    spoilerFilters[i] = spoilerFilters[i].replaceAll("#","");
                }
            }
            // console.log(spoilerFilters)
        }

        let getRoot = (VAR) => {
            return getComputedStyle(document.documentElement).getPropertyValue(VAR).replaceAll('"','').replaceAll("'","").trim();
        }

        let getSpeed = (s) => {
            let res;
            let nums = Number(s.replace(/[^\d\.]*/g,""));
            let units = s.toLowerCase().replace(/[^a-z]/g,"");
            units == "s" ? res = nums*1000 : res = nums;
            return res
        }

        let shrinkSpeedWithUnits = getRoot("--Shrink-Posts-Speed");
        let shrinkSpeed = getSpeed(getRoot("--Shrink-Posts-Speed"));
        let fadeSpeed = getSpeed(getRoot("--Spoiler-Fade-Speed"));

        // check if things exist on the site
        let posts = document.querySelector("[posts-selector]");
        let postTags = document.querySelector("[init-tags]");

        // NO POSTS / NO TAGS: warn the user
        !posts ? console.warn("spoilerTags: no [posts-selector] found.") : ""
        !postTags ? console.warn("spoilerTags: no [init-tags] found.") : ""

        // HAS POSTS: proceed
        document.querySelectorAll("[posts-selector]:not(:has(.spoilertags))")?.forEach(post => {
            // clean up unwrapped text nodes (if there are any)
            let stack = [post];            
            while(stack.length > 0){
                let currentNode = stack.pop();
                if(currentNode.nodeType === 3 && currentNode.data.trim().length > 0 && (currentNode.parentNode && !currentNode.parentNode.matches("span"))){
                    let span = document.createElement("span");
                    currentNode.before(span);
                    span.appendChild(currentNode);
                } else if(currentNode.childNodes.length > 0){
                    for(let i=currentNode.childNodes.length-1; i>=0; i--){
                        stack.push(currentNode.childNodes[i]);
                    }
                }
            }

            // wrap post's inner contents
            let postInner = document.createElement("div");
            postInner.classList.add("spoilertags-post-inner")
            post.prepend(postInner);

            let contA = document.createElement("div");
            contA.classList.add("spoilertags-hug-a");
            postInner.prepend(contA);

            let contB = document.createElement("div");
            contB.classList.add("spoilertags-hug-b");
            contA.prepend(contB);

            post.querySelectorAll(":scope > *:not(.spoilertags-post-inner)")?.forEach(n => {
                contB.append(n)
            })

            // shrink posts
            if(spoilerShrink == "yes" || spoilerShrink == "true" || spoilerShrink === true){
                post.setAttribute("shrink-posts","");
            }
            
            // normal posts
            else {
                post.setAttribute("normal-posts","");
                let postMinHeight = getRoot("--Posts-Min-Height");
                if(Number(postMinHeight) || postMinHeight.indexOf("px") > -1){
                    postMinHeight = Number(postMinHeight.replace(/[^\d\.]*/g,""))
                } else {
                    postMinHeight = 0;
                }

                let cntna = Date.now();
                let goxfy = setInterval(() => {
                    if(Date.now() - cntna > 699){
                        clearInterval(goxfy)
                    } else {
                        let postHeight = post.querySelector(".spoilertags-hug-a")?.offsetHeight;
                        if(postHeight > 0){                            
                            if(postHeight >= postMinHeight){
                                post.style.setProperty("--Shrink-Posts-Speed","0s");
                            } else {
                                post.style.setProperty("--Shrink-Posts-Speed",shrinkSpeedWithUnits);
                            }
                        }
                    }
                },1)
            }

            // find [init-tags] within post scope
            let matches = [];
            if(post.querySelector("[init-tags]")){
                post.setAttribute("has-tags","");

                post.querySelectorAll("[init-tags]")?.forEach((tag,i) => {
                    let tagText = tag.textContent;
                    if(tagText.indexOf("#") > -1){
                        tagText = tagText.replaceAll("#","");
                    }

                    let match = spoilerFilters.findIndex(x => x === tagText);

                    if(match > -1){
                        matches.push(tagText);

                        // if there's a match, add the spoiler filter
                        if(!post.matches("[has-spoiler-tags]")){
                            post.setAttribute("has-spoiler-tags","");

                            // make spoiler overlay[s]
                            let coverA = document.createElement("div");
                            coverA.classList.add("spoilertags-cover-a");
                            coverA.classList.add("spoilertags");
                            post.prepend(coverA);

                            let coverB = document.createElement("div");
                            coverB.classList.add("spoilertags-cover-b");
                            coverA.prepend(coverB);

                            let coverC = document.createElement("div");
                            coverC.classList.add("spoilertags-cover-c");
                            coverC.classList.add("screen");
                            coverB.prepend(coverC);

                            let msgDiv = document.createElement("p");
                            msgDiv.classList.add("spoilertags-message");
                            msgDiv.classList.add("message");
                            coverC.append(msgDiv);
                            if(spoilerMessage && typeof spoilerMessage == "string" && spoilerMessage.trim() !== ""){
                                msgDiv.innerHTML = spoilerMessage
                            } else {
                                msgDiv.textContent = "This post contains the following:"
                            }

                            let listTags = document.createElement("p");
                            listTags.classList.add("spoilertags-tags");
                            listTags.classList.add("tags");
                            coverC.append(listTags);

                            let viewCont = document.createElement("div");
                            viewCont.classList.add("spoilertags-btn-wrap");
                            coverC.append(viewCont);

                            let viewBtn = document.createElement("button");
                            viewBtn.classList.add("spoilertags-btn");
                            viewBtn.textContent = "Show anyway";
                            viewCont.append(viewBtn);
                        }
                    }

                    // last case of [init-tags] in that post
                    if(i == post.querySelectorAll("[init-tags]")?.length-1){
                        // console.log(matches);

                        let findList = post.querySelector(".spoilertags-tags");
                        if(findList){
                            // list tags starting with "#" ?
                            if(spoilerHashtag == "yes" || spoilerHashtag == "true" || spoilerHashtag === true){
                                if(matches[0].slice(0,1) !== "#"){
                                    for(let j=0; j<matches.length; j++){
                                        matches[j] = `#${matches[j]}`;
                                    }
                                }
                            } else {
                                if(matches[0].slice(0,1) == "#"){
                                    for(let j=0; j<matches.length; j++){
                                        matches[j] = matches[j].slice(1);
                                    }
                                }
                            }

                            // list tags and separate them with what character(s)?
                            if(spoilerSeparator && spoilerSeparator.trim() !== "" && typeof spoilerSeparator == "string"){
                                findList.textContent = matches.join(spoilerSeparator)
                            } else {
                                findList.textContent = matches.join(", ")
                            }
                        }

                        let findBtn = post.querySelector(".spoilertags-btn");
                        if(findBtn){
                            if(spoilerViewText && spoilerViewText.trim() !== "" && typeof spoilerViewText == "string"){
                                findBtn.textContent = spoilerViewText;
                            }
                            
                            let toteSpeed = Math.floor(fadeSpeed + shrinkSpeed);

                            findBtn.addEventListener("click", () => {
                                post.classList.add("spoilertags-active");
                                setTimeout(() => {
                                    let findCover = post.querySelector(".spoilertags-cover-a");
                                    findCover.remove();
                                    post.classList.remove("spoilertags-active");
                                    post.removeAttribute("has-spoiler-tags");
                                },toteSpeed)
                            })
                        }
                    }
                })//end [init-tags] each
            }
            
        })// end posts each
    }//end spoilerTagsInit

    document.readyState == "loading" ?
    document.addEventListener("DOMContentLoaded", () => spoilerTagsInit(params)) :
    spoilerTagsInit(params);
}//end spoilerTags func
