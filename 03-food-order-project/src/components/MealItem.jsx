import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';

const BASE_URL = 'http://localhost:3000';

export const MealItem = ({ meal }) => {
    const { addItem } = useContext(CartContext);

    function handleAddMealToCart(meal) {
        addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img
                    src={ `${ BASE_URL }/${ meal.image }` }
                    alt={ meal.name }
                />
                <div>
                    <h3>{ meal.name }</h3>
                    <p className="meal-item-price">{ currencyFormatter.format(meal.price) }</p>
                    <p className="meal-item-description">{ meal.description }</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={ () => handleAddMealToCart(meal) }>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}