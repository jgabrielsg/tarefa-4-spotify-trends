import Layout from "src/components/Layout";
import LayoutSidebar from "src/components/LayoutSidebar";
import Texto from "src/components/Texto";
import BackgroundImage from "src/components/BackgroundImage"; // <- aqui trocou
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
    return (
        <>  
            <BackgroundImage size="100vh" />
        </>
    );
}

Home.getLayout = function getLayout(Home) {
    const [isMobile, setIsMobile] = useState(false);

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
    );
};
