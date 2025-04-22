import Header from "src/components/Header"
import Footer from "src/components/Footer"
import Texto from "src/components/Texto"
import Center from "src/components/Center"
import Layout from "src/components/Layout";
import LayoutSidebar from "src/components/LayoutSidebar";

import React, { useState, useEffect } from 'react';


export default function Sobre() {
    return (
        <>
            <div className="sobre-inicial">
                <div className="sobre-titulo">
                    Objetivo do Projeto
                </div>

                <div className="sobre-inicial-texto" style={{ textAlign: "justify" }}>
                    <Texto>
                    <p1>O projeto foi feito para analisar dados do Spottify e observarmos tendências.</p1>

                    <h3 style={{textAlign:"left"}}>Global:</h3>
                   
                    <p1>Análises das trends globais.</p1>
                    
                    <h3 style={{textAlign:"left"}}>Brasil:</h3>
                    
                    <p1>Análises das trends do nosso país.</p1>
                    </Texto>
                </div>
            </div>

            <div className="sobre-divisao">
                <div className="sobre-imagem" style={{
                    width: "47%",
                    marginRight: "3%",
                    backgroundImage: "url('/images/sobreLogo.jpg')",
                    backgroundPosition: 'top',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                </div>

                <div className="sobre-texto" style={{ width: "47%", marginRight: "3%", textAlign: "justify", color: "white" }}>
                    <h2>
                        Sobre nós
                    </h2>

                    <Texto>
                        Somos estudantes da FGV, alunos do curso de Ciência de Dados e Integligência Artificial na FGV do Rio de Janeiro
                    </Texto>
                </div>
            </div>
        </>
    )
}

Sobre.getLayout = function getLayout(Sobre) {
    const [isMobile, setIsMobile] = useState(false);

    // Atualiza o estado sempre que a janela é redimensionada
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 560);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? <Layout>{Sobre}</Layout> : <LayoutSidebar>{Sobre}</LayoutSidebar>}
        </>
    )
}