document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      sections.forEach(section => section.classList.remove('active'));
      sections.forEach(section => section.classList.add('d-none'));

      const target = link.getAttribute('data-target');
      const targetSection = document.getElementById(target);
      targetSection.classList.remove('d-none');
      targetSection.classList.add('active');
    });
  });
});

