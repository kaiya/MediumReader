// url order : 1. param 2. path 3. default
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
     return null;
  }
  return decodeURI(results[1]) || 0;
}
let url = $.urlParam("url");

if (url == null) {
  let href = window.location.href;
  url = href.substring(href.lastIndexOf('http'));
  if (url.startsWith("https://medium.kaiya.ml")) { //bypass our own site
    url = null;
  }
  if (!url.startsWith("http")) {
    url = null;
  }
}

if (url == null) {
  url = "https://hbr.org/2020/03/how-business-leaders-can-champion-democracy";
}

let pClass = "gu hi ap ce gw b gx gy hj ha hk hb hc hl hd he hm hf hg hn hh cw";
let aClass = "bx fl hq hr hs ht";
let spanClass = "cd b ce cf cg ch r ci cj";
let h1Class = "contenth1";
let h2Class = "contenth2";
// let imgClass = "gd ge s t u gf ai gp";
let imgClass = ""
let figureClass = "fy fz ga gb gc fx ai paragraph-image";
let figureCaptionClass = "gq gr cq co cp gs gt cd en eo cf ci";
let parseDOM;
let hostUrl = "https://rss.kaiya.ml/parser?url=";
console.log("before ajax");
$.ajax({
  url: hostUrl + url,
}).done(function (data) {
  // console.log(data);
  document.title = data.title;
  $("#titleStrong").html(data.title);
  $("#authorA").html(data.author);
  // $("#pubDateA").html(""); //replace publication date
  let time = Math.round(data.word_count / 300); //average 300 word per minute
  $("#timeDiv").append(" · " + time +" min read")
  $("#leadImg").attr("src", data.lead_image_url);
  $("#fullSizeFig").html(data.title); // cap by title
  // parseDOM = $.parseHTML(data.content);
  $("#contentParent").html(data.content);
  $("#contentParent p").addClass(pClass);
  $("#contentParent a").addClass(aClass);
  $("#contentParent span").addClass(spanClass);
  $("#contentParent h1").addClass(h1Class);
  $("#contentParent h2").addClass(h2Class);
  $("#contentParent img").addClass(imgClass);
  $("#contentParent figure").addClass(figureClass);
  $("#contentParent figcaption").addClass(figureCaptionClass);

  // for HBR.org
  $(".alignnone").remove(); //remove default full size img
  $(".article-promo").remove(); //remove ads
  $(".font-whitney").remove(); //remove table of contents.
  $(".font-national-compressed").remove();

  // for BBC
  $(".media-landscape").remove(); //remove default full size img
  $(".byline").remove();

});
$(document).ready(function(){
  console.log("ready!");
});