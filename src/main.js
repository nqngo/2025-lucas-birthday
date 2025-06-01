import './style.css'
import left1 from './assets/left1_left.png'
import left2 from './assets/left2_left.png'
import left3 from './assets/left3_left.png'
import left4 from './assets/left4_left.png'
import left2Decor from './assets/left2_decor.png'
import leaf1Decor from './assets/leaf1_decor.png'
import fern1 from './assets/fern1_right.png'
import fern3 from './assets/fern3_right.png'
import leaf4 from './assets/leaf4_right.png'
import foot1 from './assets/footsprint1.png'
import foot2 from './assets/footsprint2.png'
import dino1 from './assets/dino1_left.png'
import dino2 from './assets/dino2_right.png'
import dino3 from './assets/dino3_left.png'
import dino4 from './assets/dino4_right.png'
import { setupCounter } from './counter.js'

document.body.classList.add('outer-bg');
document.querySelector('#app').innerHTML = `
  <div class="invite-container">
    <img src="${left1}" class="decor decor-left1" alt="Decorative left 1" />
    <img src="${left2}" class="decor decor-left2" alt="Decorative left 2" />
    <img src="${left3}" class="decor decor-left3" alt="Decorative left 3" />
    <img src="${left4}" class="decor decor-left4" alt="Decorative left 4" />
    <img src="${left2Decor}" class="decor decor-left2-decor" alt="Decorative left 2 decor" />
    <img src="${leaf1Decor}" class="decor decor-bg1" alt="Leaf decor" />
    <img src="${fern1}" class="decor decor-fern1" alt="Fern right 1" />
    <img src="${fern3}" class="decor decor-fern3" alt="Fern right 3" />
    <img src="${leaf4}" class="decor decor-leaf4" alt="Leaf right 4" />
    <img src="${foot1}" class="decor decor-foot1" alt="Footprint 1" />
    <img src="${foot2}" class="decor decor-foot2" alt="Footprint 2" />
    <h2 class="subtitle">HALEY'S 3RD BIRTHDAY</h2>
    <h1 class="main-title">SPA PARTY</h1>
    <div class="dino-row">
      <img src="${dino1}" class="dino dino-left" alt="Dino left" />
      <img src="${dino2}" class="dino dino-right" alt="Dino right" />
    </div>
    <div class="invite-details">
      <p class="join-us">JOIN US FOR A</p>
      <p class="dino-spa">DINO SPA PARTY!</p>
      <p class="date-time">MAY 25, 2:00 PM</p>
      <p class="address">123 MAIN STREET<br />ANYTOWN</p>
      <div class="features">SPA TREATMENTS &bull; GAMES &bull; FUN</div>
    </div>
    <div class="dino-row dino-bottom">
      <img src="${dino3}" class="dino dino-left" alt="Dino bottom left" />
      <img src="${dino4}" class="dino dino-right" alt="Dino bottom right" />
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
