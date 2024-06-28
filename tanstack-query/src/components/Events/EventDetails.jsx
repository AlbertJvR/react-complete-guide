import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import Header from '../Header.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
    const navigate = useNavigate();
    const params = useParams();
    const eventId = params.id;

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['events-detail'],
        queryFn: ({ signal }) => fetchEvent({ id: eventId, signal }),
        staleTime: 0,
        gcTime: 0
    });

    // refetchType: none is important here, as when you delete something, react query tries to refetch existing queries, and
    // you will get 404 errors as you just deleted this.
    const {
        mutate,
        isPending: deleteIsPending,
        isError: deleteIsError,
        error: deleteError
    } = useMutation({
        mutationFn: () => deleteEvent({ id: eventId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'], refetchType: 'none' });
            navigate('/events');
        }
    });

    function handleDelete() {
        mutate();
    }

    return (
        <>
            <Outlet/>
            <Header>
                <Link to="/events" className="nav-item">
                    View all Events
                </Link>
            </Header>

            <article id="event-details">
                { isPending && (
                    <div id="event-details-content" className="center">
                        <LoadingIndicator/>
                    </div>

                ) }
                { !isPending && isError && (
                    <ErrorBlock title="An error occurred"
                                message={ error.info?.message || 'Failed to fetch event' }/>
                ) }
                { !deleteIsPending && deleteIsError && (
                    <ErrorBlock title="An error occurred"
                                message={ deleteError.info?.message || 'Failed to delete event' }/>
                ) }
                { !isPending && data && (
                    <>
                        <header>
                            <h1>{ data.title }</h1>
                            <nav>
                                <button
                                    onClick={ handleDelete }
                                    disabled={deleteIsPending}
                                >
                                    Delete
                                </button>
                                <Link to="edit">Edit</Link>
                            </nav>
                        </header>
                        <div id="event-details-content">
                            <img src={ `http://localhost:3000/${ data.image }` } alt="An event image"/>
                            <div id="event-details-info">
                                <div>
                                    <p id="event-details-location">{ data.location }</p>
                                    <time
                                        dateTime={ `Todo-DateT$Todo-Time` }>{ `${ data.date } @ ${ data.time }` }</time>
                                </div>
                                <p id="event-details-description">{ data.description }</p>
                            </div>
                        </div>
                    </>
                ) }
            </article>
        </>
    );
}
