import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
    const navigate = useNavigate();
    const params = useParams();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['events-detail'],
        queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    });

    // This mutate performs an optimistic update. It updates React Queries' data store before a response is received
    const { mutate } = useMutation({
        mutationFn: updateEvent,
        onMutate: async (data) => {
            const newEvent = data.event;

            // You need to cancel all outgoing queries to ensure that you don't have clashing data for that key before
            // performing the optimistic update. Will cancel the queries from useQuery
            await queryClient.cancelQueries({ queryKey: ['events', params.id] });
            const previousEvent = queryClient.getQueryData(['events', params.id]);
            queryClient.setQueryData(['events', params.id], newEvent);

            return { previousEvent };
        },
        onError: (error, data, context) => {
            // If the update fails, rollback the query data to the previous event data that you return in the onMutate above
            queryClient.setQueryData(['events', params.id], context.previousEvent);
        },
        // this will run whether it succeeds or fails, kinda like a 'finally' block. You invalidate the queries here to ensure
        // consistency in the state by forcing a fetch of the latest data.
        onSettled: () => {
            queryClient.invalidateQueries(['events', params.id]);
        }
    });

    function handleSubmit(formData) {
        mutate({ id: params.id, event: formData });
        navigate('../');
    }

    function handleClose() {
        navigate('../');
    }

    let content;

    if (isPending) {
        content = (
            <div className="center">
                <LoadingIndicator/>
            </div>
        );
    }

    if (isError) {
        content = (
            <>
                <ErrorBlock
                    title="Failed to load event."
                    message={ error.info?.message || 'Failed to fetch event. Please check your inputs and try again.' }
                />
                <div className="form-actions">
                    <Link to="../" className="button">
                        Okay
                    </Link>
                </div>
            </>
        );
    }

    if (data) {
        content = (
            <EventForm inputData={ data } onSubmit={ handleSubmit }>
                <Link to="../" className="button-text">
                    Cancel
                </Link>
                <button type="submit" className="button">
                    Update
                </button>
            </EventForm>
        );
    }

    return (
        <Modal onClose={ handleClose }>
            { content }
        </Modal>
    );
}
