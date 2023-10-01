/*------- HIDE POSTS WITH SPOILER TAGS | @glenthemes -------*/
/* last updated: 2022/12/29, 7:33PM GMT-8 */
$(function(){
$.fn.spoilerTags = function(banyasuo){

	let postsNumArr = [];
	let postsNum = $("[posts-selector]").length;
  
  $("[posts-selector]").each(function(){
      let imgsInPost = [];
	  let yqnup = $(this).find("img").length;
	  let postAnc = this;
	  
	  // if that post contains an image
	  if(yqnup > 0){
		  $(this).find("img[src]").each(function(){
			  if($(this).attr("src") !== ""){
				  let ozpbw = new Image();
				  ozpbw.src = $(this).attr("src");

				  ozpbw.onload = () => {
					  imgsInPost.push($(this).attr("src"));

					  if(imgsInPost.length == yqnup){
						  $(postAnc).attr("post-loaded","");
						  let nzuhg = $(postAnc).outerHeight();
						  $(postAnc).attr("post-height",nzuhg);
						  loadOverlay("post with images loaded");
					  }
				  }//end: image loaded
			  }//end: if post contains img
		  })//end: post img.each
	  }
	  
	  // if post DOESN'T have image
	  else {
		  let uldxf = Date.now();
		  let qszyv = 2500;
		  
		  let pvbcp = setInterval(() => {
		      if(Date.now() - uldxf > qszyv){
			      clearInterval(pvbcp)
			  } else {
				  if($(postAnc).height() > 0){
					  clearInterval(pvbcp);
					  $(postAnc).attr("post-loaded","");
					  $(postAnc).attr("post-height",$(postAnc).outerHeight());
					  
					  setTimeout(() => {
						  loadOverlay("post withOUT images loaded");
					  },500)
				  }
			  }
		  })
	  }
	  
	  
  })//end: post.each

  let taGueule = $.extend({
      filter: "",
      message: "",
      includeHashtag: "",
      tagSeparator: "",
      viewPostText: "",
      shrinkPosts: "",
  }, banyasuo);
  
  let getmsg = taGueule.message.toString();
  let gethash = taGueule.includeHashtag.toString();
  let getsep = taGueule.tagSeparator.toString();
  let bouton = taGueule.viewPostText.toString();
  let getshrink = taGueule.shrinkPosts.toString();
  
  /*--------------------------------------*/
  
  let filtersAsArray = taGueule.filter;
  let filters_lft = [];
  //console.log(filtersAsArray)
  
  for(let rfbio of filtersAsArray){
  	rfbio = rfbio.toString();
  	rfbio = rfbio
		.replaceAll(" ","-")
		.replaceAll(","," ")
		.replaceAll(" "," #")
		.replaceAll("##","#");
		
	if(rfbio.slice(0,1) !== "#"){
        rfbio = "#" + rfbio;
	}
		
	filters_lft.push(rfbio)
  }
  
  filtersAsArray = filters_lft;
  
  // console.log(filtersAsArray)

  // note to self:
  // uncomment to check if the TAGSLIST is formatted correctly
  // $(this).parent().attr("tags-to-filter",filtersAsArray);
  
  /*--------------------------------------*/
  
  let tagsAsArray = [];
  let tagsOverlap = [];
  
  $(this).each(function(){
      let tagTxt = $(this).text();
	  
	  if(tagTxt.startsWith("#")){
          tagTxt = tagTxt.replaceAll(" ","-");
      } else {
          tagTxt = "#" + tagTxt.replaceAll(" ","-");
      }
	  
	  tagsAsArray.push(tagTxt);
	  
	  // note to self:
      // uncomment to check if POST TAGS are formatted correctly
      $(this).attr("prop",tagTxt);
  })//end this.each
  
  // console.log(tagsAsArray)
  
  for(let qjgjj of tagsAsArray){
      let ifExists = filtersAsArray.findIndex(uwu => {
	      return uwu === qjgjj
	  })
	  
	  if(ifExists > -1){
	      tagsOverlap.push(qjgjj)
	  }
  }
  
  // console.log(tagsOverlap)
  
  /*--------------------------------------*/
  
  let that = this;
  
  function loadOverlay(bruh){
	  // console.log(bruh)	  
	  
	  $("[posts-selector]").css("overflow-y","hidden");
	  $("[posts-selector]").css("visibility","visible");
	  
	  $(that).each(function(){
		  //console.log($(this).text());
		  
		  let laPoste = $(this).parents("[posts-selector]");
      laPoste.attr("post-loaded","")
		  
		  if($(this).is("[prop]")){
			  let propTxt = $(this).attr("prop");
			  let ifMatch = tagsOverlap.findIndex(uwu => {
				  return uwu === propTxt
			  })

			  if(ifMatch > -1){
				  $(this).attr("init-tags","detected");
          
          laPoste = $(this).parents("[posts-selector]");
				  
				  if(!laPoste.find(".spoiler-overlay").length){
					  laPoste.prepend("<div class='spoiler-overlay'></div>");
					  let overlay = laPoste.find(".spoiler-overlay");
					  
					  let z = laPoste.css("z-index");

					  if(z == "auto"){
						  laPoste.css("z-index","0");
						  overlay.css("z-index","2");
					  } else {
						  overlay.css("z-index",parseFloat(z) + 2);
					  }
					  
					  overlay.after("<div class='sp'></div>");
					  overlay.next(".sp").css("z-index",parseFloat(overlay.css("z-index")) + 1);
					  overlay.next(".sp").prepend("<div class='_st'></div>");
					  
					  /*-------------------------------*/
					  
					  /*-------------------------------*/
					  
					  overlay.next(".sp").find("._st").prepend("<div class='warning-text'></div>");
					  let overtxt = overlay.next().find(".warning-text");
					  overtxt.prepend("<p>" + getmsg + "</p>");
					  overtxt.append("<p class='sp-tags'></p>");
					  overtxt.append("<a class='view-button'>" + bouton + "</a>");

					  // remove duplicate messages
					  overtxt.not(":first").remove();
					  
					  /*-------------------------------*/
					  
					  // shrinkpost transition speed
					  let sonic = getComputedStyle(document.documentElement)
					  .getPropertyValue("--ShrinkPost-Transition-Speed");

					  let raws = parseFloat(sonic);
					  let msS = sonic.split(/\d/).pop();

					  if (msS == "s") {
						  raws = Math.floor(raws * 1000);
					  }
					  
					  /*-------------------------------*/

					  // retrieve original post height
					  let ykvze = Date.now();
					  let xxojn = 2000;
					  let zrulo = setInterval(() => {
						  if(Date.now() - ykvze > xxojn){
							  clearInterval(zrulo)
						  } else {
							  if(Number(laPoste.attr("post-height")) > 0){
								  clearInterval(zrulo)
								  // console.log("Post height is " + laPoste.attr("post-height"))
								  
								  let xyz = overtxt.outerHeight();
								  let zyz = xyz + 100; // 100 is extra v-padding

								  console.log("Warning text height is " + zyz)
								  
								  /*-------------------------------*/
								  
								  // do something if original post height
								  // is smaller than warning text height
								  if(Number(laPoste.attr("post-height")) < zyz){
									  laPoste.css("min-height", zyz);
									  
									  // button click
									  overtxt.find(".view-button").click(function(){
										  overtxt.fadeOut(269);
										  
										  if(laPoste.is("[style*='min-height']")){
											  setTimeout(function(){
												  laPoste.css("min-height",laPoste.attr("post-height") + "px");
											  },269);
										  }

										  setTimeout(function(){
											  overlay.add(overlay.next()).fadeOut(269);
											  laPoste.css("min-height","");
											  laPoste.css("overflow-y","");
										  },269+raws);

										  setTimeout(function(){
											  overlay.add(overlay.next()).remove();
										  },269+raws+269)
									  });//end button click
								  }//end: if og post height is way too short
								  
								  /*-------------------------------*/
								  
								  if(getshrink == "yes"){

									  // if original post height is TALLER
									  // than its warning text height
									  // TLDR; tall post > shrink to turn short
									  if(!(Number(laPoste.attr("post-height")) < zyz)){
										  laPoste.css("max-height", zyz);
										  
										  // button click
										  overtxt.find(".view-button").click(function(){
											  overtxt.fadeOut(269);

											  if(laPoste.is("[style*='max-height']")){
												  setTimeout(function(){
													  laPoste.css("max-height",laPoste.attr("post-height") + "px");
												  },269);
											  }

											  setTimeout(function(){
												  overlay.add(overlay.next()).fadeOut(269);
												  laPoste.css("max-height","");
												  laPoste.css("overflow-y","");
											  },269+raws);

											  setTimeout(function(){
												  overlay.add(overlay.next()).remove();
											  },269+raws+269)
										  });//end button click
									  }//end: if og post height is tall/normal
								  }//end: if shrink posts (yes)
								  
								  else {
								  
									  if(!(Number(laPoste.attr("post-height")) < zyz)){
								  
										  // button click
										  overtxt.find(".view-button").click(function(){
											  overtxt.fadeOut(269);
											  
											  overlay.add(overlay.next()).fadeOut(269);
											  laPoste.css("max-height","");
											  laPoste.css("overflow-y","");

											  setTimeout(function(){
												  overlay.add(overlay.next()).remove();
											  },269)
										  });//end button click
									  }
								  }
								  
							  }//end: if post height > 0
						  }
					  })//end setInterval
				  }//end: add .spoiler-overlay if it doesn't exist
				  
			  }//end: if this tag is a filtered one
			  
			  // if post contains NO filtered tags
			  else {
				  
			  }
		  }//end: if has [prop] attr
		  
	  })//end this.each
	  //console.log(coln)
  }//end loadOverlay();
  
  /*--------------------------------------*/
  
  let wegkz = Date.now();
  let iunnx = 60000;
  let fuhwe = setInterval(() => {
	  if(Date.now() - wegkz > iunnx){
		  clearInterval(fuhwe)
	  } else {
		  if($("[post-loaded]").length == postsNum){
			  clearInterval(fuhwe)
			  console.log("spoilerTags configuration complete.");
			  
			  $("[posts-selector]").each(function(){
				  let mbmii = [];
				  
				  let detecTags = "";
				  
				  $(this).find("[init-tags='detected'][prop]").each(function(){
					  mbmii.push($(this).attr("prop"));
				  
					  if(gethash == "yes"){
						  // if user *wants* the '#'
						  if($(this).text().charAt(0) == "#"){
							  detecTags += $(this).text() + getsep + " ";
						  } else {
							  detecTags += "#" + $(this).text() + getsep + " ";
						  }

					  } else {
						  // if user doesn't want the '#'
						  if($(this).text().charAt(0) == "#"){
							  detecTags += $(this).text().slice(1) + getsep + " ";
						  } else {
							  detecTags += $(this).text() + getsep + " ";
						  }
					  }					  
				  })//end a[init-tags].each
				  
				  // remove space at the end
				  if(detecTags.slice(detecTags.length - 1) == " "){
					  detecTags = detecTags.slice(0,-1)
				  }
				  
				  // remove separator at the end
				  let sepChars = getsep.length;
				  if(detecTags.slice(detecTags.length - sepChars) == getsep){
					  detecTags = detecTags.slice(0,-sepChars)
				  }
				  
				  // console.log(detecTags)
				  
				  if($(this).find(".sp-tags").length){
            $(this).find(".sp-tags").text(detecTags)
				  }
			  })//end post.each
		  }
		  
		  window.onload = function(){
			  setTimeout(() => {
          clearInterval(fuhwe);
        },2000)
		  }
	  }
  },0)
  
  
};//end .spoilerTags function
});//end ready
