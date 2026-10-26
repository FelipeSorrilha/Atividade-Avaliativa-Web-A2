"use client"; // usa useState (filtros)

import { useState } from "react";
import Link from "next/link";
import { disciplinas, anosEscolares } from "../../lib/opcoes";
import CartaoRoteiro from "../../components/CartaoRoteiro";

// Importar um arquivo .json entrega o conteúdo já como lista de objetos JavaScript.
// O arquivo vira parte do site na hora do build: sem fetch e sem servidor.
import roteiros from "../../dados/roteiros.json";

export default function Aluno() {
    const [anoFiltro, setAnoFiltro] = useState("");
    const [disciplinaFiltro, setDisciplinaFiltro] = useState("");

    // Os dois filtros precisam estar escolhidos para a lista aparecer
    const filtrando = anoFiltro !== "" && disciplinaFiltro !== "";

    // Atenção aos nomes dos campos do JSON: "ano" e "disciplina"
    const roteirosFiltrados = filtrando
        ? roteiros.filter(
              (r) => r.ano === anoFiltro && r.disciplina === disciplinaFiltro
          )
        : [];

    return (
        <main className="container">
            <h1 className="titulo">O que vamos aprender hoje?</h1>
            <p>Escolha o seu ano e a matéria para encontrar o roteiro ideal:</p>

            <div className="filtros">
                <div className="campo">
                    <label htmlFor="filtroAno">Ano escolar</label>
                    <select
                        id="filtroAno"
                        value={anoFiltro}
                        onChange={(e) => setAnoFiltro(e.target.value)}
                    >
                        <option value="">Selecione o ano</option>
                        {anosEscolares.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="filtroDisciplina">Disciplina</label>
                    <select
                        id="filtroDisciplina"
                        value={disciplinaFiltro}
                        onChange={(e) => setDisciplinaFiltro(e.target.value)}
                    >
                        <option value="">Selecione a disciplina</option>
                        {disciplinas.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            {!filtrando && <p>Escolha o ano e a disciplina para ver os roteiros.</p>}
            {filtrando && roteirosFiltrados.length === 0 && (
                <p>Nenhum roteiro disponível para essa combinação.</p>
            )}

            <ul className="lista-roteiros">
                {roteirosFiltrados.map((r) => (
                    <li key={r.id}>
                        {/* Passamos o roteiro inteiro para o componente via prop "roteiro" */}
                        <CartaoRoteiro roteiro={r} />
                    </li>
                ))}
            </ul>

            <div className="botao-voltar">
                <Link href="/" className="botao botao-secundario">
                    Voltar para o início
                </Link>
            </div>
        </main>
    );
}