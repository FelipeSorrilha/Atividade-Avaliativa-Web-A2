"use client";

import Link from "next/link";

export default function Professor() {
    return (
    // No JSX é className, e não class (class é palavra reservada do JavaScript)
    <main className="container">
        <h1 className="titulo">Área do Professor</h1>
        <p>Escolha uma opção:</p>

        {/* Um grupo para os botões, para controlar o espaçamento entre eles */}
        <nav className="menu">
        <Link href="/professor/novo" className="botao">
            Solicitar um novo Roteiro
        </Link>


        {/* Segunda classe: "botao-secundario" muda só a aparência deste */}
        <Link href="/" className="botao botao-secundario">
            Voltar para o início
        </Link>
    </nav>
    </main>
    );
}