import React from 'react';
import Layout from "src/components/Layout";


export default function Global() {
    return (
        <div className="Global"> 
            <p>Global</p>
        </div>
    );
}

Global.getLayout = function getLayout(Global) {
    return (
        <>
            <Layout>{Global}</Layout>
        </>
    )
}