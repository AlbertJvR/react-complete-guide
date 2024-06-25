import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/events"/>,
    },
    {
        path: '/events',
        element: <Events/>,

        children: [
            {
                path: '/events/new',
                element: <NewEvent/>,
            },
        ],
    },
    {
        path: '/events/:id',
        element: <EventDetails/>,
        children: [
            {
                path: '/events/:id/edit',
                element: <EditEvent/>,
            },
        ],
    },
]);

const queryClient = new QueryClient();

// For Tanstack to work, you need to wrap the component and the components that want to use its features with the
// QueryClientProvider.
function App() {
    return (
        <QueryClientProvider client={ queryClient }>
            <RouterProvider router={ router }/>
        </QueryClientProvider>
    );
}

export default App;
