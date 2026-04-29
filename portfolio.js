document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || !projetos[id]) {
    document.getElementById("projeto-container").innerHTML = "<p>Projeto não encontrado.</p>";
    return;
  }

  const projeto = projetos[id];

  document.getElementById("titulo").textContent = projeto.titulo;
  document.getElementById("descricao").textContent = projeto.descricao;

  const paleta = document.getElementById("paleta-cores");
  paleta.innerHTML = ""; // limpa antes de renderizar

  projeto.cores.forEach(cor => {
    const corDiv = document.createElement("div");
    corDiv.classList.add("cor");
    corDiv.style.backgroundColor = cor;

    const span = document.createElement("span");
    span.textContent = cor.toUpperCase();

    corDiv.appendChild(span);
    paleta.appendChild(corDiv);
  });


  const galeria = document.getElementById("galeria");
galeria.innerHTML = "";

projeto.imagens.forEach(imagem => {
  const img = document.createElement("img");
  img.src = imagem;
  img.alt = projeto.titulo;
  galeria.appendChild(img);
});

});


