import { useEffect } from "react";
import "./Banner02.css";

const Banner02 = () => {
    useEffect(() => {
        // Lógica a ser executada após a montagem do componente
    }, []);

    return (
<div className="container-fluid text-center Banner02">
    <div className="row justify-content-center">
        <div className="col-sm-8 position-relative coluna01">
            <a href="http://">
            <div className="texto-acima">
                <h1>Conforto e Qualidade para o Seu Dia a Dia</h1>
            </div>
            <img className="img-dark" src="https://lojamultilaser.vtexassets.com/arquivos/ids/1400162-800-auto?v=638781040119700000&width=800&height=auto&aspect=true" alt="Cadeira Ergonômica" />
            </a>
        </div>
        <div className="col-sm-4 imgDireita ">
            
        <div className="position-relative02">
                <div className="texto-acima02">
                    <h3>Garanta sua Cadeira Ergonômica Agora</h3>
                </div>
                <img src="https://m.media-amazon.com/images/I/71OgQUaaHaL._AC_UF894,1000_QL80_.jpg" alt="Cadeira" />
            </div>

            <div className="position-relative02">
                <div className="texto-acima02">
                    <h3>Tenha mais Produtividade e Bem-estar</h3>
                </div>
                <img src="https://down-br.img.susercontent.com/file/br-11134207-7r98o-lwwxntm9vw5231" alt="Cadeira" />
            </div>        
            </div>
    </div>
</div>

    );
};

export default Banner02;
