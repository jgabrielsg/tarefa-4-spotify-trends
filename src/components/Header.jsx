import Center from "src/components/Center"

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
                <img src="/images/SpotifyPNG.png" alt="Logo" style={{ width: '100px', height: '100px' }} />
            </div>
        </header>
    );
}