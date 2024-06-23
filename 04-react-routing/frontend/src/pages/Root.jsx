import MainNavigation from '../components/MainNavigation';
import { Outlet, useNavigation } from 'react-router-dom';

export const Root = () => {
    /*
    * Navigation object returned by 'useNavigation' has 3 states that we can tap into:
    * idle: no active route transition
    * loading: active route transition, and we are loading data
    * submitting: we are submitting data
    */
    // const navigation = useNavigation();
    return (
        <>
            <MainNavigation/>
            <main>
                {/*{ navigation.state === 'loading' && <p>Loading...</p> }*/}
                <Outlet/>
            </main>
        </>
    )
}