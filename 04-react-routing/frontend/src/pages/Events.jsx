import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

export const Events = () => {
    // It appears that you can use useLoaderData in any of the children routes to the route that you defined the loader
    // and get access to the data? Much wow
    const { events } = useLoaderData();

    // This is one way to do error handling, by setting custom return
    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }

    return (
        // how to do defer data loading and show a fallback until the data is ready!
        // This approach is great if you have pages with multiple http requests that load at different speeds
        <Suspense fallback={ <p style={ { textAlign: 'center' } }>Loading...</p> }>
            <Await resolve={ events }>
                { (loadedEvents) => (
                    <EventsList events={ loadedEvents }/>
                ) }
            </Await>
        </Suspense>
    );

    // return (
    //     <>
    //         <EventsList events={ events }/>
    //     </>
    // );
}

// When using loader functions for routes, its typically best practice to add the loader code close to the route that will
// be using it and import it with an alias in the route definitions.
// NB* You cannot use React hooks in these functions, only browser features
export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // One way to handle error is to return a custom message on error
        // return {
        //     isError: true,
        //     message: 'Could not fetch events.'
        // }

        // React router handles throws, ie the closest error event.
        // throw { message: 'Could not fetch events.' };

        // Instead of doing this, you can use the built-in json method shown further down
        // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });

        return json({ message: 'Could not fetch events' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;

        // React router has automatic data extraction, so you can just return the response object without manually extracting
        // the data with response.json()

        // When doing deferred stuff though, you cannot return just the Response, you need to use the first approach above
        //return response;
    }
};

export const loader = async () => {
    return defer({
        events: loadEvents()
    });
};