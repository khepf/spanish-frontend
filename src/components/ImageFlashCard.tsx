import { useState, useEffect } from 'react';

const ImageFlashCard = ({ cardId }: { cardId: number }) => {
    const [animal, setAnimal] = useState<any>(null);

    useEffect(() => {
        const apiUrl = import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_API_URL_LOCAL
            : import.meta.env.VITE_API_URL_PROD;
        console.log(`Fetching animal with id: ${cardId}`);
        fetch(`${apiUrl}/api/animals/${cardId}`)
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
        <div className="w-20 h-20 m-2 bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-20 h-20 object-cover" src={animal.imageLocation} alt={animal.name} />
        </div>
    );
};

export default ImageFlashCard;
