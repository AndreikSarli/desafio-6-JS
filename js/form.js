//formulario de contato

class Contato {
  constructor(nome, telefone, email, cpf, tipo, mensagem) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.cpf = cpf;
    this.tipo = tipo;
    this.mensagem = mensagem;
  }
}

// Função enviar o formulário
function Enviar(event) {
  event.preventDefault();

  const contato = new Contato(
    document.getElementById("nome").value,
    document.getElementById("telefone").value,
    document.getElementById("email").value,
    document.getElementById("cpf").value,
    document.getElementById("tipo").value,
    document.getElementById("mensagem").value
  );

  alert(
    `Obrigado, ${contato.nome}! Seus dados foram enviados com sucesso.`
  );

  console.log(contato);
  event.target.reset(); // Limpar o formulário após o envio
  botaoEnviar.disabled = true; // Desabilitar o botão após o envio
}

// Telefone 
const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {

  let valor = e.target.value.replace(/\D/g, "");

  valor = valor.slice(0, 11);

  if (valor.length > 10) {
    valor = valor.replace(
      /^(\d{2})(\d{5})(\d{4}).*/,
      "($1) $2-$3"
    );
  } else if (valor.length > 6) {
    valor = valor.replace(
      /^(\d{2})(\d{4})(\d+)/,
      "($1) $2-$3"
    );
  } else if (valor.length > 2) {
    valor = valor.replace(
      /^(\d{2})(\d+)/,
      "($1) $2"
    );
  }
// Atualizar o valor do campo telefone
  e.target.value = valor;
});

// CPF

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", function (e) {

  let valor = e.target.value.replace(/\D/g, "");

  valor = valor.slice(0, 11);

  if (valor.length > 9) {
    valor = valor.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2}).*/,
      "$1.$2.$3-$4"
    );
  } else if (valor.length > 6) {
    valor = valor.replace(
      /^(\d{3})(\d{3})(\d+)/,
      "$1.$2.$3"
    );
  } else if (valor.length > 3) {
    valor = valor.replace(
      /^(\d{3})(\d+)/,
      "$1.$2"
    );
  }
// Atualizar o valor do campo CPF
  e.target.value = valor;
});

// Aceite do termo de uso
const checkboxTermos = document.getElementById("aceite-termos");
const botaoEnviar = document.getElementById("btn-enviar");
checkboxTermos.addEventListener("change", function () {
  botaoEnviar.disabled = !checkboxTermos.checked;
});