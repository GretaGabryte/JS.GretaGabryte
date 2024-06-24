import { priceRegex, imgUrlRegex } from "../utils/regex.js";
import { meniuBtn, mobileNav } from "../utils/btn.js";

const customAlertModal = document.getElementById("customAlertModal");
const customAlertMessage = document.getElementById("customAlertMessage");
const customAlertClose = document.getElementById("customAlertClose");

const btn = document.getElementById("btn");
const title = document.getElementById("title");
const price = document.getElementById("price");
const imgUrl = document.getElementById("imgUrl");
const description = document.getElementById("description");
const locationInput = document.getElementById("location");

const showAlertModal = (message) => {
  customAlertMessage.textContent = message;
  customAlertModal.style.display = "block";
};

const hideAlertModal = () => {
  customAlertModal.style.display = "none";
};

btn.addEventListener("click", () => {
  const priceValue = price.value.trim();
  const imgUrlValue = imgUrl.value.trim();

  if (!priceRegex.test(priceValue)) {
    showAlertModal(
      "Please enter a valid price (e.g., 1234, 1234.56, 1 234, 1 234.56)."
    );
    return;
  }

  if (!imgUrlRegex.test(imgUrlValue)) {
    showAlertModal(
      "Please enter a valid image URL (e.g., https://example.com/image.jpg)."
    );
    return;
  }

  const formattedPrice = priceValue.replace(/\s+/g, "");

  const data = {
    title: title.value.trim(),
    price: formattedPrice,
    imgUrl: imgUrlValue,
    description: description.value.trim(),
    location: locationInput.value.trim(),
  };
  console.log(data);

  fetch("https://667319516ca902ae11b31dd6.mockapi.io/cars", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      showAlertModal("Car data successfully added!");
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      showAlertModal("Failed to submit car data. Please try again.");
    });
});

customAlertClose.addEventListener("click", hideAlertModal);

window.addEventListener("click", (event) => {
  if (event.target === customAlertModal) {
    hideAlertModal();
  }
});

meniuBtn.addEventListener("click", () => mobileNav.classList.toggle("active"));
