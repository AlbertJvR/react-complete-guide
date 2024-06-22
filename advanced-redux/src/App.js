import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData, sendCartData } from './store/cart-actions';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector(state => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <>
            { notification && <Notification
                status={ notification.status }
                message={ notification.message }
                title={ notification.title }
            /> }
            <Layout>
                { cartIsVisible && <Cart/> }
                <Products/>
            </Layout>
        </>
    );
}

export default App;
