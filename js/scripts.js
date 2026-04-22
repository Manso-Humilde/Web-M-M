/*!
 * Consultoría Empresarial Integral M & M
 * Scripts personalizados para optimización y SEO
 * Santo Domingo, República Dominicana
 */

window.addEventListener('DOMContentLoaded', event => {

    // ==================== FUNCIONES DEL NAVBAR ====================

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ==================== PORTFOLIO LIGHTBOX ====================

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    // ==================== ANIMACIONES SCROLL ====================

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "#!") {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== ANIMACIÓN ENTRADA ELEMENTOS ====================

    // Observer para animar elementos cuando aparecen en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animación a elementos importantes
    document.querySelectorAll('.card, .portfolio-box, .mt-5').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ==================== DETECCIÓN DE UBICACIÓN (RD) ====================

    // Marcar teléfono para formato dominicano
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tracking de llamadas (opcional para analytics)
            console.log('📞 Llamada iniciada desde República Dominicana');
        });
    });

    // Detectar si el visitante es de República Dominicana (para futuras personalizaciones)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.country_code === 'DO') {
                document.body.classList.add('visitor-from-rd');
                console.log('🇩🇴 Visitante de República Dominicana detectado');

                // Personalización para visitantes dominicanos
                const locationBadge = document.createElement('div');
                locationBadge.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #002D62, #0066CC);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-size: 12px;
                    z-index: 1000;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                `;
                locationBadge.innerHTML = '🇩🇴 Servicios disponibles en todo RD';
                document.body.appendChild(locationBadge);

                setTimeout(() => {
                    locationBadge.style.opacity = '0';
                    locationBadge.style.transition = 'opacity 1s ease';
                    setTimeout(() => locationBadge.remove(), 1000);
                }, 5000);
            }
        })
        .catch(error => console.log('Info de ubicación no disponible'));

    // ==================== MEJORA DE RENDIMIENTO ====================

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

});

// ==================== MANEJO DEL FORMULARIO DE CONTACTO ====================

document.querySelector("#contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita que se recargue la página
    const form = e.target;
    const result = document.getElementById("formResult");
    const submitBtn = form.querySelector('button[type="submit"]');

    // Deshabilitar botón durante el envío
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    }

    // Enviar los datos con fetch (AJAX)
    const formData = new FormData(form);

    // Añadir información adicional para tracking
    formData.append('_subject', 'Nuevo contacto desde mps.com.es - República Dominicana');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    result.innerHTML = "⏳ Enviando mensaje...";
    result.className = 'alert alert-info mt-3';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            result.innerHTML = "✅ ¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto contigo en menos de 24 horas.";
            result.className = 'alert alert-success mt-3';
            form.reset(); // Limpia el formulario

            // Tracking de conversión (opcional para analytics)
            console.log('📧 Formulario enviado exitosamente desde RD');

            // Scroll al mensaje de éxito
            result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            result.innerHTML = "⚠️ Ocurrió un error. Por favor, inténtalo nuevamente o contáctanos directamente al +1 (809) 876-8830.";
            result.className = 'alert alert-warning mt-3';
        }
    } catch (error) {
        result.innerHTML = "❌ Error al enviar el mensaje. Por favor, llámanos al +1 (809) 876-8830 o escríbenos a morelsprimeservices@gmail.com";
        result.className = 'alert alert-danger mt-3';
    } finally {
        // Reactivar botón
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar';
        }
    }

    // Oculta el mensaje después de 8 segundos
    setTimeout(() => {
        result.style.opacity = '0';
        result.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            result.innerHTML = "";
            result.style.opacity = '1';
            result.className = '';
        }, 500);
    }, 8000);
});

// ==================== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL ====================

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Formatear número dominicano automáticamente
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.startsWith('809') || value.startsWith('829') || value.startsWith('849')) {
                    if (value.length > 3) {
                        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                    }
                }
                e.target.value = value.trim();
            }
        });
    }
});

// ==================== ANALYTICS BÁSICO (SIN DEPENDENCIAS EXTERNAS) ====================

// Registrar tiempo en página y scroll
let pageLoadTime = Date.now();
let maxScrollDepth = 0;

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);
});

// Cuando el usuario sale de la página
window.addEventListener('beforeunload', function() {
    const timeOnPage = (Date.now() - pageLoadTime) / 1000;
    console.log(`📊 Tiempo en página: ${Math.round(timeOnPage)}s | Scroll: ${Math.round(maxScrollDepth)}%`);
});

// ==================== MEJORA DE ACCESIBILIDAD ====================

// Asegurar que todos los enlaces externos se abran en nueva pestaña
document.querySelectorAll('a[href^="http"]:not([href*="mps.com.es"])').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

console.log('✅ Consultoría M & M - Scripts cargados correctamente | Santo Domingo, RD');



