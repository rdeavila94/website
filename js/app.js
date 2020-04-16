const $terminal = document.querySelector('#terminal');

const richardDeAvila = 'Richard De Avila';

function textAnimation(el, content, speed=100) {
  const recursiveAnimate = (element, content, position) => {
    if (position < content.length) {
      element.textContent = element.textContent + content.charAt(position);
      setTimeout(() => recursiveAnimate(element, content, ++position), speed);
    }
  };

  recursiveAnimate(el, content, 0);
}

textAnimation(terminal, richardDeAvila);
