// Challenge / Exercise
// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - Home
//    - Events
//    - EventDetailPage
//    - NewEvent
//    - EditEvent
// 2. Add routing & route definitions for these five pages
//    - / => Home
//    - /events => Events
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEvent
//    - /events/<some-id>/edit => EditEvent
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the Events
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { NewEvent } from './pages/NewEvent';
import { EditEvent } from './pages/EditEvent';
import { Root } from './pages/Root';
import { EventsRoot } from './pages/EventsRoot';

const router = createBrowserRouter([
    {
        path: '/', element: <Root/>, children: [
            { index: true, element: <Home/> },
            {
                path: 'events', element: <EventsRoot/>, children: [
                    { index: true, element: <Events/> },
                    { path: ':eventId', element: <EventDetail/> },
                    { path: ':eventId/edit', element: <EditEvent/> },
                    { path: 'new', element: <NewEvent/> }
                ]
            },
        ]
    }
]);

function App() {
    return <RouterProvider router={ router }/>;
}

export default App;
