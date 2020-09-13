window.onscroll = () => {
  stickyNav();
};

var nav = document.getElementById("nav-wrap");
var drop1 = document.getElementById("info");
var drop2 = document.getElementById("portf");

var sticky = nav.offsetTop;

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += 1));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
setInterval(() => {
  plusSlides(1);
}, 4000);

/* Open */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function dropContent(type) {
  if (type === info) {
    drop1.style.height = "110px";
    document
      .getElementById("dropbtn-a")
      .setAttribute("onclick", "liftContent(info)");
    liftContent(portf);
  } else if (type === portf) {
    drop2.style.height = "150px";
    document
      .getElementById("dropbtn-b")
      .setAttribute("onclick", "liftContent(portf)");
    liftContent(info);
  }
}
function liftContent(type) {
  if (type === info) {
    drop1.style.height = "0";
    document
      .getElementById("dropbtn-a")
      .setAttribute("onclick", "dropContent(info)");
  } else if (type === portf) {
    drop2.style.height = "0";
    document
      .getElementById("dropbtn-b")
      .setAttribute("onclick", "dropContent(portf)");
  }
}
