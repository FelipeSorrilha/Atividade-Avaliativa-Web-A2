import Link from "next/link";

// O endereço desta tela vem do nome da pasta: app/sobre -> "/sobre".
// Para criar outra tela, crie outra pasta (por exemplo app/contato) com um page.js dentro.
export default function Professor() {
    return (
    <main>
    <h1>Área do Aluno</h1>
    <p>Escolha a matéria e o ano:</p>


        {/* "/" é o endereço da tela inicial */}
        <Link href="/">Voltar para o início</Link>
    </main>
    );
}