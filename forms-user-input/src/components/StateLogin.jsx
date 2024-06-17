import { CustomInput } from './CustomInput.jsx';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation.js';
import { useInput } from '../hooks/useInput.js';

export default function StateLogin() {
    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: hasErrorEmail,
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputChange: handlePasswordChange,
        handleInputBlur: handlePasswordBlur,
        hasError: hasErrorPassword
    } = useInput('', (value) => hasMinLength(value, 6));

    function handleSubmit(event) {
        // The default behaviour of the form is to generate a http request and send it on submit. To prevent this, use the
        // method below so that we can handle it our own way and prevent this default behaviour.
        event.preventDefault();

        if (hasErrorEmail || hasErrorPassword) {
            return;
        }

        console.log(emailValue, passwordValue);

        // You can reset the form by using the built-in type of "reset" on the reset button, or you can do it programmatically
        // using state by resetting the state to the initial value like this:
        // setFormValues({
        //     email: '',
        //     password: ''
        // });
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Login</h2>

            <div className="control-row">
                <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={ emailValue }
                    onBlur={ handleEmailBlur }
                    onChange={ handleEmailChange }
                    error={ hasErrorEmail && 'Please enter a valid email address.' }
                />

                <CustomInput
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={ passwordValue }
                    onBlur={ handlePasswordBlur }
                    onChange={ handlePasswordChange }
                    error={ hasErrorPassword && 'Please enter a valid password.' }
                />
            </div>

            <p className="form-actions">
                <button type="reset" className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
