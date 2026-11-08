
/* =====================================
   INITIAL SETUP
===================================== */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =====================================
   OPENING CURTAINS
===================================== */

const curtainScreen = document.getElementById("curtainScreen");
const curtainContent = document.getElementById("curtainContent");
const openCurtain = document.getElementById("openCurtain");

let curtainOpened = false;

openCurtain.addEventListener("click", () => {

    if (curtainOpened) return;

    curtainOpened = true;

    curtainContent.classList.add("hide");

    curtainScreen.classList.add("open");

    // Fireworks when the website is revealed
    setTimeout(() => {

        burst(
            window.innerWidth / 2,
            window.innerHeight * 0.3
        );

        burst(
            window.innerWidth * 0.25,
            window.innerHeight * 0.35
        );

        burst(
            window.innerWidth * 0.75,
            window.innerHeight * 0.35
        );

    }, reducedMotion ? 0 : 1300);

});


/* =====================================
   DECORATIVE LIGHTS
===================================== */

const lightsContainer = document.getElementById("lights");

for (let i = 0; i < 35; i++) {

    const light = document.createElement("span");

    light.classList.add("light");

    lightsContainer.appendChild(light);

}


/* =====================================
   SCROLL FUNCTION
===================================== */

function scrollToSection(sectionId) {

    document.getElementById(sectionId).scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth"
    });

}


/* =====================================
   INTERACTIVE WISHES
===================================== */

function showWish(number) {

    const wish = document.getElementById("wish" + number);

    const isOpening = !wish.classList.contains("show");

    wish.classList.toggle("show");

    if (isOpening) {

        wish.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "center"
        });

        burst(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

    }

}


/* =====================================
   FLOATING FLOWERS
===================================== */

const flowers = [
    "🌸",
    "🌼",
    "🌺",
    "✨",
    "🌹",
    "🪷",
    "💮"
];

const petalsContainer = document.getElementById("petals");

function createPetal() {

    if (document.hidden) return;

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.fontSize =
        (15 + Math.random() * 20) + "px";

    const duration = 6 + Math.random() * 8;

    petal.style.animationDuration = duration + "s";

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);

}

if (!reducedMotion) {

    setInterval(createPetal, 700);

}


/* =====================================
   FLOATING GOLD PARTICLES
===================================== */

const particleContainer = document.getElementById("particles");

function createGoldParticles() {

    for (let i = 0; i < 35; i++) {

        const dot = document.createElement("span");

        dot.classList.add("gold-dot");

        dot.style.left = Math.random() * 100 + "%";

        dot.style.animationDuration =
            (8 + Math.random() * 12) + "s";

        dot.style.animationDelay =
            (Math.random() * 10) + "s";

        particleContainer.appendChild(dot);

    }

}

if (!reducedMotion) {
    createGoldParticles();
}


/* =====================================
   FIREWORKS CANVAS
===================================== */

function resizeCanvas() {

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =====================================
   CREATE FIREWORK BURST
===================================== */

function burst(x, y) {

    const colors = [
        "#ffd166",
        "#ff6b4a",
        "#ffffff",
        "#ff9f1c",
        "#ffcf70",
        "#f8f32b",
        "#ff7892"
    ];

    for (let i = 0; i < 90; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 5 + 1;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 100,

            color:
                colors[Math.floor(Math.random() * colors.length)],

            size: Math.random() * 3 + 1

        });

    }

}


/* =====================================
   ANIMATE FIREWORKS
===================================== */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.035;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.life--;

        ctx.globalAlpha = particle.life / 100;

        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    particles = particles.filter(
        particle => particle.life > 0
    );

    ctx.globalAlpha = 1;

    animationFrame = requestAnimationFrame(animateFireworks);

}

animateFireworks();


/* =====================================
   RANDOM BACKGROUND FIREWORKS
===================================== */

function randomFirework() {

    if (document.hidden) return;

    const x = Math.random() * window.innerWidth;

    const y = Math.random() * window.innerHeight * 0.55;

    burst(x, y);

}

if (!reducedMotion) {

    setInterval(randomFirework, 2500);

}


/* =====================================
   FINAL CELEBRATION
===================================== */

function celebrate() {

    for (let i = 0; i < 10; i++) {

        setTimeout(() => {

            burst(
                Math.random() * window.innerWidth,

                Math.random() * window.innerHeight * 0.65
            );

        }, i * 300);

    }

    // Extra flower shower

    if (!reducedMotion) {

        for (let i = 0; i < 30; i++) {

            setTimeout(() => {
                createPetal();
            }, i * 100);

        }

    }

    // Change button text

    const button = document.querySelector(".celebrate-button");

    button.innerHTML = "✨ Diwali Magic! ✨";

    button.disabled = true;

}
