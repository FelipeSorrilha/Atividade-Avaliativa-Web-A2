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

// Chave do Web3Forms
// ela não é secreta, não funciona igual outras APIs, ela pode ficar aqui suave
const WEB3FORMS_KEY = "fd6e04ec-425d-49d8-a4e3-9e23b5159298";

// A partir das respostas do formulário, devolve o prompt pronto como texto
function montarPrompt(d) {
    // Se um campo vier vazio escreve nenhum no lugar
    const observacoes = d.observacoes.trim() || "nenhuma";

    return `Crie um roteiro de estudos simples e resumido, com questões de múltipla escolha, adequado à disciplina, ao ano escolar e ao tema informados.

Dados do roteiro:

* Disciplina: ${d.disciplina}
* Ano escolar: ${d.anoEscolar}
* Tema do roteiro: ${d.tema}
* Quantidade de questões: ${d.quantidade}
* Data prevista para utilização: ${d.dataUtilizacao}
* Observações e orientações adicionais: ${observacoes}

Instruções para elaboração:

1. Elabore um roteiro explicando brevemente o conteúdo, sem utilizar simbolos especiais, e em formato de PDF.
2. Adeque a linguagem, a complexidade e o nível de aprofundamento ao ano escolar informado.
3. Aborde o tema solicitado de maneira coerente com os conteúdos da disciplina.
4. Crie as questões separadas do texto de explicação em uma sequência lógica, começando, preferencialmente, pelas mais simples e avançando para as mais complexas.
5. Faça apenas questões de múltipla escolha.
6. Elabore enunciados claros, completos e sem ambiguidades.
7. Evite questões repetitivas, informações incorretas e conteúdos inadequados ao nível de escolaridade.
8. Considere as observações fornecidas pelo solicitante, respeitando as orientações específicas sobre a turma, os conteúdos e a abordagem desejada.
9. Quando pertinente, contextualize as questões com situações do cotidiano dos estudantes.
10. Escreva primeiro o texto de explicação, sem usar o símbolo # nele. Depois escreva, sozinha em uma linha, a marcação ---QUESTOES--- e, em seguida, todas as questões.
11. Escreva todas as questões dentro de um único bloco de código, no formato abaixo.
git rm -r app/api

Formato de cada questão:

# número da questão;
## enunciado;
### alternativa a;
### alternativa b;
### alternativa c;
### alternativa d;
### alternativa e;
#### letra da alternativa correta; // NOVO

Exemplo:

# 1;
## Quanto é 2 + 2?;
### 4;
### 5;
### 6;
### 7;
### 8;
#### a;

Importante: produza diretamente o roteiro solicitado, sem explicar o processo de criação, sem fazer perguntas adicionais e sem incluir questões além da quantidade definida. Se alguma observação estiver vazia, prossiga normalmente utilizando os demais dados.`;
}

function calcularDataMinima() {
    const data = new Date();
    data.setDate(data.getDate() + 7);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

export default function SolicitarRoteiro() {
    const [enviando, setEnviando] = useState(false);
    const [disciplina, setDisciplina] = useState("");
    const [anoEscolar, setAnoEscolar] = useState("");
    const [tema, setTema] = useState("");
    const [quantidade, setQuantidade] = useState(10);
    const [dataUtilizacao, setDataUtilizacao] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [mensagem, setMensagem] = useState("");
    const dataMinima = calcularDataMinima();
    // E-mail do professor, para a equipe devolver o roteiro depois
    const [emailProfessor, setEmailProfessor] = useState("");

// "async" pq usa await para esperar a resposta
async function enviarSolicitacao(event) {
    event.preventDefault();
    setMensagem("");

    if (dataUtilizacao < dataMinima) {
        setMensagem("Escolha uma data com pelo menos 7 dias de antecedência.");
        return;
    }

    setEnviando(true);
    try {
        // O Web3Forms recebe os dados e manda o e-mail para o endereço ligado à chave
        // Atualmente, eh meu e-mail institucional (felipesorrilha@alunos...)
        const resposta = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json", // pede a resposta em JSON
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                // "subject" vira o assunto do e-mail
                subject: `Nova solicitação: ${disciplina} - ${tema}`,
                email: emailProfessor,
                message: montarPrompt({
                    disciplina, anoEscolar, tema, quantidade,
                    dataUtilizacao, observacoes,
                }),
            }),
        });

        const dados = await resposta.json();

        // O Web3Forms diz success: true  quando deu certo
        if (dados.success) {
            setMensagem("Solicitação enviada!");
            setTema(""); // limpa os campos de texto
            setObservacoes("");
        } else {
            setMensagem("Não foi possível enviar. Tente novamente.");
        }
    } catch (erro) {
    // Mostra o erro de verdade no console do navegador
    console.error("Erro ao enviar:", erro);
    // Provisório, só para descobrir o problema. Depois volte para "Erro de conexão."
    setMensagem("Erro: " + erro.message);
}
    setEnviando(false);
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
                        <label htmlFor="emailProfessor">Seu e-mail</label>

                        {/* type="email" já faz o navegador conferir o formato (precisa ter @ e domínio) */}
                        <input
                            type="email"
                            id="emailProfessor"
                            name="emailProfessor"
                            placeholder="nome@escola.educa.gov.br"
                            value={emailProfessor}
                            onChange={(e) => setEmailProfessor(e.target.value)}
                            required
                        />

                        <small>Usaremos este e-mail para enviar o roteiro pronto.</small>
                    </div>

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
                <button type="submit" className="botao" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar solicitação"}
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
