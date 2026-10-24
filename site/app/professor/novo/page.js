"use client";

import {useState} from "react";
import Link from "next/link";

const disciplinas = [
    "Língua Portuguesa",
    "Matemática",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
    "Arte",
    "Educação Física",
    "Física",
    "Química",
    "Biologia",
    "Filosofia",
];

const anosEscolares = [
    "6º ano do Ensino Fundamental",
    "7º ano do Ensino Fundamental",
    "8º ano do Ensino Fundamental",
    "9º ano do Ensino Fundamental",
];

function calcularDataMinima() {
    const data = new Date();
    data.setDate(data.getDate() + 7);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

export default function SolicitarRoteiro() {
    const [disciplina, setDisciplina] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [tema, setTema] = useState("");
    const [quantidade, setQuantidade] = useState(10);
    const [dataUtilizacao, setDataUtilizacao] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [mensagem, setMensagem] = useState("");

    const dataMinima = calcularDataMinima();

    function enviarSolicitacao(event) {
        event.preventDefault();
        setMensagem("");

        if (dataUtilizacao < dataMinima) {
            setMensagem(
                "Escolha uma data com pelo menos 7 dias de antecedência."
            );
            return;
        }

        setMensagem(
            "Formulário validado!"
        );
    }

    return (
        <main className="pagina-roteiro">
            <h1>Solicitação de roteiro</h1>

            <p>
                Professor, preencha as informações para solicitar
                seu material didático.
            </p>

            <div className="container-formulario">
                <h2>Dados do roteiro</h2>

                <form onSubmit={enviarSolicitacao}>
                    <div className="campo">
                        <label htmlFor="disciplina">
                            Disciplina
                        </label>

                        <select
                            id="disciplina"
                            name="disciplina"
                            value={disciplina}
                            onChange={(e) =>
                                setDisciplina(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Selecione uma disciplina
                            </option>

                            {disciplinas.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="anoEscolar">
                            Ano escolar
                        </label>

                        <select
                            id="anoEscolar"
                            name="anoEscolar"
                            value={anoEscolar}
                            onChange={(e) =>
                                setAnoEscolar(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Selecione o ano escolar
                            </option>

                            {anosEscolares.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="tema">
                            Tema do roteiro
                        </label>

                        <input
                            type="text"
                            id="tema"
                            name="tema"
                            placeholder="Ex.: Frações, ecossistemas..."
                            value={tema}
                            onChange={(e) =>
                                setTema(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Quantidade de questões</label>

                        <div className="seletor-quantidade">
                            <button
                                type="button"
                                className="botao-quantidade"
                                onClick={() =>
                                    setQuantidade((q) =>
                                        Math.max(3, q - 1)
                                    )
                                }
                                disabled={quantidade <= 1}
                                aria-label="Diminuir quantidade"
                            >
                                -
                            </button>

                            <span
                                className="valor-quantidade"
                                aria-live="polite"
                            >
                                {quantidade}
                            </span>

                            <button
                                type="button"
                                className="botao-quantidade"
                                onClick={() =>
                                    setQuantidade((q) =>
                                        Math.min(10, q + 1)
                                    )
                                }
                                disabled={quantidade >= 10}
                                aria-label="Aumentar quantidade"
                            >
                                +
                            </button>
                        </div>

                        <small>
                            Escolha de 3 a 10 questões.
                        </small>
                    </div>

                    <div className="campo">
                        <label htmlFor="dataUtilizacao">
                            Quando o material será utilizado?
                        </label>

                        <input
                            type="date"
                            id="dataUtilizacao"
                            name="dataUtilizacao"
                            min={dataMinima}
                            value={dataUtilizacao}
                            onChange={(e) =>
                                setDataUtilizacao(e.target.value)
                            }
                            required
                        />

                        <small>
                            A data deve ter pelo menos 7 dias
                            de antecedência.
                        </small>
                    </div>

                    <div className="campo">
                        <label htmlFor="observacoes">
                            Observações
                        </label>

                        <textarea
                            id="observacoes"
                            name="observacoes"
                            placeholder="Conte sobre sua turma, conteúdos que devem aparecer ou uma abordagem específica."
                            value={observacoes}
                            onChange={(e) =>
                                setObservacoes(e.target.value)
                            }
                            rows={4}
                        />
                    </div>

                    {mensagem && (
                        <p
                            className="mensagem-roteiro"
                            role="status"
                            aria-live="polite"
                        >
                            {mensagem}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="botao"
                    >
                        Enviar solicitação
                    </button>
                </form>
            </div>

            <div className="botao-voltar">
                <Link
                    href="/"
                    className="botao botao-secundario"
                >
                    Voltar para o início
                </Link>
            </div>
        </main>
    );
}
