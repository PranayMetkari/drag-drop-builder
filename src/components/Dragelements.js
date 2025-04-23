import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ type, label }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'element',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="p-2 border border-gray-400 rounded mb-2 bg-white cursor-move shadow-md hover:bg-gray-100"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  );
};

export default DraggableElement;
