import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    updateCartItemQuantity: () => {},
    clearCart: () => {}
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );

        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };
        } else {
            updatedItems.push({
                ...action.payload,
                quantity: 1
            });
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.mealId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex]
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const currentItems = [...state.items];

        const newItems = currentItems.filter((item) => item.id !== action.payload);

        return {
            ...state,
            items: newItems
        };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
};

export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        {
            items: []
        }
    );

    function handleAddToCart(meal) {
        cartDispatch({
            type: 'ADD_ITEM',
            payload: meal
        });
    }

    function handleRemoveFromCart(mealId) {
        cartDispatch({
            type: 'REMOVE_ITEM',
            payload: mealId
        });
    }

    function handleUpdateCartItemQuantity(mealId, amount) {
        cartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                mealId,
                amount
            }
        });
    }

    function handleClearCart() {
        cartDispatch({
            type: 'CLEAR_CART'
        });
    }

    const ctxValue = {
        items: cartState.items,
        addItem: handleAddToCart,
        removeItem: handleRemoveFromCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
        clearCart: handleClearCart
    };

    return (
        <CartContext.Provider value={ ctxValue }>
            { children }
        </CartContext.Provider>
    )
};