import React from 'react';

const PresidentialPage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Grid container */}
      <div className="grid grid-cols-12 gap-4">
        {/* First card (4 columns) */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Card 1</h2>
            <p className="text-gray-700">This is the content of the first card.</p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Card 2</h2>
            <p className="text-gray-700">This is the content of the second card, which is wider.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresidentialPage;
