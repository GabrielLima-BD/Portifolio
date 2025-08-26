document.addEventListener('DOMContentLoaded', () => {
    // Verificação de carregamento
    console.log('Script.js carregado!');

    // Mapeamento de linguagens para ícones do Font Awesome
    const languageIcons = {
        'python': 'fab fa-python',
        'javascript': 'fab fa-js',
        'postgresql': 'fas fa-database',
        'nodejs': 'fab fa-node-js',
        'express': 'fab fa-js',
        'mongodb': 'fas fa-database'
    };

    // Animações de scroll para seções
    const sections = document.querySelectorAll('.section');
    const projectItems = document.querySelectorAll('.project-item');

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
    projectItems.forEach(item => sectionObserver.observe(item));

    // Navegação suave apenas para links internos
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (window.innerWidth <= 768) {
                        document.querySelector('.sidebar').classList.remove('active');
                    }
                }
            });
        }
    });

    // Menu hamburguer
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Indicador de seção ativa (scroll spy)
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Modais para serviços
    const serviceItems = document.querySelectorAll('.service-item');
    const modals = document.querySelectorAll('.modal');
    const closes = document.querySelectorAll('.modal-close');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const service = item.dataset.service;
            const modal = document.getElementById(`modal-${service}`);
            if (modal) {
                modal.classList.add('active'); // Mostra o modal (pai)
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.remove('closing'); // Garante que não está fechando
            }
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            const modalContent = modal.querySelector('.modal-content');
            modalContent.classList.add('closing');
            setTimeout(() => {
                modal.classList.remove('active');
                modalContent.classList.remove('closing');
            }, 500); // Tempo igual ao da animação
        });
    });

    // Fecha ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal && modal.classList.contains('active')) {
                const modalContent = modal.querySelector('.modal-content');
                modalContent.classList.add('closing');
                setTimeout(() => {
                    modal.classList.remove('active');
                    modalContent.classList.remove('closing');
                }, 500);
            }
        });
    });

    // Fecha com ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    const modalContent = modal.querySelector('.modal-content');
                    modalContent.classList.add('closing');
                    setTimeout(() => {
                        modal.classList.remove('active');
                        modalContent.classList.remove('closing');
                    }, 500);
                }
            });
        }
    });

    // Particles.js para fundo e home
    particlesJS('full-page-particles', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 100, line_linked: { opacity: 0.7 } }, push: { particles_nb: 1 } }
        },
        retina_detect: true
    });

    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.5, width: 1.5 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 3 } }
        },
        retina_detect: true
    });

    // Botão voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Swiper para projetos
    function initializeSwiper(selector) {
        return new Swiper(selector, {
            freeMode: true,
            mousewheel: true,
            keyboard: true,
            spaceBetween: 20,
            grabCursor: true,
            breakpoints: {
                0: { slidesPerView: 1.1, },
                640: { slidesPerView: 2.1, },
                1024: { slidesPerView: 2.5, }
            }
        });
    }
    const largeProjectsSwiper = initializeSwiper('.large-projects');
    const smallProjectsSwiper = initializeSwiper('.small-projects');

    // Modal de projeto
    const projectModal = document.getElementById('project-modal');
    const projectModalCloseBtn = projectModal.querySelector('.modal-close-btn');
    const projectModalContent = projectModal.querySelector('.modal-content');
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const projectId = item.dataset.projectId;
            if (!projectId) return;

            const title = item.dataset.title;
            const image = item.dataset.image;
            const description = item.dataset.description;
            const languages = JSON.parse(item.dataset.languages);
            const githubLink = item.dataset.github;

            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-image').src = image;
            document.getElementById('modal-description').innerText = description;
            document.getElementById('modal-github-link').href = githubLink;

            const languagesContainer = document.getElementById('modal-languages-icons');
            languagesContainer.innerHTML = '';
            languages.forEach(lang => {
                const iconClass = languageIcons[lang];
                if (iconClass) {
                    const iconElement = document.createElement('i');
                    iconElement.className = iconClass;
                    languagesContainer.appendChild(iconElement);
                }
            });

            projectModal.classList.add('visible');
            projectModalContent.classList.remove('closing');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeProjectModal() {
        projectModalContent.classList.add('closing');
        setTimeout(() => {
            projectModal.classList.remove('visible');
            projectModalContent.classList.remove('closing');
            document.body.style.overflow = 'auto';
        }, 500); // Tempo igual ao da animação CSS
    }

    projectModalCloseBtn.addEventListener('click', closeProjectModal);

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('visible')) {
            closeProjectModal();
        }
    });

    // Efeito de digitação na home
    const typingEl = document.querySelector('.typing-effect');
    if (typingEl) {
        const text = 'Seja Bem-vindo ao Meu ';
        const highlight = 'Portfólio';
        let i = 0, j = 0;
        typingEl.innerHTML = '<span class="typing-text"></span><span class="typing-cursor">|</span>';
        const typingTextEl = typingEl.querySelector('.typing-text');

        function type() {
            if (i < text.length) {
                typingTextEl.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 110);
            } else if (j < highlight.length) {
                if (j === 0) typingTextEl.innerHTML += '<span class="highlight"></span>';
                const highlightEl = typingTextEl.querySelector('.highlight');
                highlightEl.textContent += highlight.charAt(j);
                j++;
                setTimeout(type, 110);
            }
        }
        type();
    }
});