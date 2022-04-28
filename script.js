function openResMenu() {
    document.getElementById("resMenu").style.width = "250px";
  }
  
  function closeResMenu() {
    document.getElementById("resMenu").style.width = "0";
  }

var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
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

let courseL1 = document.getElementsByClassName("courseSelector");

for (let i = 0; i < courseL1.length; i++) {
  courseL1[i].addEventListener("click", function() {
    document.getElementById(this.dataset.linkto).classList.toggle('noDisplay');
    document.getElementsByClassName("OriginContent")[0].classList.add("out");
    document.getElementsByClassName("crossContent")[0].classList.add("in");
  });
}

function navigateBackToRes() {
  let courseL2 = document.querySelector('.crossContent ul:not(.noDisplay)');
  courseL2.classList.add('noDisplay');
  document.getElementsByClassName("OriginContent")[0].classList.remove("out");
  document.getElementsByClassName("crossContent")[0].classList.remove("in");
}