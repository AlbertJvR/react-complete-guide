import classes from './NewsletterSignup.module.css';
import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';

export const NewsletterSignup = () => {
    // Difference: will trigger an action but not a transition or navigation to the page to which the action belongs.
    // You basically send your request behind the scenes
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);

    return (
        <fetcher.Form
            method="post"
            action='/newsletter'
            className={ classes.newsletter }
        >
            <input
                type="email"
                name="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}