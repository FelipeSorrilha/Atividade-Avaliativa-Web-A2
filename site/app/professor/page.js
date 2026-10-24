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
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Digite seu E-mail:"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input
                            type="text"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha:"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="botao"
                    >
                        Entrar
                    </button>

                    <Link href="/novaConta">
                        Não tenho login
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