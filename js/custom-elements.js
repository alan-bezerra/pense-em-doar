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

const nivelUrgenciaIcons = {
  urgente: '<i class="ph ph-battery-vertical-full"></i>',
  medio: '<i class="ph ph-battery-vertical-medium"></i>',
  baixo: '<i class="ph ph-battery-vertical-low"></i>',
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

    const id = Math.floor(Math.random() * 1000)
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


window.customElements.define('app-header', Header)
window.customElements.define('pedido-doacao-card', PedidoDoacaoCard)
