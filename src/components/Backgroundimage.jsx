
export default function Backgroundimage({ children, size ,imageUrl }) {
    return (
        <div className="Backgroundimage" style={{ 
            position: 'relative', //Por algum motivo se colocar isso no css não funciona
            height: size,
            backgroundImage: `url(${imageUrl})`,
        }}>
            <div className="overlay"></div>
            <div className="textoCentro">{children}</div>
        </div>
    )
}