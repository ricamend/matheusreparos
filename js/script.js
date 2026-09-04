/**
 * ==========================================================================
 * MATHEUS REPAROS - SCRIPT PRINCIPAL
 * ==========================================================================
 * Central de configurações, integração WhatsApp, interatividade e responsividade.
 */

// ==========================================================================
// 1. CONFIGURAÇÕES CENTRAIS (ALTERE FACILMENTE AQUI)
// ==========================================================================
const CONFIG = {
  // Número do WhatsApp com código do país (55) e DDD, sem espaços ou traços:
  whatsappNumber: "5511999999999", 

  // Nome fantasia da assistência técnica
  businessName: "Matheus Reparos",

  // Telefone para exibição visual
  phoneDisplay: "(11) 99999-9999",

  // E-mail de contato
  email: "contato@matheusreparos.com.br",

  // Horários de atendimento
  hoursWeekday: "Segunda a Sexta: 08h às 18h",
  hoursSaturday: "Sábado: 08h às 13h",

  // Endereço / Localização
  location: "São Paulo - SP (Atendimento em balcão e delivery sob consulta)",

  // Mensagem padrão para conversas genéricas
  defaultMessage: "Olá, Matheus Reparos! Gostaria de solicitar um orçamento para o meu eletrônico."
};

/**
 * Utilitário: Gera URL direta do WhatsApp com mensagem codificada
 */
function getWhatsAppUrl(customMessage) {
  const message = customMessage || CONFIG.defaultMessage;
  const cleanNumber = CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// ==========================================================================
// 2. INICIALIZAÇÃO NO CARREGAMENTO DO DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initMobileMenu();
  initHeaderScroll();
  initFaqAccordion();
  initServiceFilters();
  initQuoteForm();
  initScrollReveal();
  populateCompanyInfo();
});

/**
 * Vincula dinamicamente links do WhatsApp em botões e CTAs
 */
function initWhatsAppLinks() {
  // Botões gerais de WhatsApp
  const generalButtons = document.querySelectorAll("[data-whatsapp-btn]");
  generalButtons.forEach(btn => {
    btn.setAttribute("href", getWhatsAppUrl());
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // Botões específicos por serviço (com mensagem pré-personalizada)
  const serviceButtons = document.querySelectorAll("[data-whatsapp-service]");
  serviceButtons.forEach(btn => {
    const serviceName = btn.getAttribute("data-whatsapp-service");
    const msg = `Olá, Matheus Reparos! Gostaria de um orçamento para o serviço: *${serviceName}*. Poderia me passar mais detalhes e disponibilidade?`;
    btn.setAttribute("href", getWhatsAppUrl(msg));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });

  // Botão flutuante
  const floatBtn = document.getElementById("waFloatBtn");
  if (floatBtn) {
    floatBtn.setAttribute("href", getWhatsAppUrl("Olá! Vi o site da Matheus Reparos e gostaria de tirar uma dúvida pelo WhatsApp."));
    floatBtn.setAttribute("target", "_blank");
    floatBtn.setAttribute("rel", "noopener noreferrer");
  }
}

/**
 * Preenche automaticamente informações de contato em elementos com atributos
 */
function populateCompanyInfo() {
  const phoneEls = document.querySelectorAll("[data-company-phone]");
  phoneEls.forEach(el => el.textContent = CONFIG.phoneDisplay);

  const emailEls = document.querySelectorAll("[data-company-email]");
  emailEls.forEach(el => el.textContent = CONFIG.email);

  const hoursWeekdayEls = document.querySelectorAll("[data-company-hours-week]");
  hoursWeekdayEls.forEach(el => el.textContent = CONFIG.hoursWeekday);

  const hoursSatEls = document.querySelectorAll("[data-company-hours-sat]");
  hoursSatEls.forEach(el => el.textContent = CONFIG.hoursSaturday);

  const locEls = document.querySelectorAll("[data-company-location]");
  locEls.forEach(el => el.textContent = CONFIG.location);
}

/**
 * Menu Hamburguer Mobile
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  let overlay = document.querySelector(".mobile-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    document.body.appendChild(overlay);
  }

  const hamburgerIcon = '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
  const closeIcon = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

  const closeMenu = () => {
    if (!navLinks) return;
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    if (toggleBtn) {
      toggleBtn.innerHTML = hamburgerIcon;
      toggleBtn.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!navLinks) return;
    navLinks.classList.add("active");
    overlay.classList.add("active");
    if (toggleBtn) {
      toggleBtn.innerHTML = closeIcon;
      toggleBtn.setAttribute("aria-expanded", "true");
    }
    document.body.style.overflow = "hidden";
  };

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains("active");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", closeMenu);

    // Fecha ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });

    // Fecha ao clicar em algum link interno
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }
}

/**
 * Efeito visual do Header ao rolar a página
 */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * Acordeão de Perguntas Frequentes (FAQ)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Fecha outros itens (efeito acordeão exclusivo)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });

        // Alterna o item clicado
        item.classList.toggle("active", !isActive);
      });
    }
  });
}

/**
 * Filtro por Categoria na Página de Serviços
 */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card[data-category]");

  if (filterBtns.length === 0 || serviceCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      serviceCards.forEach(card => {
        const cardCats = card.getAttribute("data-category").split(" ");
        if (category === "all" || cardCats.includes(category)) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Formulário Interativo de Orçamento com Disparo Formatado para WhatsApp
 */
function initQuoteForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#formName")?.value.trim() || "Não informado";
    const phone = form.querySelector("#formPhone")?.value.trim() || "Não informado";
    const deviceType = form.querySelector("#formDeviceType")?.value || "Eletrônico";
    const deviceModel = form.querySelector("#formDeviceModel")?.value.trim() || "Não especificado";
    const issue = form.querySelector("#formIssue")?.value.trim() || "Sem descrição prévia";

    // Formata mensagem elegante para o WhatsApp
    const message = 
`*SOLICITAÇÃO DE ORÇAMENTO - MATHEUS REPAROS*
---------------------------------------
👤 *Nome:* ${name}
📞 *Contato:* ${phone}
📱 *Tipo:* ${deviceType}
⚙️ *Modelo:* ${deviceModel}
📝 *Problema relato:* ${issue}
---------------------------------------
_Olá! Preenchi o formulário no site e aguardo meu orçamento._`;

    const targetUrl = getWhatsAppUrl(message);
    window.open(targetUrl, "_blank");
  });
}

/**
 * Animação suave ao rolar a página (Reveal on scroll)
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}
