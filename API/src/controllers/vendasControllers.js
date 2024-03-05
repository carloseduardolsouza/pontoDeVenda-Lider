const vendasModels = require('../models/vendasModels')

const procurarVendaId = async (req , res) => {
    const {id} = req.params
    const vendas = await vendasModels.procurarVendaId(id)
    return res.status(200).json(vendas)
}

const novaVenda = async (req, res) => {
    const venda = await vendasModels.novaVenda(req.body)
    return res.status(201).json(venda)
}

const procurarVenda = async (req , res) => {
    const vendas = await vendasModels.procurarVenda()
    return res.status(200).json(vendas)
}

const deletarVenda = async (req, res) => {
    const {id} = req.params
    const deletarVenda = await vendasModels.deletarVenda(id)
    return res.status(200).json(deletarVenda)
}

module.exports = {
    procurarVendaId,
    novaVenda,
    procurarVenda,
    deletarVenda
}