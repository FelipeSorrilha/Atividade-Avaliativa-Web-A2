"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // lê o [id] do endereço
import Link from "next/link";

function Questao({ numero, questao }) {
    const [escolhida, setEscolhida] = useState(null); // alternativa marcada
    const [resultado, setResultado] = useState(null); // null e "certa" e "errada"

    function escolher(indice) {
        setEscolhida(indice);
        setResultado(null); // ao mudar a marcação, apaga o resultado anterior
    }

    function checar() {
        // questao.correta é o índice da alternativa certa
        setResultado(escolhida === questao.correta ? "certa" : "errada");
    }

    return (
        <section className="questao">
            <h3>Questão {numero}</h3>
            <p>{questao.enunciado}</p>

            {questao.alternativas.map((texto, i) => {
                // Só pinta a alternativa marcada, e só depois de checar
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
                        <strong>{String.fromCharCode(97 + i)})</strong> {texto}
                    </label>
                );
            })}

            <button
                type="button"
                className="botao"
                onClick={checar}
                disabled={escolhida === null} // só habilita depois de marcar algo
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

// Mostra um texto e transforma endereços http/https em links clicáveis.
function TextoComLinks({ texto }) {
    const partes = texto.split(/(https?:\/\/[^\s]*[^\s.,;:!?)])/g);

    return (
        <p className="texto-externo-conteudo">
            {partes.map((parte, i) =>
                i % 2 === 1 ? (
                    // protege a sua página quando o link abre em outra aba
                    <a key={i} href={parte} target="_blank" rel="noopener noreferrer">
                        {parte}
                    </a>
                ) : (
                    parte
                )
            )}
        </p>
    );
}

export default function RoteiroAluno() {
    const { id } = useParams();
    const [roteiro, setRoteiro] = useState(null);
    // "carregando" ou "ok" ou "erro"
    const [estado, setEstado] = useState("carregando");

    // Busca o roteiro quando a tela abre
    useEffect(() => {
        fetch(`/api/roteiros/${id}`)
            .then((r) => {
                if (!r.ok) throw new Error("não encontrado");
                return r.json();
            })
            .then((dados) => {
                setRoteiro(dados);
                setEstado("ok");
            })
            .catch(() => setEstado("erro"));
    }, [id]);

    if (estado === "carregando") return <main className="container"><p>Carregando...</p></main>;

    if (estado === "erro") {
        return (
            <main className="container">
                <p>Roteiro não encontrado.</p>
                <Link href="/aluno" className="botao botao-secundario">Voltar</Link>
            </main>
        );
    }

    const urlPdf = `/api/roteiros/${id}/pdf`;

    return (
        <main className="container">
            <h1 className="titulo">{roteiro.tema}</h1>
            <p>
                {roteiro.disciplina} · {roteiro.anoEscolar} · Publicado em{" "}
                {new Date(roteiro.criadoEm).toLocaleDateString("pt-BR")}
            </p>

            <iframe
                src={`${urlPdf}#navpanes=0&view=FitH`}
                className="visualizador-pdf"
                title="Roteiro em PDF"
            />

            {/* Dois botões lado a lado: abrir em tela cheia e baixar */}
            <div className="acoes-pdf">
                <a href={urlPdf} target="_blank" rel="noopener noreferrer" className="botao botao-secundario">
                    Abrir em tela cheia
                </a>
                <a href={`${urlPdf}?download=1`} className="botao">Baixar PDF</a>
            </div>

            {roteiro.textoExterno && (
                <section className="texto-externo">
                    <p className="aviso-externo">
                        TEXTO NÃO PRODUZIDO POR IA, RETIRADO DA INTERNET E INFORMADO PELO PROFESSOR
                    </p>
                    <TextoComLinks texto={roteiro.textoExterno} />
                </section>
            )}

            <h2>Questões</h2>
            {roteiro.questoes.map((q, i) => (
                <Questao key={i} numero={i + 1} questao={q} />
            ))}

            <div className="botao-voltar">
                <Link href="/aluno" className="botao botao-secundario">
                    Voltar para os roteiros
                </Link>
            </div>

            <main className="container container-largo"></main>
        </main>
    );
}