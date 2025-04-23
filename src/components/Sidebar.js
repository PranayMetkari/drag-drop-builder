import React from 'react';
import DraggableElement from './Dragelements';

const Sidebar = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <DraggableElement type="text" label="Text" />
      <DraggableElement type="image" label="Image" />
      <DraggableElement type="button" label="Button" />
      <DraggableElement type="container" label="Container" />
      <DraggableElement type="card" label="Card" />
      <DraggableElement type="navbar" label="Navbar" />
    </div>
  );
};

export default Sidebar;
