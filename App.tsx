import React from 'react';
import InventoryScreen from './components/InventoryScreen';

const App: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-white h-full min-h-screen shadow-xl relative">
        <InventoryScreen />
      </div>
    </div>
  );
};

export default App;