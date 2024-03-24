const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".bounding-element", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleMouseFollower(angle, scale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${
      dets.clientX
    }px,${dets.clientY}px) rotate(${-angle}deg) scaleY(${scale})`;
  });
}

function angleBetweenPoints(originX, originY, targetX, targetY) {
  return (Math.atan2(targetX - originX, targetY - originY) * 180) / Math.PI;
}

function distanceBetweenPoints(originX, originY, targetX, targetY) {
  return Math.hypot(targetX - originX, targetY - originY);
}

function cursorPinch() {
  var xPrevious = 0;
  var yPrevious = 0;
  var timeout;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    const angle = angleBetweenPoints(
      xPrevious,
      yPrevious,
      dets.clientX,
      dets.clientY
    );
    const distance = distanceBetweenPoints(
      xPrevious,
      yPrevious,
      dets.clientX,
      dets.clientY
    );
    const scale = gsap.utils.clamp(1, 1.5, distance);

    xPrevious = dets.clientX;
    yPrevious = dets.clientY;

    circleMouseFollower(angle, scale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

cursorPinch();
firstPageAnimation();
circleMouseFollower();

document.querySelectorAll(".element").forEach(function (element) {
  var rotate = 0;
  var diffRotate = 0;
  element.addEventListener("mousemove", function (details) {
    var diff = details.clientY - element.getBoundingClientRect().top;

    diffRotate = details.clientX - rotate;
    rotate = details.clientX;

    // element.getBoundingClientRect().top --> Distance of element from top to screen ( stays same untill scrolled website)
    // details.clientY --> Distance of mouse from top
    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-15, 15, diffRotate * 0.8),
    });
    gsap.to(element.querySelector("h1"), {
      opacity: 0.4,
      ease: Power3,
      x: 50,
    });
    gsap.to(element.querySelector("h5"), {
      opacity: 0.4,
      ease: Power3,
    });
  });
  element.addEventListener("mouseleave", function (details) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(element.querySelector("h1"), {
      opacity: 1,
      ease: Power3,
      x: 0,
    });
    gsap.to(element.querySelector("h5"), {
      opacity: 1,
      ease: Power3,
    });
  });
});
