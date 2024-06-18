import { useFetch } from '../hooks/useFetch.js';
import { fetchMeals } from '../http.js';
import { MealItem } from './MealItem.jsx';

export const Meals = () => {
    const {
        isFetching,
        fetchedData: loadedMeals,
        error
    } = useFetch(fetchMeals, []);

    return (
        <ul id="meals">
            {loadedMeals.map(meal => (<MealItem key={meal.id} meal={meal} />))}
        </ul>
    )
}