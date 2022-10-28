gsap.registerPlugin(ScrollTrigger)
const sequenceContainer = document.getElementById('sequenceContainer');
const canvas = document.getElementById('sequence-canvas');
const context = canvas.getContext('2d');
const frameCount = 189;
const img = new Image();


const scene1 = gsap.timeline({
    scrollTrigger: {
        trigger: sequenceContainer,
        pin: true,
        start: "top top",
        scrub: 1,
        onUpdate: (e) => paintFrame(e)
    }
});

const scene2 = gsap.timeline({
    scrollTrigger: {
        trigger: sequenceContainer,
        start: "top top",
        scrub: 1
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


function getCurrentFrame(index) {
    return `http://127.0.0.1:5500/sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
}

function preloadImages() {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = getCurrentFrame(i);
    }
}

function updateFrame(index) {
    img.src = getCurrentFrame(index);
    context.drawImage(img, 0, 0, 1280, 720);
}

function paintFrame(scrollData) {
    let currentFrameIndex = Math.ceil((scrollData.start * scrollData.progress) * 0.3) || 1;
    if (currentFrameIndex <= frameCount) {
        requestAnimationFrame(() => updateFrame(currentFrameIndex));
    }
}

function initCanvas() {
    img.src = getCurrentFrame(1);
    canvas.width = 1280;
    canvas.height = 720;
    img.onload = function () {
        context.drawImage(img, 0, 0, 1280, 720);
    }
}

preloadImages();
initCanvas();