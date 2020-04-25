const $terminal = document.querySelector('#terminal');
const $body = document.querySelector('#body');
const $button = document.querySelector('#button');
const $service = document.querySelector('#service-start');

const richardDeAvila = `start "Richard De Avila"`;

function textAnimation({ el, content, speed = 100 }, callback) {
  const recursiveAnimate = position => {
    if (position < content.length) {
      el.textContent = el.textContent + content.charAt(position);
      setTimeout(() => recursiveAnimate(++position), speed);
    } else {
      if (callback) callback();
    }
  };

  recursiveAnimate(0);
}


// TODO: Make counter function variable and fix overscroll
function smoothScroll($destination, counter=0) {
  if ($destination.getBoundingClientRect().top <= 0) {
    return;
  }
  window.scrollTo(0, window.pageYOffset + counter++ / 10);
  setTimeout(() => smoothScroll($destination, counter), 1);
}

function pressEnter($line) {
  $line.insertAdjacentHTML('afterend', `<br><span>>&nbsp;&nbsp;</span>`);
}

setTimeout(
  () =>
    textAnimation({ el: $terminal, content: richardDeAvila, speed: 10 }, () =>
      setTimeout(() => {
        pressEnter($terminal);
        setTimeout(() => smoothScroll($body), 250);
      }, 500)
    ),
  500
);

$button.addEventListener('click', (e) =>{
  smoothScroll($service);
})