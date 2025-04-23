import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableElement = ({ element, index, onClick, moveElement }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'canvas-element',
    hover(item) {
      if (item.index === index) return;
      moveElement(item.index, index);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type: 'canvas-element',
    item: { index },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="p-2 mb-2 border border-gray-300 rounded cursor-move"
      onClick={onClick}
      style={element.styles}
    >
      {element.type === 'text' && (
        <p style={element.styles}>{element.content}</p>
      )}

      {element.type === 'button' && (
        <button
          style={element.styles}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {element.content}
        </button>
      )}

      {element.type === 'image' && (
        <img
          src={element.imageSrc || 'https://via.placeholder.com/150'}
          alt="Uploaded"
          className="w-full h-auto"
        />
      )}

      {element.type === 'container' && (
        <div
          className="border border-dashed border-gray-400 p-4 text-center"
          style={{ backgroundColor: '#f9f9f9' }}
        >
          Container Block
        </div>
      )}

      {element.type === 'card' && (
        <div className="p-4 border rounded shadow-md bg-white space-y-2 text-center">
          {element.imageSrc && (
            <img
              src={element.imageSrc}
              alt="Card"
              className="w-full h-auto object-cover rounded"
            />
          )}
          <h3 className="font-bold text-lg">{element.content}</h3>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            {element.buttonText}
          </button>
        </div>
      )}

      {element.type === 'navbar' && (
        <nav className="flex gap-4 bg-gray-100 p-2 justify-center">
          {element.links?.map((link, i) => (
            <span key={i} className="text-blue-600 hover:underline cursor-pointer">
              {link}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
};

export default DraggableElement;
