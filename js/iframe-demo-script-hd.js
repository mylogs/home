$(function(){$(".imgover").each(function(){this.osrc=$(this).attr("src");this.rollover=new Image();this.rollover.src=this.osrc.replace(/(\.gif|\.jpg|\.png)/,"_o$1")}).hover(function(){$(this).attr("src",this.rollover.src)},function(){$(this).attr("src",this.osrc)});$(".accordion").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")});$(".accordion").click(function(){var a=$(this);if(a.next(".accordionBox").is(":visible")){a.removeClass("active").next(".accordionBox").slideUp(200)}else{a.next(".accordionBox").slideDown(200).siblings(".accordionBox").slideUp(200).siblings(".accordion").removeClass("active");a.addClass("active")}})});var sPath=window.location.pathname;var ie6=navigator.appVersion;if(ie6.search("MSIE 6.0")==-1){var sPage=sPath.substring(sPath.lastIndexOf("/")+1)}else{var sPage=sPath.substring(sPath.lastIndexOf("\\")+1)}$(function(){var a=$("ul.lNav li").length;for(i=0;i<a;i++){if($("ul.lNav li:eq("+i+")").find("a").attr("href")==sPage){$("ul.lNav li:eq("+i+")").addClass("current")}if($("ul.lNav li:eq("+i+")").find("a").attr("href")==sPath){$("ul.lNav li:eq("+i+")").addClass("current")}}});$(function(){$(".demoJquery").each(function(){var e,d=$(this).find(".demoJqueryInner"),a=$(this).find(".demoOutput");if(!d.length||!a.length){return}e=d.find(".getSource").map(function(){return $(this).text().replace(/\xa0/g," ")}).get().join("\n");e=e.replace("</head>","<style>html, body { border:0; margin:0; padding:0; }</style></head>").replace(/<script>([\s\S]+)<\/script>/,"<script>window.onload = function() {$1};<\/script>");var b=document.createElement("iframe");b.width="100%";b.height=a.attr("data-height")||"368px";a.append(b);var c=(b.contentWindow||b.contentDocument).document;c.write(e);c.close()});$(".compare").each(function(){var c=$(this).find(".before").height();var a=$(this).find(".after").height();var b=c;if(c<a){b=a}else{b=c}$(this).find(".sourceTxt").height(b)});$(window).bind("load resize",function(){var k=$("#sidebar").height();$("#pageBody").css("min-height",k);var j=$(window).width();var c=$(window).height();var e=$(document).height();var h=$(".sectionLink");if(j<641){h.find(".back").find("a").html("Trá»Ÿ vá»");h.find(".prev").find("a").html("Tiáº¿p tá»¥c")}var d=$(".fadeContent");var b=d.height();var f=d.width();var a=(j-f)/2;var g=(c-b)/2;d.css({top:g,left:a});$(".fadeWrap").height(e)});$.fn.fadeBox=function(c,a){var b=$(a);$(c).click(function(){var e=$(this);var d=window.parent.location.href;if(b.is(":hidden")){e.addClass("active");b.fadeIn()}else{e.removeClass("active");b.fadeOut()}$(".path").val(d)});$(document).bind("click",function(f){var d=$(f.target);if(!d.parents().hasClass("gnavInner")&&!d.parents().hasClass("fadeSection")){b.fadeOut();$(".fadeWrap").fadeOut()}});$("#closeBtn").click(function(){b.fadeOut();$(".fadeWrap").fadeOut()})};$(".gnavInner").fadeBox(".fadeBtn",".fadeWrap");$(".gnavInner").fadeBox(".fadeBtn",".fadeContent");$(".close-button").click(function(){$(this).parent(".alert").fadeOut(400)})});