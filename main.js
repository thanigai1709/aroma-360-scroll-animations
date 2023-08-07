gsap.registerPlugin(ScrollTrigger);
const sequenceContainer = document.getElementById("sequenceContainer");
const bannerTexts = document.querySelectorAll(".animation-hero__text .fade-in.fade-in--up");
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");
const frameCount = 521;
const img = new Image();
const setting = document.querySelector(".setting button");
let isAutoPlaying = false;
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
		end: "+=17000",
		scrub: 1.2,
		onUpdate: (e) => paintFrame(e),
	},
});

scene1
	.to(
		bannerTexts,
		{
			opacity: 0,
			x: "-100%",
			duration: 0.8,
			stagger: 0.05,
			ease: "expo.inOut",
		},
		"-=10"
	)
	.to(
		".animation-captions__item.caption--1",
		{
			opacity: 1,
			duration: 0.6,
			ease: "power3.inOut",
		},
		"-=9.9"
	)
	.to(
		".animation-captions__item.caption--1",
		{
			opacity: 0,
			duration: 0.4,
			ease: "power3.inOut",
		},
		"-=9"
	)
	.to(
		".animation-captions__item.caption--2",
		{
			opacity: 1,
			duration: 0.6,
			ease: "expo.inOut",
		},
		"-=8.9"
	)
	.to(
		".animation-captions__item.caption--2",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=8"
	)
	.to(
		".animation-captions__item.caption--3",
		{
			opacity: 1,
			duration: 0.6,
			ease: "expo.inOut",
		},
		"-=7.9"
	)
	.to(
		".animation-captions__item.caption--3",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=7"
	)
	.to(
		".animation-captions__item.caption--4",
		{
			opacity: 1,
			duration: 0.6,
			ease: "expo.inOut",
		},
		"-=6.9"
	)
	.to(
		".animation-captions__item.caption--4",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=6.2"
	);

function updateFrame(index) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(images[index], 0, 0);
	requestAnimationFrame(() => updateFrame(airpods.frame));
}

function paintFrame(scrollData) {
	let currentFrameIndex = Math.ceil(scrollData.progress * 100 * acceleration);
	// console.log(scrollData.progress);
	// if (scrollData.progress >= 0.7 && scrollData.progress <= 0.95) {
	// 	if (!isAutoPlaying) {
	// 		isAutoPlaying = true;
	// 		autoScroll();
	// 	}
	// } else {
	// 	if (isAutoPlaying) isAutoPlaying = false;
	// 	if (currentFrameIndex < frameCount) {
	// 		airpods.frame = currentFrameIndex;
	// 	}
	// }
	if (currentFrameIndex < frameCount) {
		airpods.frame = currentFrameIndex;
	}
}

function autoScroll() {
	let index = 1;
	setInterval(() => {
		if (index <= 135) {
			airpods.frame = airpods.frame + 1;
			console.log(airpods.frame, "current frame", index, "count");
			index++;
		}
	}, 200);
}

function initCanvas() {
	window.scrollTo(0, 0);
	canvas.width = 1920;
	canvas.height = 1080;
	updateFrame(0);
	initStartElePositions();
	openingAnimations();
}

document.addEventListener("DOMContentLoaded", () => {
	const lenis = new Lenis();

	lenis.on("scroll", (e) => {
		console.log(e);
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
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
