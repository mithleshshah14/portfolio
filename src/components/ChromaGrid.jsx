import React from 'react';

const ChromaGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(data).map(([category, items]) =>
        items.map((item, index) => (
          <div
            key={`${category}-${index}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            style={{ 
              background: 'linear-gradient(45deg, #4B5EAA, #8A4AF3)',
              color: 'white',
              border: '1px solid #ddd'
            }}
          >
            <h3 className="text-sm font-semibold mb-2">{category}</h3>
            <p className="text-base">{item}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChromaGrid;