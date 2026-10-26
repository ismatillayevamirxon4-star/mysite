// Tanlangan rejimni sahifa chizilishidan oldin qo'llaydi (oq "miltillash" bo'lmasligi uchun)
const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) {}

const isDark = () =>
  root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // Kunduzgi / tungi rejim tugmasi
  const toggle = document.querySelector('.theme-toggle');
  const updateIcon = () => {
    toggle.textContent = isDark() ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark() ? 'Kunduzgi rejim' : 'Tungi rejim');
  };
  updateIcon();
  toggle.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    updateIcon();
  });

  // Footerdagi yilni avtomatik yangilaydi
  document.getElementById('year').textContent = new Date().getFullYear();

  // photo.jpg topilmasa, rasm o'rnida "A" harfi qoladi
  const photo = document.querySelector('.photo img');
  const hidePhoto = () => photo.remove();
  if (photo.complete && photo.naturalWidth === 0) hidePhoto();
  else photo.addEventListener('error', hidePhoto);
});
