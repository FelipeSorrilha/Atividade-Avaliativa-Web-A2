import Link from "next/link";

export default function Home() {
    return (
        <main className="container">
            <h1 className="titulo">
                Seu próximo aprendizado começa aqui!
            </h1>

            <p>
                Roteiros de estudos claros e confiáveis, criados com
                inteligência artificial e revisados por quem entende:
                seus professores.
            </p>

            <div className="menu">
                <Link href="/professor" className="botao">
                    Área do Professor
                </Link>

                <Link href="/aluno" className="botao botao-secundario">
                    Área do Aluno
                </Link>
            </div>
        </main>
    );
}
