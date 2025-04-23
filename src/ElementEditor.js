import React from 'react';

const ElementEditor = ({ element, onChange }) => {
  if (!element) return <p className="text-gray-500">Click an element to edit</p>;

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Edit {element.type}</h3>
      {(element.type === 'text' || element.type === 'button') && (
        <input
          type="text"
          value={element.content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}
      {element.type === 'image' && (
        <p className="text-sm text-gray-600">Image cannot be edited in this prototype.</p>
      )}
    </div>
  );
};

export default ElementEditor;
