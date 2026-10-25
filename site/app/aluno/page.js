"use client"; // usa useState, useEffect e eventos

import { useState, useEffect } from "react";
import Link from "next/link";
import { disciplinas, anosEscolares } from "../../lib/opcoes";

export default function Aluno() {
    const [anoFiltro, setAnoFiltro] = useState("");
    const [disciplinaFiltro, setDisciplinaFiltro] = useState("");
    const [roteiros, setRoteiros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    // busca os roteiros
    useEffect(() => {
        fetch("/api/roteiros")
            .then((r) => r.json())
            .then((dados) => {
                setRoteiros(dados);
                setCarregando(false);
            })
            .catch(() => {
                setErro(true);
                setCarregando(false);
            });
    }, []);

    // Os dois filtros precisam estar escolhidos
    const filtrando = anoFiltro !== "" && disciplinaFiltro !== "";

    const roteirosFiltrados = filtrando
        ? roteiros.filter(
                (r) => r.anoEscolar === anoFiltro && r.disciplina === disciplinaFiltro
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

            {/* Mensagens conforme a situação */}
            {carregando && <p>Carregando roteiros...</p>}
            {erro && <p>Não foi possível carregar os roteiros.</p>}
            {!carregando && !erro && !filtrando && (
                <p>Escolha o ano e a disciplina para ver os roteiros.</p>
            )}
            {!carregando && !erro && filtrando && roteirosFiltrados.length === 0 && (
                <p>Nenhum roteiro publicado para essa combinação ainda.</p>
            )}

            <ul className="lista-roteiros">
                {roteirosFiltrados.map((r) => (
                    <li key={r.id}>
                        <Link href={`/aluno/roteiro/${r.id}`} className="cartao-roteiro">
                            <h3>{r.tema}</h3>
                            <p>
                                Publicado em{" "}
                                {new Date(r.criadoEm).toLocaleDateString("pt-BR")}
                            </p>
                        </Link>
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