window.onscroll = function () {
  var navbar = document.getElementById("navbar");

  var sticky = navbar.offsetTop;

  if (window.pageYOffset >= sticky+200) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
