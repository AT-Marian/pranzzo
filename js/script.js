document.addEventListener("DOMContentLoaded", () => {

    const menu =
        document.querySelector(".menu");

    const nav =
        document.querySelector(".nav nav");

    const navLinks =
        document.querySelectorAll(".nav nav a");

    const sections =
        document.querySelectorAll("main section[id]");

    const heroVideo =
        document.querySelector(".hero-background-video");


    /* MOBILE MENU */

    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("open");

        });

    }


    /* CLOSE MOBILE MENU */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (nav) {

                nav.classList.remove("open");

            }

        });

    });


    /* ACTIVE NAVIGATION */

    const updateActiveNavigation = () => {

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;


            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* FAQ */

    const faqItems =
        document.querySelectorAll(".faq details");


    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) {
                return;
            }


            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.removeAttribute(
                        "open"
                    );

                }

            });

        });

    });


    /* HERO VIDEO */

    if (heroVideo) {

        heroVideo.muted = true;


        const playPromise =
            heroVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {

                console.log(
                    "Video autoplay was blocked by the browser."
                );

            });

        }

    }

});