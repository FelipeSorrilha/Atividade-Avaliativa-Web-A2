import { lerPdf, idValido } from "../../../../../lib/armazenamento";

// abre o PDF no navegador
export async function GET(request, { params }) {
    const { id } = await params;

    if (!idValido(id)) {
        return new Response("Não encontrado", { status: 404 });
    }

    try {
        const pdf = await lerPdf(id);
        const baixar = new URL(request.url).searchParams.get("download") === "1";

        return new Response(pdf, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": baixar
                    ? 'attachment; filename="roteiro.pdf"'
                    : "inline",
            },
        });
    } catch {
        // readFile falha se o arquivo não existir
        return new Response("Não encontrado", { status: 404 });
    }
}