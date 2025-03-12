import { useState, useEffect, useRef } from 'react';

const AudioFlashCard = ({ cardId }: { cardId: number }) => {
    const [animal, setAnimal] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

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

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="w-20 h-20 m-2 bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center" onClick={handlePlay}>
            <div className="flex items-center justify-center w-full h-full">
                <button className="w-full h-full bg-green-500 text-white py-2 px-4 rounded text-center text-lg font-bold">Play</button>
                <audio ref={audioRef} className="hidden">
                    <source src={animal.audioUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );
};

export default AudioFlashCard;
