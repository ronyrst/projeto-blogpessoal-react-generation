import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../models/Tema"
import useLocalStorage from "react-use-localstorage"
import Postagem from "../../../models/Postagem"
import { getAll, getId, post, put } from "../../../services/Service"

function CadastroPostagem() {

    let history = useNavigate()

    const { id } = useParams<{ id: string}>()

    const [temas, setTemas] = useState<Tema[]>([])

    const [token, setToken] = useLocalStorage('token')

    useEffect(() => {
        if (token == '') {
            alert('Você precisa estar logado!')
            history('/login')
        }
    }, [token])

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    })

    async function getTemas() {
        await getAll('/temas', setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await getId(`/postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if(id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Postagem atualizada com sucesso.')
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Postagem cadastrada com sucesso.')
        }

        back()
    }

    function back() {
        history('/postagens')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Cadastrar postagem</Typography>
                <TextField value={postagem.titulo} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="titulo" label="título" variant="outlined" name="titulo" margin="normal" required fullWidth />
                <TextField value={postagem.texto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedPostagem(event)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" required fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">
                        Tema
                    </InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                        onChange={(event) => getId(`/temas/${event.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>
                                    {tema.descricao}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default CadastroPostagem