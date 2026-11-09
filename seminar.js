/* -----------------------------------------------
       Mobile Navigation Toggle
       ----------------------------------------------- */
    const navToggle  = document.getElementById('nav-toggle');
    const navLinks   = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navToggle.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });


    /* -----------------------------------------------
       Registration Form Validation
       ----------------------------------------------- */
    const form       = document.getElementById('reg-form');
    const msgBox     = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const fname       = document.getElementById('fname').value.trim();
      const email       = document.getElementById('email').value.trim();
      const phone       = document.getElementById('phone').value.trim();
      const institution = document.getElementById('institution').value.trim();
      const category    = document.getElementById('category').value;

      // Reset message
      msgBox.className = '';
      msgBox.style.display = 'none';

      // Basic required field check
      if (!fname || !email || !phone || !institution || !category) {
        showMsg('error', '⚠️  Please fill in all required fields before submitting.');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMsg('error', '⚠️  Please enter a valid email address.');
        return;
      }

      // Phone: 10-digit check (basic)
      const phoneClean = phone.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        showMsg('error', '⚠️  Please enter a valid 10-digit phone number.');
        return;
      }

      // Success
      showMsg('success', '✅  Thank you, ' + fname + '! Your registration has been received. We will contact you shortly.');
      form.reset();
    });

    function showMsg(type, text) {
      msgBox.textContent = text;
      msgBox.className   = type;
      msgBox.style.display = 'block';
      // Scroll into view
      msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }


    /* -----------------------------------------------
       Smooth active link highlighting on scroll
       ----------------------------------------------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const observerOptions = { rootMargin: '-40% 0px -55% 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = '';
            a.style.background = '';
          });
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) {
            active.style.color = 'var(--gold-lt)';
            active.style.background = 'rgba(200,150,62,.12)';
          }
        }
      });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
