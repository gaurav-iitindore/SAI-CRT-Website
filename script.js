/* =============================================
   SAI CRT — editable config (behaviour)
   Update batch details here + in the HTML spots marked "BATCH INFO: edit here"
   ============================================= */
const SAICRT = {
  whatsapp: "918319953369",       // digits only, with country code
  batchDate: "1 October 2026",
  // Paste your Google Form link between the quotes to use a form instead of WhatsApp.
  // Leave empty ("") to send registrations straight to WhatsApp.
  googleFormUrl: ""
};

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile menu ----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.textContent = '☰'; toggle.setAttribute('aria-expanded','false');
    }));
  }

  // ---- Header shadow on scroll ----
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 4px 40px rgba(0,0,0,.4)' : '0 4px 24px rgba(0,0,0,.25)';
  }, {passive:true});

  // ---- Current year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- If a Google Form is set, point the "fill our form" link + course buttons to it ----
  if (SAICRT.googleFormUrl){
    const gf = document.getElementById('gformLink');
    if (gf){ gf.href = SAICRT.googleFormUrl; gf.textContent = 'fill our Google Form'; }
  }

  // ---- Course "Enroll" buttons preselect the course, then jump to the form ----
  document.querySelectorAll('[data-course]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = document.getElementById('rf-course');
      const want = btn.getAttribute('data-course').replace('&amp;','&');
      if (sel){ [...sel.options].forEach(o => { if (o.text.replace('&amp;','&') === want) sel.value = o.value; }); }
    });
  });

  setupCounters();
  setupReveal();
  setupForm();
});

/* ---- Counters (supports decimals like 4.8) ---- */
function setupCounters(){
  const counters = document.querySelectorAll('[data-count]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-count'));
      const dec = parseInt(el.getAttribute('data-decimals') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const fmt = (v) => dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
      if (reduce){ el.textContent = fmt(target) + suffix; obs.unobserve(el); return; }
      const dur = 1600; const t0 = performance.now();
      function tick(now){
        const p = Math.min((now - t0)/dur, 1);
        const val = target * (1 - Math.pow(1-p,3)); // ease-out
        el.textContent = fmt(val) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target) + suffix;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, {threshold:0.5});
  counters.forEach(c => obs.observe(c));
}

/* ---- Scroll reveal ---- */
function setupReveal(){
  const els = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce){ els.forEach(e => e.classList.add('in')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting){ entry.target.classList.add('in'); obs.unobserve(entry.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  els.forEach(e => obs.observe(e));
}

/* ---- Registration form -> WhatsApp (or Google Form) ---- */
function setupForm(){
  const form = document.getElementById('regForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const course = form.course.value.replace('&amp;','&');
    const college = form.college.value.trim();
    if (!name || !phone){
      alert('Please add your name and WhatsApp number so we can reach you.');
      return;
    }
    // If a Google Form is configured, open it instead.
    if (SAICRT.googleFormUrl){ window.open(SAICRT.googleFormUrl, '_blank'); return; }
    let msg = `Hi Sai CRT! I'd like to register for the ${SAICRT.batchDate} batch.\n\n`;
    msg += `Name: ${name}\nWhatsApp: ${phone}\n`;
    if (email) msg += `Email: ${email}\n`;
    msg += `Course: ${course}\n`;
    if (college) msg += `College/Year: ${college}\n`;
    const url = `https://wa.me/${SAICRT.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}
