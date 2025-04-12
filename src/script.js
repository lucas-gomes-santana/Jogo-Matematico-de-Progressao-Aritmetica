let pa = [];
let indicesOcultos = [];
let container = document.getElementById("paContainer");
let nivel = 1;
let nivelResolvido = false;

function gerarPA() {
  const primeiro = Math.floor(Math.random() * 10) + 1;
  const razao = Math.floor(Math.random() * (nivel + 2)) + nivel; // aumenta conforme o nível

  const totalTermos = 5 + Math.floor(nivel / 2); // aumenta a cada 2 níveis
  const totalOcultos = Math.min(2 + Math.floor(nivel / 2), Math.floor(totalTermos / 2)); // até 50% dos termos

  pa = [];
  for (let i = 0; i < totalTermos; i++) {
    pa.push(primeiro + i * razao);
  }

  // Gerar índices únicos para esconder
  indicesOcultos = [];
  while (indicesOcultos.length < totalOcultos) {
    const idx = Math.floor(Math.random() * totalTermos);
    if (!indicesOcultos.includes(idx)) {
      indicesOcultos.push(idx);
    }
  }

  exibirPA();
  nivelResolvido = false;
}

function exibirPA() {
  container.innerHTML = "";

  for (let i = 0; i < pa.length; i++) {
    if (indicesOcultos.includes(i)) {
      container.innerHTML += `<input type="number" class="input-term" id="input${i}" />`;
    } else {
      container.innerHTML += `<div class="term">${pa[i]}</div>`;
    }
  }

  document.getElementById("resultado").textContent = "";
}

function verificarRespostas() {
  let acertos = 0;

  for (let i of indicesOcultos) {
    const input = document.getElementById(`input${i}`);
    const valor = parseInt(input.value);

    if (valor === pa[i]) {
      input.style.borderColor = "green";
      acertos++;
    } else {
      input.style.borderColor = "red";
    }
  }

  const resultado = document.getElementById("resultado");

  if (acertos === indicesOcultos.length) {
    resultado.textContent = `✅ Parabéns! Você completou o nível ${nivel} corretamente!`;
    resultado.style.color = "green";
    nivelResolvido = true;
  } else {
    resultado.textContent = "❌ Há respostas erradas. Tente novamente!";
    resultado.style.color = "red";
  }
}

function proximoNivel() {
  if (!nivelResolvido) {
    alert("Você precisa completar o nível atual corretamente antes de avançar!");
    return;
  }

  nivel++;
  pa = [];
  indicesOcultos = [];
  container.innerHTML = "";
  document.getElementById("resultado").textContent = "";
  gerarPA();
}

function recomecarJogo() {
  location.reload();
}

gerarPA();
