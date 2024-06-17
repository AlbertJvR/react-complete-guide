import { useState } from 'react';

export const useInput = (defaultValue, validationFn) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value);

        // Update this on every keystroke as you want the message to disappear once the user focuses the element again and
        // starts typing
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true);
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    };
};