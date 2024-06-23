import classes from './EventsList.module.css';

function EventsList({ events }) {
    // You can call useLoaderData here and access the data fetched in the loader call on the route in the parent component
    //const events = useLoaderData();
    return (
        <div className={ classes.events }>
            <h1>All Events</h1>
            <ul className={ classes.list }>
                { events.map((event) => (
                    <li key={ event.id } className={ classes.item }>
                        <a href="...">
                            <img src={ event.image } alt={ event.title }/>
                            <div className={ classes.content }>
                                <h2>{ event.title }</h2>
                                <time>{ event.date }</time>
                            </div>
                        </a>
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default EventsList;
