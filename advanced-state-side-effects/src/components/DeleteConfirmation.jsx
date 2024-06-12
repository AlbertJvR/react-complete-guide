import { useEffect } from 'react';
import { ProgressBar } from './ProgressBar.jsx';

const TIMER = 3000;

export default function DeleteConfirmation({onConfirm, onCancel}) {
    /*
    * When using prop or state values such as function pointers or even passed state values with useEffect, you need to add
    * them as dependencies in the dependencies array param for useEffect.
    * Dependencies: when added, you tell the useEffect function to execute when the value of the provided dep changes.
    *   This can be a problem with functions as dependencies, as you can create an INFINITE LOOP. When the App component
    *   is re-rendered, the functions are recreated too (functions are objects in Javascript) meaning that the value changes
    *   as it's a pointer to a function object, and due to being recreated that value has changed. So if the state is changed
    *   by the function, it triggers a render cycle and this could in the end cause and infinite loop.
    * For the above problem statement there is thankfully a workaround, useCallback. See the App component for implementation
    * and further details.
    */
    useEffect(() => {
        console.log('TIMER SET');
        const timer = setTimeout(() => {
            onConfirm();
        }, TIMER);

        // This is a cleanup function for useEffect. This runs in the following scenarios:
        // 1. Not the first execution, but for subsequent ones
        // 2. When the component is removed
        return () => clearTimeout(timer);
    }, [onConfirm]);

    // Need to add the interval that is changing state to useEffect to prevent infinite loop.

    return (
        <div id="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-actions">
                <button onClick={ onCancel } className="button-text">
                    No
                </button>
                <button onClick={ onConfirm } className="button">
                    Yes
                </button>
            </div>
            <ProgressBar timer={TIMER} />
        </div>
    );
}
