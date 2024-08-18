import axios from "axios";
import { useRef, useState } from "react"

interface RecipeType{
  id: string,
  name: string,
  instructions: string,
  ingredients: string[],
}

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function fetchRecipe(name: string) {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    console.log(response);
    const meals = response.data.meals || [];
    
    const fetchRecipes = meals.map((meal: any) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) ingredients.push(ingredient);
    }
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      instructions: meal.strInstructions,
      ingredients,
    };
  });

      setRecipes(fetchRecipes);
    }
    const handleSearch = () => {
      const searchValue = inputRef.current?.value;
      if(searchValue){
        fetchRecipe(searchValue);
      }
    }
  
  return (
    <div>
      <input type="text" placeholder="Recipe" ref={inputRef} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.instructions}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
