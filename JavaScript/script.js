// Array com os seus projetos
const projects = [
  {
    title: 'Projeto 1',
    description: 'Análise de vendas para e-commerce com visualização interativa.',
    tech: 'Python, Pandas, Matplotlib',
    link: '#'
  },
  {
    title: 'Projeto 2',
    description: 'Dashboard de métricas em tempo real para sistema financeiro.',
    tech: 'SQL, Power BI, DAX',
    link: '#'
  },
  // Adicione mais objetos aqui para seus projetos
];

function loadProjects() {
  const container = document.getElementById('projects-container');
  projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';

    card.innerHTML = `
      <div class="project-title">${proj.title}</div>
      <div class="project-desc">${proj.description}</div>
      <div class="project-tech">${proj.tech}</div>
      <a href="${proj.link}" target="_blank" rel="noopener" class="project-link">Ver Projeto</a>
    `;

    container.appendChild(card);
  });
}

window.onload = loadProjects;
