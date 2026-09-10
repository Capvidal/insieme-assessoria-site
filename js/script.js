/* =========================================================
   INSIEME ASSESSORIA — SCRIPT PRINCIPAL

   Preencha as DUAS constantes abaixo com os dados reais.
   O e-mail de contato fica direto no HTML (index.html) e
   funciona mesmo com o JavaScript desativado.
   ========================================================= */

// WhatsApp no formato internacional, apenas dígitos (ex.: "5511999999999")
const WHATSAPP_NUMBER = "5512981237551";

// URL completa do perfil/página da empresa no LinkedIn
const LINKEDIN_URL = "https://www.linkedin.com/in/vidalcarlos";

document.addEventListener("DOMContentLoaded", () => {
  configurarLinksContato();
  configurarMenuMobile();
  configurarRolagemHeader();
  configurarAnimacoesReveal();
  configurarScrollSpy();
  configurarCopyrightRodape();
});

/**
 * Ativa os cartões de WhatsApp e LinkedIn (seção de contato e rodapé) a partir das
 * constantes acima. Enquanto um dado não estiver preenchido, o elemento correspondente
 * fica desabilitado — nunca com link quebrado ("#").
 */
function configurarLinksContato() {
  const urlWhatsapp = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "";

  aplicarLinkOuDesabilitar("link-whatsapp", urlWhatsapp);
  aplicarLinkOuDesabilitar("link-linkedin", LINKEDIN_URL);

  const footerLinkedin = document.getElementById("footer-linkedin");
  if (footerLinkedin) {
    if (LINKEDIN_URL) {
      footerLinkedin.href = LINKEDIN_URL;
      footerLinkedin.removeAttribute("aria-disabled");
    } else {
      footerLinkedin.setAttribute("aria-disabled", "true");
      footerLinkedin.removeAttribute("href");
    }
  }

  const whatsappFloat = document.getElementById("whatsapp-float");
  if (whatsappFloat) {
    if (urlWhatsapp) {
      whatsappFloat.href = urlWhatsapp;
      whatsappFloat.hidden = false;
    } else {
      whatsappFloat.hidden = true;
    }
  }
}

/**
 * Aplica o href a um elemento ou o desabilita elegantemente (sem link quebrado)
 * quando o dado correspondente ainda não foi configurado.
 */
function aplicarLinkOuDesabilitar(elementId, href) {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (href) {
    el.href = href;
    el.removeAttribute("aria-disabled");
    el.removeAttribute("tabindex");
  } else {
    el.removeAttribute("href");
    el.setAttribute("aria-disabled", "true");
    el.setAttribute("tabindex", "-1");
  }
}

/**
 * Abre/fecha o menu mobile. Fecha automaticamente ao clicar em um link, ao
 * pressionar Esc e ao voltar para a largura de desktop.
 */
function configurarMenuMobile() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("menu-principal");

  if (!toggle || !nav) return;

  const fecharMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) fecharMenu();
  });
}

/**
 * Adiciona uma sombra ao header depois de rolar a página. Só escreve no DOM
 * quando o estado realmente muda.
 */
function configurarRolagemHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  let comSombra = null;

  const atualizar = () => {
    const deveTerSombra = window.scrollY > 20;
    if (deveTerSombra !== comSombra) {
      comSombra = deveTerSombra;
      header.classList.toggle("is-scrolled", deveTerSombra);
    }
  };

  atualizar();
  window.addEventListener("scroll", atualizar, { passive: true });
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
 * Marca no menu o link da seção visível no momento (aria-current), criando
 * um destaque de navegação conforme a rolagem.
 */
function configurarScrollSpy() {
  const links = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  if (!links.length) return;

  const linkPorSecao = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const secao = id && document.getElementById(id);
    if (secao) linkPorSecao.set(secao, link);
  });
  if (!linkPorSecao.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.removeAttribute("aria-current"));
        const link = linkPorSecao.get(entry.target);
        if (link) link.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  linkPorSecao.forEach((_link, secao) => observer.observe(secao));
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
