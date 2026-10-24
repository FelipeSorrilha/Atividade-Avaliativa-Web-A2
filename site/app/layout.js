// Esse arquivo aqui é o "modelo" do site, td que estiver aqui aparece em todas as telas

// Texto da aba do navegador
export const metadata = {
    title: "Roteiros de Estudo",
};

// "children" é a tela da rota atual, em "/" é o page.js da pasta app
// em "/sobre" é o page.js da pasta app/sobre, o next coloca ela no lugar de children
export default function RootLayout({ children }) {
    return (
    <html lang="pt-BR">
        <body>{children}</body>
    </html>
    );
}