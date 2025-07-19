// Sidebar toggle for mobile
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

sidebarToggle.addEventListener('click', function(event) {
  event.stopPropagation();
  sidebar.classList.toggle('open');
});
  if (window.innerWidth <= 700) {
    if (sidebar.classList.contains('open')) {
      sidebarToggle.classList.add('hidden');
    } else {
      sidebarToggle.classList.remove('hidden');
    }
  }
});

document.addEventListener('click', function(event) {
  if (window.innerWidth <= 700 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(event.target) && event.target !== sidebarToggle) {
      sidebar.classList.remove('open');
    }
  }
});

// Existing language switcher code
const flagData = {
  en: {
    img: 'https://flagcdn.com/gb.svg',
    alt: 'English',
    id: 'english-option',
    code: 'en'
  },
  gr: {
    img: 'https://flagcdn.com/gr.svg',
    alt: 'Greek',
    id: 'greek-option',
    code: 'gr'
  }
};

const translations = {
  en: {
    home: "Welcome to my personal website",
    about: "Hello my name is Lefteris this website is a place for me to share my projects , ideas and generally whatever i think is worthy at the same time it is my first web project and a way for me to learn web development.I plan to update this website frequently to add new features and content.",
    blog: "Blog",
    contact: "Contact Me",
    projects: "Projects",
    music: "Music"
  },
  gr: {
    home: "Καλωσόρισες στην ιστοσελίδα μου",
    about: "Είμαι ο Λευτέρης  σε αυτη την ιστοσελίδα σκοπέυω να δημοσιέυω τα project μου που λογικα θα ειναι έργα μουσικής η έργα λογισμικού ,τις ιδέες μου και γενικότερα οτιδήποτε θεωρήσω αξιόλογο.Παράλληλα ειναι η πρώτη ιστοσέλιδα που εχω δημιουργήσει και είναι ενας τρόπος για εμένα να μάθω web development.θα ενημερώνω την ιστοσελίδα συχνά για να προσθέτω επιπλέον περιεχόμενο και χαρακτηριστηκά στην ιστοσελίδα ",
    blog: "Ιστολόγιο",
    contact: "Επικοινωνία",
    projects: "Έργα",
    music: "Μουσική"
  }
};

function getPageKey() {
  const path = window.location.pathname;
  if (path.includes("robot.html")) return "blog";
  if (path.includes("contact.html")) return "contact";
  if (path.includes("projects.html")) return "projects";
  if (path.includes("music.html")) return "music";
  return "home";
}

// Load language from localStorage if available
let currentLang = localStorage.getItem('siteLang') || 'en';

function updateFlags() {
  const mainBtn = document.getElementById('english-option');
  const dropdownBtn = document.getElementById('greek-option');
  if (currentLang === 'en') {
    mainBtn.querySelector('img').src = flagData.en.img;
    mainBtn.querySelector('img').alt = flagData.en.alt;
    dropdownBtn.querySelector('img').src = flagData.gr.img;
    dropdownBtn.querySelector('img').alt = flagData.gr.alt;
  } else {
    mainBtn.querySelector('img').src = flagData.gr.img;
    mainBtn.querySelector('img').alt = flagData.gr.alt;
    dropdownBtn.querySelector('img').src = flagData.en.img;
    dropdownBtn.querySelector('img').alt = flagData.en.alt;
  }
  // Update the title text
  const titleEl = document.getElementById('main-title');
  if (titleEl) {
    const pageKey = getPageKey();
    titleEl.textContent = translations[currentLang][pageKey];
  }
  // Update about section only on home page
  if (getPageKey() === 'home') {
    const aboutEl = document.querySelector('.about .uc-text');
    if (aboutEl) {
      aboutEl.textContent = translations[currentLang].about;
    }
  }
}

document.getElementById('english-option').onclick = function(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('lang-dropdown');
  dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
};

document.getElementById('greek-option').onclick = function(event) {
  event.stopPropagation();
  // Swap the flags
  currentLang = (currentLang === 'en') ? 'gr' : 'en';
  localStorage.setItem('siteLang', currentLang); // Save language preference
  updateFlags();
  // Hide the dropdown
  document.getElementById('lang-dropdown').style.display = 'none';
};

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown && dropdown.style.display === 'flex') {
    dropdown.style.display = 'none';
  }
});

// Initialize flags and language on page load
updateFlags();
window.addEventListener('resize', function() {
  if (window.innerWidth > 700) {
    sidebarToggle.classList.remove('hidden');
  } else if (sidebar.classList.contains('open')) {
    sidebarToggle.classList.add('hidden');
  } else {
    sidebarToggle.classList.remove('hidden');
  }
});
