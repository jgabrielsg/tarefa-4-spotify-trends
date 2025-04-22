import Center from "src/components/Center"

export default function Footer() {
    return (
        <div className="Footer">
            <Center>
                <footer>
                    <h2>Trabalho de Visualização de Dados</h2>
                    <div className="footer_meio">
                        <div className="powered_footer">
                            <h6>Participantes</h6>
                            <p>João Gabriel Machado</p>
                            <p>Vinicius Pereira Nascimento</p>
                            <p>Gustavo Bianchi da Silva</p>
                        </div>

                        <div className="powered_footer">
                            <h6>Fundação Getúlio Vargas - RJ</h6>
                            <p>Escola de Matemática Aplicada</p>
                            <p>Ciência de Dados e Inteligência Artificial</p>
                            <p>Visualização de Dados</p>
                        </div>
                    </div>

                    <div className="footer_baixo">
                        <div className="powered_footer">
                            Desenvolvido usando dados da <a href="https://charts.spotify.com/home" target="_blank">SpotifyCharts.</a>
                        </div>
                    </div>
                </footer>
            </Center>
        </div>
    )
}