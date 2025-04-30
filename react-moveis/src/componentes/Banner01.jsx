import { useEffect } from "react";
import "./Banner01.css";

const Banner01 = () => {
    useEffect(() => {
        // Lógica a ser executada após a montagem do componente
    }, []);

    return (
        <div className="banner01">
            <p>
                Conheça agora o lançamento que todos esperavam —{" "}
                <a href="http://" target="_blank" rel="noopener noreferrer">
                    clique aqui e aproveite
                </a>
            </p>
        </div>
    );
};

export default Banner01;
