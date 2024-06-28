import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
    /* NB* you have to throw an Error object for this isError to be true
    * staleTime: React Query default is 0, so it will yield cached data with same query key, but also send a request to
    *   the backend to check for new data, and merge all data into current state silently behind the scenes. This setting allows
    *   you to set how long it is ok for that data to be stale before hitting the server again
    * gcTime: set how long values hang around in the cache in milliseconds. Default is 5 min then its discarded
    */
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['events', { max: 3 }],
        queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
        // staleTime: 5000,
        //gcTime: 1000
    });

    let content;

    if (isPending) {
        content = <LoadingIndicator/>;
    }

    if (isError) {
        content = (
            <ErrorBlock title="An error occurred" message={ error.info?.message || 'Failed to fetch events' }/>
        );
    }

    if (data) {
        content = (
            <ul className="events-list">
                { data.map((event) => (
                    <li key={ event.id }>
                        <EventItem event={ event }/>
                    </li>
                )) }
            </ul>
        );
    }

    return (
        <section className="content-section" id="new-events-section">
            <header>
                <h2>Recently added events</h2>
            </header>
            { content }
        </section>
    );
}
