import Center from "src/components/Center"

export default function Header() {
    return (

        <header style={{ left: `0px`, justifyContent: 'space-between' }}>
            
            <div className="logo">
                <img src="/images/SpotifyPNG.png" alt="Logo" />
            </div>
                    
            <div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/sobre">Sobre o Projeto</a></li>
                    <li><a href="/global">Global</a></li>
                    <li><a href="/brasil">Brasil</a></li>
                </ul> 
    
            </div>
            <div className="textoBaixo">
                <p>Cheque as Trends!</p>
            </div>

        </header>
    );
}
