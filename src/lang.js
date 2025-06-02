// Language system for the invitation
export const languages = {
  en: {
    subtitle: "{childName}'S 4TH BIRTHDAY",
    mainTitle: "DINO PARTY",
    joinUs: "JOIN US FOR A",
    amazingDay: "AMAZING DAY ON",
    features: "FOOD • GAMES • FUN",
    rsvp: "RSVP",
    yourName: "Your Name*",
    howMany: "How many attending?",
    contactNumber: "Best Contact Number*",
    sendRsvp: "Send RSVP",
    fillAllFields: "Please fill in all fields.",
    errorMessage: "There was an error. Please try again later.",
    modalTitle: "🦕 Thank You! 🦕",
    modalMessage1: "Your RSVP has been received!",
    modalMessage2: "We can't wait to see you at {childName}'s Dino Party!",
    modalClose: "Close",
    switchLanguage: "Tiếng Việt"
  },
  vi: {
    subtitle: "SINH NHẬT 4 TUỔI CỦA {childName}",
    mainTitle: "KHỦNG LONG",
    joinUs: "THAM GIA CÙNG GIA ĐÌNH",
    amazingDay: "VÀO",
    features: "ĂN UỐNG • TRÒ CHƠI",
    rsvp: "ĐĂNG KÝ THAM DỰ",
    yourName: "Tên*",
    howMany: "Số lượng người đi?",
    contactNumber: "Số điện thoại liên lạc*",
    sendRsvp: "RSVP",
    fillAllFields: "Vui lòng điền đầy đủ thông tin.",
    errorMessage: "Báo lỗi. Vui lòng thử lại sau.",
    modalTitle: "🦕 Cảm ơn! 🦕",
    modalMessage1: "Gia đình đã nhận được đăng ký!",
    modalMessage2: "Hẹn gặp bạn tại sinh nhật của {childName}!",
    modalClose: "Đóng",
    switchLanguage: "English"
  }
};

let currentLanguage = 'en';

export function getCurrentLanguage() {
  return currentLanguage;
}

export function setLanguage(lang) {
  if (languages[lang]) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateContent();
  }
}

export function initLanguage() {
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && languages[savedLang]) {
    currentLanguage = savedLang;
  }
}

export function getText(key, replacements = {}) {
  let text = languages[currentLanguage][key] || languages.en[key] || key;
  
  // Replace placeholders like {childName}
  Object.keys(replacements).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  
  return text;
}

export function getEventDate() {
  if (currentLanguage === 'vi') {
    return import.meta.env.VITE_EVENT_DATE_VI || import.meta.env.VITE_EVENT_DATE || '';
  }
  return import.meta.env.VITE_EVENT_DATE || '';
}

export function updateContent() {
  const childName = import.meta.env.VITE_CHILD_NAME || 'LUCAS';
  const eventDate = getEventDate();
  const addressLine1 = import.meta.env.VITE_ADDRESS_LINE1 || '';
  const addressLine2 = import.meta.env.VITE_ADDRESS_LINE2 || '';
  
  // Update text content
  const subtitle = document.querySelector('.subtitle');
  const mainTitle = document.querySelector('.main-title');
  const joinUs = document.querySelector('.join-us');
  const amazingDay = document.querySelector('.dino-spa');
  const dateTime = document.querySelector('.date-time');
  const features = document.querySelector('.features');
  const rsvpTitle = document.querySelector('.rsvp-form h3');
  const nameInput = document.querySelector('#rsvp-name');
  const attendingLabel = document.querySelector('#attending-label');
  const contactInput = document.querySelector('#rsvp-contact');
  const rsvpBtn = document.querySelector('.rsvp-btn');
  const modalTitle = document.querySelector('.modal-header h2');
  const modalMessage1 = document.querySelector('.modal-body p:first-child');
  const modalMessage2 = document.querySelector('.modal-body p:last-child');
  const modalClose = document.querySelector('.modal-close-btn');
  const langSwitcher = document.querySelector('#language-switcher');
  
  if (subtitle) subtitle.textContent = getText('subtitle', { childName });
  if (mainTitle) mainTitle.textContent = getText('mainTitle');
  if (joinUs) joinUs.textContent = getText('joinUs');
  if (amazingDay) amazingDay.textContent = getText('amazingDay');
  if (dateTime) dateTime.textContent = eventDate;
  if (features) features.textContent = getText('features');
  if (rsvpTitle) rsvpTitle.textContent = getText('rsvp');
  if (nameInput) nameInput.placeholder = getText('yourName');
  if (attendingLabel) {
    const attendingValue = attendingLabel.querySelector('#attending-value');
    const currentValue = attendingValue ? attendingValue.textContent : '1';
    
    // Split the current innerHTML to preserve the span element
    const labelText = getText('howMany');
    const spanElement = attendingLabel.querySelector('#attending-value');
    
    if (spanElement) {
      // Clear all text nodes but keep the span
      let child = attendingLabel.firstChild;
      while (child) {
        if (child.nodeType === Node.TEXT_NODE) {
          child.textContent = '';
        }
        child = child.nextSibling;
      }
      
      // Set the new label text
      attendingLabel.insertBefore(document.createTextNode(labelText + ' '), spanElement);
    } else {
      // Fallback: create the structure if it doesn't exist
      attendingLabel.innerHTML = `${labelText} <span id="attending-value">${currentValue}</span>`;
    }
  }
  if (contactInput) contactInput.placeholder = getText('contactNumber');
  if (rsvpBtn) rsvpBtn.textContent = getText('sendRsvp');
  if (modalTitle) modalTitle.textContent = getText('modalTitle');
  if (modalMessage1) modalMessage1.textContent = getText('modalMessage1');
  if (modalMessage2) modalMessage2.textContent = getText('modalMessage2', { childName });
  if (modalClose) modalClose.textContent = getText('modalClose');
  if (langSwitcher) langSwitcher.textContent = getText('switchLanguage');
}
