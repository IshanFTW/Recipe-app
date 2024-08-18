import axios from "axios";
import { useRef, useState } from "react";

interface Meal{
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

function App() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchMeals = async (name: string) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    setMeals(response.data.meals || []);
  };

  const handleSearch = () => {
    const searchValue = inputRef.current?.value;
    if (searchValue) {
      fetchMeals(searchValue);
    }
  };

  const handleSelectMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    inputRef.current!.value = meal.strMeal;
    setMeals([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Recipe Finder</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a recipe..."
          ref={inputRef}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
        <ul className="mt-2 border border-gray-300 rounded-lg shadow-md bg-white">
          {meals.slice(0, 8).map((meal) => (
            <li
              key={meal.idMeal}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectMeal(meal)}
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      </div>
      {selectedMeal && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedMeal.strMeal}</h2>
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside mb-4">
            {[...Array(20)].map((_, i) => {
              const ingredient = selectedMeal[`strIngredient${i + 1}`];
              return ingredient ? <li key={i}>{ingredient}</li> : null;
            })}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <p>{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default App;