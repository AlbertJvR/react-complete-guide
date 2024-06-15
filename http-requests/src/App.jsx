import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchAvailablePlaces, fetchUserPlaces, updateUserPlaces } from './http.js';
import CustomError from './components/CustomError.jsx';
import error from 'eslint-plugin-react/lib/util/error.js';
import { sortPlacesByDistance } from './loc.js';

function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorFetching, setErrorFetching] = useState();
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchPlacesForUser() {
            setIsFetching(true);

            try {
                const places = await fetchUserPlaces();
                setUserPlaces(places);
                setIsFetching(false);
            } catch (error) {
                setErrorFetching({
                    message: error.message || 'Could not fetch user places, please try again later.'
                });
                setIsFetching(false);
            }
        }

        fetchPlacesForUser();
    }, []);

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to update places.'
            });
        }
    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );

        try {
            await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
        } catch (e) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to delete place.'
            });
        }

        setModalIsOpen(false);
    }, [updateUserPlaces]);

    function handleError() {
        setErrorUpdatingPlaces(null);
    }

    function handleErrorFetching() {
        setErrorFetching(null);
    }

    return (
        <>
            <Modal open={ errorFetching } onClose={ handleErrorFetching }>
                { errorFetching && <CustomError
                    title="An error occurred!"
                    message={ errorFetching.message }
                    onConfirm={ handleErrorFetching }
                /> }
            </Modal>
            <Modal open={ errorUpdatingPlaces } onClose={ handleError }>
                { errorUpdatingPlaces && <CustomError
                    title="An error occurred!"
                    message={ errorUpdatingPlaces.message }
                    onConfirm={ handleError }
                /> }
            </Modal>
            <Modal open={ modalIsOpen } onClose={ handleStopRemovePlace }>
                <DeleteConfirmation
                    onCancel={ handleStopRemovePlace }
                    onConfirm={ handleRemovePlace }
                />
            </Modal>

            <header>
                <img src={ logoImg } alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                { errorFetching && <CustomError
                    title="An error occurred!"
                    message={ errorFetching.message }
                /> }
                { !errorFetching && <Places
                    title="I'd like to visit ..."
                    isLoading={ isFetching }
                    loadingText="Fetching user place data..."
                    fallbackText="Select the places you would like to visit below."
                    places={ userPlaces }
                    onSelectPlace={ handleStartRemovePlace }
                /> }

                <AvailablePlaces onSelectPlace={ handleSelectPlace }/>
            </main>
        </>
    );
}

export default App;
