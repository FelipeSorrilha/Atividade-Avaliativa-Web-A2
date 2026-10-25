import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

// process.cwd() é a pasta onde o npm run dev foi iniciado
const PASTA = path.join(process.cwd(), "data");
const PASTA_PDFS = path.join(PASTA, "pdfs");
const ARQUIVO = path.join(PASTA, "roteiros.json");

// Lê a lista de roteiros
export async function lerRoteiros() {
    try {
        return JSON.parse(await readFile(ARQUIVO, "utf-8"));
    } catch {
        return [];
    }
}

// Grava a lista inteira de volta no arquivo
export async function salvarRoteiros(lista) {
    await mkdir(PASTA, { recursive: true }); // cria a pasta data se não existir
    await writeFile(ARQUIVO, JSON.stringify(lista, null, 2), "utf-8");
}

// Guarda o PDF como data/pdfs/<id>.pdf
export async function salvarPdf(id, buffer) {
    await mkdir(PASTA_PDFS, { recursive: true });
    await writeFile(path.join(PASTA_PDFS, `${id}.pdf`), buffer);
}

export async function lerPdf(id) {
    return readFile(path.join(PASTA_PDFS, `${id}.pdf`));
}

// Só aceita ids no formato que nós mesmos geramos
// Sem isso, algm poderia pedir uma id diferente e ler arquivos fora da pasta.
export function idValido(id) {
    return /^[0-9a-f-]{36}$/i.test(id);
}