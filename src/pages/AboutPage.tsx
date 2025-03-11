import React from 'react';
import FlashCard from '../components/FlashCard';
import AudioUpload from '../components/AudioUpload';

const AboutPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Welcome to About Page</h1>
      <FlashCard cardId="1" />
      <AudioUpload />
    </div>
  );
};

export default AboutPage;
