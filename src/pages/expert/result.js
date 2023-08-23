import React from 'react'
import Explayout from '../../components/expert/explayout';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import 'react-slideshow-image/dist/styles.css';
import "plyr-react/plyr.css"
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Result() {

    const navigate = useNavigate();

    return (
        <><Explayout>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box className='box-header'>
                    <h2 className="page-heding">Result(s)found <span className='header-count'>02</span> </h2>
                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Typography><b>Serial No</b> : RDZ02321&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Model/Prefix</b> : 320D2&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Sl. No Range</b> : RDZ00001-07921&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>SMCS Component : 5454</b> - SWING RELIEF VALVE  </Typography>
                            <br/><Typography><b>Problem Code / Description</b> : 66 - Pressure Too Low</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Box className='solution-box'>
                           
                                        <Typography className='fd-step'><span className='solution-count-result'>A</span>Solution path
                                           
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                className="btn_green"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => { navigate('/view') }}                                                
                                            >
                                               <VisibilityOutlinedIcon/> View
                                            </Button>
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => { navigate('/execute') }}      
                                                className="btn_execute"
                                      
                                            >
                                               <ArrowRightAltIcon/> Execute
                                            </Button>
                                            </Typography>
                          
                            </Box>
                            <Box className='solution-box' sx={{ marginTop:1 }}>
                          
                                        <Typography className='fd-step'><span className='solution-count-result'>B</span>Solution path
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                               // onClick={() => { navigate('/view') }}                                                
                                                className="btn_green"
                                            >
                                                <VisibilityOutlinedIcon/> View
                                            </Button>
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2}}
                                              //  onClick={() => { navigate('/execute') }}      
                                            className="btn_execute"

                                            >
                                               <ArrowRightAltIcon/> Execute
                                            </Button></Typography>
                              
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Container>
        </Explayout></>
    )
}

export default Result;