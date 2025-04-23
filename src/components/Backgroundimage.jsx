export default function BackgroundImage({ size }) {
    const image = '/images/Home/spotifylogo.jpg';

    return (
        <div
            className="BackgroundImage"
            style={{
                position: 'relative',
                height: size,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="overlay2"></div>
        </div>
    );
}
