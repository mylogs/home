function openNav(){document.getElementById("mySidenav").style.width="250px"}function closeNav(){document.getElementById("mySidenav").style.width="0"};
var myNodelist=document.getElementsByTagName("LI");var i;for(i=0;i<myNodelist.length;i++){var span=document.createElement("SPAN");var txt=document.createTextNode("\u00D7");span.className="mylogs-close";span.appendChild(txt);myNodelist[i].appendChild(span)}var close=document.getElementsByClassName("mylogs-close");var i;for(i=0;i<close.length;i++){close[i].onclick=function(){var a=this.parentElement;a.style.display="none"}}var list=document.querySelector("ol");list.addEventListener("click",function(a){if(a.target.tagName==="LI"){a.target.classList.toggle("checked")}},false);function newElement(){var c=document.createElement("li");var b=document.getElementById("myInput").value;var d=document.createTextNode(b);c.appendChild(d);if(b===""){alert("You must write something!")}else{document.getElementById("myol").appendChild(c)}document.getElementById("myInput").value="";var e=document.createElement("SPAN");var a=document.createTextNode("\u00D7");e.className="mylogs-close";e.appendChild(a);c.appendChild(e);for(i=0;i<close.length;i++){close[i].onclick=function(){var f=this.parentElement;f.style.display="none"}}};