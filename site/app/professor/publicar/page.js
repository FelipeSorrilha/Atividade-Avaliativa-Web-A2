import Link from "next/link";

// O endereço desta tela vem do nome da pasta: app/sobre -> "/sobre".
// Para criar outra tela, crie outra pasta (por exemplo app/contato) com um page.js dentro.
export default function Publicar() {
    return (
    <main>
    <h1>Publicar relatório</h1>
    <p>Faça o upload do PDF abaixo:</p>


    <div className="botao-voltar">
        <Link href="/" className="botao botao-secundario">
            Voltar para o início
        </Link>
    </div>
    </main>
    );
}