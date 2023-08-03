gsap.registerPlugin(ScrollTrigger);
const sequenceContainer = document.getElementById("sequenceContainer");
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");
const frameCount = 471;
const img = new Image();
const setting = document.querySelector(".setting button");

const images = [];
const airpods = {
	frame: 0,
};

const acceleration = 0.06;

// Populating images
const currentFrame = (index) => `sequence/img-${index + 1}.png`;

for (let i = 0; i < frameCount; i++) {
	const img = new Image();
	img.src = currentFrame(i);
	console.log(currentFrame, "current frame");
	images.push(img);
}

const scene1 = gsap.timeline({
	scrollTrigger: {
		trigger: sequenceContainer,
		pin: true,
		anticipatePin: 1.5,
		start: "top top",
		scrub: 50,
		onUpdate: (e) => paintFrame(e),
	},
});

// scene1.to(canvas, { duration: 0.5, scale: 1, ease: "power4.easeOut" }, "scene-in-1");

function updateFrame(index) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(images[index], 0, 0);
	requestAnimationFrame(() => updateFrame(airpods.frame));
}

function paintFrame(scrollData) {
	console.log(scrollData, "scrollData");
	let currentFrameIndex = Math.ceil(scrollData.start * scrollData.progress * acceleration);
	console.log(currentFrameIndex);
	if (currentFrameIndex < frameCount) {
		airpods.frame = currentFrameIndex;
	}
}

function initCanvas() {
	canvas.width = 1920;
	canvas.height = 1080;
	updateFrame(0);
}

document.addEventListener("DOMContentLoaded", () => {
	initCanvas();
});

console.log(location.hostname, "hostname");
