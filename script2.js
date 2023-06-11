// Get elements
const authContainer = document.getElementById("auth-container");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const appContainer = document.getElementById("app-container");
const mealForm = document.getElementById("meal-form");
const mealList = document.getElementById("meal-list");
const nutritionForm = document.getElementById("nutrition-form");
const nutritionTips = document.getElementById("nutrition-tips");
const searchInput = document.getElementById("search-input");

// Function to show login form
function showLoginForm() {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
  }

  // Function to show signup form
  function showSignupForm() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
  }

  // Event listener for login button click
  loginBtn.addEventListener('click', showLoginForm);

  // Event listener for signup button click
  signupBtn.addEventListener('click', showSignupForm);



 // Function to handle login form submission
 function handleLogin(event) {
    event.preventDefault();
    // Perform login logic and validation here

    // Redirect to app container on successful login
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
  }

  // Function to handle signup form submission
  function handleSignup(event) {
    event.preventDefault();
    // Perform signup logic and validation here

    // Redirect to app container on successful signup
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
  }

  // Add event listeners to the login and signup forms
  loginForm.addEventListener('submit', handleLogin);
  signupForm.addEventListener('submit', handleSignup);


// Event listener for meal form submission
mealForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mealName = document.getElementById("meal-name").value;
  const calories = document.getElementById("calories").value;
  const date = document.getElementById("date").value;
  addMeal(mealName, calories, date);
  mealForm.reset();
});


// Sample array to store the logged meals
let meals = [];

// Function to add a new meal
function addMeal(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const mealNameInput = document.getElementById("meal-name");
  const caloriesInput = document.getElementById("calories");
  const dateInput = document.getElementById("date");
  
  // Create a new meal object
  const newMeal = {
    name: mealNameInput.value,
    calories: parseInt(caloriesInput.value),
    date: dateInput.value

  };
  
  // Add the new meal to the meals array
  meals.push(newMeal);
  
  // Clear the form inputs
  mealNameInput.value = "";
  caloriesInput.value = "";
  dateInput.value = "";
  
  // Update the meal list
  updateMealList();

  // Update the total calories
  updateTotalCalories();
}

// Function to update the meal list
function updateMealList() {
  const mealList = document.getElementById("meal-list");
  
  // Clear existing meal list
  mealList.innerHTML = "";
  
  // Add each meal to the list
  meals.forEach((meal, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${meal.name}</strong> - ${meal.calories} calories (${meal.date})
      <button onclick="deleteMeal(${index})">Delete</button>
    `;
    mealList.appendChild(listItem);
  });
}

// Function to delete a meal
function deleteMeal(index) {
  // Remove the meal from the meals array
  meals.splice(index, 1);
  
  // Update the meal list
  updateMealList();

  // Update the total calories
  updateTotalCalories();
}


// Function to update the total calories
function updateTotalCalories() {
  const totalCaloriesContainer = document.getElementById("total-calories");
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  totalCaloriesContainer.textContent = `Total Calories: ${totalCalories}`;
}

// Function to search for meals
function searchMeals() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();
  
  // Filter meals based on search term
  const filteredMeals = meals.filter(meal => {
    return meal.name.toLowerCase().includes(searchTerm);
  });
  
  // Update the meal list with the filtered meals
  const mealList = document.getElementById("meal-list");
  mealList.innerHTML = "";
  
  filteredMeals.forEach((meal, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${meal.name}</strong> - ${meal.calories} calories (${meal.date})
      <button onclick="deleteMeal(${index})">Delete</button>
    `;
    mealList.appendChild(listItem);
  });
}


// Function to get nutrition tips
function getNutritionTips(foodInput) {
    const appId = "a515427e";
    const appKey = "22d82e4353055cb28227107fcbc0df22";
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(foodInput)}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const tips = data?.hints?.map(hint => hint.food?.label) || [];
        displayNutritionTips(tips);
      })
      .catch(error => {
        console.log("An error occurred while fetching nutrition tips:", error);
      });
  }
  
  // Function to display nutrition tips
  function displayNutritionTips(tips) {
    nutritionTips.innerHTML = "";
    tips.forEach((tip) => {
      const tipItem = document.createElement("li");
      tipItem.textContent = tip;
      nutritionTips.appendChild(tipItem);
    });
  }
  
  mealForm.addEventListener("submit", addMeal);
  searchInput.addEventListener("input", searchMeals);
  searchInput.addEventListener("change", fetchNutritionTips);
  
  