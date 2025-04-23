import React from 'react';

const ElementEditor = ({ element, onChange, onDelete }) => {
  const updateField = (field, value) => {
    onChange({ ...element, [field]: value });
  };

  const updateStyle = (styleField, value) => {
    onChange({
      ...element,
      styles: {
        ...element.styles,
        [styleField]: value,
      },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...element, imageSrc: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Edit {element.type}</h3>

      {(element.type === 'text' || element.type === 'button') && (
        <>
          <input
            type="text"
            value={element.content}
            onChange={(e) => updateField('content', e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Edit content"
          />
        </>
      )}

      {element.type === 'card' && (
        <>
          <input
            type="text"
            value={element.content}
            onChange={(e) => updateField('content', e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Card Title"
          />
          <input
            type="text"
            value={element.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Button Text"
          />
        </>
      )}

      {element.type === 'navbar' && (
        <div>
          {element.links.map((link, i) => (
            <input
              key={i}
              value={link}
              onChange={(e) => {
                const updatedLinks = [...element.links];
                updatedLinks[i] = e.target.value;
                updateField('links', updatedLinks);
              }}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Link ${i + 1}`}
            />
          ))}
        </div>
      )}

      {(element.type === 'image' || element.type === 'card') && (
        <div className="mt-2">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
      )}

      <div className="mt-2">
        <label>Width</label>
        <input
          type="text"
          value={element.styles.width}
          onChange={(e) => updateStyle('width', e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <label>Height</label>
        <input
          type="text"
          value={element.styles.height}
          onChange={(e) => updateStyle('height', e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
      </div>

      <label className="block text-sm text-gray-700 mt-2">Font Size</label>
      <input
        type="number"
        value={parseInt(element.styles.fontSize)}
        onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
        className="w-full p-2 border rounded mb-2"
      />

      <label className="block text-sm text-gray-700 mt-2">Text Color</label>
      <input
        type="color"
        value={element.styles.color}
        onChange={(e) => updateStyle('color', e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={() => onDelete(element.id)}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Delete Element
      </button>
    </div>
  );
};

export default ElementEditor;
