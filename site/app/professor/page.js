import Link from "next/link";

// O endereço desta tela vem do nome da pasta: app/sobre -> "/sobre".
// Para criar outra tela, crie outra pasta (por exemplo app/contato) com um page.js dentro.
export default function Sobre() {
    return (
    <main>
    <h1>Área do Professor</h1>
    <p>Escolha um:</p>

        <Link href="/">Solicitar um novo Roteiro</Link>

        <Link href="/">Publicar Roteiro</Link>

        {/* "/" é o endereço da tela inicial */}
        <Link href="/">Voltar para o início</Link>
    </main>
    );
}