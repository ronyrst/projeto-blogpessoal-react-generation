import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://blogpessoal-0xns.onrender.com'
})

export const cadastroUsuario = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data.token)
}