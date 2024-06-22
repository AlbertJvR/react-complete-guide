import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3030/cart/66775ccfc29f494252aae100');
            if (!response.ok) {

                throw new Error('Could not fetch data!');
            }

            return await response.json();
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity || 0,
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed'
            }));
        }
    }
};

// This is an Action Creator Thunk
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch(
                'http://localhost:3030/cart/66775ccfc29f494252aae100',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        };

        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed'
            }));
        }
    }
};
