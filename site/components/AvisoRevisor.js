// Componente simples, sem estado: só recebe o professor por prop e mostra.
// Não precisa de "use client" porque não usa hooks nem eventos.
export default function AvisoRevisor({ professor }) {
    return (
        <aside className="aviso-ia">
            <strong>Material gerado por inteligência artificial</strong>
            {professor ? (
                <p>
                    Revisado por {professor.nome}, professor(a) de {professor.disciplina},{" "}
                    {professor.escola}.
                </p>
            ) : (
                // Proteção: se o professorId do JSON não existir, a página não quebra
                <p>Professor revisor não informado.</p>
            )}
        </aside>
    );
}