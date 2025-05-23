// Atualização do script.js para gerenciar o formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os dados do formulário
            const formData = {
                nome: contactForm.querySelector('input[name="nome"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                telefone: contactForm.querySelector('input[name="telefone"]').value,
                servico: contactForm.querySelector('select[name="servico"]').value,
                mensagem: contactForm.querySelector('textarea[name="mensagem"]').value
            };
            
            // Mostrar estado de carregamento
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Limpar mensagens anteriores
            formStatus.innerHTML = '';
            formStatus.className = '';
            
            // Enviar dados para o backend (usando URL relativa para funcionar tanto em desenvolvimento quanto em produção)
            fetch('/api/contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Exibir mensagem de sucesso
                    formStatus.className = 'alert alert-success';
                    let successMessage = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                    
                    // Se estiver usando Ethereal, mostrar link de visualização
                    if (data.previewUrl) {
                        successMessage += ' (Modo de teste: <a href="' + data.previewUrl + '" target="_blank">Visualizar e-mail</a>)';
                        formStatus.innerHTML = successMessage;
                    } else {
                        formStatus.textContent = successMessage;
                    }
                    
                    contactForm.reset();
                } else {
                    // Exibir mensagem de erro
                    formStatus.className = 'alert alert-danger';
                    formStatus.textContent = data.message || 'Erro ao enviar mensagem. Por favor, tente novamente.';
                }
                
                // Restaurar botão
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            })
            .catch(error => {
                console.error('Erro:', error);
                
                // Exibir mensagem de erro
                formStatus.className = 'alert alert-danger';
                formStatus.textContent = 'Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.';
                
                // Restaurar botão
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        });
    }
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Smooth scrolling para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile após clicar
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Adiciona classe de animação aos elementos quando eles entram na viewport
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card');
    
    animateElements.forEach(element => {
        element.classList.add('animate-fadeIn');
        // Adiciona um pequeno atraso para cada elemento subsequente
        const delay = Array.from(animateElements).indexOf(element) * 0.1;
        element.style.animationDelay = `${delay}s`;
    });
    
    // Melhoria de acessibilidade para o botão de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        // Adiciona atributos de acessibilidade
        whatsappButton.setAttribute('aria-label', 'Contato via WhatsApp');
        whatsappButton.setAttribute('role', 'button');
    }
});
