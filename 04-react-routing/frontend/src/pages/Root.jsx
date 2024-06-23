import MainNavigation from '../components/MainNavigation';
import { Outlet } from 'react-router-dom';

export const Root = () => {
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}