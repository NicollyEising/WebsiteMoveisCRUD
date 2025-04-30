import { useEffect } from "react";
import "./Banner02.css";

const Banner02 = () => {
    useEffect(() => {
        // Lógica a ser executada após a montagem do componente
    }, []);

    return (
        <div className="container-fluid text-center Banner02">
            <div className="row">
                <div className="col-sm-8">
                    <img src="https://lojamultilaser.vtexassets.com/arquivos/ids/1400162-800-auto?v=638781040119700000&width=800&height=auto&aspect=true" alt="" />
                </div>
                <div className="col-sm-4">col-sm-4</div>
            </div>
        </div>
    );
};

export default Banner02;
