import { useState, useEffect } from 'react';

const FlashCard = ({ cardId }: { cardId: string }) => {
    const [animal, setAnimal] = useState<any>(null);

    useEffect(() => {
        console.log(`Fetching animal with id: ${cardId}`);
        fetch(`http://localhost:5296/api/animals/${cardId}`)
            .then(response => {
                console.log('Response status:', response.status);
                return response.text().then(text => {
                    console.log('Response text:', text);
                    try {
                        const data = JSON.parse(text);
                        if (!response.ok) {
                            console.error('Error response:', data);
                            throw new Error(data.message || 'Network response was not ok');
                        }
                        console.log('Data received:', data);
                        setAnimal(data);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                        throw error;
                    }
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [cardId]);

    if (!animal) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    console.log('Rendering animal:', animal);

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{animal.name}</h2>
                <p className="text-gray-600">{animal.translation}</p>
            </div>
            <img className="w-full h-48 object-cover" src={animal.imageLocation} alt={animal.name} />
            <div className="p-4">
                <audio controls className="w-full">
                    <source src={animal.audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default FlashCard;
