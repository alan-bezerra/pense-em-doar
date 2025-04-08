class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="border-bottom header-container position-fixed top-0 z-3 end-0 start-0">
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

const nivelUrgenciaIcons = {
  urgente: '<i class="ph ph-battery-vertical-full"></i>',
  medio: '<i class="ph ph-battery-vertical-medium"></i>',
  baixo: '<i class="ph ph-battery-vertical-low"></i>',
}

class NavBar extends HTMLElement {
  connectedCallback() {
    const active = this.dataset.active // home, pedidos, comunidade, onde-doar

    this.innerHTML = `
      <div class="app-navbar">
        <nav class="container">
          <a href="/" class="nav-link">
            <i class="${active === "home" ? "ph-fill" : "ph"} ph-house"></i>
            <span>Home</span>
          </a>

          <a href="/pedidos.html" class="nav-link">
            <i class="${active === "pedidos" ? "ph-fill" : "ph"} ph-hand-heart"></i>
            <span>Pedidos</span>
          </a>

          <a href="/comunidade.html" class="nav-link">
            <i class="${active === "comunidade" ? "ph-fill" : "ph"} ph-users-three"></i>
            <span>Comunidade</span>
          </a>

          <a href="/onde-doar.html" class="nav-link">
            <i class="${active === "onde-doar" ? "ph-fill" : "ph"} ph-map-trifold"></i>
            <span>Onde doar</span>
          </a>
        </nav>
      </div>
`
  }
}

class PedidoDoacaoCard extends HTMLElement {
  connectedCallback() {
    const { 
      sanguePrincipal, 
      paciente, 
      precisaAte: precisaAteValue, 
      sangues, 
      endereco, 
      uf, 
      cidade,
      nivel, // urgente, medio, baixo
    } = this.dataset

    const id = Math.floor(Math.random() * 1000) // NOTE: Viria do backend
    const precisaAte = precisaAteValue ?? "Indefinido"
    const fullAddress = `${endereco} - ${cidade} / ${uf.toUpperCase()}`

    this.innerHTML = `
      <article class="pedido-card card">
        <div class="card-body">
          <header class="card-header">
            <h5 class="card-title">
              ${sanguePrincipal.toUpperCase()}
            </h5>
            <span data-variant="${nivel}" class="badge">
              ${nivelUrgenciaIcons[nivel]}
              ${nivel.toUpperCase()}
            </span>
          </header>

          <div class="card-texts">
            <p class="card-text"><strong>Para:</strong> ${paciente}</p>
            <div class="card-icon-text">
              <i class="ph ph-hospital"></i>
              <p title="${fullAddress}" class="card-text text-truncate">
                <strong>Local:</strong> ${fullAddress}
              </p>
            </div>
            <div class="card-icon-text">
              <i class="ph ph-calendar-heart"></i>
              <p class="card-text">
                <strong>Precisa até:</strong> ${precisaAte}
              </p>
            </div>
            <div class="card-icon-text">
              <i class="ph ph-drop"></i>
              <p class="card-text">
                <strong>Recebe:</strong> ${sangues}
              </p>
            </div>
          </div>

          <div class="card-controls">
            <!-- Button trigger modal -->
            <button data-bs-toggle="modal" data-bs-target="#pedido-doacao-modal-${id}" class="btn btn-gradiente">
              Quero ajudar
            </button>

            <!-- Modal -->
            <div class="modal fade" id="pedido-doacao-modal-${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ${paciente}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="dropdown">
              <a
                class="sm-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Compartilhar
                <i class="ph ph-share-fat"></i>
              </a>

              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" target="_blank" href="#">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" target="_blank" href="#">
                    Facebook
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" target="_blank" href="#">
                    Instagram
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" target="_blank" href="#">
                    Copiar URL
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    `
  }
}

class ComunidadeDoacaoCard extends HTMLElement {
  connectedCallback() {
    const { 
      paciente, 
      autor,
      sangues, 
      compativel,
      endereco, 
      postadoEm,
      comentarios,
    } = this.dataset

    const iniciaisAutor = autor.length > 1 ? autor.slice(0, 2) : autor.slice(0, 1)
    const sanguesArr = sangues.split(",").filter((sangue) => sangue.split().length > 0)
    const isCompativel = Boolean(compativel)

    this.innerHTML = `
      <article class="comunidade-post-card">
        <header class="card-author-header">
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-card flex-shrink-0">
              <span class="avatar-placeholder">${iniciaisAutor}</span>
            </div>

            <p class="card-author-title">
              <span>${autor}</span> fez um pedido de doação
            </p>
          </div>

          <div class="dropdown">
            <button
              class="btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="ph ph-dots-three-vertical"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Compartilhar</a></li>
              <li><a class="dropdown-item" href="#">Baixar imagem</a></li>
            </ul>
          </div>
        </header>

        <div class="card-body-container">
          <section class="card-body">
            <h6 class="card-body-title">Pedido de doação</h6>
            <ul class="card-body-list">
              <li class="card-list-item">
                <div class="card-icon-text">
                  <i class="ph ph-user"></i>
                  <span class="card-text">PACIENTE</span>
                </div>

                <p class="card-list-description">${paciente}</p>
              </li>

              <li class="card-list-item">
                <div class="card-icon-text">
                  <i class="ph ph-drop"></i>
                  <span class="card-text">SANGUE NECESSÁRIO</span>
                </div>

                <div class="card-list-horizontal">
                  ${sanguesArr.map((sangue) => `<span class="badge">${sangue}</span>`).join('\n')}
                </div>

                ${isCompativel ? `
                  <p
                    class="card-list-description card-list-description--detail"
                  >
                    Você é compatível.
                  </p>
                ` : ""}
              </li>

              <li>
                <a href="/onde-doar.html" class="card-list-item">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="card-icon-text">
                      <i class="ph ph-map-pin"></i>
                      <span class="card-text">ONDE DOAR</span>
                    </div>

                    <i class="ph ph-caret-right"></i>
                  </div>

                  <p class="card-list-description">${endereco}</p>
                </a>
              </li>
            </ul>
          </section>

          <footer class="card-footer">
            <div class="card-icon-text card-icon-text--sm">
              <i class="ph-fill ph-globe-hemisphere-west"></i>
              <span
                class="card-list-description card-list-description--detail"
              >
                ${postadoEm}
              </span>
            </div>

            <div class="card-icon-text card-comment">
              <i class="ph ph-chat"></i>
              <span>${comentarios}</span>
            </div>
          </footer>
        </div>
      </article>
    `
  }
}

class VoltarBtn extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a title="Voltar" aria-label="Voltar" href="javascript:history.back()" class="btn p-0">
        <i class="ph ph-arrow-left icon"></i>
      </a>
    `
  }
}

window.customElements.define('app-header', Header)
window.customElements.define('app-navbar', NavBar)
window.customElements.define('pedido-doacao-card', PedidoDoacaoCard)
window.customElements.define('comunidade-post-card', ComunidadeDoacaoCard)
window.customElements.define('voltar-btn', VoltarBtn)
