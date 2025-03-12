import React from 'react';
import AudioFlashCard from '../components/AudioFlashCard';
import ImageFlashCard from '../components/ImageFlashCard';

const MainPage: React.FC = () => {
  const animalIds = [1, 2, 3, 4, 5]; // Example animal IDs

  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to Main Page</h1>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Audio Flash Cards</h2>
          {animalIds.map(id => (
            <AudioFlashCard key={id} cardId={id} />
          ))}
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Image Flash Cards</h2>
          {animalIds.map(id => (
            <div className="max-w-sm mx-auto">
              <ImageFlashCard key={id} cardId={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
