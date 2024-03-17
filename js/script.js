const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);
const C = (e) => document.createElement(e);

const tl = gsap.timeline();
const dateTl = gsap.timeline({ paused: true });
let lenis = "";
const offSet = 20;



let last = { x: 0, y: 0 };


// Calling functions
setDefaults();
// test();
lenisFn();
loader();
cursor();
effects();
heroAnimation();
dateAnimation();
introAnimation();
audioAnimation();
scanAnimation();
videosAnimation();
contextAnimation();
authorAnimation();
aboutAnimation();
outroAnimation();





// Creating functions
function lenisFn() {
    lenis = new Lenis({
        wheelMultiplier: 2,
        duration: 1.5,
        easing: (x) => 1 - Math.pow(1 - x, 5),
    })

    function raf(time) {
        lenis.raf(time)
        ScrollTrigger.update();
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

function cursor() {
    const body = $("body");
    const shrinkCursor = $(".shrink-cursor")

    body.onmouseenter = () => gsap.to(".cursor", { scale: 1 })
    body.onmouseleave = () => gsap.to(".cursor", { scale: 0 })

    body.onmousemove = d => {
        gsap.to(".cursor", {
            top: d.y,
            left: d.x,
            duration: .3,
            ease: "power1"
        })
    }
}

function effects() {
    const underline = $$(".underline-hover");

    underline.forEach(u => {
        const span = C("span");
        u.appendChild(span);

        u.onmouseenter = () => {
            shrinkCursor();
            gsap.to(span, {
                width: "100%",
                duration: .7,
                ease: "power4.inOut",
            })
        }
        u.onmouseleave = () => {
            reinitialCursor();
            gsap.to(span, {
                width: "0%",
                right: "100%",
                duration: .7,
                ease: "power4.inOut",
                onComplete: () => span.style.right = 0
            })
        }
    })
}

function setDefaults() {
    const dateNoContainer = $("#date h2");
    const audioSection = $("#audio ul");
    const textContainer = $("#scan .text-container");
    const videosContainer = $(".videos-container");

    for (let i = 0; i < 4; i++) {
        dateNoContainer.innerHTML += `
            <div class="number">
                <div class="strip">
                    <div>0</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                </div>
            </div>
        `;
    }


    data.msc.forEach(m => {
        const { category, duration, artist } = m;

        audioSection.innerHTML += `
            <li class="relative overflow-hidden border-0 border-b transition-colors duration-300 ease-in-out">
                <div id="audio-pause">
                    <button class="flex justify-between items-center gap-x-4 w-full py-8 lg:py-10 px-4 lg:px-8">
                        <span class="btn-start-audio flex justify-center items-center p-[16.5px] rounded-full border-[1px] border-[--foreground] ease-in-out">
                            <span id="play-audio" class="block w-[15px] h-[15px] bg-[--foreground] translate-x-[2px]"></span>
                        </span>
                        <div class="flex flex-col md:flex-row gap-x-3 w-full lg:grid lg:grid-cols-3 lg:items-center">
                            <div class="flex gap-x-3 lg:col-span-2">
                                <h2 class="text-3xl lg:text-5xl uppercase tracking-tighter font-medium"> ${category} </h2>
                                <div class="audio-duration font-serif text-xl"> ${duration} min.</div>
                            </div>
                            <div class="audio-voice font-serif text-md md:text-xl lg:col-span-1 flex md:justify-end"> ${artist} </div>
                        </div>
                    </button>
                </div>

                <div id="audio-playing" class="absolute top-full">
                    <button
                        class="w-full flex items-center py-8 lg:py-10 px-4 lg:px-8 gap-x-4 cursor-pointer">
                        <div class="bg-[--background] rounded-full relative p-[18px] md:p-[17.5px]">
                            <span class="relative w-[52px] h-[52px]">
                                <span class="sr-only"> Play audio: Adults </span>
                                <span id="toggle-play-pause" class="w-[15px] h-[15px] bg-[--foreground]"></span>
                            </span> </div>
                        <div class="w-full">
                            <div class="flex gap-x-12 gap-y-3 w-full flex-col md:flex-row h-[60px] md:h-[50px] lg:h-[54px] md:items-center justify-center md:justify-start">
                                <div class="flex flex-col md:flex-row gap-x-3 lg:col-span-2 pointer-events-none">
                                    <div class="font-serif text-xl text-left w-28">
                                        <span class="w-[60px]">0:00</span>
                                        <span>|</span>
                                        <span>3:59</span>
                                    </div>
                                    <div class="font-serif text-md md:text-xl lg:col-span-1 flex md:justify-end text-left"> Patricia Lannes, Educator's Voice </div>
                                </div>
                                <div class="sm:flex flex-1 relative flex items-center pr-12 md:pr-0">
                                    <span class="dot absolute top-[50%] translate-y-[-50%] left-0 w-3 h-3 rounded-full bg-black hover:scale-150 transition-transform transtion-duration-500"></span>
                                    <span class="w-full md:w-[85%] py-3 cursor-pointer">
                                        <span class="h-[1px] w-full bg-black block"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <audio src="" class="hidden" muted=""></audio>
                    </button>
                </div>

                <span class="white-strip block absolute top-0 -z-10 left-0 h-full w-0 bg-[--foreground]"></span>
            </li>
        `;
    })



    data.scan.forEach((s, i) => {

        const { title, description, position, maskPosition } = s;
        textContainer.innerHTML += `
            <div class="h-screen w-full absolute top-0 left-0">
                <div class="title opacity-0 absolute top-5 left-0 px-4">
                    <div class="flex gap-x-10 text-xl font-medium">
                        <span>[${i + 1}]</span><span>${title}</span>
                    </div>
                </div>
                <div class="absolute ${position}">
                    <div class="font-serif flex flex-col gap-y-6 max-w-2xl text-xl md:text-2xl text-balance px-4">
                        <p class="description translate-y-10 opacity-0">${description}</p>
                    </div>
                </div>
            </div>
        `;
    })



    data.vids.thumbnail.forEach(t => {
        videosContainer.innerHTML += `
            <button class="video-container relative">
                <div class="pointer-events-none absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <svg width="108" height="108" class="pointer-events-none w-12 h-12 md:w-24 md:h-24" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="54" cy="54" r="53.25" stroke="#FAFAFA" stroke-width="1.5"></circle>
                        <path d="M48.1431 67.5V40.5L65.5002 54L48.1431 67.5Z" fill="#FAFAFA" stroke="#FAFAFA"></path>
                    </svg>
                </div>
                <img class="pointer-events-none object-cover h-full w-full" src=${t} alt="">
            </button>
        `;
    })
}








function pinAnimation(target) {
    let h = $(`#${target} .content-end-trigger`).clientHeight;
    gsap.to(`#${target} .content-end-trigger`, {
        ease: "none",
        scrollTrigger: {
            scroller: "body",
            pin: `#${target} .pin-spacer`,
            scrub: true,
            start: `top ${h - offSet}`,
            end: "top 0",
        }
    })
}

function textAnimation(target) {
    const lines = $$(`#${target} .line`);
    const spans = $$(`#${target} .line span`);
    spans.forEach(s => {
        s.style.display = "block";
    });
    lines.forEach(l => {
        l.style.display = "block";
        l.style.overflow = "hidden";
    });
    
    gsap.from(`#${target} .line span`, {
        y: "100%",
        ease: "power2",
        duration: 1,
        stagger: .15,
        scrollTrigger: {
            scroller: "body",
            trigger: `#${target} .line span`,
            start: "top 90%",
        }
    })
}

function loader() {
    const loader = $(".loader");
    const loaderCounter = $(".loader h1");
    const imgShower = $(".image-shower");
    const src = "https://museos.arteyeducacion.org/trail/image-";
    const maxImages = 12; // Maximum number of images allowed
    let images = []; // Array to store references to appended images

    tl
    .to(loader, {
        onUpdate: () => window.scrollTo(0, 0),
        top: "-100%",
        duration: 2,
        ease: "expo.inOut",
        onComplete: () => {
            loaderCounter.textContent = 100;
            loader.remove();
            gsap.to(imgShower, {
                opacity: 0,
                onComplete: () => imgShower.remove()
            })
        }
    })

    .from("#hero .line span", {
        y: "100%",
        ease: "power2",
        duration: 1,
        stagger: .15,
        delay: .5
    }, "-=1")
    .from(".hero-img-container", {
        opacity: 0,
        ease: "power2",
        duration: 2,
    }, "-=0.7")
    .from("header", {
        top: "-10%",
        ease: "power2",
        duration: 1,
    }, "<")



    const intervalId = setInterval(() => {
        if (loaderCounter.textContent <= 100) {
            loaderCounter.textContent++;
            loaderCounter.textContent++;
            loaderCounter.textContent++;
        } else {
            clearInterval(intervalId);
            loaderCounter.textContent = 100;
        }
    }, 12);

    imgShower.onmousemove = (event) => {
        if (images.length < maxImages) {
            const lastDistance = distanceFromLast(event.clientX, event.clientY);
            if (lastDistance > 30) {
                const img = C('img');
                const randomIndex = Math.floor(Math.random() * 10 + 2);
                img.src = `${src}${randomIndex}.jpg`;
                img.style.left = event.clientX + "px";
                img.style.top = event.clientY + "px";

                gsap.to(img, {
                    left: event.clientX,
                    top: event.clientY,
                });

                gsap.to(img, {
                    top: "120%",
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 1
                });
                gsap.to(img, {
                    opacity: 0,
                    duration: .7,
                    delay: 1
                });

                imgShower.appendChild(img);
                images.push(img);
            }
        } else {
            const lastDistance = distanceFromLast(event.clientX, event.clientY);
            if (lastDistance > 30) {
                const removedImage = images.shift(); // Remove oldest image
                imgShower.removeChild(removedImage);

                const img = C('img');
                const randomIndex = Math.floor(Math.random() * 10 + 2);
                img.src = `${src}${randomIndex}.jpg`;
                img.style.left = event.clientX + "px";
                img.style.top = event.clientY + "px";

                gsap.to(img, {
                    left: event.clientX,
                    top: event.clientY,
                });

                gsap.to(img, {
                    top: "120%",
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 1
                });
                gsap.to(img, {
                    opacity: 0,
                    duration: .7,
                    delay: 1
                });

                imgShower.appendChild(img);
                images.push(img);
            }
        }
    };

    const distanceFromLast = (x, y) => {
        const lastImage = images[images.length - 1];
        if (!lastImage) return Infinity;
        const lastX = parseFloat(lastImage.style.left);
        const lastY = parseFloat(lastImage.style.top);
        return Math.hypot(x - lastX, y - lastY);
    };
}

function heroAnimation() {
    gsap.to(".hero-img-container img", {
        scale: 1,
        ease: "expo.inOut",
        scrollTrigger: {
            scroller: "body",
            trigger: ".hero-img-container img",
            start: "top -80%",
            end: "top 150%",
            scrub: 5,
        }
    });

    gsap.to(".creator-name", {
        opacity: 0,
        scrollTrigger: {
            scroller: "body",
            start: "top -150%",
            end: "top -151%",
            scrub: 1,
        }
    })
}

function dateAnimation() {
    const strips = $$(".strip");

    dateTl
        .to(strips[3], {
            y: -12.4 + "em",
            duration: 3,
            ease: "expo.inOut",
        })
        .to(strips[2], {
            y: -13.9 + "em",
            duration: 2.5,
            ease: "expo.inOut",
        }, "-=2")
        .to(strips[1], {
            y: -12.4 + "em",
            duration: 2,
            ease: "expo.inOut",
        }, "-=2")
        .to(strips[0], {
            y: -1.9 + "em",
            duration: 3.5,
            ease: "expo.inOut",
        }, "-=3");

    ScrollTrigger.create({
        animation: dateTl,
        trigger: ".strip"
    })
}

function introAnimation() {
    pinAnimation("intro");
}

function audioAnimation() {
    const audioSection = $("#audio");

    audioSection.onmouseenter = () => {
        gsap.to(".cursor", { backgroundColor: "black" })
        shrinkCursor();
    }

    audioSection.onmouseleave = () => {
        gsap.to(".cursor", { backgroundColor: "white" })
        reinitialCursor();
    }
}

function scanAnimation() {
    const scanSection = $("#scan");
    const titles = $$("#scan .text-container .title");
    const description = $$("#scan .text-container p");
    const progressBar = $("#scan .progress-bar");


    scanSection.onmouseenter = () => {
        $(".cursor").innerHTML = "<span class='pb-1'>+</span>";
        gsap.to(".cursor", {
            backgroundColor: "#171615",
            height: 50,
            width: 50,
            rotate: 90,
            ease: "power4.inOut",
        })
    }
    scanSection.onmouseleave = () => {
        $(".cursor").textContent = "";
        gsap.to(".cursor", {
            backgroundColor: "white",
            height: 12,
            width: 12,
            ease: "power4.inOut",
        })
    }


    gsap.to(".scan-container .mask", {
        onStart: () => {
            gsap.to(titles[0], {
                opacity: 1,
                ease: "expo.inOut",
                duration: 1.5,
            });
            gsap.to(description[0], {
                opacity: 1,
                y: 0,
                ease: "expo.inOut",
                duration: 1.5,
            });
        },
        clipPath: `circle(${data.scan[0].maskPosition})`,
        ease: "expo.inOut",
        duration: 1.5,
        scrollTrigger: {
            scroller: "body",
            trigger: ".scan-container .mask",
            end: "top 100%",
            start: "top 1%",
        }
    })

    let pg = 0;
    gsap.to(".scan-container .mask", {
        clipPath: `circle(${data.scan[pg].maskPosition})`,
        ease: "expo.inOut",
        duration: 1.5,
        scrollTrigger: {
            scroller: "body",
            pin: "#scan",
            start: "top 0",
            end: "top -2000%",
            onUpdate: self => {
                const newPg = Math.round(self.progress * 6);
                gsap.to(progressBar, {
                    scaleX: (self.progress * 100) + "%",
                    duration: .1
                })
                if (newPg !== pg) {
                    pg = newPg;
                    tl
                        .to(".scan-container .mask", {
                            clipPath: `circle(${data.scan[pg].maskPosition})`,
                            ease: "expo.inOut",
                            duration: 1,
                            onStart: () => {
                                gsap.set("#scan .text-container .title, #scan .text-container p", { opacity: 0 })
                                gsap.set("#scan .text-container p", { y: "2.5rem" })

                            }
                        })
                        .to(titles[pg], {
                            opacity: 1,
                            ease: "expo.inOut",
                            duration: 1,
                        }, "<")
                        .to(description[pg], {
                            opacity: 1,
                            y: 0,
                            ease: "expo.inOut",
                            duration: 1,
                        }, "-=0.7")
                }

                gsap.to("header", {
                    top: self.progress > 0 && self.progress < 0.92 ? "-10%" : "0",
                    color: self.progress >= 0.92 && self.progress < 1 ? "black" : "white"
                });                           
            },
        }
    });




    scanSection.onmousedown = (e) => {
        if (e.button === 0) {
            gsap.to(".scan-container .mask", {
                clipPath: "circle(70.7% at 50% 50%)",
                ease: "expo.inOut",
                duration: 2,
                delay: .5
            })
            gsap.to(".cursor", {
                scale: .7,
                rotate: "+=90",
                duration: .7,
                ease: "power4"
            })
        }
    }
    scanSection.onmouseup = (e) => {
        if (e.button === 0) {
            gsap.to(".scan-container .mask", {
                clipPath: `circle(${data.scan[pg].maskPosition})`,
                ease: "expo.out",
                duration: 1,
            })
            gsap.to(".cursor", {
                scale: 1,
                rotate: 0,
                duration: .7,
                ease: "power4"
            })
        }
    }
}

function contextAnimation() {
    pinAnimation("context");
    textAnimation("context");

    gsap.to(".a-context img", {
        scale: 1.6,
        y: -60,
        ease: "none",
        scrollTrigger: {
            scroller: "body",
            trigger: ".a-context img",
            start: "top 100%",
            end: "top -100%",
            scrub: true,
        }
    })
}

function videosAnimation() {
    const videosSection = $("#videos");
}

function authorAnimation() {
    pinAnimation("author");
    textAnimation("author");
}

function aboutAnimation() {
    pinAnimation("about");
    textAnimation("about");
}

function outroAnimation() {
    gsap.set("#outro a", { opacity: 0 });
    const shareBtn = $("#outro button");

    gsap.to("#outro .clip", {
        clipPath: "polygon(0px 0px, 100% 0px, 58% 70%, 58% 100%, 42% 100%, 42% 70%)",
        ease: "none",
        scrollTrigger: {
            scroller: "body",
            trigger: "#outro .clip",
            start: "top 85%",
            end: "top -40%",
            scrub: true,
        }
    })
    gsap.to("#outro .clip img", {
        scale: 1,
        ease: "none",
        scrollTrigger: {
            scroller: "body",
            trigger: "#outro .clip img",
            start: "top 85%",
            end: "top -40%",
            scrub: true,
        }
    })

    shareBtn.onclick = () => {
        gsap.set("#outro a", { y: 0, opacity: 1 })
        gsap.from("#outro a", {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: "expo.inOut",
            stagger: .1,
        })
    }
}






function test() {
    gsap.set('.loader, header, #hero, #date, #intro, #audio, #tutorial, #context, #scan, .image-shower', { display: 'none' })
}



// Reusable functions
function shrinkCursor() {
    gsap.to(".cursor", {
        scale: .5,
        duration: .3,
        ease: "power4"
    })
}
function reinitialCursor() {
    gsap.to(".cursor", {
        scale: 1,
        duration: .3,
        ease: "power4"
    })
}