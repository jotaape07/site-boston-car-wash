
const button = document.querySelector("[data-menu]");
const menu = document.querySelector(".menu");
button?.addEventListener("click", () => menu?.classList.toggle("open"));

setTimeout(() => {
  document.querySelectorAll(".flash").forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "opacity .4s ease";
    setTimeout(() => el.remove(), 450);
  });
}, 4500);

/* =========================================================
   Boston Car Wash V4 — Mouse, scroll, tilt e microinterações
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // Navbar reacts to scroll
  const topbar = document.querySelector(".topbar");
  const updateTopbar = () => topbar?.classList.toggle("scrolled", window.scrollY > 18);
  updateTopbar();
  window.addEventListener("scroll", updateTopbar, { passive: true });

  // Reveal on scroll
  if (!reduceMotion) {
    const revealTargets = document.querySelectorAll(
      ".section-head, .card, .feature, .panel, .metric, .hero-copy > *, .hero-card, .client-admin-card, .quick-actions, .month-filter, .search-bar"
    );
    revealTargets.forEach((el, i) => {
      el.classList.add("reveal-ready");
      el.style.transitionDelay = `${Math.min((i % 6) * 55, 275)}ms`;
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach(el => io.observe(el));
  }

  // Custom cursor + glow
  if (finePointer && !reduceMotion) {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    const light = document.createElement("div");
    dot.className = "bc-cursor-dot";
    ring.className = "bc-cursor-ring";
    light.className = "bc-mouse-light";
    document.body.append(dot, ring, light);

    let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    document.body.style.cursor = "none";
    document.querySelectorAll("a,button,input,select,textarea,label").forEach(el => {
      el.style.cursor = "none";
    });

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      light.style.left = mouseX + "px";
      light.style.top = mouseY + "px";

      document.documentElement.style.setProperty("--mouse-x", mouseX + "px");
      document.documentElement.style.setProperty("--mouse-y", mouseY + "px");
      document.body.classList.add("cursor-ready");
    }, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactive = "a,button,input,select,textarea,.card,.feature,.metric,.panel,.client-admin-card";
    document.addEventListener("mouseover", e => {
      if (e.target.closest(interactive)) document.body.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(interactive)) document.body.classList.remove("cursor-hover");
    });

    document.addEventListener("mousedown", () => document.body.classList.add("cursor-press"));
    document.addEventListener("mouseup", () => document.body.classList.remove("cursor-press"));

    document.addEventListener("click", e => {
      const ripple = document.createElement("span");
      ripple.className = "bc-ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  // Mouse-reactive card light + small 3D tilt
  if (finePointer && !reduceMotion) {
    const tiltItems = document.querySelectorAll(".card, .feature, .metric, .client-admin-card");
    tiltItems.forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        card.style.setProperty("--card-x", `${x}px`);
        card.style.setProperty("--card-y", `${y}px`);

        const rx = ((y / r.height) - 0.5) * -4;
        const ry = ((x / r.width) - 0.5) * 4;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });

    // Hero parallax
    const hero = document.querySelector(".hero");
    const heroCopy = document.querySelector(".hero-copy");
    const heroCard = document.querySelector(".hero-card");
    hero?.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5;
      const ny = (e.clientY - r.top) / r.height - .5;

      if (heroCopy) heroCopy.style.transform = `translate3d(${nx * -8}px, ${ny * -5}px, 0)`;
      if (heroCard) heroCard.style.transform = `perspective(1100px) rotateX(${ny * -3}deg) rotateY(${nx * 4}deg) translate3d(${nx * 8}px, ${ny * 5}px, 0)`;
    });
    hero?.addEventListener("mouseleave", () => {
      if (heroCopy) heroCopy.style.transform = "";
      if (heroCard) heroCard.style.transform = "";
    });

    // Magnetic buttons
    document.querySelectorAll(".btn,.small-btn,.nav-cta").forEach(el => {
      el.classList.add("magnetic");
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.09}px, ${y * 0.11}px) translateY(-1px)`;
      });
      el.addEventListener("mouseleave", () => el.style.transform = "");
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll(".menu a").forEach(a => {
    a.addEventListener("click", () => menu?.classList.remove("open"));
  });
})();


/* V5 — caneta para editar preços dos serviços */
document.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-price-edit]");
  if (editButton) {
    const id = editButton.dataset.priceEdit;
    const display = document.querySelector(`[data-price-display="${id}"]`);
    const form = document.querySelector(`[data-price-form="${id}"]`);

    document.querySelectorAll("[data-price-form]").forEach(otherForm => {
      if (otherForm !== form) otherForm.hidden = true;
    });
    document.querySelectorAll("[data-price-display]").forEach(otherDisplay => {
      if (otherDisplay !== display) otherDisplay.hidden = false;
    });

    if (display) display.hidden = true;
    if (form) {
      form.hidden = false;
      const input = form.querySelector('input[name="price"]');
      input?.focus();
      input?.select();
    }
    return;
  }

  const cancelButton = event.target.closest("[data-price-cancel]");
  if (cancelButton) {
    const id = cancelButton.dataset.priceCancel;
    const display = document.querySelector(`[data-price-display="${id}"]`);
    const form = document.querySelector(`[data-price-form="${id}"]`);
    if (form) form.hidden = true;
    if (display) display.hidden = false;
  }
});


/* V7 — clicar no meio de pagamento e editar entrada manual */
(() => {
  const formatBRL = (value) => {
    const number = Number.isFinite(value) ? value : 0;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const parseMoney = (value) => {
    if (!value) return 0;
    let text = String(value).trim().replace(/\s/g, "");
    if (text.includes(",")) {
      text = text.replace(/\./g, "").replace(",", ".");
    }
    const number = Number(text);
    return Number.isFinite(number) ? number : 0;
  };

  document.querySelectorAll("[data-payment-card]").forEach(card => {
    const open = card.querySelector("[data-payment-open]");
    const editor = card.querySelector("[data-payment-editor]");
    const cancel = card.querySelector("[data-payment-cancel]");
    const input = card.querySelector("[data-payment-input]");
    const preview = card.querySelector("[data-payment-preview]");
    const totalDisplay = card.querySelector("[data-payment-total]");
    const automatic = parseMoney(card.dataset.automatic || "0");
    const originalManual = parseMoney(card.dataset.currentManual || "0");

    const closeEditor = () => {
      editor.hidden = true;
      open.hidden = false;
      card.classList.remove("editing");
      if (input) input.value = originalManual.toFixed(2).replace(".", ",");
      const total = automatic + originalManual;
      if (preview) preview.textContent = formatBRL(total);
      if (totalDisplay) totalDisplay.textContent = formatBRL(total);
    };

    open?.addEventListener("click", () => {
      document.querySelectorAll("[data-payment-card].editing").forEach(other => {
        if (other !== card) {
          const otherEditor = other.querySelector("[data-payment-editor]");
          const otherOpen = other.querySelector("[data-payment-open]");
          if (otherEditor) otherEditor.hidden = true;
          if (otherOpen) otherOpen.hidden = false;
          other.classList.remove("editing");
        }
      });

      open.hidden = true;
      editor.hidden = false;
      card.classList.add("editing");
      input?.focus();
      input?.select();
    });

    cancel?.addEventListener("click", closeEditor);

    input?.addEventListener("input", () => {
      const manual = Math.max(0, parseMoney(input.value));
      const projected = automatic + manual;
      if (preview) preview.textContent = formatBRL(projected);
      if (totalDisplay) totalDisplay.textContent = formatBRL(projected);
    });
  });
})();
