const span = document.getElementById('number') as HTMLSpanElement;
const button = document.getElementById('press');

button?.addEventListener('click', () => {
  const n = parseInt(span.innerText, 10);
  span.innerText = (n + 1).toString();
});
