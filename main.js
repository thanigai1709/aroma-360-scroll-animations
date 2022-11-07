gsap.registerPlugin(ScrollTrigger)
const sequenceContainer = document.getElementById('sequenceContainer');
const video = document.querySelector('video');
const setting = document.querySelector('.setting button');
const player = document.querySelector('#lottie-player');
let animation = lottie.loadAnimation({
    container: player,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'aroma.json'
});

let screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

setting.addEventListener('click', () => {
    document.querySelectorAll('.pin-head').forEach(el => el.style.display = "none");
});



if (screenSize > 824) {
    const scene1 = gsap.timeline({
        scrollTrigger: {
            trigger: sequenceContainer,
            pin: true,
            start: "top top",
            scrub: 1.5,
            onUpdate: (e) => seedVideoFrame(e)
        }
    });

    const scene2 = gsap.timeline({
        scrollTrigger: {
            trigger: sequenceContainer,
            start: "top top",
            scrub: 1.5
        }
    });
    // products part contents
    scene1.to('.text-block.first .text-block__content', { duration: 0.5, y: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-1')
        .to('.text-block.first .text-block__content', { duration: 1.8, y: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-1')
        .to('.text-block.second .text-block__content', { duration: 0.5, y: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-1')
        .to('.text-block.second .text-block__content', { duration: 1.8, y: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-1')
        .to('.text-block.fourth .text-block__content', { duration: 0.7, y: '0%', opacity: 1, ease: "power3.inOut" }, ">-0.7", 'scene-in-2')
        .to('.text-block.fourth .text-block__content', { duration: 1.8, y: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-2')
        .to('.text-block.third .text-block__content', { duration: 0.6, y: '0%', opacity: 1, ease: "power3.inOut" }, ">-2.2", 'scene-in-3')
        .to('.text-block.third .text-block__content', { duration: 1, y: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-3')
        .to('.text-block.fifth .text-block__content', { duration: 3.1, y: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-4')
    // product part highlight lines
    scene2.to('.text-block.first .pin-head', { duration: 0.5, x: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-1')
        .to('.text-block.first .pin-head', { duration: 1.8, x: "-100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-1')
        .to('.text-block.second .pin-head', { duration: 0.5, x: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-1')
        .to('.text-block.second .pin-head', { duration: 1.8, x: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-1')
        .to('.text-block.fourth .pin-head', { duration: 0.7, x: '0%', opacity: 1, ease: "power3.inOut" }, ">-0.5", 'scene-in-2')
        .to('.text-block.fourth .pin-head', { duration: 1.8, x: "100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-2')
        .to('.text-block.third .pin-head', { duration: 0.6, x: '0%', opacity: 1, ease: "power3.inOut" }, ">-2.2", 'scene-in-3')
        .to('.text-block.third .pin-head', { duration: 1, x: "-100%", opacity: 0, ease: "power3.inOut" }, 'scene-out-3')
        .to('.text-block.fifth .pin-head', { duration: 3.1, x: '0%', opacity: 1, ease: "power3.inOut" }, 'scene-in-4')
}




function seedVideoFrame(scrollData) {
    let progress = scrollData.progress;
    let totolFrames = animation.totalFrames - 1;
    let setAnimationFrameTo = (progress * totolFrames) < 0 ? 0 : progress * totolFrames;
    console.log(setAnimationFrameTo, "current animation frame");
    requestAnimationFrame(() => {
        animation.goToAndStop(setAnimationFrameTo, true)
    })
}