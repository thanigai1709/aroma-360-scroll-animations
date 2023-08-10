gsap.registerPlugin(ScrollTrigger);

// Element References
const sequenceContainer = document.getElementById("sequenceContainer");
const bannerTexts = document.querySelectorAll(".animation-hero__text .fade-in.fade-in--up");
const canvas = document.getElementById("sequence-canvas");
const context = canvas.getContext("2d");

// Constants
const frameCount = 521;
const img = new Image();
const setting = document.querySelector(".setting button");
let isAutoPlaying = false;
let autoScrollInterval;
const images = [];
const loadImages = [];
let imageLoadedCount;
let bufferThreshold = 100;
const wirelessProAnimationState = {
	frame: 0,
};
const acceleration = 5.22;

// Function to generate image URLs for frames
const getFrameImageUrl = (index) => `sequence/img-${index + 1}.webp`;

function initImageSequence() {
	// Populating images
	for (let i = 0; i < bufferThreshold; i++) {
		const img = new Image();
		img.src = getFrameImageUrl(i);
		images.push(img);
	}
	imageLoadedCount = images.length;
}

initImageSequence();

function bufferImageSequence(currentFrameIndex) {
	if (imageLoadedCount < frameCount && imageLoadedCount + parseInt(bufferThreshold / 2) > currentFrameIndex) {
		let newBoundry =
			currentFrameIndex + bufferThreshold > frameCount ? frameCount : currentFrameIndex + bufferThreshold;
		if (newBoundry > imageLoadedCount) {
			for (let i = imageLoadedCount - 1; i < newBoundry; i++) {
				const img = new Image();
				img.src = getFrameImageUrl(i);
				images.push(img);
			}
			imageLoadedCount = images.length;
		}
	}
}

// GSAP Scroll Animation
const scrollAnimation = gsap.timeline({
	scrollTrigger: {
		trigger: sequenceContainer,
		pin: true,
		anticipatePin: 1.5,
		start: "top top",
		end: "+=17000",
		scrub: 1.2,
		onUpdate: (e) => updateCanvasFrame(e),
	},
});

scrollAnimation
	.to(
		bannerTexts,
		{
			opacity: 0,
			x: "-100%",
			duration: 0.6,
			stagger: false,
			ease: "expo.inOut",
		},
		"-=10"
	)
	.to(
		".animation-captions__item.caption--1",
		{
			opacity: 1,
			duration: 0.7,
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
		"-=9.2"
	)
	.to(
		".animation-captions__item.caption--2",
		{
			opacity: 1,
			duration: 0.7,
			ease: "expo.inOut",
		},
		"-=9"
	)
	.to(
		".animation-captions__item.caption--2",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=8.2"
	)
	.to(
		".animation-captions__item.caption--3",
		{
			opacity: 1,
			duration: 0.7,
			ease: "expo.inOut",
		},
		"-=8"
	)
	.to(
		".animation-captions__item.caption--3",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=7.2"
	)
	.to(
		".animation-captions__item.caption--4",
		{
			opacity: 1,
			duration: 0.7,
			ease: "expo.inOut",
		},
		"-=7"
	)
	.to(
		".animation-captions__item.caption--4",
		{
			opacity: 0,
			duration: 0.4,
			ease: "expo.inOut",
		},
		"-=6.2"
	)
	.to(
		".feature-captions h3",
		{
			opacity: 1,
			duration: 0.7,
			ease: "expo.inOut",
			stagger: 0.1,
		},
		"-=4.2"
	)
	.to(
		".feature-captions h3",
		{
			opacity: 0,
			duration: 0.7,
			ease: "expo.inOut",
			stagger: 0.1,
		},
		"-=3.5"
	);

// Function to update the canvas frame
function updateCanvasFrame(scrollData) {
	let currentFrameIndex = Math.ceil(scrollData.progress * 100 * acceleration);
	if (currentFrameIndex < frameCount) {
		if (scrollData.direction === 1 && parseInt(scrollData.progress * 100) > 0) bufferImageSequence(currentFrameIndex);
		wirelessProAnimationState.frame = currentFrameIndex;
	}
}

// Function to paint the canvas frame
function paintCanvasFrame() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(images[wirelessProAnimationState.frame], 0, 0);
	requestAnimationFrame(paintCanvasFrame);
}

// Function to initialize canvas and animations
function initializeCanvasAndAnimations() {
	window.scrollTo(0, 0);
	canvas.width = 1920;
	canvas.height = 1080;
	paintCanvasFrame();
	initializeStartPosition();
	playOpeningAnimations();
}

if (history.scrollRestoration) {
	history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
	window.scrollTo(0, 0);
	// smooth scroll disabled in mobile screens for performance reasons
	if (window.innerWidth > 768) {
		console.log("lennis loading");
		const lenis = new Lenis();
		lenis.on("scroll", (e) => {
			// console.log(e);
		});
		function requestAnimationFrameLoop(time) {
			lenis.raf(time);
			requestAnimationFrame(requestAnimationFrameLoop);
		}
		requestAnimationFrame(requestAnimationFrameLoop);
	}
	initializeCanvasAndAnimations();
});

// Function to initialize start positions of elements
function initializeStartPosition() {
	document.querySelector(".animation-hero__text").style.visibility = "visible";
	gsap.set(canvas, {
		y: "-100%",
		opacity: 0.8,
	});
	gsap.set(bannerTexts, {
		opacity: 0,
		x: "-100%",
	});
}

// Function to play opening animations
function playOpeningAnimations() {
	let openingAnimationTl = gsap.timeline();
	openingAnimationTl
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
