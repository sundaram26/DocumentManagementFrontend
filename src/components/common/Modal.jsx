import React from 'react';

const Modal = ({ isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="w-full min-h-[calc(100vh-61px)] p-4 absolute shadow-lg">
            <div className="rounded-lg shadow-lg w-full relative">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
