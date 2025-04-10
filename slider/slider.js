const sliderTrack = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__slide');
const moveLeftBtn = document.querySelector('.slider__control-left');
const moveRightBtn = document.querySelector('.slider__control-right');

const slideSrcs = [];
let currentImgPointer;
let offset;

const init = () => {
  slides.forEach((slide) => {
    slideSrcs.push(slide.src);
    slide.remove();
  });

  currentImgPointer = 0;
  offset = 0;

  draw();
  draw();
};

const draw = () => {
  const img = document.createElement('img');
  img.src = slideSrcs[currentImgPointer];
  img.classList.add('slider__slide');
  img.style.left = offset * 600 + 'px';
  sliderTrack.appendChild(img);

  if (currentImgPointer + 1 === slideSrcs.length) {
    currentImgPointer = 0;
  } else {
    currentImgPointer += 1;
  }

  offset = 1;
};

const moveLeft = () => {
  moveRightBtn.removeEventListener('click', moveLeft);
  const visibleSlides = document.querySelectorAll('.slider__slide');
  let offset2 = 0;
  for (let i = 0; i < visibleSlides.length; i++) {
    visibleSlides[i].style.left = offset2 * 600 - 600 + 'px';
    offset2 += 1;
  }
  setTimeout(() => {
    visibleSlides[0].remove();
    draw();
    moveRightBtn.addEventListener('click', moveLeft);
  }, 1000);
};

// ----------------------------- //
moveRightBtn.addEventListener('click', moveLeft);
init();
