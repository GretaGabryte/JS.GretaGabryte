export const fetchAllCars = async () => {
  try {
    const response = await fetch(
      "https://667319516ca902ae11b31dd6.mockapi.io/cars"
    );
    const cars = await response.json();
    return cars;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await fetch(
      `https://667319516ca902ae11b31dd6.mockapi.io/cars/${id}`
    );
    const car = await response.json();
    return car;
  } catch (err) {
    console.log(err);
  }
};
