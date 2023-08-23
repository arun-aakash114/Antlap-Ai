import React from 'react'
import Explayout from '../../components/expert/explayout';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import PropTypes from 'prop-types';
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import ArticleIcon from '@mui/icons-material/Article';
import ConstructionIcon from '@mui/icons-material/Construction';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import sam from '../../assets/sam.png';
import tool from '../../assets/tool.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function View() {
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    const [imageopen, setImageopen] = React.useState(false);
    const [videoopen, setVideoopen] = React.useState(false);
    const navigate = useNavigate();
    const [reasonopen, setReasonopen] = React.useState(false);
    const handlereasonopen = () => setReasonopen(true);
    const reasonClose = () => { setReasonopen(false) }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };
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
    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const feature_slide = {
        autoplay: false,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        indicators: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    indicators: true,
                    speed: 3000
                }
            },

        ]
    }

    const videoSrc = {
        type: "video",
        sources: [
            {
                src: "LXb3EKWsInQ",
                provider: "youtube"
            }
        ]
    };
    const imagePlayeropen = () => { setImageopen(true) }
    const imageClose = () => { setImageopen(false) }
    const videoPlayeropen = () => { setVideoopen(true) }
    const videoClose = () => { setVideoopen(false) }

    function docopen() {
        window.open("http://www.africau.edu/images/default/sample.pdf", "_blank");
    }

    return (
        <><Explayout>
            <Button
                variant="contained"
                className='tool-btn'
                startIcon={
                    <img src={tool} alt='' className='spl-ti' >

                    </img>
                }
                onClick={handlereasonopen}>
                <span className='spl-t'>Special tool</span>
            </Button>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box className='box-header'>
                    <h2 className="page-heding">Result(s)found <span className='header-count'>02</span>


                    </h2>
                    <Button
                        type="submit"
                        // size="large"
                        variant="contained"
                        className='back-btn'
                        onClick={() => { navigate('/result') }}
                    >
                        <ChevronLeftIcon />Back
                    </Button>

                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Typography><b>Serial No</b> : RDZ02321&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Model/Prefix</b> : 320D2&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Sl. No Range</b> : RDZ00001-07921&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>SMCS Component : 5454</b> - SWING RELIEF VALVE  </Typography>
                            <br /><Typography><b>Problem Code / Description</b> : 66 - Pressure Too Low</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Card className='solutionpath-box'>
                                <CardContent>
                                    <Typography className='fo-border'><span className='solution-count'>A</span>Solution path

                                    </Typography>
                                    <Box className='contact-info'>
                                        <Typography className='fo-reco'>Recommendation</Typography>
                                        <Card>
                                            <CardContent>
                                                <p>"Relief Valve (Swing) - Test and Adjust (M0069414-04)<br />
                                                    Specification<br />
                                                    ""Relief Valve (Swing) - Test and Adjust""<br />
                                                    Date :<br />
                                                    Machine Serial Number :<br />
                                                    Machine Settings: Engine Speed<br />
                                                    Engine speed dial ""10"".<br />
                                                    AEC switch OFF<br />
                                                    Item :<br />
                                                    Specification :<br />
                                                    Right Swing 26000 ± 1000 kPa (3770 ± 145 psi).<br />
                                                    Actual:........................<br />
                                                    Specification :<br />
                                                    Left Swing 26000 ± 1000 kPa (3770 ± 145 psi) .<br />
                                                    Actual:........................<br />
                                                    "Illustration 1<br />
                                                    Tooling (A) 198-4240 Digital Pressure Indicator Gp.<br />
                                                    Illustration 2<br />
                                                    Pump compartment<br />
                                                    (1) Pressure tap (delivery pressure for drive pump)<br />
                                                    (2) Pressure tap (delivery pressure for idler pump)<br />
                                                    Illustration 3<br />
                                                    Pilot oil manifold<br />
                                                    (4) Connector<br />
                                                    (5) Swing brake solenoid valve<br />
                                                    Illustration 4<br />
                                                    Swing motor<br />
                                                    (6) Adjustment plug<br />
                                                    (7) Locknut<br />
                                                    (8) Relief valve (right swing)<br />
                                                    (9) Relief valve (left swing)<br />
                                                    (10) Adjustment plug<br />
                                                    (11) Locknut<br />
                                                    "Machine Preparation<br />
                                                    1. Position the machine on level ground.<br />
                                                    2. Stop the engine.<br />
                                                    3. Release the pressure in the hydraulic system. Refer to Testing and Adjusting, ""Hydraulic System Pressure - Release"".<br />
                                                    4. Connect a 41,368 kPa (6,000 psi) pressure sensor to pressure tap (2).<br />
                                                    5. Disconnect connector (4) from swing brake solenoid valve (5).<br />
                                                </p>



                                            </CardContent>
                                        </Card>
                                        <Box className="btn_align_right">
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
                                                //onClick={handleClick}
                                                className="btn_viewmore"
                                            >
                                                View More...
                                            </Button>

                                        </Box>

                                        <Typography className='fd-step'>Step - 1</Typography>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs aria-label="basic tabs example" value={value} onChange={handleChange}>
                                                <Tab icon={<ArticleIcon />} {...a11yProps(0)} />
                                                <Tab icon={<ConstructionIcon />} {...a11yProps(1)} />
                                                <Tab icon={<InsertDriveFileIcon />} {...a11yProps(2)} />
                                                <Tab icon={<PhotoIcon />} {...a11yProps(3)} />
                                                <Tab icon={<VideoLibraryIcon />} {...a11yProps(4)} />

                                            </Tabs>
                                        </Box>
                                        <Card className='tap-cart'>
                                            <CardContent>
                                                <TabPanel index={0} value={value}>

                                                    <p>1. Start the engine
                                                    </p>

                                                </TabPanel>
                                                <TabPanel index={1} value={value}>
                                                    <p> 367-3070 Fuel Injector Installation and Removal Tooling</p>
                                                </TabPanel>
                                                <TabPanel index={2} value={value}>
                                                    <p onClick={docopen}>sample.pdf</p>
                                                </TabPanel>
                                                <TabPanel index={3} value={value}>
                                                    <img src={sam} alt='' onClick={imagePlayeropen}></img><img src={sam} alt='' onClick={imagePlayeropen}></img>
                                                </TabPanel>
                                                <TabPanel index={4} value={value}>
                                                    <div className='video'>
                                                        <a>
                                                            <span className="circle" onClick={videoPlayeropen}>
                                                                <span className="triangle" onClick={videoPlayeropen}></span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <h5>sample.mp4</h5>
                                                </TabPanel>
                                            </CardContent></Card>

                                        <Typography className='fd-step'>Step - 2</Typography>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs aria-label="basic tabs example1" value={value1} onChange={handleChange1}>
                                                <Tab icon={<ArticleIcon />} {...a11yProps(0)} />
                                                <Tab icon={<ConstructionIcon />} {...a11yProps(1)} />
                                                <Tab icon={<InsertDriveFileIcon />} {...a11yProps(2)} />
                                                <Tab icon={<PhotoIcon />} {...a11yProps(3)} />
                                                <Tab icon={<VideoLibraryIcon />} {...a11yProps(4)} />

                                            </Tabs>
                                        </Box>
                                        <Card className='tap-cart'>
                                            <CardContent>
                                                <TabPanel index={0} value={value1}>
                                                    <p>2. Place the machine controls at the following settings: engine speed dial ""10"" and AEC switch OFF.
                                                        Reference: Refer to Testing and Adjusting, ""Engine Performance - Test (Engine Speed)"" for engine rpm settings.
                                                    </p>
                                                </TabPanel>
                                                <TabPanel index={1} value={value1}>
                                                    <p> 367-3070 Fuel Injector Installation and Removal Tooling</p>
                                                </TabPanel>
                                                <TabPanel index={2} value={value1}>
                                                    <p onClick={docopen}>sample.pdf</p>
                                                </TabPanel>
                                                <TabPanel index={3} value={value1}>
                                                    <img src={sam} alt='' onClick={imagePlayeropen}></img><img src={sam} alt='' onClick={imagePlayeropen}></img>
                                                </TabPanel>
                                                <TabPanel index={4} value={value1}>
                                                    <div className='video'>
                                                        <a>
                                                            <span className="circle" onClick={videoPlayeropen}>
                                                                <span className="triangle" onClick={videoPlayeropen}></span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <h5>sample.mp4</h5>
                                                </TabPanel>
                                            </CardContent>
                                        </Card>
                                        <Typography className='fd-step'>Step - 3</Typography>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs aria-label="basic tabs example1" value={value2} onChange={handleChange2}>
                                                <Tab icon={<ArticleIcon />} {...a11yProps(0)} />
                                                <Tab icon={<ConstructionIcon />} {...a11yProps(1)} />
                                                <Tab icon={<InsertDriveFileIcon />} {...a11yProps(2)} />
                                                <Tab icon={<PhotoIcon />} {...a11yProps(3)} />
                                                <Tab icon={<VideoLibraryIcon />} {...a11yProps(4)} />

                                            </Tabs>
                                        </Box>
                                        <Card className='tap-cart'>
                                            <CardContent className='tab-cc'>
                                                <TabPanel index={0} value={value2}>
                                                    <p>3. Move the swing joystick slowly and ensure that the swing parking brake is operating properly.</p>

                                                </TabPanel>
                                                <TabPanel index={1} value={value2}>
                                                    <p> 367-3070 Fuel Injector Installation and Removal Tooling</p>
                                                </TabPanel>
                                                <TabPanel index={2} value={value2}>
                                                    <p onClick={docopen}>sample.pdf</p>
                                                </TabPanel>
                                                <TabPanel index={3} value={value2}>
                                                    <img src={sam} alt='' onClick={imagePlayeropen}></img><img src={sam} alt='' onClick={imagePlayeropen}></img>
                                                </TabPanel>
                                                <TabPanel index={4} value={value2}>
                                                    <div className='video'>
                                                        <a>
                                                            <span className="circle" onClick={videoPlayeropen}>
                                                                <span className="triangle" onClick={videoPlayeropen}></span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <h5>sample.mp4</h5>
                                                </TabPanel>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                </CardContent></Card>
                        </CardContent></Card></Box>
                {/* ____________________view image model____________ */}
                <Modal
                    open={imageopen}
                    onClose={imageClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='close-btn-modal'>
                            <Typography id="modal-modal-title1" variant="h6" component="h2">
                                Images
                            </Typography><CloseIcon className='civ' onClick={imageClose} /></div>
                        <Slide {...feature_slide}><img src={sam} alt=''></img><img src={sam} alt=''></img><img src={sam} alt=''></img> </Slide>
                    </Box>
                </Modal>
                {/* ____________________video player model____________ */}
                <Modal
                    open={videoopen}
                    onClose={videoClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1}>
                        <div className='close-btn-modal'>
                            <Typography id="modal-modal-title1" variant="h6" component="h2">
                                Big Buck Bunny
                            </Typography><CloseIcon className='civ' onClick={videoClose} /></div>
                        <Plyr source={videoSrc} />
                    </Box>
                </Modal>


            </Container>
            {/* __________________Special tool modal  _________________  */}

            <Modal
                open={reasonopen}
                onClose={reasonClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Required Tools:
                    </Typography>
                    <Typography>
                        Tool Item Qty Part Number Description
                        B 198-4240 Digital Pressure Indicator Gp
                        B1 1 198-4234 Indicator
                        B2 1 198-4239 Pressure Sensor 41,368 kPa
                        (6,000 psi)
                        B3 1 198-4236 Extension Cable
                    </Typography>
                    <Box className="ok-btn">

                        <Button variant="contained" onClick={reasonClose}>Ok</Button>
                    </Box>
                </Box>
            </Modal>
        </Explayout></>
    )
}

export default View;