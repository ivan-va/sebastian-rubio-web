const navbar = document.querySelector("#nav");
const navBtn = document.querySelector(`#nav-btn`)
const sidebar = document.querySelector(`#sidebar`)
const sidebarCloseBtn = document.querySelector(`#sidebar-close-btn`)
const sidebarLinks = document.querySelectorAll(`.sidebar-link`)
const sidebarLetsTalkBtn = document.querySelector(`.sidebar-lets-talk-btn`)
const avatar = document.querySelector(`.logo-avatar-photo`)
const logo = document.querySelector(`.logo-text`)


// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    navbar.classList.add("nav-fixed");
  } else {
    navbar.classList.remove("nav-fixed");
  }
});

// avatar and logo link to `/#top` from everywhere
[avatar, logo].forEach( i => {
  i.addEventListener(`click`, function() {
    window.location.href = `/#top`
  })
})

// sidebar code
navBtn.addEventListener(`click`, (e) => {
  sidebar.classList.add(`sidebar-show`)
})

sidebarCloseBtn.addEventListener(`click`, (e) => {
  sidebar.classList.remove(`sidebar-show`)
})

sidebarLetsTalkBtn.addEventListener(`click`, function() {
  sidebar.classList.remove(`sidebar-show`)
})

window.addEventListener(`resize`, (e) => {
  if (window.outerWidth >= 768) {
    sidebar.classList.remove(`sidebar-show`)  
  }
})

if (window.location.pathname === `/`) {
  // hide sidebar on click on a sidebar link (with animation),
  // but only if we're on homepage. Otherwise, we can't
  // use the animation, because on page change it brakes!
  sidebarLinks.forEach( (link) => {
    link.addEventListener(`click`, function() {
    sidebar.classList.remove(`sidebar-show`);
  })});
}
