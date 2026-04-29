document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("checkbox");
  const homeImg = document.getElementById("homeImage");
  const contatoDiv = document.getElementById("contatoSection");
  const bgSection3 = document.getElementById("bgSection3");


  function updateSVGsForTheme(isLight) {
    if (isLight) {
      if (homeImg) homeImg.src = "svg/Home-clear.svg";
      if (contatoDiv) contatoDiv.style.backgroundImage = 'url("svg/contato-clear.svg")';
    } else {
      if (homeImg) homeImg.src = "svg/Home.svg";
      if (contatoDiv) contatoDiv.style.backgroundImage = 'url("svg/contato.svg")';
    }
  }

  const savedTheme = localStorage.getItem("theme");
  const isLight = savedTheme === "light";
  if (isLight) {
    document.body.classList.add("light-mode");
    checkbox.checked = true;
    updateSVGsForTheme(true);
  } else {
    updateSVGsForTheme(false);
  }

  checkbox.addEventListener("change", function () {
    const isNowLight = checkbox.checked;
    document.body.classList.toggle("light-mode", isNowLight);
    updateSVGsForTheme(isNowLight);
    localStorage.setItem("theme", isNowLight ? "light" : "dark");
  });

  // Agrupamento dos slides conforme o tamanho da tela
  function reorganizeCarousel(carouselId, cardsPerSlideDesktop, cardsPerSlideMobile) {
    const container = document.querySelector(`#${carouselId} .carousel-inner`);
    if (!container) return;

    const width = window.innerWidth;
    const cardsPerSlide = width < 768 ? cardsPerSlideMobile : cardsPerSlideDesktop;

    const cards = Array.from(container.querySelectorAll(".col-md-3, .col-md-6"));
    container.innerHTML = "";

    for (let i = 0; i < cards.length; i += cardsPerSlide) {
      const slide = document.createElement("div");
      slide.className = "carousel-item" + (i === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row";

      cards.slice(i, i + cardsPerSlide).forEach(card => row.appendChild(card));
      slide.appendChild(row);
      container.appendChild(slide);
    }
  }

  //Chamada para cada carrossel
  reorganizeCarousel("multiItemCarouselPosters", 4, 2);
  reorganizeCarousel("multiItemCarouselConvite", 4, 2);
  reorganizeCarousel("multiItemCarouselId", 4, 2);
  reorganizeCarousel("multiItemCarouselFoto", 2, 1);

  //Reorganiza quando redimensionar janela
  window.addEventListener("resize", () => {
    reorganizeCarousel("multiItemCarouselPosters", 4, 2);
    reorganizeCarousel("multiItemCarouselConvite", 4, 2);
    reorganizeCarousel("multiItemCarouselId", 4, 2);
    reorganizeCarousel("multiItemCarouselFoto", 2, 1);
  });
});
