function openResMenu() {
    document.getElementById("resMenu").style.width = "250px";
  }
  
  function closeResMenu() {
    document.getElementById("resMenu").style.width = "0";
  }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}