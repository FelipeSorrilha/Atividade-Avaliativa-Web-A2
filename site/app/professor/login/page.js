import Link from "next/link";

export default function Professor() {
    return (
    <main className="container-formulario">
        <h1 className="titulo">O que deseja fazer?</h1>

        <nav className="menu">
        <Link href="/professor/novo" className="botao">
            Solicitar um novo Roteiro
        </Link>

        <Link href="/professor/publicar" className="botao">
            Publicar Roteiro
        </Link>

        {/* Segunda classe: "botao-secundario" muda só a aparência deste */}
        <Link href="/" className="botao botao-secundario">
            Voltar para o início
        </Link>

        </nav>

        
    </main>
    );
}