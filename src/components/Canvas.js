import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ElementEditor from './ElementEditor';
import DraggableElement from './DraggableElement';

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'element',
    drop: (item) => addElementToCanvas(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveElement = (dragIndex, hoverIndex) => {
    const updated = [...elements];
    const [movedItem] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, movedItem);
    setElements(updated);
  };

  const addElementToCanvas = (type) => {
    let newElement = {
      id: Date.now(),
      type,
      styles: {
        fontSize: '16px',
        color: '#000000',
        width: '200px',
        height: 'auto',
      },
    };

    if (type === 'text') newElement.content = 'Edit me';
    else if (type === 'button') newElement.content = 'Click Me';
    else if (type === 'image') newElement.imageSrc = '';
    else if (type === 'card') {
      newElement.content = 'Card Title';
      newElement.imageSrc = '';
      newElement.buttonText = 'Read More';
    } else if (type === 'navbar') {
      newElement.links = ['Home', 'About', 'Services', 'Contact'];
    }

    setElements((prev) => [...prev, newElement]);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleElementChange = (updated) => {
    setElements((prev) => prev.map((el) => (el.id === updated.id ? updated : el)));
    setSelectedElement(updated);
  };

  const handleDeleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElement?.id === id) setSelectedElement(null);
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div
        ref={dropRef}
        className={`col-span-3 bg-white rounded-lg p-4 overflow-auto border-2 border-dashed ${
          isOver ? 'border-blue-400' : 'border-gray-300'
        }`}
      >
        {elements.map((el, index) => (
          <DraggableElement
            key={el.id}
            element={el}
            index={index}
            onClick={() => handleElementClick(el)}
            moveElement={moveElement}
          />
        ))}
      </div>

      <div className="col-span-1 border-l border-gray-300 p-4 bg-gray-50">
        {selectedElement ? (
          <ElementEditor
            element={selectedElement}
            onChange={handleElementChange}
            onDelete={handleDeleteElement}
          />
        ) : (
          <p className="text-gray-400 italic">Click on an element to edit</p>
        )}
      </div>
    </div>
  );
};

export default Canvas;