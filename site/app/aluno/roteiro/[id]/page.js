import Link from "next/link";
import { notFound } from "next/navigation";
// Quatro "../" porque este arquivo está 4 pastas dentro de "site"
import roteiros from "../../../../dados/roteiros.json";
import professores from "../../../../dados/professores.json";
import AvisoRevisor from "../../../../components/AvisoRevisor";
import TextoApoio from "../../../../components/TextoApoio";
import Questao from "../../../../components/Questao";

export function generateStaticParams() {
    return roteiros.map((r) => ({ id: r.id }));
}

export const dynamicParams = false;

export default async function PaginaRoteiro({ params }) {
    const { id } = await params;

    const roteiro = roteiros.find((r) => r.id === id);

    if (!roteiro) notFound();

    // A ligação entre as duas entidades: o professorId do roteiro aponta para um professor
    const professor = professores.find((p) => p.id === roteiro.professorId);

    return (
        <main className="container container-largo">
            <h1 className="titulo">{roteiro.titulo}</h1>
            <p>
                {roteiro.disciplina} · {roteiro.ano} · Tempo estimado:{" "}
                {roteiro.tempoEstimadoMin} min
            </p>

            <AvisoRevisor professor={professor} />

            <section>
                <h2>Explicação</h2>
                <p>{roteiro.explicacao}</p>
            </section>

            {/* Componente de cliente: busca na Wikipédia depois que a página abre */}
            <TextoApoio termo={roteiro.termoWikipedia} />

            <h2>Questões de fixação</h2>
            {roteiro.questoes.map((q, i) => (
                <Questao key={i} numero={i + 1} questao={q} />
            ))}

            <div className="botao-voltar">
                <Link href="/aluno" className="botao botao-secundario">
                    Voltar para os roteiros
                </Link>
            </div>
        </main>
    );
}

