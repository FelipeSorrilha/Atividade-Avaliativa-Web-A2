import Link from "next/link";

// O endereço desta tela vem do nome da pasta: app/sobre -> "/sobre".
// Para criar outra tela, crie outra pasta (por exemplo app/contato) com um page.js dentro.
export default function novo() {
    return (
    <main>
    <h1>Publicar Roteiro</h1>
    <p>Publicar um novo roteiro</p>


        {/* "/" é o endereço da tela inicial */}
        <Link href="/">Voltar para o início</Link>
    </main>
    );
}