/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

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

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});


 document.querySelector("#contactForm").addEventListener("submit", async function (e) {
                e.preventDefault(); // Evita que se recargue la página
                const form = e.target;
                const result = document.getElementById("formResult");

                // Enviar los datos con fetch (AJAX)
                const formData = new FormData(form);

                result.innerHTML = "⏳ Enviando mensaje...";

                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        result.innerHTML = "✅ ¡Tu mensaje ha sido enviado con éxito!";
                        form.reset(); // Limpia el formulario
                    } else {
                        result.innerHTML = "⚠️ Ocurrió un error. Por favor, inténtalo nuevamente.";
                    }
                } catch (error) {
                    result.innerHTML = "❌ Error al enviar el mensaje. Verifica tu conexión.";
                }

                // Oculta el mensaje después de 5 segundos (opcional)
                setTimeout(() => { result.innerHTML = ""; }, 5000);
            });
