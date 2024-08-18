import axios from "axios";
import { useRef, useState } from "react";

interface MealType {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strIngredient1:  string | null;
  strIngredient2:  string | null;
  strIngredient3:  string | null;
  strIngredient4:  string | null;
  strIngredient5:  string | null;
  strIngredient6:  string | null;
  strIngredient7:  string | null;
  strIngredient8:  string | null;
  strIngredient9:  string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
}

interface RecipeType {
  name: string;
  instructions: string;
  ingredients: string[];
}

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [recommendations, setRecommendations] = useState<MealType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch recipes based on the search input
  const fetchRecommendations = async (query: string) => {
    const response = await axios.get<{ meals: MealType[] | null }>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const meals = response.data.meals || [];
    setRecommendations(meals.slice(0, 8)); // Limit to the first 5 recommendations
  };

  // Fetch a single recipe when a recommendation is clicked
  const fetchRecipe = async (name: string) => {
    const response = await axios.get<{ meals: MealType[] | null }>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const meal = response.data.meals ? response.data.meals[0] : null;
    
    if (meal) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}` as keyof MealType];
        if (ingredient) ingredients.push(ingredient);
      }

      setRecipes([{ name: meal.strMeal, instructions: meal.strInstructions, ingredients }]);
      setRecommendations([]); 
    }
  };

  // Handle input change
  const handleInputChange = () => {
    const query = inputRef.current?.value;
    if (query) {
      fetchRecommendations(query);
    } else {
      setRecommendations([]);
    }
  };

  // Handle recommendation click
  const handleRecommendationClick = (name: string) => {
    fetchRecipe(name);
    if (inputRef.current) {
      inputRef.current.value = name;
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a recipe..." 
        ref={inputRef} 
        onChange={handleInputChange}
      />
      <ul>
        {recommendations.map((rec) => (
          <li key={rec.idMeal} onClick={() => handleRecommendationClick(rec.strMeal)}>
            {rec.strMeal}
          </li>
        ))}
      </ul>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.name}</h2>
          <p>{recipe.instructions}</p>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
