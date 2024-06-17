import { useState } from 'react';

export default function StateLogin() {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [enteredPassword, setEnteredPassword] = useState('');
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    function handleSubmit(event) {
        // The default behaviour of the form is to generate an http request and send it on submit. To prevent this, use the
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
                        onChange={ (event) => handleInputChange(event.target.value, 'email') }
                    />
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
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
