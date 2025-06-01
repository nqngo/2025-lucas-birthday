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
      <p class="address">123 MAIN STREET<br />ANYTOWN</p>
      <div class="features">SPA TREATMENTS &bull; GAMES &bull; FUN</div>
    </div>
    <div class="dino-row bottom">
      <img src="${dino3}" class="dino dino-left" alt="Triceratops" />
      <img src="${dino4}" class="dino dino-right" alt="Pterodactyl" />
    </div>
    <form id="rsvp-form" class="rsvp-form">
      <h3>RSVP</h3>
      <div class="form-group">
        <input type="text" name="name" id="rsvp-name" placeholder="Your Name" required />
      </div>
      <div class="form-group">
        <label for="rsvp-attending" id="attending-label">How many attending? <span id="attending-value">1</span></label>
        <input type="range" name="attending" id="rsvp-attending" min="1" max="5" value="1" step="1" />
      </div>
      <div class="form-group">
        <input type="tel" name="contact" id="rsvp-contact" placeholder="Best Contact Number" required pattern="[0-9\-\+\s]+" />
      </div>
      <button type="submit" class="rsvp-btn">Send RSVP</button>
      <div id="rsvp-message" class="rsvp-message"></div>
    </form>
    <div class="leaf-border bottom">
      <img src="${leaf1}" class="leaf" />
      <img src="${leaf2}" class="leaf" />
    </div>
  </div>
`

setupRSVPForm();

function setupRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const attendingInput = document.getElementById('rsvp-attending');
  const attendingValue = document.getElementById('attending-value');
  if (attendingInput && attendingValue) {
    attendingValue.textContent = attendingInput.value === '5' ? '5+' : attendingInput.value;
    attendingInput.addEventListener('input', function () {
      attendingValue.textContent = this.value === '5' ? '5+' : this.value;
    });
  }
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvp-name').value.trim();
      let attending = document.getElementById('rsvp-attending').value;
      attending = attending === '5' ? '5+' : attending;
      const contact = document.getElementById('rsvp-contact').value.trim();
      const messageDiv = document.getElementById('rsvp-message');
      messageDiv.textContent = '';
      if (!name || !attending || !contact) {
        messageDiv.textContent = 'Please fill in all fields.';
        messageDiv.style.color = 'red';
        return;
      }
      const endpoint = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, attending, contact })
        });
        if (res.ok) {
          messageDiv.textContent = 'Thank you for your RSVP!';
          messageDiv.style.color = 'green';
          form.reset();
          attendingValue.textContent = '1';
        } else {
          messageDiv.textContent = 'There was an error. Please try again later.';
          messageDiv.style.color = 'red';
        }
      } catch (err) {
        messageDiv.textContent = 'There was an error. Please try again later.';
        messageDiv.style.color = 'red';
      }
    });
  }
}
