import { useRef, useState } from 'react';

export default function RefLogin() {
    // Problem with using refs is you need one per input field, so for larger forms this is going to be horrid. Additionally,
    // resetting the form by manipulating the DOM directly via a ref is discouraged as you bypass react. See ref section code.
    const email = useRef();
    const password = useRef();

    function handleSubmit(event) {
        // The default behaviour of the form is to generate an http request and send it on submit. To prevent this, use the
        // method below so that we can handle it our own way and prevent this default behaviour.
        event.preventDefault();

        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        ref={email}
                        id="email"
                        type="email"
                        name="email"
                    />
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        ref={password}
                        id="password"
                        type="password"
                        name="password"
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
