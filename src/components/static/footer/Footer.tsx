import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Box } from '@mui/material'
import InstagramIcon from '@material-ui/icons/Instagram'
import GithubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import './Footer.css'


function Footer() {
  return (
    <>
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid alignItems="center" item xs={12}>
                <Box className='footer-box1'>
                    <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                        <Typography variant="h5" align="center" gutterBottom className='footer-textos'>
                            Entre em contato:
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <a href="https://github.com/ronyrst" target="_blank">
                            <GithubIcon className='redes-sociais github' />
                        </a>
                        <a href="https://www.linkedin.com/in/rony-dos-santos-teles-29649a172/" target="_blank">
                            <LinkedInIcon className='redes-sociais linkedin' />
                        </a>
                    </Box>
                </Box>
                <Box className='footer-box2'>
                    <Box paddingTop={1}>
                        <Typography variant="subtitle2" align="center" gutterBottom className='footer-textos' >
                            © 2023 Copyright:
                        </Typography>
                    </Box>
                    <Box>
                        <a target="_blank" href="https://brasil.generation.org" className='footer-link'>
                            <Typography variant="subtitle2" gutterBottom className='footer-textos' align="center">
                                brasil.generation.org
                            </Typography>
                        </a>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default Footer