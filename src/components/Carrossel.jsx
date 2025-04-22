import React, { useState, useEffect } from 'react';

export default function BackgroundImage({ size }) {
    const images = [
        'images/Home/spotifylogo.jpg',
        'images/Home/coldplaylogo.jpg',
    ];
    const [index, setIndex] = useState(0);
    const lastIndex = images.length - 1;

    useEffect(() => {
        // Change image every 5 seconds
        const intervalId = setInterval(() => {
            // Update the index, cycling back to 0 if at the end of the array
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="BackgroundImage" style={{ 
            position: 'relative',
            height: size,
        }}>
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`${index === idx ? 'slide-active' : 'slide'}`}
                    style={{ 
                        backgroundImage: `url(${img})`,
                        zIndex: index === idx ? '1' : index === 0 && idx === lastIndex ? '3' : '2'
                    }}
                ></div>
            ))}
            <div className="overlay2"></div>
        </div>
    );
}