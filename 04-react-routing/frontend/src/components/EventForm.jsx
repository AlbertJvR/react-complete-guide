import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
    const navigate = useNavigate();
    const navigation = useNavigation();

    // This hook allows you to get the RETURN data from an action, if you return a response such as the case with the
    // validation errors
    const actionData = useActionData();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('..');
    }

    return (
        <Form method={ method } className={ classes.form }>
            { actionData && actionData.errors && <ul>
                { Object.values(actionData.errors).map(error => (
                    <li key={ error }>{ error }</li>
                )) }
            </ul>
            }
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required defaultValue={ event ? event.title : '' }/>
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required defaultValue={ event ? event.image : '' }/>
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required defaultValue={ event ? event.date : '' }/>
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={ event ? event.description : '' }/>
            </p>
            <div className={ classes.actions }>
                <button
                    type="button"
                    onClick={ cancelHandler }
                    disabled={ isSubmitting }
                >
                    Cancel
                </button>
                <button disabled={ isSubmitting }>{ isSubmitting ? 'Saving...' : 'Save' }</button>
            </div>
        </Form>
    );
}

export default EventForm;

// Use the react router dom 'Form' element to get access to the form data in the action
// Check the react router section for a refresher
export const action = async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    };

    let url = 'http://localhost:8080/events';

    if (method === 'PATCH') {
        const eventId = params.eventId;
        url = `${ url }/${ eventId }`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    return redirect('/events');
};
