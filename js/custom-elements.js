class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="border-bottom position-fixed top-0 z-3 end-0 start-0">
        <header class="container header">
          <a href="/">
            <img src="./assets/imgs/logo.svg" alt="Logo Pense em Doar" />
          </a>

          <a class="btn btn-outline" href="/contato.html">
            <i class="ph ph-envelope-simple icon"></i>
            Fale Conosco
          </a>
        </header>
      </div>
    `
  }
}

window.customElements.define('app-header', Header)
