import Link from "next/link";
import Selo from "./Selo";

// Componente que mostra um roteiro como cartão.

export default function CartaoRoteiro({ roteiro }) {
    return (
        // O cartão inteiro é um link para a página daquele roteiro
        <Link href={`/aluno/roteiro/${roteiro.id}`} className="cartao-roteiro">
            <h3>{roteiro.titulo}</h3>
            <p>
                {roteiro.disciplina} · {roteiro.ano}
            </p>
            <p>Tema: {roteiro.tema}</p>
            <Selo texto={`${roteiro.tempoEstimadoMin} min`} tipo="tempo" />
        </Link>
    );
}