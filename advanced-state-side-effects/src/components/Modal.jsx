import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({open, children, onClose}) {
    const dialog = useRef();

    // You can use useEffect like this to switch from imperative approach to declarative as seen below
    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    // The timer for the delete thing is set when then app is rendered for the first time. To get around this, conditionally
    // render the component children so that only when the modal is open is the thing created with a timer.
    return createPortal(
        <dialog className="modal" ref={ dialog } onClose={onClose}>
            { open ? children : null }
        </dialog>,
        document.getElementById('modal')
    );
}
