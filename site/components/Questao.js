"use client"; // este componente usa useState e eventos de clique

import { useState } from "react";

// Props: "numero" (posição da questão) e "questao" (enunciado, alternativas, correta).
export default function Questao({ numero, questao }) {
    const [escolhida, setEscolhida] = useState(null); // índice da alternativa marcada
    const [resultado, setResultado] = useState(null); // null | "certa" | "errada"

    function escolher(indice) {
        setEscolhida(indice);
        setResultado(null); // ao mudar a marcação, apaga o resultado anterior
    }

    function checar() {
        // questao.correta é o índice da alternativa certa (0 = a, 1 = b...)
        setResultado(escolhida === questao.correta ? "certa" : "errada");
    }

    return (
        <section className="questao">
            <h3>Questão {numero}</h3>
            <p>{questao.enunciado}</p>

            {questao.alternativas.map((texto, i) => {
                let classe = "alternativa";
                if (resultado && escolhida === i) {
                    classe += resultado === "certa" ? " alternativa-certa" : " alternativa-errada";
                }
                return (
                    <label key={i} className={classe}>
                        <input
                            type="radio"
                            name={`questao-${numero}`}
                            checked={escolhida === i}
                            onChange={() => escolher(i)}
                        />
                        {/* String.fromCharCode(97 + i) transforma 0,1,2 em a,b,c */}
                        <strong>{String.fromCharCode(97 + i)})</strong> {texto}
                    </label>
                );
            })}

            <button
                type="button"
                className="botao"
                onClick={checar}
                disabled={escolhida === null}
            >
                Checar resposta
            </button>

            {resultado === "certa" && (
                <p className="resultado resultado-certo">Resposta correta!</p>
            )}
            {resultado === "errada" && (
                <p className="resultado resultado-errado">Resposta incorreta. Tente de novo.</p>
            )}
        </section>
    );
}