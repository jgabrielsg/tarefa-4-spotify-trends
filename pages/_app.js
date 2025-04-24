import Head from "next/head"

import '../styles/global.css';
import '../styles/components/backgroundimage.css';
import '../styles/components/footer.css';
import '../styles/components/header.css';
import '../styles/components/texto.css';
import '../styles/components/topheader.css';
import '../styles/pages/index.css';
import '../styles/pages/sobre.css';


export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page)

    // return getLayout(<Component {...pageProps} />)
    return (
        <>
            <Head>
                <title>Spotify Trends</title>

                {/*SEO(search engine otimization)*/}
                <meta name="description" content="Gráficos Interativos sobre Trends no Spotify" />{/*Descrição para o site*/}
                <meta name="keywords" content="Spotify, Trends, Top, Spotify Charts, Charts"/>{/*Palavras chave separadas por vírgulas*/}
                <meta name="author" content="João Gabriel" />{/*Autor do site*/}

                {/*SMO(social media otimization)*/}
                <meta property="og:title" content="" />
                <meta property="og:site_name" content="" />
                <meta property="og:description" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <meta property="og:image:type" content="image/" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <link rel="icon" href="favicon.ico" type="image/x-icon"></link>
            </Head>
            
            {getLayout(<Component {...pageProps} />)}
        </>
    )
}