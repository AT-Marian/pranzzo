document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton = document.querySelector(".menu");
    const navigation = document.querySelector(".nav nav");
    const navLinks = document.querySelectorAll(".nav nav a");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const updateActiveNavigation = () => {

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

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


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq details");

    faqItems.forEach((item) => {

        item.addEventListener("toggle", () => {

            if (!item.open) {
                return;
            }

            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {

                    otherItem.removeAttribute("open");

                }

            });

        });

    });


    /* =====================================================
       HERO VIDEO
    ===================================================== */

    const heroVideo =
        document.querySelector(
            ".hero-background-video"
        );

    if (heroVideo) {

        heroVideo.muted = true;

        heroVideo.setAttribute(
            "muted",
            ""
        );

        heroVideo.setAttribute(
            "playsinline",
            ""
        );


        const playPromise =
            heroVideo.play();


        if (playPromise !== undefined) {

            playPromise.catch(() => {

                /*
                 Browser may temporarily block autoplay.
                 The video remains muted and can play when
                 browser autoplay requirements are satisfied.
                */

            });

        }

    }

});