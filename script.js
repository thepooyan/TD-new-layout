//* Res menu handler
document.getElementById("resOpen").addEventListener("click", function () {
  document.getElementById("resMenu").style.width = "320px";
});
document.getElementById("resClose").addEventListener("click", function () {
  document.getElementById("resMenu").style.width = "0";
});

//? res menu course handler
let courseL1 = document.getElementsByClassName("courseSelector");

for (let i = 0; i < courseL1.length; i++) {
  courseL1[i].addEventListener("click", function () {
    document.getElementById(this.dataset.linkto).classList.remove("noDisplay");
    document.getElementsByClassName("OriginContent")[0].classList.add("out");
    document.getElementsByClassName("crossContent")[0].classList.add("in");
  });
}

document.getElementById("backToRes").addEventListener("click", function () {
  let courseL2 = document.querySelector(".crossContent ul:not(.noDisplay)");
  courseL2.classList.add("noDisplay");
  document.getElementsByClassName("OriginContent")[0].classList.remove("out");
  document.getElementsByClassName("crossContent")[0].classList.remove("in");
});

//* Collapsible
var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

//* onclick system
let clicker = document.querySelectorAll("[data-onClick]");
for (let i = 0; i < clicker.length; i++) {
  clicker[i].addEventListener("click", function () {
    clicker[i].classList.toggle(clicker[i].getAttribute("data-onClick"));
  });
}

//*-------------------------------- slider
let sliderImages = document.querySelectorAll("#slider .images img");
let sliderTimeout = document.getElementById('slider').getAttribute('data-timeout');
let sliderIndex;
sliderImages.forEach((item, index) => {
  if (item.classList.contains('active')) sliderIndex = index;
});

if (sliderImages.length == 1) { document.getElementById('slider').classList.add('single')}
if (sliderImages.length == 0) { 
  document.getElementById('slider').classList.add('none');
  sliderNext();
}
if (sliderIndex == undefined) noActive();

for (let i = 0; i < sliderImages.length; i++) {
  let span = document.createElement("span");
  span.classList.add("dot" + i);
  if (i == sliderIndex) span.classList.add('active')
  document.querySelector("#slider .dots").appendChild(span);
}
let dots = document.querySelectorAll("#slider .dots span");
for (let i=0; i < dots.length ; i++) {
  dots[i].addEventListener('click', function(){
    sliderReset();
    sliderGoto(i);
  })
}

document.getElementById("sliderNext").addEventListener("click", function(){
  sliderNext();
  sliderReset();
});
document.getElementById("sliderPre").addEventListener("click", function () {
  sliderPrev();
  sliderReset();
});

function sliderNext() {
  sliderImages[sliderIndex].classList.remove("active");
  dots[sliderIndex].classList.remove('active');
  if (sliderImages[sliderIndex + 1]) {
    sliderIndex++;
  } else {
    sliderIndex = 0;
  }
  sliderImages[sliderIndex].classList.add("active");
  dots[sliderIndex].classList.add('active');
}
function sliderPrev() {
  sliderImages[sliderIndex].classList.remove("active");
  dots[sliderIndex].classList.remove('active');
  if (sliderImages[sliderIndex - 1]) {
    sliderIndex--;
  } else {
    sliderIndex = sliderImages.length - 1;
  }
  sliderImages[sliderIndex].classList.add("active");
  dots[sliderIndex].classList.add('active');
}
function sliderReset() {
  clearInterval(sliderInterval);
sliderInterval = window.setInterval(function(){
  sliderNext();
}, sliderTimeout)
}
function sliderGoto(index) {
sliderImages[sliderIndex].classList.remove("active");
dots[sliderIndex].classList.remove('active');
sliderIndex = index;
sliderImages[sliderIndex].classList.add("active");
dots[sliderIndex].classList.add('active');
}
function noActive() {
  sliderIndex = 0;
  sliderImages[0].classList.add('active');
}

if (sliderImages.length > 1) {
  var sliderInterval = setInterval(function(){
    sliderNext();
  }, sliderTimeout)
}
//*-------------------------------- slider