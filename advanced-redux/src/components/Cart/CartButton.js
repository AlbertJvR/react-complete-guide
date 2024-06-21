import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    function handleCartToggle() {
        dispatch(uiActions.toggleCart());
    }

    return (
        <button className={ classes.button } onClick={ handleCartToggle }>
            <span>My Cart</span>
            <span className={ classes.badge }>{ cart.totalQuantity }</span>
        </button>
    );
};

export default CartButton;
