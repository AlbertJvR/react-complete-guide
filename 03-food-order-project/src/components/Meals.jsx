import { MealItem } from './MealItem.jsx';
import { useHttp } from '../hooks/useHttp.js';
import {Error} from './Error.jsx';

// Creating this outside of the component to stop the infinite loop of doom
const requestConfig = {};

export const Meals = () => {
    const {
        isLoading,
        data: loadedMeals,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Loading...</p>;
    }

    if (error) {
        return <Error title="Failed to load meals!" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map(meal => (<MealItem key={meal.id} meal={meal} />))}
        </ul>
    )
}