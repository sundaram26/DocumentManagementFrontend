import React from 'react'

const ProgressBar = ({ total, current }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full h-[5px] mt-4 bg-gray-300 rounded">
            <div 
                className="h-full bg-purple-500 rounded"
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}

export default ProgressBar