"use strict"

/***************** Hero *****************/
$("#hero_inner").hide().delay(300).fadeIn(1500);


/***************** Header *****************/
let aboutTop = $("#about").offset().top;
let projectsTop = $("#projects").offset().top;

$("#nav_about").on("click", function() {
  $("html,body").animate({scrollTop: aboutTop}, 500);
})

$("#nav_projects").on("click", function() {
  $("html,body").animate({scrollTop: projectsTop}, 500);
})

// Scroll Events
const isAboutActive = function (y) {
  if (y >= aboutTop && y < projectsTop) return true 
}
const isProjectsActive = function (y) {
  if (y >= projectsTop) return true 
}

$(document).on("scroll", function() {
  // about
  if (isAboutActive(window.scrollY)) $("#nav_about").addClass("active");
  else $("#nav_about").removeClass("active");

  // projects
  if (isProjectsActive(window.scrollY)) $("#nav_projects").addClass("active");
  else $("#nav_projects").removeClass("active");

  if (window.innerWidth > 1339) {
    if (window.scrollY >= aboutTop && window.scrollY < (projectsTop - 100) ) $("#nav_about").addClass("active");
    else $("#nav_about").removeClass("active");
  
    if (window.scrollY >= (projectsTop - 100 )) $("#nav_projects").addClass("active");
    else $("#nav_projects").removeClass("active");  
  }
})

// For Smartphone
let lastScrollPosition = 0;

$(document).on("scroll", function() {
  if (window.innerWidth > 599) return

  const currentScrollPosition = window.scrollY;

  // UpMoveが付いてたら外す
  if( $("#header").hasClass("UpMove") ) {
    $("#header").removeClass("UpMove");  
  }

  // DownMoveが付いてたら外す
  if( $("#header").hasClass("DownMove") ) {
    $("#header").removeClass("DownMove");  
  }

  // Scroll Down
  if( lastScrollPosition < currentScrollPosition && currentScrollPosition > 0) {
      $("#header").addClass("UpMove");  
  }

  // Scroll Up
  if( lastScrollPosition > currentScrollPosition && currentScrollPosition > 0) {
      $("#header").addClass("DownMove");
  }

  // 最後のスクロール位置を保存
  lastScrollPosition = currentScrollPosition;
})

/***************** Title *****************/
// const aboutMeHeight = 505.578;
// const projectsHeight = 483.312;
// let aboutMeTitleTop = $("#about_me_title").offset().top;
// let projectsTitleTop = $("#projects_title").offset().top;
// $(window).on("resize", function() {
//   aboutMeTitleTop = $("#about_me_title").offset().top;
//   projectsTitleTop = $("#projects_title").offset().top;
// })
// // const aboutMeBottom = $("#about_me_title").offset().top + aboutMeHeight;
// // const projectsBottom = $("#projects_title").offset().top + projectsHeight;

// $(document).on("scroll", function() {
//   let projectsTop = $("#projects").offset().top - 50;
//   const aboutMeBottom = aboutMeTitleTop + aboutMeHeight;
//   const screenBottom = (window.scrollY + window.innerHeight) - window.innerHeight * 0.05;

//   // about me
//   if( screenBottom >= aboutMeBottom ) $("#about_me_title").addClass("title-active");
//   if( screenBottom <= aboutMeBottom ) $("#about_me_title").removeClass("title-active");
//   if( screenBottom >= projectsTop - (window.innerHeight * 0.05) ) {
//     $("#about_me_title").removeClass("title-active").addClass("title-after")
//   }
//   if( screenBottom >= aboutMeBottom && screenBottom <= projectsTop - (window.innerHeight * 0.05)) {
//     $("#about_me_title").removeClass("title-after")
//   }

//   // projects
//   const projectsBottom = projectsTitleTop + projectsHeight;

//   if( screenBottom >= projectsBottom ) $("#projects_title").addClass("title-active");
//   if( screenBottom <= projectsBottom ) $("#projects_title").removeClass("title-active");
// })

/***************** Scroll Down *****************/
$(document).on("scroll", function() {
  $("#scroll_down").addClass("hidden");
})

/***************** Back to Top *****************/
$("#back_to_top").on("click", function() {
  $("html,body").animate({scrollTop:0}, 800);
})