import React from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Drag & Drop Website Builder</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-md md:col-span-1">
            <Sidebar />
          </div>
          <div className="bg-gray-50 p-4 rounded shadow-md md:col-span-3 h-[70vh]">
            <Canvas />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
