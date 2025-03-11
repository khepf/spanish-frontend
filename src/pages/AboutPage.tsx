import React, { useState, useEffect } from 'react';
import FlashCard from '../components/FlashCard';
import AudioUpload from '../components/AudioUpload';

const AboutPage: React.FC = () => {
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.MODE === 'development'
      ? import.meta.env.VITE_API_URL_LOCAL
      : import.meta.env.VITE_API_URL_PROD;
    fetch(`${apiUrl}/api/animals`)
      .then(response => response.json())
      .then(data => setAnimals(data))
      .catch(error => console.error('Error fetching animals:', error));
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to About Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animals.map(animal => (
          <FlashCard key={animal.id} cardId={animal.id.toString()} />
        ))}
      </div>
      <AudioUpload />
    </div>
  );
};

export default AboutPage;
