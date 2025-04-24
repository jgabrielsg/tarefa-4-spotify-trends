import Image from 'next/image'; 

export default function Header() {
    return (
        <header style={{
            left: `0px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#000F1A'
        }}>
            <div className="logo">
                <Image 
                    src="images/SpotifyPNG.png" 
                    alt="Logo" 
                    width={100} 
                    height={100} 
                />
            </div>
        </header>
    );
}