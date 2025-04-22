import Layout from "src/components/Layout";
import LayoutSidebar from "src/components/LayoutSidebar";
import Texto from "src/components/Texto"
import Carrossel from "src/components/Carrossel";
import Link from "next/link";

import React, { useState, useEffect } from 'react';


export default function Home() {
    return (
        <>  
            <Carrossel size="100vh"></Carrossel>
        </>
    )
}

Home.getLayout = function getLayout(Home) {
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
            {isMobile ? <Layout>{Home}</Layout> : <LayoutSidebar>{Home}</LayoutSidebar>}
        </>
    )
}