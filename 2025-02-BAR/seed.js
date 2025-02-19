// seed.js

const axios = require("axios");
const { faker } = require("@faker-js/faker");

const BASE_URL = "http://localhost:3000";

// Function to seed drinks via the /menu POST endpoint
async function seedDrinks() {
  console.log("Seeding drinks...");
  const drinks = [];
  const numberOfDrinks = 10; // change as needed

  for (let i = 0; i < numberOfDrinks; i++) {
    const drinkData = {
      name: faker.commerce.productName(),
      ml: faker.number.float({ min: 200, max: 1000, precision: 0.01 }),
      price: parseFloat(faker.commerce.price(1, 10, 2)),
      alcohol: faker.number.float({ min: 0, max: 50, precision: 0.01 })
    };

    try {
      const response = await axios.post(`${BASE_URL}/menu`, drinkData);
      console.log(`Created drink: ${response.data.name}`);
      drinks.push(response.data);
    } catch (error) {
      console.error("Error creating drink:", error.response ? error.response.data : error.message);
    }
  }
  return drinks;
}

// Function to seed orders via the /order POST endpoint
async function seedOrders(drinks) {
  console.log("Seeding orders...");
  const numberOfOrders = 5; // change as needed

  for (let i = 0; i < numberOfOrders; i++) {
    // For each order, pick a random number of drinks (1 to 3) ensuring no duplicate drink IDs in one order
    const orderDrinks = [];
    const numDrinks = faker.number.int({ min: 1, max: Math.min(3, drinks.length) });
    const selectedIndices = new Set();

    while (selectedIndices.size < numDrinks) {
      selectedIndices.add(faker.number.int({ min: 0, max: drinks.length - 1 }));
    }

    selectedIndices.forEach(index => {
      orderDrinks.push({
        drinkId: drinks[index].id,
        quantity: faker.number.int({ min: 1, max: 5 })
      });
    });

    const orderData = { drinks: orderDrinks };

    try {
      const response = await axios.post(`${BASE_URL}/order`, orderData);
      console.log(`Created order with id: ${response.data.id}`);
    } catch (error) {
      console.error("Error creating order:", error.response ? error.response.data : error.message);
    }
  }
}

// Main seed function
async function seed() {
  const drinks = await seedDrinks();
  if (drinks.length > 0) {
    await seedOrders(drinks);
  } else {
    console.error("No drinks created. Aborting order seeding.");
  }
}

seed();
