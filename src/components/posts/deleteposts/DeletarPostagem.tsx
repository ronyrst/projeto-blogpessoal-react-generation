import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useLocalStorage from "react-use-localstorage"
import Postagem from "../../../models/Postagem"
import { deleteId, getId } from "../../../services/Service"

function DeletarPostagem() {

    let history = useNavigate()

    const { id } = useParams<{ id: string }>()

    const [token, setToken] = useLocalStorage('token')

    const [post, setPosts] = useState<Postagem>()

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
        getId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        history('/postagens')

        deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        alert('Postagem apagada com sucesso.')
    }

    function nao() {
        history('/postagens')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem?
                            </Typography>
                            <Typography color="textSecondary" >
                                {post?.titulo}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default DeletarPostagem