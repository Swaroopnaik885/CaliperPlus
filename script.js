import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import { delay, delayInSeconds } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// Client Experiences Card Stack
const container = document.getElementById("CE-cards");
const nextButton = document.getElementById("CE-Button");

const cardImages = {
  desktop: [
    "Images/Client-E-1.png",
    "Images/Client-E-2.png",
    "Images/Client-E-3.png",
    "Images/Client-E-4.png",
    "Images/Client-E-5.png",
    "Images/Client-E-6.png",
  ],
  mobile: [
    "Images/Client-E-M-1.png",
    "Images/Client-E-M-2.png",
    "Images/Client-E-M-3.png",
    "Images/Client-E-M-4.png",
    "Images/Client-E-M-5.png",
    "Images/Client-E-M-6.png",
  ],
};

function getDeviceImages() {
  return window.innerWidth >= 1024
    ? cardImages.desktop
    : cardImages.mobile;
}

let images = getDeviceImages();
let cards = [];

function createCards() {
  container.innerHTML = "";
  cards = [];

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;

    img.className = `
      absolute top-0 -left-16 lg:-left-20 
      w-[22rem] lg:w-auto h-auto 
      cursor-pointer
    `;

    img.style.zIndex = images.length - index;

    container.appendChild(img);
    cards.push(img);
  });

  stackCards();
}

function stackCards() {

  const isDesktop = window.innerWidth >= 1024;

  const desktopConfig = {
    x: 100,
    y: 20,
    blur: 1,
    opacity: 0.3
  };

  const mobileConfig = {
    x: 20,
    y: 15,
    blur: 1,
    opacity: 0.3
  };

  const config = isDesktop ? desktopConfig : mobileConfig;

  cards.forEach((card, index) => {
    animate(card, {
      transform: `
        translateY(${index * config.y}px)
        translateX(${index * config.x}px)
      `,
      filter: `blur(${index * config.blur}px)`,
      opacity: Math.max(1 - index * config.opacity)
    }, {
      duration: 0.25,
      easing: "ease-in-out",
    });
  });
}

async function rotateStack() {
  if (cards.length === 0) return;

  const frontCard = cards[0];

  await animate(frontCard, {
    transform: `
      translateY(0px)
      translateX(-500px)
      scale(1)
      opacity(1)
    `,
    opacity: 0
  }, {
    duration: 0.1,
    easing: "ease-in",
  }).finished;

  frontCard.style.transition = "none";
  frontCard.style.opacity = "0";

  cards.shift();
  cards.push(frontCard);
  cards.forEach((card, i) => {
    card.style.zIndex = cards.length - i;
  });

  stackCards();
}

nextButton.addEventListener("click", () => {
  rotateStack();
});

window.addEventListener("resize", () => {
  images = getDeviceImages();
  createCards();
});

createCards();



// Hero-Buttons
const EOP = document.getElementById("EOP-btn");
EOP.addEventListener("click", () => {
  window.location.href = "Pages/EOP.html";
});

const SP = document.getElementById("SP-btn");
SP.addEventListener("click", () => {
  window.location.href = "Pages/Service.html";
});







const btn = document.getElementById("toggleServices");
const extraItems = document.querySelectorAll(".extra");

let isOpen = false;

btn.addEventListener("click", () => {
    isOpen = !isOpen;

    extraItems.forEach(item => {
        if (isOpen) {
            item.classList.remove("hidden");
            setTimeout(() => {
                item.classList.remove("opacity-0", "translate-y-6");
            }, 50);
        } else {
            item.classList.add("opacity-0", "translate-y-6");
            setTimeout(() => {
                item.classList.add("hidden");
            }, 500);
        }
    });

    btn.innerText = isOpen ? "Show Less" : "View All Services";
});