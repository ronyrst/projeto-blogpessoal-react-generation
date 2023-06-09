import { Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tema from "../../../models/Tema"
import Postagem from "../../../models/Postagem"
import User from "../../../models/User"
import { getAll, getId, post, put } from "../../../services/Service"
import { useSelector } from "react-redux"
import { TokenState } from "../../../store/tokens/tokensReducer"
import { toast } from "react-toastify"

function CadastroPostagem() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [temas, setTemas] = useState<Tema[]>([])

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    useEffect(() => {
        if (token == '') {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined
            })
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
        data: '',
        tema: null,
        usuario: null
    })

    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

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

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })

            toast.success('Postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined
            })
            
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })

            toast.success('Postagem cadastrada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined
            })
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