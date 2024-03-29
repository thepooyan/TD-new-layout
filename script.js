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


//* On Click System (grouped and single)
let clicker = document.querySelectorAll("[data-onClick]");
clicker.forEach(i => {
  if (i.getAttribute('data-group')) {
    i.addEventListener("click", function () {
      document.querySelectorAll(`[data-group=${i.getAttribute('data-group')}`).forEach(item => {
        item.classList.remove(i.getAttribute("data-onClick"));
      })
      i.classList.toggle(i.getAttribute("data-onClick"));
    });
  } else {
    i.addEventListener("click", function () {
      i.classList.toggle(i.getAttribute("data-onClick"));
    });
  }
})

//* Target system (grouped and single)
let targeter = document.querySelectorAll('[data-target]');
targeter.forEach(i => {
  let target = document.querySelector(i.dataset.target);
  if (target.dataset.group) {
    i.addEventListener('click', function () {
      document.querySelectorAll(`[data-group=${target.dataset.group}]`).forEach(item => {
        item.classList.remove('active');
      })
      target.classList.add('active');
    })
  } else {
    i.addEventListener('click', function () {
      target.classList.toggle('active');
    })
  }
})

//*-------------------------------- slider
let sliderImages = document.querySelectorAll("#slider .images .img");
let sliderTimeout = document.getElementById('slider').getAttribute('data-timeout');
let sliderIndex;
sliderImages.forEach((item, index) => {
  if (item.classList.contains('active')) sliderIndex = index;
});

if (sliderImages.length == 1) { document.getElementById('slider').classList.add('single') }
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
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function () {
    sliderReset();
    sliderGoto(i);
  })
}

document.getElementById("sliderNext").addEventListener("click", function () {
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
  sliderInterval = window.setInterval(function () {
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

document.querySelectorAll('#slider .images .img .title').forEach(item => {
  if (item.innerHTML.length > 16) item.classList.add('long')
  if (item.innerHTML.length > 20) item.classList.add('tooLong')
})
if (sliderImages.length > 1) {
  var sliderInterval = setInterval(function () {
    sliderNext();
  }, sliderTimeout)
}
//*-------------------------------- slider

//*Time Input Calc
let setCounterDate = (date) => {
  let parseMMDD = (string) => {
    let mm = parseInt(string[0]);
    let m = parseInt(string[1]);
    let dd = parseInt(string[3]);
    let d = parseInt(string[4]);
    return [(mm * 10) + m, (dd * 10) + d]
  }
  date = parseMMDD(date);
  let countDownDate = new Date(2022, date[0] - 1, date[1]).getTime();

  return getRemainingTime = () => {
    let now = new Date().getTime();
    let timeleft = countDownDate - now;
    let remTime = {
      days: Math.floor(timeleft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeleft % (1000 * 60)) / 1000)
    }
    Object.entries(remTime).filter(([key, val]) => {
      if (val < 0) remTime[key] = 0;
    })
    return remTime;
  }
}

//*Initiate ATTENTION counter
let attentionDate = document.getElementById('attention').dataset.date;
let attentionRemTime = setCounterDate(attentionDate);

let setAttentionDate = () => {
  document.querySelector('#attention .text span').innerHTML = attentionRemTime().days + 1;
}
setAttentionDate();
let counterInterval = setInterval(setAttentionDate, 86400000);

//*HomePage Video*/
document.querySelectorAll('[data-videoSrc]').forEach(item => {
  item.addEventListener('click', function () {
    let video = document.querySelector('.homeVideo .main .tv video');
    video.poster = item.src;
    video.querySelector('source').src = item.dataset.videosrc;
    video.load();
  })
})
document.querySelectorAll('.homeVideo .videoTab button').forEach(item => {
  item.addEventListener('click', function () {
    $.get('controller', item.dataset.category, function (data) {
    })
  })
})

//*my validation
//*set validation
function setValidations() {
  document.querySelectorAll('[data-validate]').forEach(item => {
    let validation = JSON.parse(item.dataset.validate);
    let msgBox = item.nextElementSibling;
    if (!msgBox.classList.contains('validationMsg')) {
      console.log(item)
      console.log(`above logged input has no validation box. please add a span with "validationMsg" classname next to it!`)
      return;
    }

    validation.forEach(vali => {
      switch (vali) {
        case 'notEmpty':
          item.addEventListener('keyup', function (e) {
            if (e.target.value === '') {
              msgBox.innerHTML = 'لطفا کادر را خالی نگذارید!';
              msgBox.classList.add('show');
            } else {
              msgBox.classList.remove('show');
            }
          })
          break;
      }
    })


  })
}

//*validate section
function validateSection(form) {
  return new Promise((resolve, reject) => {

    form.querySelectorAll('[data-validate]').forEach(item => {
      let validation = JSON.parse(item.dataset.validate);
      let msgBox = item.nextElementSibling;
      if (!msgBox.classList.contains('validationMsg')) return;

      validation.forEach(vali => {
        switch (vali) {
          case 'notEmpty':
            if (item.value === '') {
              msgBox.innerHTML = 'لطفا کادر را خالی نگذارید!';
              msgBox.classList.add('show');
              reject()
            }
            break;
        }
      })
    })
    resolve();

  })
}

setValidations();

//*Qcomment
$(function () {
  setTimeout(() => {
    let form = document.querySelector('.mainPageSection.Qcomment form');
    let submitMsg = document.querySelector('.mainPageSection.Qcomment form p');
    let QCsection = document.querySelector('.mainPageSection.Qcomment section');
    let comments = QCsection.querySelectorAll('.question, .answer');
    let buttons = document.querySelectorAll('.mainPageSection.Qcomment .buttons button');
    let modal = document.querySelector('.mainPageSection.Qcomment .replyModal');
    let overlay = modal.querySelector('.overlay');

    function closeComments() {
      return new Promise((resolve, reject) => {
        commentsHeight = 0;
        for (let i = 0; i < 6; i++) {
          commentsHeight += comments[i].clientHeight;
        }
        QCsection.style.maxHeight = `${commentsHeight}px`;

        QCsection.addEventListener('webkitTransitionEnd', function () {
          resolve();
        }, false);
      })
    }
    function openComments() {
      commentsHeight = 0;
      comments.forEach(item => {
        commentsHeight += item.clientHeight;
      })
      QCsection.style.maxHeight = `${commentsHeight}px`;
    }
    window.closeComments = closeComments;
    window.openComments = openComments;

    //*Combine answer/question s with same asker
    let prevData;
    document.querySelectorAll('.mainPageSection.Qcomment section div .icon').forEach(item => {
      if (item.dataset.user === prevData) item.parentElement.classList.add('combine');
      prevData = item.dataset.user;
    })

    //*reply event
    document.querySelectorAll('.mainPageSection.Qcomment section i').forEach(item => {
      item.addEventListener("click", function (e) {
        //console.log(e.target.parentElement.parentElement.dataset.id)
        let clone = e.target.parentElement.parentElement.cloneNode(true);
        modal.querySelector('.target').appendChild(clone);
        modal.classList.add('active');
      })
    })

    //*button event handler
    function addCommentButtonEvt() {
      buttons[0].addEventListener('click', function (e) {
        document.querySelector('.mainPageSection.Qcomment .buttons').classList.add('twoButtons')
        openComments();
      })
      buttons[1].addEventListener('click', function () {
        document.querySelector('.mainPageSection.Qcomment .buttons').classList.remove('twoButtons')
        QCsection.classList.add('fast');
        closeComments().then(() => {
          QCsection.classList.remove('fast');
        })
      })
    }
    function minimalComments() {
      document.querySelector('.mainPageSection.Qcomment').classList.add('minimal');
    }

    //*form submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      validateSection(form).then(() => {
        submitMsg.classList.add('show');
      })
    })

    
    //*QC modal
    //*close modal
    function closeQCModal() {
      modal.classList.remove('active');
      modal.querySelector('.target').innerHTML = '';
      modal.querySelector('p.success').classList.remove('show');
      modal.querySelector('.reply textarea').value = '';
      modal.querySelectorAll('.validationMsg').forEach(item=>{item.classList.remove('show')})
    }
    overlay.addEventListener('click', closeQCModal);
    modal.querySelector('i.fa-times').addEventListener('click', closeQCModal);

    //*modal submit
    modal.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      validateSection(modal).then(()=>{
        modal.querySelector('p.success').classList.add('show');
      })
    })

    if (comments.length < 6) {
      minimalComments();
    } else {
      closeComments();
      addCommentButtonEvt();
    }
  }, 400);
})()
