import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {
    counter: 0,
    showCounter: true
};

// With redux toolkit, you can write code that directly mutates the state, because it detects code like this and under the
// hood will translate to the immutable approach by doing the clone thing and returning a new state with the updated values
// Q: Is this not slower? Should I still write the immutable version?
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
        increase: (state, action) => {
            state.counter = state.counter + action.payload;
        },
        toggleCounter: (state) => {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;