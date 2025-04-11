let pa = [];
    let indicesOcultos = [];
    let container = document.getElementById("paContainer");

    function gerarPA() {
      const primeiro = Math.floor(Math.random() * 10) + 1;
      const razao = Math.floor(Math.random() * 5) + 1;

      pa = [];
      for (let i = 0; i < 5; i++) {
        pa.push(primeiro + i * razao);
      }

      // Esconder 2 posições diferentes
      do {
        indicesOcultos = [
          Math.floor(Math.random() * 5),
          Math.floor(Math.random() * 5)
        ];
      } while (indicesOcultos[0] === indicesOcultos[1]);

      exibirPA();
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
        } 
        else {
          input.style.borderColor = "red";
        }
      }

      const resultado = document.getElementById("resultado");
      if (acertos === indicesOcultos.length) {
        resultado.textContent = "Parabéns! Você completou a PA corretamente!";
        resultado.style.color = "green";
      } else {
        resultado.textContent = "Algumas respostas estão erradas. Tente novamente!";
        resultado.style.color = "red";
      }
    }

    gerarPA();