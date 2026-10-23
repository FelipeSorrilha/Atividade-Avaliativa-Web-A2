import "./globals.css";

export const metadata = {
  title: "Roteiros de Estudo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
