import { fetchAllCars } from "./utils/fetches.js";
import { meniuBtn, mobileNav } from "./utils/btn.js";

const cardsWrapper = document.getElementById("wrapper");

const formatPrice = (price) => {
  const priceStr = price.toString();

  const formattedPrice = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${formattedPrice}€`;
};

const buildCards = (data) => {
  data.forEach((d) => {
    const card = document.createElement("a");

    card.setAttribute("class", "card");

    const img = document.createElement("img");
    img.src = d.imgUrl;

    const title = document.createElement("h2");
    title.textContent = d.title;

    const price = document.createElement("h3");
    price.textContent = formatPrice(d.price);

    const button = document.createElement("button");
    button.textContent = "View Details";
    button.onclick = () => {
      window.location.href = `../car/car.html?id=${d.id}`;
    };

    card.append(img, title, price, button);
    cardsWrapper.append(card);
  });
};

const init = async () => {
  const cars = await fetchAllCars();

  cars.sort((a, b) => a.price - b.price);

  buildCards(cars);
};

init();

meniuBtn.addEventListener("click", () => mobileNav.classList.toggle("active"));
