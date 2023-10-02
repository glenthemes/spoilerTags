/*---------------------------------------------------------

    spoilerTags @glenthemes
    github.com/glenthemes/spoilerTags

    [#] v2.0.0: 2023-10-01
    [#] Last updated: 2023-10-01 4:48PM [PDT]
    
---------------------------------------------------------*/

window.spoilerTagsV2 = (q_q) => {
	let filter = q_q.filter;
	let message = q_q.message;
	let includeHashtag = q_q.includeHashtag;
	let tagSeparator = q_q.tagSeparator;
	let viewPostText = q_q.viewPostText;
	let shrinkPosts = q_q.shrinkPosts;
	
	/*---- SET DEFAULTS IF ARGS ARE EMPTY ----*/
	if(typeof filter == "undefined"){
		filter = ["#spoiler", "#spoilers"]
	}
	
	if(typeof message == "undefined"){
		message = "This post contains filtered tags."
	}
	
	if(typeof includeHashtag == "undefined"){
		includeHashtag = "yes"
	}
	
	if(typeof tagSeparator == "undefined"){
		tagSeparator = ","
	}
	
	if(typeof viewPostText == "undefined"){
		viewPostText = "View post"
	}
	
	if(typeof shrinkPosts == "undefined"){
		shrinkPosts = "yes"
	}
	
	/*---- CHECK IF ALL ARGS ARE PRESENT ----*/
	let exe = [filter, message, includeHashtag, tagSeparator, viewPostText, shrinkPosts];
	let uwu = exe.every(x => typeof x !== "undefined");
	if(uwu){
		let zfilter = filter;
		filter = [];
		zfilter.forEach(f => {
			f = f.replaceAll("#","");
			filter.push(f)
		})
		
		document.querySelectorAll("[posts-selector]")?.forEach(posts => {
			if(posts.querySelector("[init-tags]")){
				/*----- POST HEIGHT -----*/
				let postHeight = 0;
				let hfzmm = Date.now();
				let gbvkv = 1500;
				let nvpnd = setInterval(() => {
					if(Date.now() - hfzmm > gbvkv){
						clearInterval(nvpnd)
					} else {
						postHeight = posts.offsetHeight;
						posts.setAttribute("post-height",`${postHeight}px`)
					}
				},0);
				
				/*----- SPOILER OVERLAY -----*/
				let overlay = document.createElement("div");
				overlay.classList.add("spoiler-overlay");

				/*----- SPOILER TEXT -----*/
				let textCont = document.createElement("div");
				textCont.classList.add("spoiler-text");
				textCont.textContent = message;

				/*----- DISPLAY WHAT TAGS -----*/
				let tagsList = document.createElement("div");
				tagsList.classList.add("spoiler-tags");
				
				/*----- "SHOW ANYWAY" BUTTON -----*/
				let btnCont = document.createElement("div");
				btnCont.classList.add("show-spoiler");
				
				let btn = document.createElement("button");
				btn.textContent = viewPostText
				
				/*----- DEAL WITH TAGS -----*/
				let tagsStr = "";
				let tagsStrTrim = "";
				
				posts.querySelectorAll("[init-tags]")?.forEach(tags => {
					let tag = tags.textContent.trim().replaceAll("#","");
					let tagSepLength = tagSeparator.length;
					let match = filter.findIndex(x => x === tag);
					
					// if any tag in that post has triggered something in the filter system:
					if(match > -1){
						if(includeHashtag == "yes"){
							if(tag.slice(0,1) !== "#"){
								tag = `#${tag}`
							}
						} else {
							if(tag.slice(0,1) == "#"){
								tag = tag.slice(1)
							}
						}
						
						tagsStr += `${tag}${tagSeparator}`
						tagsStrTrim = tagsStr.slice(0,-tagSepLength);
						// if posts doesn't have [filtered-tags] attr yet:
						if(!posts.matches("has-filtered-tags")){
							posts.classList.add("has-filtered-tags");
							posts.setAttribute("filtered-tags",tagsStrTrim);
							posts.prepend(overlay);
							overlay.prepend(textCont)
							textCont.append(tagsList);
							tagsList.textContent = tagsStrTrim;
							textCont.append(btnCont);
							btnCont.append(btn)
							
							/*----- SPOILER TEXT HEIGHT -----*/
							let textHeight = 0;
							let kgxrj = Date.now();
							let gbvkv = 200;
							let pdkcm = setInterval(() => {
								if(Date.now() - kgxrj > gbvkv){
									clearInterval(pdkcm)
								} else {
									textHeight = textCont.offsetHeight;
									textCont.setAttribute("text-height",`${textHeight}px`);
									if(shrinkPosts == "yes"){
										// tall posts
										if(postHeight > textHeight){
											let oldHeight = posts.getAttribute("post-height");
											posts.setAttribute("old-post-height",oldHeight);
											posts.style.height = `${textHeight}px`
											
										}
									}//end: if shrinkPosts
									
									// if posts are shorter than the spoiler text height, regardless of shrinkPosts option, make it as tall as the spoiler text height
									if(!posts.matches("[old-post-height]")){
										// tall posts
										if(postHeight < textHeight){
											let oldHeight = posts.getAttribute("post-height");
											posts.setAttribute("old-post-height",oldHeight);
											posts.style.height = `${textHeight}px`
										}
									}
									
									
								}
							},0);
							
							/*----- BUTTON CLICK -----*/
							btn.addEventListener("click", e => {
								e.preventDefault();
								
								// stop cursor from glitching
								posts.classList.add("poof")
								
								// get fade speed
								let elFade = getSpeed("--Spoiler-Fade-Speed")
								
								// get shrink speed
								let shrinkSpeed = getSpeed("--Shrink-Posts-Speed");						
								
								// if needs to be shrunk
								if(posts.matches("[old-post-height]")){
									// fade out: text
									textCont.classList.add("leave");
									
									// shrink posts
									setTimeout(() => {
										posts.classList.add("post-shrink");
										posts.style.height = `${posts.getAttribute("old-post-height")}`
										
										// fade in: post content
										setTimeout(() => {
											overlay.classList.add("leave")
											posts.classList.remove("post-shrink");
											// remove overlay
											setTimeout(() => {
												posts.classList.remove("poof")
												overlay.style.display = "none"
											},shrinkSpeed)
										},shrinkSpeed)
									},elFade*0.8)
								}
								
								// if no shrink, simple fade out/in
								else {
									// fade out: text
									textCont.classList.add("leave");
									
									// fade in: post content
									setTimeout(() => {
										overlay.classList.add("leave")
										
										// remove overlay
										setTimeout(() => {
											posts.classList.remove("poof")
											overlay.style.display = "none"
										},elFade*0.8)
									},elFade*0.8)
								}
							})
						}//end: if posts doesn't have [filtered-tags] yet
					}//end: if any tag has triggered one in the system
				})//end: tags forEach
				
			}//end: if posts has init-tags
		})//end: posts forEach
		/*---------------------------------*/
	}//end: if all args are present
	
	const getSpeed = (rootVar) => {
		let speed = getComputedStyle(document.documentElement).getPropertyValue(rootVar).trim();
		if(isNaN(Number(speed))){
			let nums = Number(speed.replace(/[^\d\.]*/g,""));
			let units = speed.replace(nums,"").trim();
			if(units == "s"){
				speed = nums * 1000
			} else if(units == "ms"){
				speed = nums
			} else {
				speed = 400
			}
		} else {
			speed = Number(speed)
		}
		
		return speed
	}
}//end entire func
