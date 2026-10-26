"use client"; // usa useState e useEffect

import { useState, useEffect } from "react";

// Prop: "termo" é o título do artigo da Wikipédia (campo termoWikipedia do JSON).
export default function TextoApoio({ termo }) {
    // "carregando" | "ok" | "erro"
    const [estado, setEstado] = useState("carregando");
    const [dados, setDados] = useState(null);
    // Muda quando o aluno clica em "Tentar novamente", o que refaz a busca
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        // AbortController permite cancelar a busca se a página for fechada no meio dela
        const controlador = new AbortController();
        setEstado("carregando");

        fetch(
            // Endpoint público de resumo da Wikipédia, sem chave de acesso.
            // encodeURIComponent converte espaços e acentos para o formato de endereço.
            `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termo)}`,
            { signal: controlador.signal }
        )
            .then((resposta) => {
                // fetch só falha sozinho se a internet cair; um 404 precisa ser tratado aqui
                if (!resposta.ok) throw new Error("status " + resposta.status);
                return resposta.json();
            })
            .then((json) => {
                setDados(json);
                setEstado("ok");
            })
            .catch((erro) => {
                // Cancelar a busca também cai aqui, mas isso não é um erro de verdade
                if (erro.name !== "AbortError") setEstado("erro");
            });

        // Função de limpeza: roda quando o componente sai da tela ou antes de nova busca
        return () => controlador.abort();
    }, [termo, tentativa]);

    return (
        <section className="apoio-externo">
            <h2>Texto de apoio</h2>

            {estado === "carregando" && <p>Carregando texto de apoio...</p>}

            {estado === "erro" && (
                <div>
                    <p>
                        Não foi possível carregar o texto de apoio agora. O roteiro
                        continua disponível normalmente.
                    </p>
                    <button
                        type="button"
                        className="botao botao-secundario"
                        onClick={() => setTentativa((n) => n + 1)}
                    >
                        Tentar novamente
                    </button>
                </div>
            )}

            {estado === "ok" && (
                <div>
                    <p className="aviso-externo">
                        Texto de fonte externa (Wikipédia), não produzido pela IA.
                    </p>
                    {/* "extract" é o resumo do artigo, que a API devolve pronto */}
                    <p>{dados.extract || "A Wikipédia não tem resumo para este tema."}</p>
                    {/* O ?. evita erro se o campo não existir na resposta */}
                    {dados.content_urls?.desktop?.page && (
                        <a
                            href={dados.content_urls.desktop.page}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ler o artigo completo na Wikipédia
                        </a>
                    )}
                </div>
            )}
        </section>
    );
}