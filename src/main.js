import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Dino and leaf SVGs (to be added in src/assets/)
import dino1 from './assets/dino1.svg'
import dino2 from './assets/dino2.svg'
import dino3 from './assets/dino3.svg'
import dino4 from './assets/dino4.svg'
import leaf1 from './assets/leaf1.svg'
import leaf2 from './assets/leaf2.svg'

document.querySelector('#app').innerHTML = `
  <div class="invite-container">
    <div class="leaf-border top">
      <img src="${leaf1}" class="leaf" />
      <img src="${leaf2}" class="leaf" />
    </div>
    <h2 class="subtitle">HALEY'S 3RD BIRTHDAY</h2>
    <h1 class="main-title">SPA PARTY</h1>
    <div class="dino-row">
      <img src="${dino1}" class="dino dino-left" alt="Dino with towel" />
      <img src="${dino2}" class="dino dino-right" alt="Dino with mask" />
    </div>
    <div class="invite-details">
      <p class="join-us">JOIN US FOR A</p>
      <p class="dino-spa">DINO SPA PARTY!</p>
      <p class="date-time">MAY 25, 2:00 PM</p>
      <button class="rsvp-btn">RSVP</button>
      <p class="address">123 MAIN STREET<br />ANYTOWN</p>
      <div class="features">SPA TREATMENTS &bull; GAMES &bull; FUN</div>
    </div>
    <div class="dino-row bottom">
      <img src="${dino3}" class="dino dino-left" alt="Triceratops" />
      <img src="${dino4}" class="dino dino-right" alt="Pterodactyl" />
    </div>
    <div class="leaf-border bottom">
      <img src="${leaf1}" class="leaf" />
      <img src="${leaf2}" class="leaf" />
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
