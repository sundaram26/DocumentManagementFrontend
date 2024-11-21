import { convert } from 'html-to-text';
import React, { useState, useEffect } from 'react';

function AdminRotaractMouView({ reports, handleDelete }) {
  const colorPalette = ['red', 'blue', 'green', 'orange', 'purple'];
  const [colorMap, setColorMap] = useState({}); // Persistent color mapping for reports

  useEffect(() => {
    const newColorMap = {};
    const usedColors = new Set();

    reports.forEach((report) => {
      if (!colorMap[report._id]) {
        // Assign a color that hasn't been used on the current page
        const availableColors = colorPalette.filter((color) => !usedColors.has(color));

        // If no colors are available, recycle the color palette
        const assignedColor =
          availableColors.length > 0
            ? availableColors[Math.floor(Math.random() * availableColors.length)]
            : colorPalette[Math.floor(Math.random() * colorPalette.length)];

        newColorMap[report._id] = assignedColor;
        usedColors.add(assignedColor); // Mark color as used
      } else {
        newColorMap[report._id] = colorMap[report._id]; // Preserve existing mapping
        usedColors.add(colorMap[report._id]); // Mark color as used
      }
    });

    setColorMap((prevMap) => ({ ...prevMap, ...newColorMap }));
  }, [reports]); // Dependency array only includes `reports`

  const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch((err) => console.error('Download error: ', err));
  };

  return (
    <div className="container mx-auto p-4">
      {reports.map((item) => {
        const color = colorMap[item._id]; // Fetch the pre-assigned color for this report
        const bgClass = `bg-${color}-200`;

        return (
          <div key={item._id} className={`p-4 mb-6 border rounded-lg ${bgClass}`}>
            <div>
              <p className="mt-2 mb-2 text-xl">
                <span className="text-2xl font-bold">Name of the Sponsor:</span>{' '}
                {item.sponsorName}
              </p>
              <p className="mt-2 mb-2 text-xl">
                <span className="text-2xl font-bold">Sponsor Amount:</span>{' '}
                {item.sponsorAmount}
              </p>
              <p className="mt-2 mb-2">
                <span className="text-2xl font-bold">
                  Deliverables Offered by Sponsor:
                </span>
              </p>
              <div className="p-4 bg-white rounded-md">
                <p>{convert(item.deliverablesOfferedBySponsor)}</p>
              </div>
              <p className="mt-2 mb-2">
                <span className="text-2xl font-bold">
                  Deliverables Offered by Club:
                </span>
              </p>
              <div className="p-4 bg-white rounded-md">
                <p>{convert(item.deliverablesOfferedByClub)}</p>
              </div>
              <p className="mt-2 mb-2 text-xl">
                <span className="text-2xl font-bold">
                  Date of Signing in Sponsor:
                </span>{' '}
                {new Date(item.dateOfSigning).toLocaleString()}
              </p>

              <button
                onClick={() => handleDownload(item.mouPdfUpload, `MoU_${item.mouId}.pdf`)}
                className="bg-white p-2 mt-10 m-2 text-lg font-semibold rounded-md"
              >
                Download MoU
              </button>

              <button
                onClick={() => handleDelete(item.mouId)} // Use handleDelete prop
                className="bg-red-500 text-white p-2 m-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminRotaractMouView;
