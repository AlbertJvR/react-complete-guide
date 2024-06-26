import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
        const { title, quantity, total, price, id } = props.item;
        const dispatch = useDispatch();

        function handleAddProduct(product) {
            dispatch(cartActions.addToCart(product));
        }

        function handleRemoveProduct(id) {
            dispatch(cartActions.removeFromCart(id));
        }

        return (
            <li className={ classes.item }>
                <header>
                    <h3>{ title }</h3>
                    <div className={ classes.price }>
                        ${ total.toFixed(2) }{ ' ' }
                        <span className={ classes.itemprice }>(${ price.toFixed(2) }/item)</span>
                    </div>
                </header>
                <div className={ classes.details }>
                    <div className={ classes.quantity }>
                        x <span>{ quantity }</span>
                    </div>
                    <div className={ classes.actions }>
                        <button onClick={ () => handleRemoveProduct(id) }>-</button>
                        <button
                            onClick={ () => handleAddProduct({
                                id,
                                price,
                                title
                            }) }
                        >+
                        </button>
                    </div>
                </div>
            </li>
        );
    }
;

export default CartItem;
