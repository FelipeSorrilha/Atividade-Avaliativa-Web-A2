import Link from "next/link";

// O Next usa este arquivo sempre que uma página não é encontrada
export default function NaoEncontrado() {
    return (
        <main className="container">
            <h1 className="titulo">Roteiro não encontrado</h1>
            <p>Esse endereço não existe ou o roteiro foi removido.</p>
            <Link href="/aluno" className="botao">
                Ver todos os roteiros
            </Link>
        </main>
    );
}