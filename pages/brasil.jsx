import React from 'react';
import Layout from "src/components/Layout";


export default function Brasil() {
    return (
        <div className="Brasil"> 
            <p>Brasil</p>
        </div>
    );
}

Brasil.getLayout = function getLayout(Brasil) {
    return (
        <>
            <Layout>{Brasil}</Layout>
        </>
    )
}