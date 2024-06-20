import { createSlice, configureStore } from '@reduxjs/toolkit'

export const INCREMENT = 'INCREMENT';
export const INCREASE = 'INCREASE';
export const DECREMENT = 'DECREMENT';
export const TOGGLE = 'TOGGLE';

const initialState = {
    counter: 0,
    showCounter: true
};

// With redux toolkit, you can write code that directly mutates the state, because it detects code like this and under the
// hood will translate to the immutable approach by doing the clone thing and returning a new state with the updated values
// Q: Is this not slower? Should I still write the immutable version?
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.decrement--;
        },
        increase: (state, action) => {
            state.counter = state.counter + action.payload;
        },
        toggleCounter: (state) => {
            state.showCounter = !state.showCounter;
        }
    }
});

// const counterReducer = (state = initialState, action) => {
//     if (action.type === INCREMENT) {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter,
//         };
//     }
//
//     if (action.type === INCREASE) {
//         return {
//             counter: state.counter + action.payload,
//             showCounter: state.showCounter,
//         };
//     }
//
//     if (action.type === DECREMENT) {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter,
//         };
//     }
//
//     if (action.type === TOGGLE) {
//         return {
//             showCounter: !state.showCounter,
//             counter: state.counter
//         }
//     }
//
//     return state;
// };

// const store = createStore(counterReducer);

const store = configureStore({
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;

export default store;