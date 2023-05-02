import React, {useState, useEffect, ChangeEvent } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import User from '../../models/User'
import { cadastroUsuario } from '../../services/Service'
import './CadastroUsuario.css'
import { toast } from 'react-toastify';

function CadastroUsuario() {

    let navigate = useNavigate();

    const [confirmarSenha,setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if(userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(event.target.value)
    }


    function updatedModel(event: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        })

    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if(confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            
            toast.success('Usuário cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined
            })
        }else{
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro', {
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
    }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={6} className='cadastro-img'></Grid>
        <Grid item xs={6}>
            <Box paddingX={10}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='cadastro-textos'>
                        Cadastrar
                    </Typography>
                    <TextField value={user.nome} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' type='text' required fullWidth />
                    <TextField value={user.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' type='email' required fullWidth />
                    <TextField value={user.foto} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='foto' label='foto' variant='outlined' name='foto' margin='normal' type='text' fullWidth />
                    <TextField value={user.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' required fullWidth />        
                    <TextField value={confirmarSenha} onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)} id='confirmarSenha' label='confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' required fullWidth />
                    <Box marginTop={2} textAlign='center'>
                        <Link to='/login'>
                            <Button variant='contained' color='secondary' className='btn-cancelar'>
                                Cancelar
                            </Button>
                        </Link>
                        <Button type='submit' variant='contained' color='primary'>
                            Cadastrar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Grid>

    </Grid>
  )
}

export default CadastroUsuario