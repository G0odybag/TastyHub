export const fetchRandomMeals = async (count = 4) => {
  try {
    const meals = [];
    // TheMealDB only returns 1 random meal per call, so we loop
    for (let i = 0; i < count; i++) {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      meals.push(data.meals[0]);
    }
    return meals;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};

export const searchMeals = async (query) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
};

export const getMealDetails = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
};