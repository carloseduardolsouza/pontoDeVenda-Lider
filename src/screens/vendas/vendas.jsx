import "./vendas.css"

import ItensTable from "../../components/itensTableVendas/itensTableVendas"
import ItensTablePendentes from "../../components/itensTableVendasPendentes/itensTableVendasOpen"

import { FaFilter } from "react-icons/fa";
import fetchapi from "../../api/fetchapi";
import Loading from "../../components/AçãoRealizada/AçãoRealizada"

import { useState , useEffect } from "react"
import itensTableVendas from "../../components/itensTableVendas/itensTableVendas";

function Vendas() {
    const Data = new Date()
    const log = `${Data.getUTCDate()}/${Data.getUTCMonth() + 1}/${Data.getUTCFullYear()}`

    const [históricoOpen , setHistóricoOpen] = useState(true)

    const [resultVendas , setResultVendas] = useState([])
    const [loadingVendas , setloadingVendas] = useState(true)

    useEffect(() => {
        fetchapi.ProcurarVendas().then((response) => {
            setResultVendas(response)
            setloadingVendas(false)
        })
    }, [])
    return ( 
        <div id="VENDAS">
            <header className="HeaderVendas">
                <h2 id="TitleVendas">Vendas</h2>
                <p>{log}</p>
            </header>
            <article className="ArticleVendas">
                <a href="/novaVenda" className="NovaVenda"> Nova Venda</a>
            </article>
            <main>
                <div className="AreaVendasButtons">
                    <button style={{textDecoration: 'underline #0295ff 3px'}} onClick={() => {setHistóricoOpen(true)}}>Histórico</button>
                    <button style={{textDecoration: 'underline #0295ff 3px'}} onClick={() => {setHistóricoOpen(false)}}>Pedidos em aberto</button>
                </div>
                {históricoOpen && (
                    <div>
                    <form>
                        <input type="date" className="FilterDateVendas"/>
                        <button className="FilterICONDateVendas"><FaFilter /></button>
                    </form>
                    <table className="TableVendas">
                        <div className="TableHeader">
                            <p className="itemTabelTitle">Produto</p>
                            <p className="itemTabelTitle">Preço</p>
                            <p className="itemTabelTitle">Quantidade</p>
                            <p className="itemTabelTitle">Desconto</p>
                            <p className="itemTabelTitle">Total</p>
                            <p className="itemTabelTitle">Data</p>
                        </div>
                        {loadingVendas && <Loading/> || resultVendas.reverse().map((vendas) => <ItensTable data={vendas}/>)}
                    </table>
                    </div>
                ) || (
                        <table className="TableVendas">
                        <div className="TableHeader">
                            <p className="itemTabelTitle">Produto</p>
                            <p className="itemTabelTitle">Preço</p>
                            <p className="itemTabelTitle">Quantidade</p>
                            <p className="itemTabelTitle">Desconto</p>
                            <p className="itemTabelTitle">Total</p>
                            <p className="itemTabelTitle">Pagamento</p>
                            <p className="itemTabelTitle">Ações</p>
                        </div>
                        <ItensTablePendentes/>
                        <ItensTablePendentes/>
                    </table>
                )}
            </main>
        </div>
     );
}

export default Vendas;