const sections = ['projects', 'skills', 'infra', 'social'];

sections.forEach(section => {
  const template = document.getElementById(`${section}-template`);
  const container = document.getElementById('mainContent');
  
  if (template) {
    container.insertAdjacentHTML('beforeend', template.innerHTML);
  } else {
    container.insertAdjacentHTML('beforeend', `<p>Could not load ${section} section.</p>`);
  }
});
