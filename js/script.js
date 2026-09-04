document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".nav nav");


    /* MOBILE MENU */

    if (menu && nav) {

        menu.addEventListener("click", () => {

            nav.classList.toggle("open");

        });

    }


    /* CLOSE MOBILE MENU AFTER CLICK */

    document.querySelectorAll(".nav nav a").forEach(link => {

        link.addEventListener("click", () => {

            if (nav) {
                nav.classList.remove("open");
            }

        });

    });


    /* FAQ - ONLY ONE OPEN AT A TIME */

    const faqItems = document.querySelectorAll(".faq details");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (item.open) {

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {
                        otherItem.removeAttribute("open");
                    }

                });

            }

        });

    });

});