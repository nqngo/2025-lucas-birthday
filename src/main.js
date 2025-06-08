import './style.css'
import { initLanguage, setLanguage, getCurrentLanguage, getText, getEventDate, updateContent } from './lang.js'

// Helper functions for links
function createGoogleMapsLink(address) {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

function createGoogleCalendarLink() {
  const childName = import.meta.env.VITE_CHILD_NAME || 'LUCAS';
  const birthdayType = import.meta.env.VITE_BIRTHDAY_TYPE || 'DINO PARTY';
  const address = `${import.meta.env.VITE_ADDRESS_LINE1}, ${import.meta.env.VITE_ADDRESS_LINE2}`;
  
  // Parse the event date - "SUNDAY JULY 06, 12:00 PM"
  const eventDateStr = import.meta.env.VITE_EVENT_DATE || '';
  const currentYear = new Date().getFullYear();
  
  // Extract date and time from the format "SUNDAY JULY 06, 12:00 PM"
  const dateTimeMatch = eventDateStr.match(/(\w+)\s+(\w+)\s+(\d{1,2}),?\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i);
  
  let startDate, endDate;
  if (dateTimeMatch) {
    const [, , month, day, hour, minute, ampm] = dateTimeMatch;
    const monthNum = new Date(`${month} 1, 2000`).getMonth();
    let hour24 = parseInt(hour);
    if (ampm.toUpperCase() === 'PM' && hour24 !== 12) hour24 += 12;
    if (ampm.toUpperCase() === 'AM' && hour24 === 12) hour24 = 0;
    
    startDate = new Date(currentYear, monthNum, parseInt(day), hour24, parseInt(minute));
    endDate = new Date(startDate.getTime() + (3 * 60 * 60 * 1000)); // 3 hours duration
  } else {
    // Fallback if date parsing fails
    startDate = new Date();
    endDate = new Date(startDate.getTime() + (3 * 60 * 60 * 1000));
  }
  
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const title = encodeURIComponent(`${childName}'s ${birthdayType}`);
  const details = encodeURIComponent(`Join us for ${childName}'s amazing ${birthdayType}! Food, games, and lots of fun awaits!`);
  const location = encodeURIComponent(address);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
}
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

// Initialize language system
initLanguage();

document.body.classList.add('outer-bg');
document.querySelector('#app').innerHTML = `
  <div class="invite-container">
    <!-- Language Switcher -->
    <button id="language-switcher" class="language-switcher">${getText('switchLanguage')}</button>

    <img src="${left1}" class="decor decor-left1" alt="Decorative left 1" />
    <img src="${left2}" class="decor decor-left2" alt="Decorative left 2" />
    <img src="${left3}" class="decor decor-left3" alt="Decorative left 3" />
    <img src="${left1}" class="decor decor-left1-2" alt="Decorative left 1 decor" />
    <img src="${left4}" class="decor decor-left4" alt="Decorative left 4" />
    <img src="${left2Decor}" class="decor decor-left2-decor" alt="Decorative left 2 decor" />
    <img src="${leaf1Decor}" class="decor decor-bg1" alt="Leaf decor" />
    <img src="${fern1}" class="decor decor-fern1" alt="Fern right 1" />
    <img src="${left3}" class="decor decor-fern2" alt="Fern right 2" />
    <img src="${fern3}" class="decor decor-fern3" alt="Fern right 3" />
    <img src="${leaf4}" class="decor decor-leaf4" alt="Leaf right 4" />
    <img src="${foot1}" class="decor decor-foot1" alt="Footprint 1" />
    <img src="${foot2}" class="decor decor-foot2" alt="Footprint 2" />
    <img src="${foot1}" class="decor decor-foot3" alt="Footprint 3" />
    <h2 class="subtitle">${getText('subtitle', { childName: import.meta.env.VITE_CHILD_NAME })}</h2>
    <h1 class="main-title">${getText('mainTitle')}</h1>
    <div class="dino-row">
      <img src="${dino1}" class="dino dino-left" alt="Dino left" />
      <img src="${dino2}" class="dino dino-right" alt="Dino right" />
    </div>
    <div class="invite-details">
      <p class="join-us">${getText('joinUs')}</p>
      <p class="dino-spa">${getText('amazingDay')}</p>
      <p class="date-time">${getEventDate()}</p>
      <a href="${createGoogleMapsLink(`${import.meta.env.VITE_ADDRESS_LINE1}, ${import.meta.env.VITE_ADDRESS_LINE2}`)}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="address address-link">
        ${import.meta.env.VITE_ADDRESS_LINE1}<br />${import.meta.env.VITE_ADDRESS_LINE2}
      </a>
      <div class="calendar-section">
        <a href="${createGoogleCalendarLink()}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="calendar-link">
          📅 ${getText('addToCalendar')}
        </a>
      </div>
      <div class="features">${getText('features')}</div>
    </div>
    <div class="dino-row dino-bottom">
      <img src="${dino3}" class="dino dino-left" alt="Dino bottom left" />
      <img src="${dino4}" class="dino dino-right" alt="Dino bottom right" />
    </div>
    <form id="rsvp-form" class="rsvp-form">
      <h3>${getText('rsvp')}</h3>
      <div class="form-group">
        <input type="text" name="name" id="rsvp-name" placeholder="${getText('yourName')}" required />
      </div>
      <div class="form-group">
        <label for="rsvp-attending" id="attending-label">${getText('howMany')} <span id="attending-value">1</span></label>
        <input type="range" name="attending" id="rsvp-attending" min="1" max="5" value="1" step="1" />
      </div>
      <div class="form-group">
        <input type="tel" name="contact" id="rsvp-contact" placeholder="${getText('contactNumber')}" required />
      </div>
      <button type="submit" class="rsvp-btn">${getText('sendRsvp')}</button>
      <div id="rsvp-message" class="rsvp-message"></div>
    </form>
  </div>

  <!-- Success Modal -->
  <div id="success-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>${getText('modalTitle')}</h2>
      </div>
      <div class="modal-body">
        <p>${getText('modalMessage1')}</p>
        <p>${getText('modalMessage2', { childName: import.meta.env.VITE_CHILD_NAME })}</p>
      </div>
      <div class="modal-footer">
        <button id="close-modal" class="modal-close-btn">${getText('modalClose')}</button>
      </div>
    </div>
  </div>
`

setupLanguageSwitcher();
setupRSVPForm();
setupModal();

function setupLanguageSwitcher() {
  const switcher = document.getElementById('language-switcher');
  if (switcher) {
    switcher.addEventListener('click', () => {
      const currentLang = getCurrentLanguage();
      const newLang = currentLang === 'en' ? 'vi' : 'en';
      setLanguage(newLang);
    });
  }
}

function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.add('show');
}

function hideSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.remove('show');
  // Re-enable the submit button when modal is closed
  const submitButton = document.querySelector('.rsvp-btn');
  if (submitButton) {
    submitButton.disabled = false;
  }
}

function setupModal() {
  const modal = document.getElementById('success-modal');
  const closeBtn = document.getElementById('close-modal');

  // Close modal when close button is clicked
  closeBtn.addEventListener('click', hideSuccessModal);

  // Close modal when clicking outside of it
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideSuccessModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideSuccessModal();
    }
  });
}

function setupRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const attendingInput = document.getElementById('rsvp-attending');
  const attendingValue = document.getElementById('attending-value');
  const submitButton = form.querySelector('.rsvp-btn');
  
  if (attendingInput && attendingValue) {
    attendingValue.textContent = attendingInput.value === '5' ? '5+' : attendingInput.value;
    attendingInput.addEventListener('input', function () {
      attendingValue.textContent = this.value === '5' ? '5+' : this.value;
    });
  }
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Disable submit button immediately
      submitButton.disabled = true;
      
      const name = document.getElementById('rsvp-name').value.trim();
      let attending = document.getElementById('rsvp-attending').value;
      attending = attending === '5' ? '5+' : attending;
      const contact = document.getElementById('rsvp-contact').value.trim();
      const messageDiv = document.getElementById('rsvp-message');
      messageDiv.textContent = '';
      if (!name || !attending || !contact) {
        messageDiv.textContent = getText('fillAllFields');
        messageDiv.style.color = 'red';
        submitButton.disabled = false; // Re-enable if validation fails
        return;
      }
      const endpoint = import.meta.env.VITE_RSVP_ENDPOINT;
      console.log(`RSVP Endpoint: ${endpoint}`);
      try {
        // Use FormData to avoid CORS preflight issues
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Attending', attending);
        formData.append('Contact', contact);
        
        const res = await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });

        // With no-cors mode, we can't read the response, but if no error is thrown, assume success
        showSuccessModal();
        form.reset();
        attendingValue.textContent = '1';
      } catch (err) {
        messageDiv.textContent = getText('errorMessage');
        messageDiv.style.color = 'red';
        submitButton.disabled = false; // Re-enable if there's an error
      }
    });
  }
}
