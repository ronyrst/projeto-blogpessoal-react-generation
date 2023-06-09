import React, { useState, useEffect, ChangeEvent } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/Service'
import UserLogin from '../../models/UserLogin'
import './Login.css'
import { useDispatch } from 'react-redux';
import { addId, addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login() {

    let history = useNavigate();

    const dispatch = useDispatch()

    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
    )

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if(token != ''){
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    useEffect(() => {
        if(respUserLogin.token !== ''){
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            history('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(event: ChangeEvent<HTMLFormElement>){
        event.preventDefault();

        try {
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            
            toast.success('Usuário logado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
                progress: undefined
            })

        } catch(error) {
            toast.error('Dados do usuário inconsistentes. Erro ao logar', {
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
        <Grid alignItems='center' xs={6}>
            <Box paddingX={20}>
                <form onSubmit={onSubmit}>
                    <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='login-textos'>
                        Entrar
                    </Typography>
                    <TextField value={userLogin.usuario} onChange={( event: ChangeEvent<HTMLInputElement>) => updateModel(event) } id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                    <TextField value={userLogin.senha} onChange={( event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                    <Box marginTop={2} textAlign='center'>
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </Box>
                </form>
                <Box display='flex' justifyContent='center' marginTop={2}>
                    <Box marginRight={1}>
                        <Typography variant='subtitle1' gutterBottom align='center'>
                            Não possui uma conta?
                        </Typography>
                    </Box>
                    <Link to='/cadastro' className='text-decorator-none black'>
                        <Typography variant='subtitle1' gutterBottom align='center' className='login-textos'>
                            Cadastre-se
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Grid>
        <Grid xs={6} className='login-img'>
        </Grid>
    </Grid>
  )
}

export default Login