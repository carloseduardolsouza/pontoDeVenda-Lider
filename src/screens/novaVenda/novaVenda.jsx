import ProdutosNovaVenda from "../../components/ProdutosNovaVenda/ProdutosNovaVenda.jsx"

import fetchapi from "../../api/fetchapi.js";
import { useState , useEffect } from "react";
import services from "../../services/services.js"
import Alerta from "../../components/Alerta/Alerta.jsx"
import Faturado from "../../components/Faturado/Faturado.jsx";
import Concluindo from "../../components/Concluindo/Concluindo.jsx"

import Select from "react-select";

import "./novaVenda.css"
import AçãoRealizada from "../../components/AçãoRealizada/AçãoRealizada.jsx";

function NovaVenda() {
    const Data = new Date()
    const log = `${Data.getUTCDate()}/${Data.getUTCMonth() + 1}/${Data.getUTCFullYear()}`

    const [resultProdutos , setResultProdutos] = useState([])
    const [resultClientes , setResultClientes] = useState([])
    const [loading , setloading] = useState(true)
    const [concluindo , setConcluindo] = useState(false)

    const [faturado , setFaturado] = useState(false)

    const [id , setId] = useState()
    const [nomeInfoClient , setNomeInfoClient] = useState("'NOME'")
    const [telefoneInfoClient , setTelefoneInfoClient] = useState("'TELEFONE'")
    const [idCliente , setIdCliente] = useState()
    const [INFOclient , setINFOclient] = useState({"name": "DESCONHECIDO","telefone": "DESCONHECIDO"})

    const [desconto , setDesconto] = useState(0)
    const [quantidade , setQuantidade] = useState(1)
    const [pagamento , setPagamento] = useState()
    const [preçoComDesconto , setPreçoComDesconto] = useState(0)
    const [percem , setPercem] = useState(false)

    const [produto , setProduto] = useState("'Produto'")
    const [precovenda , setPreçovenda] = useState("'Preço'")
    const [emestoque , setEmestoque] = useState("'Em estoque'")

    const [alert , setAlert] = useState(false)

    const [venda , setVenda] = useState([])

    useEffect(() => {
        fetchapi.ProcurarCliente('all').then((response) => {
            setResultClientes(response)
            setloading(false)
        })
    }, [])

    useEffect(() => {
        fetchapi.ProcurarProdutos('all').then((response) => {
            setResultProdutos(response)
            setloading(false)
        })
    }, [])

    const optionsClientes = []

    resultClientes.map((resultClientes) => {
        optionsClientes.push({
                value : resultClientes.id,
                label : resultClientes.name})})

    const renderInfoClient = async (e) => {
        setloading(true)
        setId(e.value)
        const infoClient = await fetchapi.ProcurarClienteId(e.value)
        const {
            name,
            telefone,
            id
        } = infoClient[0]
        setNomeInfoClient(name)
        setIdCliente(id)
        setTelefoneInfoClient(telefone)
        setloading(false)
        setINFOclient(infoClient[0])

    }

    const optionsProdutos = []

    resultProdutos.map((resultProdutos) => {
        optionsProdutos.push({
                value : resultProdutos.id,
                label : resultProdutos.produto})})

    const renderInfoProduto = async (e) => {
        setloading(true)
        setId(e.value)
        const infoClient = await fetchapi.ProcurarProdutosId(e.value)
        const {
            produto,
            preçovenda,
            emestoque
        } = infoClient[0]
        setProduto(produto)
        setPreçovenda(+preçovenda)
        setEmestoque(emestoque)
        setloading(false)
    }

    const calcularPrice = () => {
        if(id == "" || id == undefined || id == null) {
            setAlert(true)
            return
        }
        if(percem) {
            var preçodaporcentagem = (desconto / 100) * (precovenda * quantidade)
            var porcentagemPorcentagem = (precovenda * quantidade) - preçodaporcentagem
            setPreçoComDesconto(porcentagemPorcentagem)
        } else {
            var porcentagemReais = (precovenda * quantidade) - desconto
            setPreçoComDesconto(porcentagemReais)
        }
    }

    const LançarAVenda = () => {
        if(id == "" || id == undefined || id == null) {
            setAlert(true)
            return
        }
        
        const objectVenda= {
            "Produto" : produto,
            "Quantidade" : quantidade,
            "Preço" : preçoComDesconto,
            "Desconto" : desconto,
        }
        setVenda([...venda , objectVenda])
        setDesconto(0)
        setQuantidade(1)
        setPreçoComDesconto(0)
        setPagamento()
        setId()
        setProduto()
        setPreçovenda()
        setEmestoque()
    }

    const FaturarSistema = () => {
        setConcluindo(true)
        setTimeout(() => {
            window.location.reload()
        },1500)
    }

    return ( 
        <div id="NOVAVENDA">
            <header>
                <h2>Nova Venda</h2>
                <p>{log}</p>
            </header>
            <main className="MainNovaVenda">
                <div>
                <div>
                {alert && <Alerta parametro={"Selecione um Produto"} functio={setAlert}/>}
                {loading && <AçãoRealizada/> || (
                    <Select className="SelectNovaVenda" placeholder="Cliente" options={optionsClientes} onChange={(e) => renderInfoClient(e)}/>
                )}
                        <label className="NovaVendaLabel">
                            <p className="NovanVendaStrong"><strong>Nome:</strong></p>
                            <p>{nomeInfoClient}</p>
                        </label>
                        <label className="NovaVendaLabel">
                            <p className="NovanVendaStrong"><strong>Numero:</strong></p>
                            <p>{services.formatarNumeroCelular(telefoneInfoClient)}</p>
                        </label>
                    </div>
                    <Select className="SelectNovaVenda" placeholder="Produto" options={optionsProdutos} onChange={(e) => renderInfoProduto(e)}/>
                    <div className="DivisãoNovaVenda">
                        {faturado && <Faturado functio={setFaturado} data={venda} fetch={FaturarSistema} cliente={INFOclient}/>}
                        <div>
                            {concluindo && <Concluindo/>}
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Produto</strong></p>
                                <p>{produto}</p>
                            </label>
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Preço</strong></p>
                                <p>{services.formatarCurrency(precovenda)}</p>
                            </label>
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Em Estoque</strong></p>
                                <p>{emestoque}</p>
                            </label>
                        </div>
                        <div>
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Quantidade</strong></p>
                                <input type="number" onChange={(e) => setQuantidade(e.target.value)} value={quantidade}/>
                            </label>
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Desconto</strong></p>
                                <input type="number" onChange={(e) => setDesconto(e.target.value)} value={desconto}/>
                                <label>
                                    <input id="checkBoxNovaVenda" type="checkbox" checked={percem} onChange={() => setPercem(!percem)}/>
                                    <p>%</p>
                                </label>
                            </label>
                            <label className="NovaVendaLabel">
                                <p className="NovanVendaStrong"><strong>Meio de Pagamento</strong></p>
                                <select onChange={(e) => setPagamento(e.target.value)} value={pagamento}>
                                    <option value="MEIO DE PAGAMENTO">MEIO DE PAGAMENTO</option>
                                    <option value="PIX">PIX</option>
                                    <option value="CARTÃO DE CRÉDITO">CARTÃO DE CRÉDITO</option>
                                    <option value="CARTÃO DE DEBITO">CARTÃO DE DEBITO</option>
                                    <option value="DINHEIRO">DINHEIRO</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                    <button className="calcularNovaVenda" onClick={() => calcularPrice()}>Calcular</button>

                    <div className="PreçoNovaVenda">
                        <h1>Preço : {services.formatarCurrency(preçoComDesconto)}</h1>
                        <button className="lançarPreçoNovaVenda" onClick={() => LançarAVenda()}>Lançar</button>
                    </div>
                </div>
                <div className="ProdutosNovaVenda">
                    {venda.map((venda) => <ProdutosNovaVenda data={venda}/>)}
                    <button className="FaturarNovaVenda" onClick={() => setFaturado(true)}>Faturar</button>
                </div>
            </main>
        </div>
    );
}

export default NovaVenda;