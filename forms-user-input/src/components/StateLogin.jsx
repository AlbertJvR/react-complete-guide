import { useState } from 'react';

export default function StateLogin() {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [enteredPassword, setEnteredPassword] = useState('');
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    // With the stateful approach, you typically validate on every keystroke
    const emailIsInvalid = didEdit.email && !formValues.email.includes('@');

    function handleSubmit(event) {
        // The default behaviour of the form is to generate a http request and send it on submit. To prevent this, use the
        // method below so that we can handle it our own way and prevent this default behaviour.
        event.preventDefault();

        console.log('USER EMAIL ' + formValues.email);
        console.log('USER PASSWORD ' + formValues.password);

        // You can reset the form by using the built-in type of "reset" on the reset button, or you can do it programmatically
        // using state by resetting the state to the initial value like this:
        setFormValues({
            email: '',
            password: ''
        });
    }

    function handleInputChange(value, identifier) {
        setFormValues(prevState => ({
            ...prevState,
            [identifier]: value
        }));

        // Update this on every keystroke as you want the message to disappear once the user focuses the element again and
        // starts typing
        setDidEdit((prevState) => ({
            ...prevState,
            [identifier]: false
        }));
    }

    function handleInputBlur(identifier) {
        setDidEdit(prevState => ({
            ...prevState,
            [identifier]: true
        }));
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formValues.email}
                        onBlur={() => handleInputBlur('email')}
                        onChange={ (event) => handleInputChange(event.target.value, 'email') }
                    />
                    <div className="control-error">
                        { emailIsInvalid && <p>Please enter a valid email address.</p> }
                    </div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={ (event) => handleInputChange(event.target.value, 'password') }
                    />
                </div>
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
