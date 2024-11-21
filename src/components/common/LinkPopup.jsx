import React from 'react';

const LinkPopup = ({ links, onClose }) => {
    
    const getLinkText = (label) => {
        switch (label) {
            case 'Project Finance ExcelSheet':
                return 'Download Excel Sheet';
            default:
                return `View ${label}`;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Select a Document to Open</h2>
                <ul>
                    {Object.entries(links).map(([label, url], index) => (
                        <li key={index} className="mb-2">
                            <p>
                                {`${label}: `} 
                                <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 underline"
                                >
                                    {getLinkText(label)}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={onClose} 
                    className="mt-4 bg-white hover:bg-red-500 text-red-500 hover:text-white border-2 border-red-500 py-1 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default LinkPopup;
