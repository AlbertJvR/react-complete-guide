import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function EventItem({ event }) {
    // This hook programmatically submits an action just like the Form element does in EventForm.jsx. This triggers the
    // router action, and then you can send data and extract stuff like the method type in the action using the request param.
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure you want to delete this event?');

        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }

    return (
        <article className={ classes.event }>
            <img src={ event.image } alt={ event.title }/>
            <h1>{ event.title }</h1>
            <time>{ event.date }</time>
            <p>{ event.description }</p>
            <menu className={ classes.actions }>
                <Link to="edit">Edit</Link>
                <button onClick={ startDeleteHandler }>Delete</button>
            </menu>
        </article>
    );
}

export default EventItem;
