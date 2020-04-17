const $terminal = document.querySelector('#terminal');
const $body = document.querySelector('#body');

const richardDeAvila = `start "Richard De Avila"`;

function textAnimation({ el, content, speed = 100 }, callback) {
  const recursiveAnimate = position => {
    if (position < content.length) {
      el.textContent = el.textContent + content.charAt(position);
      setTimeout(() => recursiveAnimate(++position), speed);
    } else {
      callback();
    }
  };

  recursiveAnimate(0);
}

let counter = 1;

function smoothScroll($destination) {
  console.log('inside');
  if (window.pageYOffset >= $destination.offsetHeight) {
    return;
  }
  window.scrollTo(0, window.pageYOffset + counter++ / 10);
  setTimeout(() => smoothScroll($destination), 1);
}

function pressEnter($line) {
  $line.insertAdjacentHTML('afterend', `<br><span>>&nbsp;&nbsp;</span>`);
}

setTimeout(
  () =>
    textAnimation({ el: $terminal, content: richardDeAvila, speed: 50 }, () =>
      setTimeout(() => {
        pressEnter($terminal);
        setTimeout(() => smoothScroll($body), 250);
      }, 500)
    ),
  500
);
