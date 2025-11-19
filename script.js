document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbCaption = document.querySelector('.lightbox-caption');
  const lbClose = document.querySelector('.lightbox-close');
  const lbPrev = document.querySelector('.lightbox-prev');
  const lbNext = document.querySelector('.lightbox-next');
  const images = Array.from(document.querySelectorAll('.photo-grid .zoomable'));
  let currentIndex = -1;

  function showImageByIndex(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    const img = images[index];
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    currentIndex = index;
  }

  function openLightbox(img) {
    const idx = images.indexOf(img);
    showImageByIndex(idx === -1 ? 0 : idx);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    lbCaption.textContent = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(img);
    });
  });

  // Navigation
  function showNext() { showImageByIndex(currentIndex + 1); }
  function showPrev() { showImageByIndex(currentIndex - 1); }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Dynamic footer year
  const footerPs = document.querySelectorAll('footer p');
  const year = new Date().getFullYear();
  footerPs.forEach(p => {
    p.textContent = p.textContent.replace(/\d{4}/, String(year));
  });

});
