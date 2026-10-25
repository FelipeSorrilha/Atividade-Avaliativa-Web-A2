"use client"; // necessário pro useState

import { useState } from "react";
import Link from "next/link";
import { parseQuestoes } from "../../../lib/questoes";
import { disciplinas, anosEscolares } from "../../../lib/opcoes";

export default function Publicar() {
    const [disciplina, setDisciplina] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [tema, setTema] = useState("");
    const [textoRoteiro, setTextoRoteiro] = useState("");
    const [textoQuestoes, setTextoQuestoes] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);

    // Roda o leitor a cada letra digitada
    const resultado = parseQuestoes(textoQuestoes);

    async function publicar(event) {
        event.preventDefault();
        setMensagem("");

        // Se tiver algum erro na formatação n dxa publicar
        if (resultado.erros.length > 0 || resultado.questoes.length === 0) {
            setMensagem("Corrija as questões antes de publicar.");
            return;
        }

        setEnviando(true);
        try {
            const resposta = await fetch("/api/roteiros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ disciplina, anoEscolar, tema, textoRoteiro, textoQuestoes }),
            });

            if (resposta.ok) {
                setMensagem("Roteiro publicado!");
                setTema("");
                setTextoRoteiro("");
                setTextoQuestoes("");
            } else {
                const dados = await resposta.json();
                setMensagem(dados.erro || "Não foi possível publicar.");
            }
        } catch {
            setMensagem("Erro de conexão.");
        }
        setEnviando(false);
    }

    return (
        <main className="container-formulario">
            <h1 className="titulo">Publicar roteiro</h1>
            <p>Cole abaixo o roteiro e as questões gerados pela IA.</p>

            <form onSubmit={publicar}>
                <div className="campo">
                    <label htmlFor="disciplina">Disciplina</label>
                    <select id="disciplina" value={disciplina}
                        onChange={(e) => setDisciplina(e.target.value)} required>
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="anoEscolar">Ano escolar</label>
                    <select id="anoEscolar" value={anoEscolar}
                        onChange={(e) => setAnoEscolar(e.target.value)} required>
                        <option value="">Selecione o ano escolar</option>
                        {anosEscolares.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label htmlFor="tema">Tema do roteiro</label>
                    <input type="text" id="tema" value={tema}
                        onChange={(e) => setTema(e.target.value)} required />
                </div>

                <div className="campo">
                    <label htmlFor="textoRoteiro">Texto do roteiro</label>
                    <textarea id="textoRoteiro" rows={10} value={textoRoteiro}
                        onChange={(e) => setTextoRoteiro(e.target.value)}
                        placeholder="Cole aqui a explicação do conteúdo." required />
                </div>

                <div className="campo">
                    <label htmlFor="textoQuestoes">Questões de múltipla escolha</label>
                    <textarea id="textoQuestoes" rows={12} className="caixa-codigo"
                        value={textoQuestoes}
                        onChange={(e) => setTextoQuestoes(e.target.value)}
                        placeholder="Cole aqui só as questões, no formato # / ## / ### / ####." />

                    {textoQuestoes.trim() !== "" && (
                        resultado.erros.length === 0 ? (
                            <p className="status-questoes status-ok">
                                Questões reconhecidas: {resultado.questoes.length}
                            </p>
                        ) : (
                            <ul className="status-questoes status-erro">
                                {resultado.erros.map((e, i) => <li key={i}>{e}</li>)}
                            </ul>
                        )
                    )}
                </div>

                {mensagem && <p role="status">{mensagem}</p>}

                <button type="submit" className="botao" disabled={enviando}>
                    {enviando ? "Publicando..." : "Publicar roteiro"}
                </button>
            </form>

            <div className="botao-voltar">
                <Link href="/professor" className="botao botao-secundario">
                    Voltar
                </Link>
            </div>
        </main>
    );
}