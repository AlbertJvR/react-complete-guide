import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export const Modal = ({ children, open, className= '' }) => {
    const dialog = useRef();

    useEffect(() => {
        // Cleanup function runs at later stage than the rest of useEffect call, so store a pointer to dialog ref in temp
        // const to be able to call the same instance to close, wont be a problem here, but it is a recommended pattern as
        // in other cases it might change
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return createPortal(
        (
            <dialog
                ref={dialog}
                className={`modal ${className}`}
            >
                { children }
            </dialog>
        ),
        document.getElementById('modal')
    );
}