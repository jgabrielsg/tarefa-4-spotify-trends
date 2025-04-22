import { useState } from "react";
import Center from "./Center";

export default function Header_Top(){
    const [HeaderDropActive, setHeaderDropActive] = useState(false);

    const toggleHeaderDrop = () => {
      setHeaderDropActive(!HeaderDropActive);
    };

    return (

      
        <div 
            className="TopHeader"
        >
            <div className="TopLogo">

                <a href="/">
                    <img id="logo_img"
                        src="/images/SpotifyPNG.png"
                        alt="Logo" 
                        /> 
                </a>
                <h1 id="nome_logo"> Spotify Trends </h1>

            </div>
            
            <ul id="options_header_pc" style={{ marginRight: "5%" }}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/sobre">Sobre o Projeto</a></li>
                    <li><a href="/global">Global</a></li>
                    <li><a href="/brasil">Brasil</a></li>
            </ul> 

            <img className="btn_drop_header" onClick={toggleHeaderDrop} src="/images/bars-solid.svg"></img>

            <div className={`options_header${HeaderDropActive ? 'active' : ''}`}>
                <ul id="options_header_mobile">
                    <li><a href="/">Home</a></li>
                    <li><a href="/sobre">Sobre o Projeto</a></li>
                    <li><a href="/global">Global</a></li>
                    <li><a href="/brasil">Brasil</a></li>
                </ul> 
            <img className="btn_drop_header" id="btn_header_active" onClick={toggleHeaderDrop} src="/images/x-solid.svg"></img>
            </div>
        </div>

    )
}