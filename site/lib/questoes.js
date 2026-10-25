// Recebe o texto colado pelo professor (que a IA da escola gerou conforme padronizado)
// e devolve {questoes, erros}.
// Cada questão sai como {enunciado, alternativas: [...], correta: número}.
// "correta" é a posição da alternativa certa (0 = a, 1 = b, 2 = c...).
export function parseQuestoes(texto) {
    const erros = [];

    // Se o professor colou a resposta inteira da IA, pegamos só o que vem
    // depois da marcação ---QUESTOES---
    const partes = texto.split("---QUESTOES---");
    const util = partes[partes.length - 1];

    // Quebra em linhas, tira espaços e descarta linhas vazias e as cercas ``` do bloco de código
    const linhas = util
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== "" && !l.startsWith("```"));

    const brutas = []; // questões lidas, ainda sem conferir
    let atual = null; // a questão que está sendo lida agora

    for (const original of linhas) {
        // Tira o ";" do final da linha, se tiver (tem no prompt pra separar as linhas)
        const linha = original.replace(/;\s*$/, "").trim();

        // como td eh basicamente #, testamos o prefixo mais longo (####) primeiro
        if (linha.startsWith("#### ")) {
            if (!atual) { erros.push(`Gabarito sem questão: "${original}"`); continue; }
            atual.gabarito = linha.slice(5).trim();
        } else if (linha.startsWith("### ")) {
            if (!atual) { erros.push(`Alternativa sem questão: "${original}"`); continue; }
            // Remove um "a) " no começo, caso a IA escreva a letra junto
            atual.alternativas.push(linha.slice(4).trim().replace(/^[a-e]\)\s*/i, ""));
        } else if (linha.startsWith("## ")) {
            if (!atual) { erros.push(`Enunciado sem questão: "${original}"`); continue; }
            atual.enunciado = linha.slice(3).trim();
        } else if (linha.startsWith("# ")) {
            // Uma linha com um # só começa uma nova questão
            atual = { enunciado: "", alternativas: [], gabarito: "" };
            brutas.push(atual);
        } else {
            erros.push(`Linha não reconhecida: "${original}"`);
        }
    }

    // Confere cada questão lida e monta o resultado final
    const questoes = [];
    brutas.forEach((q, i) => {
        const n = i + 1;
        // O gabarito precisa ser uma letra de a a e, como "a" ou "a)"
        const m = q.gabarito.match(/^([a-e])[).]?$/i);
        const indice = m ? "abcde".indexOf(m[1].toLowerCase()) : -1;

        if (q.enunciado === "") {
            erros.push(`Questão ${n}: falta o enunciado (linha com ##).`);
        } else if (q.alternativas.length < 2 || q.alternativas.length > 5) {
            erros.push(`Questão ${n}: precisa ter de 2 a 5 alternativas (linhas com ###).`);
        } else if (indice === -1 || indice >= q.alternativas.length) {
            erros.push(`Questão ${n}: gabarito ausente ou inválido (linha com ####, ex.: #### a).`);
        } else {
            questoes.push({
                enunciado: q.enunciado,
                alternativas: q.alternativas,
                correta: indice,
            });
        }
    });

    return { questoes, erros };
}