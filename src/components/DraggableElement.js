import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DraggableElement = ({ element, index, onClick, moveElement, onResize }) => {
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

  const commonWrapper = (child, resizable = true) => {
    if (!resizable) {
      
      return (
        <div
          ref={ref}
          onClick={onClick}
          className="w-full overflow-auto border border-gray-300 p-2 rounded bg-white mb-2"
          style={element.styles}
        >
          {child}
        </div>
      );
    }

    return (
      <ResizableBox
        width={parseInt(element.styles.width) || 200}
        height={parseInt(element.styles.height) || 100}
        onResizeStop={(e, data) => {
          onResize({
            width: `${data.size.width}px`,
            height: `${data.size.height}px`,
          });
        }}
        minConstraints={[100, 50]}
        className="mb-2"
      >
        <div
          ref={ref}
          onClick={onClick}
          className="w-full h-full overflow-auto border border-gray-300 p-2 rounded bg-white"
          style={element.styles}
        >
          {child}
        </div>
      </ResizableBox>
    );
  };

  if (element.type === 'text') {
    return commonWrapper(<p>{element.content}</p>);
  }

  if (element.type === 'button') {
    return commonWrapper(
      <button
        style={{ width: '100%', height: '100%' }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {element.content}
      </button>,
      false // ❌ NOT resizable
    );
  }

  if (element.type === 'image') {
    return (
      <div ref={ref} onClick={onClick} className="mb-2">
        <img
          src={element.imageSrc || 'https://via.placeholder.com/150'}
          alt="Uploaded"
          className="w-full h-auto"
        />
      </div>
    );
  }

  if (element.type === 'card') {
    return commonWrapper(
      <div className="text-center">
        {element.imageSrc && (
          <img
            src={element.imageSrc}
            alt="Card"
            className="w-full h-auto object-cover rounded mb-2"
          />
        )}
        <h3 className="font-bold text-lg">{element.content}</h3>
        <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
          {element.buttonText}
        </button>
      </div>
    );
  }

  if (element.type === 'navbar') {
    return (
      <div ref={ref} onClick={onClick} className="w-full">
        <nav className="flex gap-4 bg-gray-100 p-2 justify-center rounded">
          {element.links?.map((link, i) => (
            <span key={i} className="text-blue-600 hover:underline cursor-pointer">
              {link}
            </span>
          ))}
        </nav>
      </div>
    );
  }

  if (element.type === 'container') {
    return commonWrapper(
      <div className="border border-dashed border-gray-400 p-4 text-center bg-gray-50">
        Container Block
      </div>
    );
  }

  return null;
};

export default DraggableElement;
