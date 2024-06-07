import { useRef, useState } from "react";

// How to do WITHOUT refs
/*export default function Player() {
    const [enteredPlayerName, setEnteredPlayerName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        setSubmitted(false);
        setEnteredPlayerName(event.target.value);
    }

    function handleClick() {
        setSubmitted(true);
    }

    return (
        <section id="player">
            <h2>Welcome { submitted ? enteredPlayerName : 'unknown entity' }</h2>
            <p>
                <input type="text" onChange={ handleChange } value={ enteredPlayerName }/>
                <button onClick={ handleClick }>Set Name</button>
            </p>
        </section>
    );
}*/

export default function Player() {
    // NB* When refs change, no rerender is triggered, but state does
    const playerName = useRef();

    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleClick() {
        setEnteredPlayerName(playerName.current.value);
        playerName.current.value = '';
    }

    return (
        <section id="player">
            <h2>Welcome { enteredPlayerName ?? 'unknown entity' }</h2>
            <p>
                <input ref={ playerName } type="text"/>
                <button onClick={ handleClick }>Set Name</button>
            </p>
        </section>
    );
}
