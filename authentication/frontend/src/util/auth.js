import { redirect } from 'react-router-dom';

export function getAuthToken() {
    const token = localStorage.getItem("token");
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    // NB* In loaders you need to ensure that something is returned by all paths in a function to avoid errors
    return null;
}