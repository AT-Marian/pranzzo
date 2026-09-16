document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HEADER
    ========================================= */

    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("navigation");

    const handleScroll = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 28);
        }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                document.body.classList.remove("menu-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       HERO VIDEO
    ========================================= */

    const heroVideo = document.getElementById("heroVideo");

    if (heroVideo) {

        heroVideo.muted = true;
        heroVideo.playsInline = true;

        const playVideo = () => {

            const playPromise = heroVideo.play();

            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Fallback background remains visible
                    // if browser blocks video playback.
                });
            }

        };

        if (heroVideo.readyState >= 2) {
            playVideo();
        } else {
            heroVideo.addEventListener(
                "loadeddata",
                playVideo,
                { once: true }
            );
        }

    }


    /* =========================================
       REVEAL
       Content is already visible in CSS.
       JS only adds the class for enhancement.
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       HERO 3D PHONE
    ========================================= */

    const heroStage =
        document.getElementById("heroStage");

    const heroPhone =
        document.getElementById("heroPhone");

    if (heroStage && heroPhone) {

        heroStage.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900) return;

                const rect =
                    heroStage.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                heroPhone.style.transform =
                    `translateY(-6px)
           rotateY(${x * 14 - 12}deg)
           rotateX(${y * -9 + 3}deg)
           translate(${x * 7}px, ${y * 6}px)`;

            }
        );

        heroStage.addEventListener(
            "mouseleave",
            () => {

                heroPhone.style.transform =
                    "translateY(-6px) rotateY(-12deg) rotateX(3deg)";

            }
        );

    }


    /* =========================================
       SYSTEM STORY PHONE CONTENT
    ========================================= */

    const deviceContent =
        document.getElementById("deviceContent");

    const productLabel =
        document.getElementById("productLabel");

    const stickyProduct =
        document.getElementById("stickyProduct");

    const productGlow =
        document.querySelector(".product-glow");

    const productDevice =
        document.getElementById("productDevice");

    const storyDots =
        Array.from(
            document.querySelectorAll(".story-dot")
        );

    const storyScenes =
        Array.from(
            document.querySelectorAll(".story-scene")
        );


    /* =========================================
       PHONE UI SCREENS
    ========================================= */

    const screens = {

        0: `
      <p class="ui-kicker">GUEST ORDER</p>

      <h4>Table 08</h4>

      <div class="ui-card">
        New order
        <strong>3 items received</strong>
      </div>

      <div class="ui-list">

        <div>
          <span>Chicken Burger ×2</span>
          <b>LKR 3,700</b>
        </div>

        <div>
          <span>Iced Latte ×1</span>
          <b>LKR 950</b>
        </div>

        <div>
          <span>Total</span>
          <b>LKR 4,650</b>
        </div>

      </div>
    `,

        1: `
      <p class="ui-kicker">LIVE POS</p>

      <h4>Orders</h4>

      <div class="ui-card">
        Table 06
        <strong>3 items · New</strong>
      </div>

      <div class="ui-card">
        Room 304
        <strong>2 items · Preparing</strong>
      </div>

      <div class="ui-card">
        Table 12
        <strong>5 items · Ready</strong>
      </div>
    `,

        2: `
      <p class="ui-kicker">KITCHEN / KOT</p>

      <h4>KOT #184</h4>

      <div class="ui-status">
        <i></i>
        2 × Chicken Burger
      </div>

      <div class="ui-status">
        <i></i>
        1 × French Fries
      </div>

      <div class="ui-status">
        <i></i>
        1 × Iced Coffee
      </div>

      <div class="ui-card">
        Status
        <strong>Preparing</strong>
      </div>
    `,

        3: `
      <p class="ui-kicker">MANAGEMENT</p>

      <h4>Operations</h4>

      <div class="ui-card">
        Overview
        <strong>Live activity</strong>
      </div>

      <div class="ui-chart">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div class="ui-list">

        <div>
          <span>Menu</span>
          <b>Active</b>
        </div>

        <div>
          <span>Kitchen</span>
          <b>Connected</b>
        </div>

      </div>
    `

    };


    /* =========================================
       PHONE THEMES
    ========================================= */

    const themes = {

        0: {
            name: "GUEST ORDERING",
            glow: "#c56b42",
            background: "#f0e9dc"
        },

        1: {
            name: "POS & ORDER FLOW",
            glow: "#d4aa63",
            background: "#eee5d5"
        },

        2: {
            name: "KITCHEN / KOT",
            glow: "#7f8d73",
            background: "#e8eadf"
        },

        3: {
            name: "MANAGEMENT",
            glow: "#633743",
            background: "#eadfe3"
        }

    };


    /* =========================================
       CHANGE PHONE SCREEN
    ========================================= */

    function setStep(index) {

        const step = Number(index);

        if (
            !Object.prototype.hasOwnProperty.call(
                screens,
                step
            )
        ) {
            return;
        }

        const theme = themes[step];

        if (deviceContent) {

            deviceContent.innerHTML =
                screens[step];

            deviceContent.style.background =
                theme.background;

        }

        if (productLabel) {
            productLabel.textContent =
                theme.name;
        }

        if (productGlow) {
            productGlow.style.background =
                theme.glow;
        }

        if (stickyProduct) {
            stickyProduct.style.setProperty(
                "--accent",
                theme.glow
            );
        }

        storyDots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === step
                );

            }
        );

    }


    /* =========================================
       IMPORTANT:
       POPULATE PHONE IMMEDIATELY
    ========================================= */

    setStep(0);


    /* =========================================
       STORY SCROLL OBSERVER
    ========================================= */

    if (
        "IntersectionObserver" in window &&
        storyScenes.length
    ) {

        const sceneObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio >= 0.45
                        ) {

                            const step =
                                Number(
                                    entry.target.dataset.step
                                );

                            setStep(step);

                        }

                    });

                },
                {
                    threshold: [0.45, 0.6]
                }
            );

        storyScenes.forEach((scene) => {
            sceneObserver.observe(scene);
        });

    }


    /* =========================================
       STORY NAVIGATION
    ========================================= */

    storyDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    if (storyScenes[index]) {

                        storyScenes[index].scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                    setStep(index);

                }
            );

        }
    );


    /* =========================================
       PRODUCT PHONE 3D TILT
    ========================================= */

    if (stickyProduct && productDevice) {

        stickyProduct.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900) return;

                const rect =
                    stickyProduct.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                productDevice.style.transform =
                    `perspective(1100px)
           rotateY(${x * 12}deg)
           rotateX(${y * -8}deg)`;

            }
        );

        stickyProduct.addEventListener(
            "mouseleave",
            () => {

                productDevice.style.transform = "";

            }
        );

    }


    /* =========================================
       CINEMATIC JOURNEY LINE
    ========================================= */

    const journeySection =
        document.querySelector(
            ".journey-cinematic"
        );

    if (journeySection) {

        if ("IntersectionObserver" in window) {

            const journeyObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach((entry) => {

                            if (entry.isIntersecting) {

                                journeySection.classList.add(
                                    "flow-active"
                                );

                                observer.unobserve(
                                    journeySection
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.2
                    }
                );

            journeyObserver.observe(
                journeySection
            );

        } else {

            journeySection.classList.add(
                "flow-active"
            );

        }

    }

});