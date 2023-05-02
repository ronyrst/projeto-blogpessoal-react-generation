import './Navbar.css'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { addToken } from '../../../store/tokens/actions'

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    const dispatch = useDispatch()

    let history = useNavigate()

    function goLogout() {
        dispatch(addToken(''));
        alert("Usuário deslogado")
        history('/login')
    }

    var navbarComponent

    if(token != ""){
        navbarComponent = 
        <AppBar position="static">
            <Toolbar variant="dense" className="navbar-toolbar">
                <Link to='/home' className='text-decorator-none'>
                    <Box className='cursor'>
                        <Typography variant="h4" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>
                </Link>

                <Box display="flex" justifyContent="center">
                    <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/postagens' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/cadastrarTema' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                cadastrar tema
                            </Typography>
                        </Box>
                    </Link>

                </Box>

                <Box mx={1} className='cursor' onClick={goLogout}>
                    <Typography variant="h6" color="inherit">
                        logout
                    </Typography>
                </Box>

            </Toolbar>
        </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar