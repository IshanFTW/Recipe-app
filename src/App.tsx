import axios from "axios";
import { useEffect, useRef, useState } from "react"

interface recipeType{
  name: string,
  instructions: string,
  ingredients: string,
}

function App() {
  const [recipe, setRecipe] = useState<recipeType |null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function fetchRecipe(name: string) {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(response){
      setRecipe({name: response.data.meals[0].strMeal , instructions: response.data.meals[0].strInstructions, ingredients: response.data.meals[0].strIngredient1})
    }
  }

  const handleSearch = () => {
    const searchValue = inputRef.current?.value;
    if(searchValue){
      fetchRecipe(searchValue);
    }
  }

  
  return (
    <div>
      <input type="text" name="" id="" placeholder="Recipe" ref = {inputRef} />
      <button onClick={handleSearch}>Search</button>
      <div>{recipe?.name}</div>
      <div>{recipe?.instructions}</div>
      <div>{recipe?.ingredients}</div>
    </div>
  )
}

export default App
