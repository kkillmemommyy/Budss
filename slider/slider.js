// global
const sliderTrack = document.querySelector('.slider__track');
const allSlides = document.querySelectorAll('.slider__slide');
const moveLeftBtn = document.querySelector('.slider__control-left');
const moveRightBtn = document.querySelector('.slider__control-right');

const SLIDE_WIDTH = 600;
const ANIMATION_DURATION = 800;

let currentSlidePointer;

// utils
const getPrevSlide = () => {
  if (currentSlidePointer === 0) {
    return allSlides[allSlides.length - 1];
  } else {
    return allSlides[currentSlidePointer - 1];
  }
};

const getCurrentSlide = () => {
  return allSlides[currentSlidePointer];
};

const getNextSlide = () => {
  if (currentSlidePointer === allSlides.length - 1) {
    return allSlides[0];
  } else {
    return allSlides[currentSlidePointer + 1];
  }
};

const cloneSlide = (slide, offsetX) => {
  const clone = slide.cloneNode();
  clone.style.left = offsetX + 'px';
  return clone;
};

// init
const init = () => {
  if (allSlides.length === 0) {
    return;
  }

  allSlides.forEach((slide) => {
    slide.remove();
  });

  currentSlidePointer = 0;

  let prevSlide = cloneSlide(getPrevSlide(), -SLIDE_WIDTH);
  let currentSlide = cloneSlide(getCurrentSlide(), 0);
  let nextSlide = cloneSlide(getNextSlide(), SLIDE_WIDTH);

  sliderTrack.appendChild(prevSlide);
  sliderTrack.appendChild(currentSlide);
  sliderTrack.appendChild(nextSlide);

  const onClickRightBtn = () => {
    moveRightBtn.removeEventListener('click', onClickRightBtn);

    currentSlide.style.left = -SLIDE_WIDTH + 'px';
    nextSlide.style.left = 0;

    setTimeout(() => {
      currentSlidePointer = (currentSlidePointer + 1) % allSlides.length;

      prevSlide.remove();
      prevSlide = currentSlide;

      currentSlide = nextSlide;

      nextSlide = cloneSlide(getNextSlide(), SLIDE_WIDTH);
      sliderTrack.appendChild(nextSlide);

      moveRightBtn.addEventListener('click', onClickRightBtn);
    }, ANIMATION_DURATION);
  };

  const onClickLeftBtn = () => {
    moveLeftBtn.removeEventListener('click', onClickLeftBtn);

    currentSlide.style.left = SLIDE_WIDTH + 'px';
    prevSlide.style.left = 0;

    setTimeout(() => {
      currentSlidePointer = currentSlidePointer - 1 < 0 ? allSlides.length - 1 : currentSlidePointer - 1;

      nextSlide.remove();
      nextSlide = currentSlide;

      currentSlide = prevSlide;

      prevSlide = cloneSlide(getPrevSlide(), -SLIDE_WIDTH);
      sliderTrack.appendChild(prevSlide);

      moveLeftBtn.addEventListener('click', onClickLeftBtn);
    }, ANIMATION_DURATION);
  };

  moveLeftBtn.addEventListener('click', onClickLeftBtn);
  moveRightBtn.addEventListener('click', onClickRightBtn);
};

// ----------------------------- //
init();
