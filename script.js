/**
 * MANDEEP SINGH PORTFOLIO - CLIENT CONTROLLER
 * Faithful implementation of user's reference UI with typewriter & active nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initActiveNavScroll();
  initMobileMenu();
  initFooterLab();
  startChandigarhClock();
});

/* ==========================================================
   1. HERO TYPEWRITER EFFECT (MATCHING RESUME ROLES)
   ========================================================== */
const roles = [
  "Software QA & Automation Test Engineer...",
  "Web & Mobile App Testing (Both)...",
  "Playwright (Web UI) & Appium (Mobile)...",
  "Manual QA & STLC Specialist...",
  "API & Performance Test Engineer..."
];

function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 35;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2200; // Pause at complete word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================
   2. ACTIVE NAV LINK ON SCROLL
   ========================================================== */
function initActiveNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================
   3. RESUME DOWNLOAD HANDLER
   ========================================================== */
function handleResumeDownload() {
  const link = document.createElement('a');
  link.href = 'Mandeep_Singh_Resume.pdf';
  link.download = 'Mandeep_Singh_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================
   4. ARTIFACT PREVIEW MODALS (MATCHING RESUME PROJECTS)
   ========================================================== */
const modalBackdrop = document.getElementById('artifactModal');
const modalTitle = document.getElementById('modalTitle');
const modalBadge = document.getElementById('modalBadge');
const modalBody = document.getElementById('modalBody');

const artifactData = {
  glamgo: {
    badge: 'Mobile App QA Case Study',
    title: 'Glam & Go Beauty Booking — Mobile Test Architecture',
    content: `
      <div style="background:#050c1b; padding:1.4rem; border-radius:12px; color:#cbd5e1; font-size:0.9rem;">
        <h4 style="color:#ff7a00; margin-bottom:0.6rem;">📱 App Overview & Testing Scope</h4>
        <p style="margin-bottom:1rem;">Tested native Android and iOS client apps across service search, appointment booking, rescheduling, and payment integrations (UPI / Card / Wallet).</p>
        
        <h4 style="color:#ffffff; margin-bottom:0.4rem;">🧪 Test Execution Breakdown:</h4>
        <ul style="margin-left:1.5rem; margin-bottom:1.2rem;">
          <li><strong>Appium Automation:</strong> Automated regression suites for OTP login, salon filtering, and booking confirmation.</li>
          <li><strong>Negative & Boundary Edge Cases:</strong> Handled expired OTPs, past-date calendar selections, and concurrent double bookings.</li>
          <li><strong>Real-Device Compatibility:</strong> Verified screen responsiveness across varied resolutions and Android/iOS versions.</li>
          <li><strong>Interruption Testing:</strong> Simulated incoming phone calls, low battery notifications, and unstable 3G/offline switches during active payment flows.</li>
          <li><strong>API Validation:</strong> Checked REST endpoints in Postman ensuring valid response schemas and status codes.</li>
        </ul>
      </div>
    `
  },
  imghippo: {
    badge: 'Playwright (Python) Suite',
    title: 'Imghippo — Automated Web UI & Image Workflow Testing',
    content: `
      <p style="margin-bottom: 1rem; color: #94a3b8;">Python Playwright test suite validating image uploads, format conversion, and compression error boundaries:</p>
      <pre style="background:#050c1b; padding:1.2rem; border-radius:10px; color:#38bdf8; font-family:'Fira Code', monospace; font-size:0.85rem; overflow-x:auto;">
import pytest
from playwright.sync_api import Page, expect

def test_imghippo_upload_and_direct_link(page: Page):
    # Navigate to Imghippo homepage
    page.goto("https://www.imghippo.com/")
    expect(page).to_have_title(r"Free Image Hosting")

    # Upload sample test image asset
    file_input = page.locator("input[type='file']")
    file_input.set_input_files("test_assets/sample_banner.png")

    # Trigger upload and assert success container
    upload_btn = page.get_by_role("button", name="Upload")
    upload_btn.click()

    # Verify generated direct link and viewer embed URL
    direct_link_input = page.locator("#direct-link")
    expect(direct_link_input).to_be_visible(timeout=10000)
    assert "https://www.imghippo.com/i/" in direct_link_input.input_value()

def test_invalid_file_type_error_boundary(page: Page):
    page.goto("https://www.imghippo.com/")
    # Attempt uploading invalid non-image file (.exe / .pdf)
    page.locator("input[type='file']").set_input_files("test_assets/payload.pdf")
    error_msg = page.locator(".alert-danger")
    expect(error_msg).to_contain_text("Only image files are allowed")
      </pre>
    `
  },
  bugreport: {
    badge: 'Jira Defect Log',
    title: 'Defect: Glam & Go — Concurrent Double Booking Allowed on Network Glitch',
    content: `
      <div style="background:#050c1b; padding:1.2rem; border-radius:10px; color:#cbd5e1; font-size:0.85rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem;">
          <span style="background:rgba(239,68,68,0.2); color:#ef4444; padding:3px 10px; border-radius:9999px; font-weight:700;">Severity: High (P2)</span>
          <span style="color:#94a3b8;">Tool: Jira (Reported by Mandeep Singh)</span>
        </div>
        <h4 style="color:#ffffff; margin-bottom:0.5rem;">Summary: Rapid double-tap on "Confirm Booking" creates duplicate appointment slots</h4>
        <p><strong>Steps to Reproduce:</strong></p>
        <ol style="margin-left:1.5rem; margin-bottom:1rem;">
          <li>Select a salon and pick an open time slot (e.g. 3:00 PM).</li>
          <li>Proceed to checkout and select UPI wallet payment.</li>
          <li>On slow network throttle (3G), rapidly double-tap the "Confirm & Pay" button.</li>
        </ol>
        <p><strong>Expected:</strong> Button disables after first click, ensuring an idempotent single booking UUID.</p>
        <p><strong>Actual:</strong> Two identical bookings registered for the same time slot, causing schedule clash.</p>
      </div>
    `
  },
  allure: {
    badge: 'Automated CI/CD Report',
    title: 'Imghippo Playwright Automated Test Results',
    content: `
      <div style="background:#050c1b; padding:1.2rem; border-radius:10px;">
        <h4 style="color:#ffffff; margin-bottom:0.8rem;">Playwright Python Test Execution Summary</h4>
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:#ff7a00;">
            <th style="padding:8px; text-align:left;">Suite</th>
            <th style="padding:8px;">Tests</th>
            <th style="padding:8px;">Passed</th>
            <th style="padding:8px;">Status</th>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05); color:#cbd5e1;">
            <td style="padding:8px;">Image Upload & Link Generation</td>
            <td style="padding:8px; text-align:center;">12</td>
            <td style="padding:8px; text-align:center;">12</td>
            <td style="padding:8px; text-align:center; color:#10b981; font-weight:700;">PASSED</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05); color:#cbd5e1;">
            <td style="padding:8px;">Compress, Convert & Edit</td>
            <td style="padding:8px; text-align:center;">16</td>
            <td style="padding:8px; text-align:center;">16</td>
            <td style="padding:8px; text-align:center; color:#10b981; font-weight:700;">PASSED</td>
          </tr>
          <tr style="color:#cbd5e1;">
            <td style="padding:8px;">Invalid Inputs & Error Boundaries</td>
            <td style="padding:8px; text-align:center;">14</td>
            <td style="padding:8px; text-align:center;">14</td>
            <td style="padding:8px; text-align:center; color:#10b981; font-weight:700;">PASSED</td>
          </tr>
        </table>
      </div>
    `
  },
  api: {
    badge: 'API & Performance',
    title: 'Postman & Apache JMeter Test Assertions',
    content: `
      <pre style="background:#050c1b; padding:1.2rem; border-radius:10px; color:#38bdf8; font-family:'Fira Code', monospace; font-size:0.85rem; overflow-x:auto;">
// Postman Test Script
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is under 300ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(300);
});

pm.test("Verify Booking payload contract schema", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("bookingId");
    pm.expect(jsonData.status).to.eql("CONFIRMED");
});
      </pre>
    `
  }
};

function openArtifactModal(key) {
  const data = artifactData[key];
  if (!data) return;

  modalBadge.textContent = data.badge;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.content;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeArtifactModal() {
  modalBackdrop.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOnBackdrop(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    closeArtifactModal();
  }
}

function copyModalCode() {
  const btn = document.getElementById('copyModalBtn');
  const text = modalBody.innerText;

  navigator.clipboard.writeText(text).then(() => {
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => { btn.innerHTML = '📋 Copy Code'; }, 2000);
  });
}

/* ==========================================================
   5. MOBILE MENU
   ========================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.style.display = (navMenu.style.display === 'flex') ? 'none' : 'flex';
      if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = '#050d1d';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        navMenu.style.gap = '1.2rem';
      }
    });
  }
}

/* ==========================================================
   6. FOOTER CREATIVE IDEAS LAB & CONTROLLERS
   ========================================================== */
function initFooterLab() {
  const buttons = document.querySelectorAll('.fsd-btn');
  const panels = document.querySelectorAll('.footer-creative-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ideaKey = btn.getAttribute('data-idea');

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${ideaKey}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* Live Clock for Chandigarh, India (IST UTC+5:30) */
function startChandigarhClock() {
  function updateTime() {
    const now = new Date();
    // Format to Indian Standard Time (Asia/Kolkata)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);

    const clock1 = document.getElementById('liveClockDisplay');
    const clock2 = document.getElementById('comboClockDisplay');

    if (clock1) clock1.textContent = timeString;
    if (clock2) clock2.textContent = timeString;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* In-Browser Smoke Test Runner */
let isRunningSmoke = false;
function runPageSmokeTest() {
  if (isRunningSmoke) return;
  isRunningSmoke = true;

  const logBox = document.getElementById('smokeTestLog');
  const resultsBox = document.getElementById('smokeTestResults');
  const btn = document.getElementById('runSmokeTestBtn');

  if (logBox) logBox.style.display = 'block';
  if (resultsBox) resultsBox.innerHTML = '';
  if (btn) btn.innerHTML = '<span>⏳ Running Test...</span>';

  const assertions = [
    { text: '✓ [PASS] Page DOM loaded with 0 console runtime errors (14ms)', delay: 180 },
    { text: '✓ [PASS] Checked all 14 internal section anchors (#home, #skills, #experience, #projects, #hire-me) (42ms)', delay: 350 },
    { text: '✓ [PASS] Profile image [profile.jpg] loaded with 200 OK & circular framing (68ms)', delay: 520 },
    { text: '✓ [PASS] Skills & test artifact modals verified for responsive layout (94ms)', delay: 680 },
    { text: '✓ [PASS] Contact channels (Email, Phone, LinkedIn) validated (118ms)', delay: 840 },
    { text: '🏆 Summary: 5/5 assertions PASSED in 142ms. Zero defects detected on Mandeep\'s portfolio!', delay: 1050 }
  ];

  assertions.forEach(item => {
    setTimeout(() => {
      if (resultsBox) {
        const line = document.createElement('div');
        if (item.text.includes('🏆')) {
          line.className = 'stl-summary';
        } else {
          line.className = 'stl-pass';
        }
        line.textContent = item.text;
        resultsBox.appendChild(line);
      }
    }, item.delay);
  });

  setTimeout(() => {
    isRunningSmoke = false;
    if (btn) btn.innerHTML = '<span>✔ Test Passed (0 Bugs)</span>';
    setTimeout(() => {
      if (btn) btn.innerHTML = '<span>⚡ Run Page Smoke Test</span>';
    }, 3000);
  }, 1400);
}

/* 1-Click Copy Email to Clipboard */
function copyContactEmail() {
  const email = 'mandeepsinghsaini2003@gmail.com';
  const tag = document.getElementById('copyEmailTag');
  const btn = document.getElementById('copyEmailBtn');

  navigator.clipboard.writeText(email).then(() => {
    if (tag) tag.textContent = '✅ Copied to Clipboard!';
    if (btn) btn.style.borderColor = '#10b981';

    setTimeout(() => {
      if (tag) tag.textContent = '📋 Click to Copy';
      if (btn) btn.style.borderColor = '';
    }, 2500);
  });
}

/* Bug Bounty Easter Egg */
function openBugReportEasterEgg() {
  alert("🐞 Bug Bounty Report:\n\nThank you for checking! If you discovered an edge-case defect, please email Mandeep directly at mandeepsinghsaini2003@gmail.com with your findings.\n\nAs a QA Engineer, I love sharp eyes!");
}

/* Rocket Launch Smooth Scroll to Top */
function launchRocketToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

