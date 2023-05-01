import { Container, Typography, TextField, Button } from "@material-ui/core"
import './CadastroTema.css'
import { useNavigate, useParams } from "react-router-dom"
import useLocalStorage from "react-use-localstorage"
import React, { useState, useEffect, ChangeEvent } from "react"
import Tema from "../../../models/Tema"
import { getId, post, put } from "../../../services/Service"

function CadastroTema() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [token, setToken] = useLocalStorage('token')

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if (token == '') {
            alert('Você precisa estar logado!')
            history('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        getId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(event: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if (id !== undefined) {
            put(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema atualizado com sucesso.');

        } else {
            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema cadastrado com sucesso.');
        }
        back()
    }

    function back() {
        history('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Cadastrar tema</Typography>
                <TextField value={tema.descricao} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedTema(event)} id="descricao" label="descrição" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema