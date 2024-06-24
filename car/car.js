import { fetchCarById } from "../utils/fetches.js";
import { meniuBtn, mobileNav } from "../utils/btn.js";

document.addEventListener("DOMContentLoaded", async () => {
  const img = document.getElementById("img");
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  const location = document.getElementById("location");
  const deleteButton = document.getElementById("btn");

  const confirmModal = document.getElementById("confirmModal");
  const confirmDeleteButton = document.getElementById("confirmDelete");
  const cancelDeleteButton = document.getElementById("cancelDelete");

  const alertModal = document.getElementById("myModal");
  const closeAlertButton = document.getElementById("closeAlert");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const showConfirmModal = () => {
    confirmModal.style.display = "block";
  };

  const hideConfirmModal = () => {
    confirmModal.style.display = "none";
  };

  const showAlertModal = () => {
    alertModal.style.display = "block";
  };

  const hideAlertModal = () => {
    alertModal.style.display = "none";
    window.history.back();
  };

  closeAlertButton.addEventListener("click", hideAlertModal);
  cancelDeleteButton.addEventListener("click", hideConfirmModal);

  const car = await fetchCarById(id);

  if (car) {
    img.src = car.imgUrl;
    title.textContent = car.title;
    price.textContent = car.price + "€";
    description.textContent = car.description;
    location.textContent = car.location;
  } else {
    console.log("Car data not found");
  }
  const deleteCar = async (carId) => {
    try {
      const response = await fetch(
        `https://667319516ca902ae11b31dd6.mockapi.io/cars/${carId}`,
        { method: "DELETE" }
      );
      const status = await response.json();
      console.log(status);

      hideConfirmModal();
      showAlertModal();
    } catch (err) {
      console.log(err);
    }
  };
  deleteButton.addEventListener("click", showConfirmModal);
  confirmDeleteButton.addEventListener("click", () => {
    deleteCar(id);
  });
});

meniuBtn.addEventListener("click", () => mobileNav.classList.toggle("active"));
