import Link from "next/link";

export default function Novo() {
    return (
        <main>
            <h1>Boas vindas, professor!</h1>
            <p>Entre com seus dados institucionais:</p>

            <div className="container-formulario">
                <h2>Login de Usuário</h2>

                <form>
                    <div className="campo">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail:"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Insira seu nome:"
                            required
                        />
                    </div>

                    <Link href="/professor/login" className="botao">
                        Entrar
                    </Link>
                </form>
            </div>

            <div className="botao-voltar">
                <Link
                    href="/"
                    className="botao botao-secundario"
                >
                    Voltar para o início
                </Link>
            </div>
        </main>
    );
}