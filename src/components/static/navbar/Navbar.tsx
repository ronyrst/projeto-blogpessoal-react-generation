import './Navbar.css'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

function Navbar() {
    return(
        <>
            <AppBar position="static">
                <Toolbar variant="dense" className="navbar-toolbar">
                    <Box className='cursor'>
                        <Typography variant="h4" color="inherit">
                            BlogPessoal
                        </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="center">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                home
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                postagens
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Box>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                cadastrar tema
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Link to='/login' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                logout
                            </Typography>
                        </Box>
                    </Link>
                    
                
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar