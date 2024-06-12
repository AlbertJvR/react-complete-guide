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

    return createPortal(
        <dialog className="modal" ref={ dialog } onClose={onClose}>
            { children }
        </dialog>,
        document.getElementById('modal')
    );
}
