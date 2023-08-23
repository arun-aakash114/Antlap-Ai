import React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from './footer';
import userHeader from './../assets/user-header.jpg';

import LogoLrg from '../assets/logo-lrg1.png';
import '../searchApp.scss'
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { backEndDomain } from '../service/apiserver';


function Layout({ children }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const profilepic = localStorage.getItem('Profilepic')
    const Email = localStorage.getItem('email')
    const [openlog, setlogOpen] = React.useState(false);


    const handleClose = () => setlogOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const drawerWidth = 240;
    const mdTheme = createTheme({
        overrides: {
            MuiButton: {
                label: {
                    color: "red",
                    fontFamily: 'Poppins',
                },
            },
        }

    });
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const logout = () => {
        const jwt = localStorage.getItem('UserToken')

        try {
            axios({
                method: 'post',
                url: `${backEndDomain}/webapi/webauthentication/logout`,
                headers: {
                    'Content-type': 'application/json',
                    'token': jwt,
                }
            })
                .then(function (response) {
                    if (response.data.message == "You Are LoggedOut Successfully") {
                        navigate('/')
                        localStorage.removeItem("Profilepic");

                    }
                }).catch(function (response) {

                });
        } catch (err) {
        }
    }

  
    return (
        <div className='searchLayout'>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    {setOpen}
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', background: 'white'
                            }}
                        >
                            <Box className='logo-header'>
                                <div onClick={() => navigate('/knowledgeBase')}>
                                    <img src={LogoLrg} className='img-logo'></img>
                                </div>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Button className='lg-icon' onClick={() => { setlogOpen(true); }}> <Icon.Power /></Button>

                                <Stack className='user-profile-wrapper'>


                                    <Box>
                                        <Typography color="primary">Welcome</Typography>
                                        <Typography color="primary" variant="caption" display="block" gutterBottom>{Email}</Typography>
                                    </Box>
                                    <Box className='user-profile-sml' onClick={() => { navigate('/myprofile'); }}>
                                        <img className="profilepic" src={profilepic} alt={userHeader}></img>

                                    </Box>
                                </Stack>

                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) => theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />

                        {children}

                        <Footer />
                    </Box>
                </Box>
            </ThemeProvider>
            <Modal
                open={openlog}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title">
                        Are you sure you want to logout?
                        {/* sure */}
                    </Typography>

                    <Box className='btn-flx' sx={{ mt: 3, marginLeft: '50px' }}>
                        <Button variant="contained" startIcon={<LogoutIcon />} sx={{ mr: 1 }} onClick={logout}>Okay</Button>
                        <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => { setlogOpen(false); }}>Cancel</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    )

}
export default Layout;