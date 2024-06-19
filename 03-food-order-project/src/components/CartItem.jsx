import { currencyFormatter } from '../util/formatting.js';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';

export const CartItem = ({ id, name, quantity, price }) => {
    const cartCtx = useContext(CartContext);

    function handleQuantityChange(id, amount) {
        cartCtx.updateCartItemQuantity(id, amount);
    }

    return (
        <li className="cart-item">
            <p>
                { name } - { quantity } x { currencyFormatter.format(price) }
            </p>
            <p className="cart-item-actions">
                <button onClick={ () => handleQuantityChange(id, -1) }>-</button>
                <span>{ quantity }</span>
                <button onClick={ () => handleQuantityChange(id, 1) }>+</button>
            </p>
        </li>
    )
}