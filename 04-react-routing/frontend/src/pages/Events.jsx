import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

export const Events = () => {
    // It appears that you can use useLoaderData in any of the children routes to the route that you defined the loader
    // and get access to the data? Much wow
    const data = useLoaderData();

    // This is one way to do error handling, by setting custom return
    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }

    const events = data.events;

    return (
        <>
            <EventsList events={ events }/>
        </>
    );
}

// When using loader functions for routes, its typically best practice to add the loader code close to the route that will
// be using it and import it with an alias in the route definitions.
// NB* You cannot use React hooks in these functions, only browser features
export const loader = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // One way to handle error is to return a custom message on error
        // return {
        //     isError: true,
        //     message: 'Could not fetch events.'
        // }

        // React router handles throws, ie the closest error event.
        // throw { message: 'Could not fetch events.' };
        throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });
    } else {
        // const resData = await response.json();
        // return resData.events;

        // React router has automatic data extraction, so you can just return the response object without manually extracting
        // the data with response.json()
        return response;
    }
};