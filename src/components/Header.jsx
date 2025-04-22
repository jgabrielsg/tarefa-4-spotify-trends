import Center from "src/components/Center"

export default function Header() {
    return (

        <header style={{ left: `0px`, justifyContent: 'space-between' }}>
            
            <div className="logo">
                <img src="/images/SpotifyPNG.png" alt="Logo" />
            </div>
                    
            <div>
                <ul>
                    <li><a href={`${process.env.PUBLIC_URL}/`}>Home</a></li>
                    <li><a href={`${process.env.PUBLIC_URL}/sobre`}>Sobre o Projeto</a></li>
                    <li><a href={`${process.env.PUBLIC_URL}/global`}>Global</a></li>
                    <li><a href={`${process.env.PUBLIC_URL}/brasil`}>Brasil</a></li>
                </ul> 
            </div>
            <div className="textoBaixo">
                <p>Cheque as Trends!</p>
            </div>

        </header>
    );
}
