
var tl = gsap.timeline({duration: 0.3});
tl.from("#wicked", {x: -40,duration: 0.1, opacity: 0, display: "block"});
tl.to("#wicked", {x: 40,duration: 0.1, opacity: 0, delay: 1, display: "none"});
tl.from("#powerful", {x: -40,duration: 0.1, opacity: 0, display: "block"});
tl.to("#powerful", {x: 40,duration: 0.1, opacity: 0, delay: 1,  display: "none"});
tl.from("#free", {x: -40,duration: 0.1, opacity: 0, display: "block"});
tl.to(".intro", {y: -90,duration: 0.1, opacity: 0, delay: 1,  display: "none"});
tl.from("#title", {y: 40, opacity: 0});
tl.from("#sub-title", {y: 40, opacity: 0}, "-=0.3");
tl.from(".header", {y: 40, opacity: 0},"-=0.3");






