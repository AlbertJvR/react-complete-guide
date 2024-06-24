import { PageContent } from '../components/PageContent';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export const Error = () => {
    // If you throw a Response with the router loader as we are doing in Events.jsx, you can access that error data through
    // the 'useRouteError' hook
    const error = useRouteError();

    let title = 'An error occurred';
    let message = 'Something went wrong';

    if (error.status === 500) {
        // When using the json method as shown in the Events.jsx file, you can simplify the below to approach further down
        // message = JSON.parse(error.data).message;
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Page Not Found';
        message = 'Could not find the resource or page!';
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={ title }>
                <p>{ message }</p>
            </PageContent>
        </>
    );
}