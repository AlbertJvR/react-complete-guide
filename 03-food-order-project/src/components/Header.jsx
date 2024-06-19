import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext.jsx';
import { UserProgressContext } from '../store/UserProgressContext.jsx';

export const Header = () => {
    const { items } = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartQuantity = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={ logoImg } alt="A restaurant"/>
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button
                    onClick={handleShowCart}
                    textOnly
                >
                    Cart ({ cartQuantity })
                </Button>
            </nav>
        </header>
    )
}