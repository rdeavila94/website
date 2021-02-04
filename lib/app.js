function AnimatedElement(element, animationClass, replacingClass = undefined) {
  this.element = element;
  this.animationClass = animationClass;
  this.replacingClass = replacingClass;
} // For older browsers that don't yet support replace


if (!DOMTokenList.prototype.replace) {
  DOMTokenList.prototype.replace = function (oldClass, newClass) {
    this.remove(oldClass);
    this.add(newClass);
  };
}

AnimatedElement.prototype.animate = function () {
  this.replacingClass ? this.element.classList.replace(this.replacingClass, this.animationClass) : this.element.classList.add(this.animationClass);
};

const $terminal = document.querySelector('#terminal');
const $body = document.querySelector('#body');
const $button = document.querySelector('#button');
const $service = document.querySelector('#service-start');
const $resume = document.querySelector('#resume');
const animatedElements = [];
document.querySelectorAll('.content-box__bottom').forEach(el => {
  animatedElements.push(new AnimatedElement(el, 'shoot-up', 'u-hidden'));
});
document.querySelectorAll('.section-service__content:not(.section-service__content--right) .content-box__top').forEach(el => {
  animatedElements.push(new AnimatedElement(el, 'shoot-in-left', 'u-hidden'));
});
document.querySelectorAll('.section-service__content--right .content-box__top').forEach(el => {
  animatedElements.push(new AnimatedElement(el, 'shoot-in-right', 'u-hidden'));
});
const terminalMessage = `init 'rdeavila94.github.io'`;
let windowHeight = window.innerHeight; // this will be used in case we want to kick off an animation deeper into the scroll

const animationMargin = 50; // We have to use a named function in order to have the ability to remove the handler

function onscroll(e) {
  for (let i = 0; i < animatedElements.length; i++) {
    if (animatedElements[i].element.getBoundingClientRect().top < windowHeight - animationMargin) {
      animatedElements[i].animate();
      animatedElements.splice(i, 1);
      i--;
    }
  }

  if (animatedElements.length < 1) {
    document.removeEventListener('scroll', onscroll);
  }
}

document.addEventListener('scroll', onscroll); // recalculate the windows height in case the user resizes their window

window.addEventListener('resize', () => {
  windowHeight = window.innerHeight;
}, false);

function textAnimation({
  el,
  content,
  speed = 100
}, callback) {
  const recursiveAnimate = position => {
    if (position < content.length) {
      el.textContent = el.textContent + content.charAt(position);
      setTimeout(() => recursiveAnimate(++position), speed);
    } else {
      if (callback) callback();
    }
  };

  recursiveAnimate(0);
} // TODO: Clean up this function (make more modular)


function smoothScroll($destination, counter = 0) {
  const top = $destination.getBoundingClientRect().top;

  if (top <= 0) {
    return;
  }

  if (counter > top) {
    if (top < 10) {
      window.scrollTo(0, window.pageYOffset + top);
    } else {
      window.scrollTo(0, window.pageYOffset + top / 10);
    }
  } else {
    window.scrollTo(0, window.pageYOffset + counter++ / 10);
  }

  setTimeout(() => smoothScroll($destination, counter), 1);
}

function pressEnter($line) {
  $line.insertAdjacentHTML('afterend', `<br><span>>&nbsp;&nbsp;</span>`);
}

setTimeout(() => textAnimation({
  el: $terminal,
  content: terminalMessage,
  speed: 40
}, () => setTimeout(() => {
  pressEnter($terminal);
  setTimeout(() => smoothScroll($body), 250);
}, 500)), 500);
$button.addEventListener('click', e => {
  smoothScroll($service);
});
$resume.addEventListener('click', e => {
  e.preventDefault();
  window.alert('Not displaying résumé at the moment :)');
});
