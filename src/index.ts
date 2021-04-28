import parseCompound from './logic/parseCompound';
import CompoundType from './models/compoundType';
import icons from './svg';

const form = document.getElementById('input-form') as HTMLFormElement;
const textInput = document.getElementById('input-text') as HTMLInputElement;
const outCompoundType = document.getElementById('out-type') as HTMLDivElement;
const jsonToggle = document.getElementById('json-toggle') as HTMLButtonElement;
const jsonWrapper = document.getElementById('json-wrapper') as HTMLDivElement;
const darkModeToggle = document.getElementById(
  'dark-mode-toggle'
) as HTMLButtonElement;
const html = document.querySelector('html') as HTMLHtmlElement;

let showJSON = false;
let darkMode = true;

const jsonContent = document.createElement('pre');
jsonContent.className =
  'bg-gray-100 shadow p-5 rounded m-3 my-5 overflow-auto text-gray-900 dark:bg-gray-900 dark:text-gray-100';

function displayCompound(input: string) {
  const c = parseCompound(input);
  jsonContent.innerText = JSON.stringify(c, undefined, 2);
  outCompoundType.innerHTML = CompoundType[c.compoundType];
}

function updateJSONView() {
  if (showJSON) jsonWrapper.appendChild(jsonContent);
  else if (jsonWrapper.childElementCount > 0)
    jsonWrapper.removeChild(jsonContent);

  jsonToggle.textContent = showJSON ? 'Hide' : 'Show';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  displayCompound(textInput.value);
});

jsonToggle.addEventListener('click', () => {
  showJSON = !showJSON;
  updateJSONView();
});

darkModeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  darkModeToggle.innerHTML = darkMode ? icons.moon : icons.sun;
  html.className = darkMode ? 'dark' : '';
  localStorage.setItem('colorScheme', darkMode ? 'dark' : 'light');
});

function loadColorScheme() {
  const s = localStorage.getItem('colorScheme');
  if (s === null || s === 'dark') {
    darkMode = true;
    darkModeToggle.innerHTML = icons.moon;
  } else {
    darkMode = false;
    darkModeToggle.innerHTML = icons.sun;
  }

  html.className = darkMode ? 'dark' : '';
}

loadColorScheme();
displayCompound('H2O');
updateJSONView();
