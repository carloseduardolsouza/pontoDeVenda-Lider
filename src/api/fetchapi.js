const NovoCliente = async (dados) => {
    try {
        const response = await fetch('http://localhost:3322/novoCliente', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao tentar adicionar novo cliente');
        }

        return response;
    } catch (error) {
        // Aqui você pode tratar o erro da forma desejada
        console.error('Erro ao tentar fazer a requisição:', error.message);
        // Por exemplo, você pode exibir uma mensagem de erro para o usuário
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
    }
}

const ProcurarCliente = async (p) => {
    try {
        if(p === '') {
            const clientes = await fetch(`http://localhost:3322/procurarCliente/all`).then((response) => {return response});
            const data = await clientes.json()
            return data
        } else {
            const clientes = await fetch(`http://localhost:3322/procurarCliente/${p}`).then((response) => {return response});
            const data = await clientes.json()
            return data
        }
    } catch (error) {
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
        return []
    }
}

const ProcurarClienteId = async (p) => {
    try {
        const clientes = await fetch(`http://localhost:3322/procurarClienteId/${p}`).then((response) => {return response});
        const data = await clientes.json()
        return data
    } catch (error) {
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
        return []
    }
}

const DeletarCliente = async (p) => {
    try {
        const response = await fetch(`http://localhost:3322/deletarCliente/${p}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Cliente excluído com sucesso
            console.log('Cliente excluído com sucesso');
        } else {
            // Se a resposta não estiver ok, lançar um erro
            throw new Error('Falha ao excluir cliente');
        }
    } catch (error) {
        // Captura e trata erros de requisição
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
    }
};

const AtualizarCliente = async (dados) => {
    try {
        const {id} = dados
        const response = await fetch(`http://localhost:3322/editarCliente/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao tentar adicionar novo cliente');
        }

        return response;
    } catch (error) {
        // Aqui você pode tratar o erro da forma desejada
        console.error('Erro ao tentar fazer a requisição:', error.message);
        // Por exemplo, você pode exibir uma mensagem de erro para o usuário
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
    }
}

const NovoProduto = async (dados , imageReq) => {
    try {
        const formData = new FormData();
        formData.append('dados', JSON.stringify(dados));
        imageReq.forEach((image) => {
            formData.append(`image`, image); // Adiciona cada imagem com uma chave diferente
        });

        const response = await fetch('http://localhost:3322/novoProduto', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erro ao tentar adicionar novo cliente');
        }

        return response;
    } catch (error) {
        // Aqui você pode tratar o erro da forma desejada
        console.error('Erro ao tentar fazer a requisição:', error.message);
        // Por exemplo, você pode exibir uma mensagem de erro para o usuário
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
    }
}

const NovoProdutoImage = async (dados) => {
    try {
        const response = await fetch('http://localhost:3322/novoProduto', {
            method: 'POST',
            body: dados,
        });
        
        if (!response.ok) {
            throw new Error('Erro ao tentar adicionar novo cliente');
        }

        return response;
    } catch (error) {
        // Aqui você pode tratar o erro da forma desejada
        console.error('Erro ao tentar fazer a requisição:', error.message);
        // Por exemplo, você pode exibir uma mensagem de erro para o usuário
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
    }
}

const ProcurarProdutos = async (p) => {
    try {
        if(p === '') {
            const produtos = await fetch(`http://localhost:3322/procurarProdutos/all`).then((response) => {return response});
            const data = await produtos.json()
            return data
        } else {
            const produtos = await fetch(`http://localhost:3322/procurarProdutos/${p}`).then((response) => {return response});
            const data = await produtos.json()
            return data
        }
    } catch (error) {
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
        return []
    }
}

const ProcurarProdutosId = async (p) => {
    try {
        const produtos = await fetch(`http://localhost:3322/procurarProdutosId/${p}`).then((response) => {return response});
        const data = await produtos.json()
        return data
    } catch (error) {
        alert('A API PROVAVELMENTE ESTA INATIVA, ATIVE E TENTE NOVAMENTE');
        return []
    }
}


export default {
    NovoCliente,
    ProcurarCliente,
    ProcurarClienteId,
    DeletarCliente,
    AtualizarCliente,

    NovoProduto,
    NovoProdutoImage,
    ProcurarProdutos,
    ProcurarProdutosId
}