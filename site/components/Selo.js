// components/Selo.js
// Etiqueta pequena e reutilizável. Recebe o texto e o tipo por props.
export default function Selo({ texto, tipo = "neutro" }) {
    return <span className={`selo selo-${tipo}`}>{texto}</span>;
}