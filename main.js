import './styles/style.css'

import { library, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import javascriptLogo from '/javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './src/counter.js'
import { createBadge, createBadgeContainer, badgeColors } from '/src/badges.js'

// import { IconName } from '@fortawesome/fontawesome-common-types';

// const iconNames = Object.values(IconName);
// console.log(iconNames);

library.add(fas, far, fab);
console.log(library.definitions);
const iconNames = Object.keys(library.definitions.fas).map(key => key.replace(/^fa-/, ''));
console.log(badgeColors);
// const bolt = icon({ prefix: 'fas', iconName: 'bolt' });

// Create an HTML form as a dialog (using the latest HTML5 dialog features with form validation) to gather the basic information for a badge: color, icon, and achievement text.
const dialogForm = `
<form id="badge-form" method="dialog">
  <label for="color">Color:</label>
  <input type="text" list="badge-colors" id="color" name="color">
  <datalist id="badge-colors"></datalist>
  <label for="achievement">Achievement:</label>
  <input type="text" id="achievement" name="achievement">
  <br />
  <label for="faIcon">Icon:</label>
  <input type="text" list="knownIconNames" id="faIcon" name="faIcon">
  <datalist id="knownIconNames"></datalist>
  <span id="icon-preview"></span>
  <button type="button" id="icon-picker">Pick an icon</button>
  <br />
  <button type="reset">Reset</button>
  <button type="submit">Create Badge</button>
</form>`;

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    ${dialogForm}
    <div id="preview">
      <div id="badge-container" class="main-wrapper">
      ${createBadge({ color: 'yellow', fa: 'fas', faIcon: 'bolt', achievement: 'Initiator' })}
      </div>
    </div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

const datalist = document.getElementById('knownIconNames');

iconNames.forEach(iconName => {
  const option = document.createElement('option');
  option.value = iconName;
  datalist.appendChild(option);
});

const colorDatalist = document.getElementById('badge-colors');
badgeColors.forEach(color => {
  const option = document.createElement('option');
  option.value = color;
  colorDatalist.appendChild(option);
});

document.getElementById('icon-picker').addEventListener('click', () => {
  console.log('icon picker clicked');
  const iconInput = document.getElementById('faIcon');
  const iconPreview = document.getElementById('icon-preview');
  const searchResults = findIconDefinition({ prefix: 'fas', iconName: iconInput.value });
  console.log(searchResults);
  if(searchResults) {
    // Clear all the children of the icon preview
    iconPreview.innerHTML = '';
    const i = icon(searchResults);
    Array.from(i.node).map(n => iconPreview.appendChild(n))
  } else {
    iconPreview.innerHTML = `<i class="fa fa-question"></i>`;
  }
});

document.getElementById('badge-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const badgeData = Object.fromEntries(formData.entries());
  const selected = badgeData.faIcon;
  badgeData.fa = 'fas';
  badgeData.faIcon = 'fa-' + badgeData.faIcon;
  console.log(badgeData);

  const badgeContainer = document.getElementById('badge-container');
  badgeContainer.innerHTML = createBadge(badgeData);
  /*
    <div class="badge yellow">
    <div class="circle"> <i class="fa fa-bolt"></i></div>
    <div class="ribbon">Initiator</div>
  </div>
    */
  const circle = badgeContainer.querySelector('.circle');
  circle.innerHTML = '';
  const searchResults = findIconDefinition({ prefix: 'fas', iconName: selected });
  const i = icon(searchResults);
  Array.from(i.node).map(n => circle.appendChild(n))
});