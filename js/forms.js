import * as bootstrap from 'bootstrap'

const formContato = document.querySelector("#form-contato");
const toastContato = document.querySelector("#toast-form-contato");

const contatoNomeField = formContato.querySelector("#nome");
const contatoEmailField = formContato.querySelector("#email");
const contatoAssuntoField = formContato.querySelector("#assunto");
const contatoMensagemField = formContato.querySelector("#mensagem");

formContato.addEventListener("submit", onContactSubmit);
contatoNomeField.addEventListener("input", onInputChange);
contatoEmailField.addEventListener("input", onInputChange);
contatoAssuntoField.addEventListener("input", onInputChange);
contatoMensagemField.addEventListener("input", onInputChange);

const isEmpty = (value) => value.trim().length === 0;
const isValidEmail = (email) => email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

const validAssuntos = ['duvida', 'elogio', 'sugestao', 'parceria', 'outros'];

function onContactSubmit(e) {
  e.preventDefault();

  const formData = new FormData(formContato);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const errors = {}

  if (isEmpty(data.nome)) {
    errors.nome = {
      message: "O campo nome é obrigatório",
      element: contatoNomeField,
    };
    addInputError(contatoNomeField);
  }

  if (isEmpty(data.email)) {
    errors.email = {
      message: "O campo email é obrigatório",
      element: contatoEmailField,
    };
    addInputError(contatoEmailField);
  } else if (!isValidEmail(data.email)) {
    errors.email = {
      message: "Insira um e-mail válido",
      element: contatoEmailField,
    }
    addInputError(contatoEmailField, errors.email.message);
  }

  if (!validAssuntos.includes(data.assunto)) {
    errors.assunto = {
      message: "Escolha um assunto válido",
      element: contatoAssuntoField,
    }
    addInputError(contatoAssuntoField, errors.assunto.message);
  }

  if (isEmpty(data.mensagem)) {
    errors.mensagem = {
      message: "O campo mensagem é obrigatório",
      element: contatoMensagemField,
    }
    addInputError(contatoMensagemField);
  }

  const errorsValues = Object.values(errors)
  if (errorsValues.length > 0) {
    const firstError = errorsValues[0]
    firstError.element.focus()
    return
  }

  [contatoNomeField, contatoEmailField, contatoAssuntoField, contatoMensagemField].forEach((field) => {
    field.value = "";

    if (field.id === "assunto") {
      field.value = "default";
    }
    removeInputError(field);
  });

  bootstrap.Toast.getOrCreateInstance(toastContato).show();
}

function onInputChange(e) {
  const value = e.target.value

  if (!isEmpty(value)) {
    removeInputError(e.target);
  }
}

function addInputError(element, errorMessage) {
  const errorMessageEl = element.nextElementSibling;
  errorMessageEl.style.display = "block";
  errorMessageEl.innerText = errorMessage ?? "Obrigatório";

  element.classList.add("is-invalid");

  return element
}

function removeInputError(element) {
  const errorMessageEl = element.nextElementSibling;
  errorMessageEl.style.display = "none";
  errorMessageEl.innerText = "";

  element.classList.remove("is-invalid");
}
