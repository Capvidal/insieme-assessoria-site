/* =========================================================
   INSIEME ASSESSORIA — SCRIPT PRINCIPAL
   Preencha as constantes abaixo com os dados reais de contato.
   ========================================================= */

// Número do WhatsApp no formato internacional, apenas dígitos (ex: "5511999999999")
const WHATSAPP_NUMBER = "";

// URL completa do perfil/página da empresa no LinkedIn
const LINKEDIN_URL = "";

// E-mail de contato da empresa
const CONTACT_EMAIL = "";

document.addEventListener("DOMContentLoaded", () => {
  configurarLinksContato();
  configurarMenuMobile();
  configurarRolagemHeader();
  configurarAnimacoesReveal();
  configurarCopyrightRodape();
});

/**
 * Configura os cartões de contato (WhatsApp, e-mail, LinkedIn) a partir das constantes
 * definidas no início deste arquivo. Quando um dado não estiver preenchido, o cartão
 * correspondente é desabilitado (nunca fica com link quebrado "#").
 */
function configurarLinksContato() {
  configurarCartaoContato("link-whatsapp", WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "");
  configurarCartaoContato("link-email", CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "");
  configurarCartaoContato("link-linkedin", LINKEDIN_URL || "");

  const footerLinkedin = document.getElementById("footer-linkedin");
  if (footerLinkedin) {
    if (LINKEDIN_URL) {
      footerLinkedin.href = LINKEDIN_URL;
    } else {
      footerLinkedin.setAttribute("aria-disabled", "true");
      footerLinkedin.removeAttribute("href");
    }
  }

  // Oculta o botão flutuante enquanto o número não for configurado
  const whatsappFloat = document.getElementById("whatsapp-float");
  if (whatsappFloat) {
    if (WHATSAPP_NUMBER) {
      whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    } else {
      whatsappFloat.style.display = "none";
    }
  }
}

/**
 * Aplica o href a um cartão de contato ou o desabilita elegantemente (sem link quebrado)
 * quando o dado correspondente ainda não foi configurado.
 */
function configurarCartaoContato(elementId, href) {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (href) {
    el.href = href;
  } else {
    el.removeAttribute("href");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("tabindex", "-1");
  }
}

/**
 * Abre/fecha o menu mobile e fecha automaticamente ao clicar em um link.
 */
function configurarMenuMobile() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("menu-principal");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Ajusta a opacidade de fundo do header conforme a rolagem da página.
 */
function configurarRolagemHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}

/**
 * Aplica uma animação discreta de entrada às seções conforme entram na tela.
 * Respeita a preferência do usuário por movimento reduzido.
 */
function configurarAnimacoesReveal() {
  const prefereReducaoMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereReducaoMovimento) return;

  const elementos = document.querySelectorAll(".section, .hero-text, .hero-image");
  elementos.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observer.observe(el));
}

/**
 * Preenche automaticamente o ano de copyright no rodapé.
 */
function configurarCopyrightRodape() {
  const copy = document.getElementById("footer-copy");
  if (!copy) return;

  const anoAtual = new Date().getFullYear();
  copy.textContent = `© ${anoAtual} Insieme Assessoria. Todos os direitos reservados.`;
}
