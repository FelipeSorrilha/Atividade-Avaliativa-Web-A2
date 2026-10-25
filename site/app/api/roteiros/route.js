import { randomUUID } from "crypto";
import { parseQuestoes } from "../../../lib/questoes";
import { disciplinas, anosEscolares } from "../../../lib/opcoes";
import { lerRoteiros, salvarRoteiros, salvarPdf } from "../../../lib/armazenamento";

const TAMANHO_MAXIMO = 10 * 1024 * 1024; // 10mb

// lista dos roteiros, do mais novo para o mais antigo
export async function GET() {
    const lista = await lerRoteiros();
    //reverse() deixa o mais novo primeiro
    return Response.json(lista.reverse());
}

// ecebe o formulário como PDF e salva
export async function POST(request) {
    try {
        const form = await request.formData();

        const disciplina = form.get("disciplina");
        const anoEscolar = form.get("anoEscolar");
        const tema = String(form.get("tema") || "").trim();
        const textoQuestoes = String(form.get("textoQuestoes") || "");
        const textoExterno = String(form.get("textoExterno") || "").trim();
        const arquivo = form.get("arquivo"); // objeto File

        if (!disciplinas.includes(disciplina) || !anosEscolares.includes(anoEscolar)) {
            return Response.json({ erro: "Disciplina ou ano inválido." }, { status: 400 });
        }
        if (tema === "" || tema.length > 200 || textoQuestoes.length > 30000) {
            return Response.json({ erro: "Tema ou questões inválidos." }, { status: 400 });
        }
        if (!arquivo || typeof arquivo === "string" || arquivo.size === 0) {
            return Response.json({ erro: "Envie o PDF do roteiro." }, { status: 400 });
        }
        if (arquivo.size > TAMANHO_MAXIMO) {
            return Response.json({ erro: "O PDF passa de 10 MB." }, { status: 400 });
        }
        if (textoExterno.length > 10000) {
            return Response.json({ erro: "Texto externo muito longo." }, { status: 400 });
        }

        // o nome pode ser trocado, ent verifica se é um pdf valido
        const buffer = Buffer.from(await arquivo.arrayBuffer());
        if (buffer.subarray(0, 5).toString() !== "%PDF-") {
            return Response.json({ erro: "O arquivo não é um PDF válido." }, { status: 400 });
        }

        const { questoes, erros } = parseQuestoes(textoQuestoes);
        if (erros.length > 0 || questoes.length === 0) {
            return Response.json(
                { erro: erros[0] || "Nenhuma questão encontrada." },
                { status: 400 }
            );
        }

        const id = randomUUID();
        await salvarPdf(id, buffer);

        const lista = await lerRoteiros();
        lista.push({
            id,
            disciplina,
            anoEscolar,
            tema,
            textoExterno, 
            questoes,
            criadoEm: new Date().toISOString(),
        });
        await salvarRoteiros(lista);

        return Response.json({ ok: true, id });
    } catch (erro) {
        console.error(erro);
        return Response.json({ erro: "Erro interno." }, { status: 500 });
    }
}