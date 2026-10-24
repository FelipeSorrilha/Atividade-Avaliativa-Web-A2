// Link é o componente do Next para navegar entre telas sem recarregar o site.
import Link from "next/link";

// O arquivo precisa se chamar page.js para o Next entender que é uma tela.
// Como está direto na pasta app, o endereço dela é "/".
// O nome da função (Home) pode ser qualquer um, mas precisa ter "export default".
export default function Home() {
    return (
    <main>
        <h1>Roteiros de Estudo</h1>
        <p>Consulte Roteiros de Estudos do Colégio Pied Rouge!</p>

        {/* href é o destino, "/professor" aponta para a pasta app/professor. */}
        <Link href="/professor">Área do Professor</Link>

        <Link href="/aluno">Área do Aluno</Link>

    </main>
    );
}