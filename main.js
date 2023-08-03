gsap.registerPlugin(ScrollTrigger);
const sequenceContainer = document.getElementById("sequenceContainer");
const bannerTexts = document.querySelectorAll(".animation-hero__text .fade-in.fade-in--up");
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");
const frameCount = 521;
const img = new Image();
const setting = document.querySelector(".setting button");

const images = [];
const airpods = {
	frame: 0,
};

const acceleration = 5.22;

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
		end: "+=15000",
		scrub: 1.2,
		onUpdate: (e) => paintFrame(e),
	},
});

scene1.to(
	bannerTexts,
	{
		opacity: 0,
		x: "-100%",
		duration: 1.5,
		ease: "expo.inOut",
		stagger: 0.05,
	},
	"-=10"
);

function updateFrame(index) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(images[index], 0, 0);
	requestAnimationFrame(() => updateFrame(airpods.frame));
}

function paintFrame(scrollData) {
	let currentFrameIndex = Math.ceil(scrollData.progress * 100 * acceleration);
	console.log(currentFrameIndex);
	if (currentFrameIndex < frameCount) {
		airpods.frame = currentFrameIndex;
	}
}

function initCanvas() {
	canvas.width = 1920;
	canvas.height = 1080;
	updateFrame(0);
	initStartElePositions();
	openingAnimations();
}

document.addEventListener("DOMContentLoaded", () => {
	initCanvas();
});

function initStartElePositions() {
	gsap.set(canvas, {
		y: "-100%",
		opacity: 0.8,
	});
	gsap.set(bannerTexts, {
		opacity: 0,
		x: "-100%",
	});
}

function openingAnimations() {
	let intoAnimationTl = gsap.timeline();
	intoAnimationTl
		.to(canvas, {
			y: "0",
			duration: 1.8,
			opacity: 1,
			ease: "power3.inOut",
		})
		.to(
			bannerTexts,
			{
				opacity: 1,
				x: 0,
				duration: 1.8,
				ease: "expo.inOut",
				stagger: 0.1,
			},
			"-=0.8"
		);
}
