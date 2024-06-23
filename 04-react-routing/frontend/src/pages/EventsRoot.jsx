import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

export const EventsRoot = () => {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    );
}