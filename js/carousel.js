// Array da classe carousel
let carouselArr = [];

// Classe carousel
class Carousel {
  constructor(image, title, url) {
    this.image = image;
    this.title = title;
    this.url = url;
  }

  // Iniciar o carousel
  static Start(arr) {
    if (!arr || arr.length === 0) {
      throw "Method Start need a Array Variable.";
    }

    Carousel._sequence = 0;
    Carousel._size = arr.length;
    Carousel._firstLoad = true; // Primeiro carregamento para evitar animação

    Carousel.Next();

    // Dots click
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        Carousel.IrPara(Number(dot.dataset.index));
      });
    });

    // Miniaturas click
    const thumbs = document.querySelectorAll(".miniatura");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        Carousel.IrPara(Number(thumb.dataset.index));
      });
    });

    // Auto play
    Carousel._interval = setInterval(function () {
      Carousel.Next();
    }, 5000);
  }

  // Ir pro slide
  static IrPara(i) {
    Carousel._sequence = i;
    Carousel._firstLoad = false; // Ativar animação
    Carousel.Next(true);
    clearInterval(Carousel._interval); // Resetar o tempo do auto play
    Carousel._interval = setInterval(function () {
      // Reiniciar o auto play
      Carousel.Next();
    }, 5000);

    // Parar auto play ao passar o mouse
    const carouselContainer = document.querySelector(".imagem-home");

    carouselContainer.addEventListener("mouseenter", () => {
      clearInterval(Carousel._interval);
    });

    carouselContainer.addEventListener("mouseleave", () => {
      clearInterval(Carousel._interval);

      Carousel._interval = setInterval(() => {
        Carousel.Next();
      }, 5000);
    });
  }

  static Next(skipAuto = false) {
    const slide = carouselArr[Carousel._sequence];

    const image = document.getElementById("carousel");
    const title = document.getElementById("carousel-title");
    const link = document.getElementById("carousel-link");
    const container = image.closest(".imagem-home");

    if (Carousel._firstLoad) {
      if (Carousel._sequence === 0) {
        title.innerHTML = `${slide.title} <br>Verifique novidades <a href="lancamento.html">aqui</a>`;
      } else {
        title.innerHTML = slide.title;
      }

      image.src = slide.image;
      link.href = slide.url;
      Carousel._firstLoad = false; // Desativar primeiro carregamento
    } else {
      container.style.backgroundImage = `url(${image.src})`;
      image.style.opacity = "0";

      setTimeout(() => {
        if (Carousel._sequence === 1) {
          title.innerHTML = `Esta é a nova Ford Ranger 2022 <br>Verifique novidades <a href="lancamento.html">aqui</a>`;
        } else {
          title.innerHTML = slide.title;
        }

        image.src = slide.image;
        link.href = slide.url;

        setTimeout(() => {
          image.style.opacity = "1";
        }, 50);
      }, 250);
    }

    // Atualizando dots
    const dots = document.querySelectorAll(".dot");
    dots.forEach((d) => d.classList.remove("active"));
    if (dots[Carousel._sequence]) {
      dots[Carousel._sequence].classList.add("active");
    }

    // Atualizando miniaturas
    const thumbs = document.querySelectorAll(".miniatura");
    thumbs.forEach((t) => t.classList.remove("active-thumb"));

    if (thumbs[Carousel._sequence]) {
      thumbs[Carousel._sequence].classList.add("active-thumb");
    }

    Carousel._sequence++;

    if (Carousel._sequence >= Carousel._size) {
      Carousel._sequence = 0;
    }
  }
}

// Slides
carouselArr.push(
  new Carousel(
    "img/imagem_1.jpg",
    "Esta é a nova Ford Ranger 2022",
    "lancamento.html",
  ),
);

carouselArr.push(
  new Carousel("img/imagem_2.jpg", "Ford: conheça a nossa história", "#"),
);

carouselArr.push(
  new Carousel(
    "img/imagem_3.jpg",
    "Nova Ford Bronco Sport 2022",
    "lancamento.html",
  ),
);

// Inicio
Carousel.Start(carouselArr);
