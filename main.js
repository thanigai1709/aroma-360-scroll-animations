gsap.registerPlugin(ScrollTrigger);
const sequenceContainer = document.getElementById("sequenceContainer");
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");
const frameCount = 48;
const img = new Image();
const setting = document.querySelector(".setting button");

const images = [];
const airpods = {
	frame: 0,
};

const acceleration = 0.054;

// Populating images
const currentFrame = (index) =>
	`https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large/large_${index
		.toString()
		.padStart(4, "0")}.jpg`;

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
		anticipatePin: 1,
		start: "top top",
		scrub: 1.8,
		onUpdate: (e) => paintFrame(e),
	},
});

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
	canvas.width = 1000;
	canvas.height = 1214;
	updateFrame(0);
}

document.addEventListener("DOMContentLoaded", () => {
	initCanvas();
});

console.log(location.hostname, "hostname");
