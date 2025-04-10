import "./ItensClientes.css"
import services from "../../services/services"

function ItensClientes({data}) {
    const {
        id,
        name,
        telefone,
        endereço
    } = data

    const urlWpp = `https://wa.me/${telefone}`
    const link = `/detalhesClientes/${id}`

    return ( 
        <div className="ItensClientes">
            <p className="ItensClientesP">{name}</p>
            <a href={urlWpp} className="ItensClientesP" target="_blank">{services.formatarNumeroCelular(telefone)}</a>
            <p className="ItensClientesP endress">{endereço}</p>
            <p className="ItensClientesP">{"R$ 00,00"}</p>
            <a href={link} className="ItensClientesP button">Detalhes</a>
        </div>
     );
}

export default ItensClientes;