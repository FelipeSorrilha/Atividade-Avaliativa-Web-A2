import { lerRoteiros, idValido } from "../../../../lib/armazenamento";

// devolve um roteiro só.
// "No Next 15, "params" é uma Promise, por isso o await" - IA que resolveu o bug
export async function GET(request, { params }) {
    const { id } = await params;

    if (!idValido(id)) {
        return Response.json({ erro: "Roteiro não encontrado." }, { status: 404 });
    }

    const lista = await lerRoteiros();
    const roteiro = lista.find((r) => r.id === id);

    if (!roteiro) {
        return Response.json({ erro: "Roteiro não encontrado." }, { status: 404 });
    }
    return Response.json(roteiro);
}