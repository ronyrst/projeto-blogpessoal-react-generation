import './Navbar.css'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';

function Navbar() {

    const [token, setToken] = useLocalStorage('token')

    let history = useNavigate()

    function goLogout() {

        if (token !== '') {
            setToken('')
            alert('Usuário deslogado')    
        }
    
        history('/login')
    }

    return(
        <>
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
        </>
    )
}

export default Navbar