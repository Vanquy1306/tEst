// Scroll to anchors
(function () {

  const smoothScroll = function (targetEl, duration) {
      const headerElHeight =  document.querySelector('.menu, .regist, .siteHeaderLogo, .regft, .siteHeader__section, .buttoner, .scrool').clientHeight;
      let target = document.querySelector(targetEl);
      let targetPosition = target.getBoundingClientRect().top - headerElHeight;
      let startPosition = window.pageYOffset;
      let startTime = null;
  
      const ease = function(t,b,c,d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
      };
  
      const animation = function(currentTime){
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, targetPosition, duration);
          window.scrollTo(0,run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);

  };

  const scrollTo = function () {
      const links = document.querySelectorAll('.siteHeader__item, .regist a, .siteHeaderLogo a, .regft a, .siteHeader__section a, .buttoner a, .scrool a');
      links.forEach(each => {
          each.addEventListener('click', function () {
              const currentTarget = this.getAttribute('href');
              smoothScroll(currentTarget, 1000);
          });
      });
  };
  scrollTo();
}()); 


// add Img Lazy Demo
addImgDefault('img.lazy', 'src');
addImgDefault('source.lazy', 'srcset');

window.addEventListener("scroll", function () {
    // Add Onscroll .menu a
    // Add Lazy Screen LDP
    myLoad('section','loaded');
    myLazy('img.lazy', 'src');
    myLazy('source.lazy', 'srcset');
    myLazy('.lazy-bg', 'img-bg');
}); 


var temp6__box = tns({
  container: '.temp6__box',
  items: 9,
  autoplay: false,
  autoplayButtonOutput: false,
  mouseDrag: true,
  gutter: 10,
  responsive: {
      0: {
          items: 3,
      },
      500: {
          items: 9,
      }
  },
});


// Add Class : 1. Name Button / 2. Name Object / 3. Name Class Add
addClass('.siteHeaderNav','.siteHeaderMain','active');
addClass('.siteHeaderNav','.siteHeader-bg','active');

// Remove Class : 1. Name Button / 2. Name Object / 3. Name Class Add
removeClass('.siteHeader-bg','.siteHeaderMain','active');
removeClass('.siteHeader-bg','.siteHeader-bg','active');
removeClass('.siteHeader a','.siteHeaderMain','active');
removeClass('.siteHeader a','.siteHeader-bg','active');

const btn_reg = document.getElementsByClassName('reg');
const modal_map = document.getElementById('modal-map');
const btn_call = document.getElementsByClassName('call');

for (const item of btn_reg) {
    item.addEventListener("click", ()=>{
        modal_map.style.display = 'none';
    });
}
for (const item of btn_call) {
    item.addEventListener("click", ()=>{
        modal_map.style.display = 'none';
    });
}


// Tab Block Content

var tabLink1s = document.querySelectorAll(".tab2_link");
var tabContent1 = document.querySelectorAll(".tab2_content");

tabLink1s.forEach(function(el) {
   el.addEventListener("click", openTab1s);
});

function openTab1s(el) {
   var btnTarget = el.currentTarget;
   var x = btnTarget.dataset.hash;

   tabContent1.forEach(function(el) {
      el.classList.remove("active");
   });

   tabLink1s.forEach(function(el) {
      el.classList.remove("active");
   });

   document.querySelector("#" + x).classList.add("active");
   
   btnTarget.classList.add("active");
}