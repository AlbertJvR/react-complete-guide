import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export const EventDetail = () => {
    // See the app definition, when trying to access loader on higher level, you need to set an id etc and use the following
    // const data = useLoaderData();
    const data = useRouteLoaderData('event-detail');

    return (
        <EventItem event={ data.event }/>
    );
}

export const loader = async ({ request, params }) => {
    const id = params.eventId;

    const response = await fetch(`http://localhost:8080/events/${ id }`);

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event.' }, { status: 500 });
    } else {
        return response;
    }
};

export const action = async ({ request, params }) => {
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${ id }`, {
        method: request.method
    });

    if (!response.ok) {
        throw json({ message: 'Could not delete selected event.' }, { status: 500 });
    }

    return redirect('/events');
};