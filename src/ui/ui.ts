import parseCompound from '../logic/parseCompound';
import CompoundType from '../models/compoundType';
import icons from './svg';

const form = document.getElementById('input-form') as HTMLFormElement;
const textInput = document.getElementById('input-text') as HTMLInputElement;
const outCompoundType = document.getElementById('out-type') as HTMLDivElement;
const outCompoundTrad = document.getElementById('out-trad') as HTMLDivElement;
const outCompoundIUPAC = document.getElementById('out-iupac') as HTMLDivElement;
const outError = document.getElementById('out-err') as HTMLDivElement;
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
  outError.innerHTML = '';
  outError.className = '';
  try {
    const c = parseCompound(input);
    jsonContent.innerText = JSON.stringify(c, undefined, 2);
    outCompoundType.innerText = CompoundType[c.compoundType];
    outCompoundTrad.innerText = c.names.traditional;
    outCompoundIUPAC.innerText = c.names.IUPAC;
  } catch (error) {
    outError.className = 'shadow p-5 rounded';
    outError.innerHTML = `C'è stato un errore: <pre class="bg-gray-100 shadow p-5 rounded m-3 my-5 overflow-auto text-gray-900 dark:bg-gray-900 dark:text-gray-100">${error}</pre> Se pensi sia un bug riportalo <a href="https://github.com/billy4479/nomenclinator/issues" class="text-blue-600 underline" target="_blank" rel="noreferrer noopener">qui</a>`;
  }
}

function updateJSONView() {
  if (showJSON) jsonWrapper.appendChild(jsonContent);
  else if (jsonWrapper.childElementCount > 0)
    jsonWrapper.removeChild(jsonContent);

  jsonToggle.textContent = showJSON ? 'Hide' : 'Show';
}

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

export default function loadUI() {
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

  loadColorScheme();
  displayCompound('H2O');
  updateJSONView();
}
