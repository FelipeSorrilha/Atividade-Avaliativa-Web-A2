import { readFile, writeFile, mkdir } from "fs/promises"; // ler/escrever arquivos
import path from "path";
import { randomUUID } from "crypto"; // gera um id único
import { parseQuestoes } from "../../../lib/questoes";
import { disciplinas, anosEscolares } from "../../../lib/opcoes";

// process.cwd() é a pasta onde o npm run dev foi iniciado 
const PASTA = path.join(process.cwd(), "data");
const ARQUIVO = path.join(PASTA, "roteiros.json");

// Lê o arquivo
async function lerRoteiros() {
    try {
        return JSON.parse(await readFile(ARQUIVO, "utf-8"));
    } catch {
        return [];
    }
}

// GET /api/roteiros vai devolver todos os roteiros
export async function GET() {
    return Response.json(await lerRoteiros());
}

// POST /api/roteiros vai salvar um roteiro novo
export async function POST(request) {
    try {
        const corpo = await request.json();
        const disciplina = corpo.disciplina;
        const anoEscolar = corpo.anoEscolar;
        const tema = String(corpo.tema || "").trim();
        const textoRoteiro = String(corpo.textoRoteiro || "");
        const textoQuestoes = String(corpo.textoQuestoes || "");

        if (!disciplinas.includes(disciplina) || !anosEscolares.includes(anoEscolar)) {
            return Response.json({ erro: "Disciplina ou ano inválido." }, { status: 400 });
        }
        if (tema === "" || textoRoteiro.trim() === "") {
            return Response.json({ erro: "Preencha o tema e o texto do roteiro." }, { status: 400 });
        }
        if (tema.length > 200 || textoRoteiro.length > 30000 || textoQuestoes.length > 30000) {
            return Response.json({ erro: "Texto muito longo." }, { status: 400 });
        }

        const { questoes, erros } = parseQuestoes(textoQuestoes);
        if (erros.length > 0 || questoes.length === 0) {
            return Response.json(
                { erro: erros[0] || "Nenhuma questão encontrada." },
                { status: 400 }
            );
        }

        const novo = {
            id: randomUUID(),
            disciplina,
            anoEscolar,
            tema,
            texto: textoRoteiro,
            questoes,
            criadoEm: new Date().toISOString(),
        };

        const lista = await lerRoteiros();
        lista.push(novo);

        await mkdir(PASTA, { recursive: true }); // cria a pasta data se não existir
        await writeFile(ARQUIVO, JSON.stringify(lista, null, 2), "utf-8");

        return Response.json({ ok: true, id: novo.id });
    } catch (erro) {
        console.error(erro); // o detalhe aparece no terminal
        return Response.json({ erro: "Erro interno." }, { status: 500 });
    }
}