import React, { useState, useEffect } from 'react'
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-slideshow-image/dist/styles.css';
import "plyr-react/plyr.css"
import { useNavigate } from 'react-router-dom';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import setting from '../../assets/settingsicon.svg';
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import cam from '../../assets/cam.svg';
import document from '../../assets/document.svg';
import { getIcondata } from '../../service/apiServices/resultServices';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LayersIcon from '@mui/icons-material/Layers';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GeneralDelete, StepDelete, SubStepDelete, updateSubstepNumber, updatestepNumber } from '../../service/apiServices/aisourceCreation';
import { useDispatch, useSelector } from 'react-redux';
import { updateToast } from '../../store/reducers/toasters';
import { Circles } from "react-loader-spinner";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[10],
        fontSize: 14,
    },
}));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
// NOSONAR Start
function ResolutionCarddata(props) {
    const navigate = useNavigate();
    let dispatch = useDispatch()
    let toaster = useSelector((state) => state.toaster);
    const [resolutionData, setResolutionData] = useState([])
    const [iconName, setIconName] = useState('Resolution')
    const [opens, setOpens] = useState(false);
    const modalClose = () => setOpens(false);
    useEffect(() => {
        setResolutionData(props.Resolution)
    }, [])

    const iconfunction = async (iconname, id, backendicon) => {
        let response = await getIcondata(iconname, id)
        if (response.status === 200) {
            if (iconname === 'Resolution') {
                setResolutionData([response.data.data[0][backendicon]])
                setIconName(iconname)
            } else if (iconname === 'Note') {
                setResolutionData(response.data.data[0][backendicon])
                setIconName('Note')
            } else {
                setResolutionData(response.data.data[0][backendicon])
                setIconName(iconname)
            }
        }
    }

    const deleteGenRes = async () => {
        dispatch(updateToast({ field: 'loader' }));
        let fdata = {
            "SourceFileId": Number(props.source),
        }
        let res = await GeneralDelete(fdata)
        if (res.code === 200) {
            dispatch(updateToast({ field: 'revertLoader' }));
            window.location.reload(true)
        }
    }

    const deleteStepData = async (step, id) => {
        dispatch(updateToast({ field: 'loader' }));
        let Stname = Number(step.split(" ")[1])
        let path = props.cardname.split(" ")[0]
        let fdata = {
            "ResolutionPath": path,
            "SourceFileId": Number(props.source),
        }
        let res = await StepDelete(fdata)
        if (res.code === 200) {
            for (let items of props.resstep) {
                let Sname = Number(items.ResolutionSteps.split(" ")[1] - 1)
                let Sname1 = items.ResolutionSteps.split(" ")[0]
                let stepname = Sname1.concat(" ", Sname)

                const filterStep = items.ResolutionSteps.split(" ")[1]
                const filterStep1 = filterStep.split('').filter((item) => item > Stname)
                for (let j of filterStep1) {
                    const req = {
                        "StepName": stepname,
                        "ResolutionPathName": path,
                        "SourceId": Number(sessionStorage.getItem('SourceId')),
                        "SourceFileId": items.SourceFileId,
                    }
                    await updatestepNumber(req)
                }
            }
            dispatch(updateToast({ field: 'revertLoader' }));
            window.location.reload(true)
        }

    }

    const deleteSubstepData = async (stepVal, sfile) => {
        dispatch(updateToast({ field: 'loader' }));
        let path = props.cardname.split(" ")[0]
        let fdata = {
            "ResolutionPath": path,
            "SourceFileId": Number(props.source),
        }
        let res = await SubStepDelete(fdata)
        if (res.code === 200) {
            function getStepNum(step) {
                return Number(step.split(/\s+/).pop())
            }
            function updateStepName(name) {
                const newVal = (Number(getStepNum(name)) - 1)
                const lastIndex = name.lastIndexOf(' ');
                return name.substring(0, lastIndex) + ' ' + newVal;
            }
            const filterPath = props.ressubstep.substep.filter((item) => getStepNum(item.ResolutionSteps) > getStepNum(stepVal))
            for (let x of filterPath) {
                const req = {
                    "ResolutionPathName": path,
                    "SourceId": Number(sessionStorage.getItem('SourceId')),
                    "StepName": updateStepName(x.ResolutionSteps),
                    "SourceFileId": x.SourceFileId,
                    "StepSourceFileId": sfile
                }
                await updateSubstepNumber(req)
            }
            dispatch(updateToast({ field: 'revertLoader' }));
            window.location.reload(true)
        }
    }

    return (
        <>
            <div
                className={toaster.loader ? "parentDisable" : ""}
                width="100%"
            >
                {toaster.loader && (
                    <Circles
                        height="80"
                        width="80"
                        color="#2c79ff"
                        ariaLabel="circles-loading"
                        wrapperStyle={{
                            position: "absolute",
                            top: "45%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                        wrapperClass="loader-style"
                        visible={true}
                    />
                )}
                {props.commoninfo && <>   <Card className='resolution-box1 common-info header_comp' >
                    <div>
                        {iconName === "Resolution" &&
                            <Typography>
                                <img src={document} alt='' className='title_icon'></img>Resolution
                            </Typography>
                        }
                        {iconName === "CommonTools" &&
                            <Typography>
                                <img src={setting} alt='' className='title_icon'></img>Common Tool
                            </Typography>
                        }
                        {iconName === "RequiredSpecialTools" &&
                            <Typography>
                                <img src={toolicon} alt='' className='title_icon'></img>Required Special Tool
                            </Typography>
                        }
                        {iconName === "SupportingDocuments" &&
                            <Typography>
                                <img src={file} alt='' className='title_icon'></img>Supporting Document
                            </Typography>
                        }
                        {iconName === "Note" &&
                            <Typography>
                                <img src={notes} alt='' className='title_icon'></img>Note
                            </Typography>
                        }
                        {iconName === "Photo" &&
                            <Typography>
                                <img src={cam} alt='' className='title_icon'></img>Photo
                            </Typography>
                        }
                        {iconName === "Video" &&
                            <Typography>
                                <VideocamOutlinedIcon className='title_icon' />Video
                            </Typography>
                        }
                    </div>
                    <div>
                        {props.act === 'edit' &&
                            <>
                                <LightTooltip title="Edit General Resolution" placement='top'>
                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'edit', cardname: props.cardname, apiname: 'updategeneralResolution' } }) }}>
                                        <CreateIcon color='primary' fontSize='small' />
                                    </IconButton>
                                </LightTooltip>
                                <LightTooltip title="Delete General Resolution" placement='top-start'>
                                    <IconButton className='resultedit' aria-label="delete">
                                        <DeleteIcon sx={{ color: 'red' }} fontSize='small' onClick={() => deleteGenRes()} />
                                    </IconButton>
                                </LightTooltip>
                                {props?.addResPath === true &&
                                    <LightTooltip title="Add Solution Path" placement='top-start'>
                                        <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'add', cardname: props.solutionpathname, apiname: 'addinfodata' } }) }} >
                                            <TextIncreaseIcon color='primary' fontSize='small' />
                                        </IconButton>
                                    </LightTooltip>

                                }
                            </>
                        }
                    </div>
                </Card>

                    <Card className='resolution-cart-step'>
                        <CardContent>

                            <div className='resol_wrap'>
                                <div className='resol_left'>
                                    {resolutionData?.length !== 0 &&
                                        <div className="line-sp 2">
                                            <>
                                                {iconName === "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element, ids) => {
                                                            return (<Typography key={ids} className="lineemit"> {element}</Typography>)
                                                        })
                                                        }
                                                    </>
                                                }
                                                {iconName !== "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element) => (
                                                            <>
                                                                {element.split(",").map((item) => (
                                                                    item.startsWith('https') ? <div> <a href={item} target="_blank"> {item}</a> </div> : <Typography className="lineemit"> {item}</Typography>
                                                                ))}
                                                            </>
                                                        )
                                                        )}
                                                    </>
                                                }
                                            </>
                                        </div>
                                    }
                                    {resolutionData?.length === 0 &&
                                        <Typography>No Data Available</Typography>
                                    }
                                </div>
                                <div className='resol_right'>
                                    <div className='icon-vertical-alien'>
                                        <IconButton className={iconName === "Resolution" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Resolution", props.source, "Resolutions")}>  <img src={document} alt='' className="res-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "CommonTools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("CommonTools", props.source, "CommonTools")}>   <img src={setting} alt='' className="set-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "RequiredSpecialTools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source, "RequiredSpecialTools")}>   <img src={toolicon} alt='' className="stool-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "SupportingDocuments" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("SupportingDocuments", props.source, "SupportingDocument")} >   <img src={file} alt='' className="file-icon"></img></IconButton><br />
                                        <IconButton className={iconName === "Note" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Note", props.source, "NoteDocument")}>   <img src={notes} alt='' className="note-icon" ></img></IconButton><br />
                                        <IconButton className={iconName === "Photo" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Photo", props.source, "Photo")}>  <img src={cam} alt='' className="cam-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "Video" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Video", props.source, "Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card></>}

                {props.info && <>   <Card className='resolution-box1 common-step header_comp' >

                    <div>
                        {iconName === "Resolution" &&
                            <Typography>
                                <img src={document} alt='' className='title_icon'></img>Resolution
                            </Typography>
                        }
                        {iconName === "CommonTools" &&
                            <Typography>
                                <img src={setting} alt='' className='title_icon'></img>Common Tool
                            </Typography>
                        }
                        {iconName === "RequiredSpecialTools" &&
                            <Typography>
                                <img src={toolicon} alt='' className='title_icon'></img>Required Special Tool
                            </Typography>
                        }
                        {iconName === "SupportingDocuments" &&
                            <Typography>
                                <img src={file} alt='' className='title_icon'></img>Supporting Document
                            </Typography>
                        }
                        {iconName === "Note" &&
                            <Typography>
                                <img src={notes} alt='' className='title_icon'></img>Note
                            </Typography>
                        }
                        {iconName === "Photo" &&
                            <Typography>
                                <img src={cam} alt='' className='title_icon'></img>Photo
                            </Typography>
                        }
                        {iconName === "Video" &&
                            <Typography>
                                <VideocamOutlinedIcon className='title_icon' />Video
                            </Typography>
                        }
                    </div>
                    <div>
                        {props.act === 'edit' &&
                            <>
                                <LightTooltip title="Edit path Resolution" placement='top'>
                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'edit', cardname: props.cardname, apiname: 'updateinfodata' } }); }}>
                                        <CreateIcon color='primary' fontSize='small' />
                                    </IconButton>
                                </LightTooltip>
                                <LightTooltip title="Add path Resolution" placement='top'>
                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'add', cardname: props.addres, apiname: 'addinfodata' } }); }}>
                                        <AddIcon color='secondery' fontSize='small' />
                                    </IconButton>
                                </LightTooltip>
                                <LightTooltip title="Delete path Resolution" placement='top-start'>
                                    <IconButton className='resultedit' aria-label="delete">
                                        <DeleteIcon sx={{ color: 'red' }} fontSize='small' onClick={() => deleteGenRes()} />
                                    </IconButton>
                                </LightTooltip>
                                {props?.addStep === true &&
                                    <LightTooltip title="Add Step" placement='top-start'>
                                        <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'add', cardname: props.stepname, apiname: 'addinfostepdata' } }); }}>
                                            <LibraryAddIcon color='primary' fontSize='small' />
                                        </IconButton>
                                    </LightTooltip>
                                }
                                {props?.addBom === true &&
                                    <LightTooltip title="Add BOM" placement='top-start'>
                                        <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'BOM', process: 'add', apiname: 'addbomdata', path: props.cardname.charAt(0) } }); }}>
                                            <LayersIcon color='primary' fontSize='small' />
                                        </IconButton>
                                    </LightTooltip>
                                }
                            </>
                        }</div>
                </Card>

                    <Card className='resolution-cart-step'>
                        <CardContent>

                            <div className='resol_wrap'>
                                <div className='resol_left'>
                                {resolutionData?.length !== 0 &&
                                        <div className="line-sp 2">
                                            <>
                                                {iconName === "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element, ids) => {
                                                            return (<Typography key={ids} className="lineemit"> {element}</Typography>)
                                                        })
                                                        }
                                                    </>
                                                }
                                                {iconName !== "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element) => (
                                                            <>
                                                                {element.split(",").map((item) => (
                                                                    item.startsWith('https') ? <div> <a href={item} target="_blank"> {item}</a> </div> : <Typography className="lineemit"> {item}</Typography>
                                                                ))}
                                                            </>
                                                        )
                                                        )}
                                                    </>
                                                }
                                            </>
                                        </div>
                                    }
                                    {resolutionData?.length === 0 &&
                                        <Typography>No Data Available</Typography>
                                    }
                                </div>
                                <div className='resol_right'>
                                    <div className='icon-vertical-alien'>
                                        <IconButton className={iconName === "Resolution" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Resolution", props.source, "Resolutions")}>  <img src={document} alt='' className="res-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "CommonTools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("CommonTools", props.source, "CommonTools")}>   <img src={setting} alt='' className="set-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "RequiredSpecialTools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source, "RequiredSpecialTools")}>   <img src={toolicon} alt='' className="stool-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "SupportingDocuments" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("SupportingDocuments", props.source, "SupportingDocument")} >   <img src={file} alt='' className="file-icon"></img></IconButton><br />
                                        <IconButton className={iconName === "Note" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Note", props.source, "NoteDocument")}>   <img src={notes} alt='' className="note-icon" ></img></IconButton><br />
                                        <IconButton className={iconName === "Photo" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Photo", props.source, "Photo")}>  <img src={cam} alt='' className="cam-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "Video" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Video", props.source, "Video")}>  <VideocamOutlinedIcon /> </IconButton><br /></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card></>}

                {props.step && <>   <Card className='resolution-box1 common-substep header_comp' >
                    <div>
                        {iconName === "Resolution" &&
                            <Typography>
                                <img src={document} alt='' className='title_icon'></img>Resolution
                            </Typography>
                        }
                        {iconName === "CommonTools" &&
                            <Typography>
                                <img src={setting} alt='' className='title_icon'></img>Common Tool
                            </Typography>
                        }
                        {iconName === "RequiredSpecialTools" &&
                            <Typography>
                                <img src={toolicon} alt='' className='title_icon'></img>Required Special Tool
                            </Typography>
                        }
                        {iconName === "SupportingDocuments" &&
                            <Typography>
                                <img src={file} alt='' className='title_icon'></img>Supporting Document
                            </Typography>
                        }
                        {iconName === "Note" &&
                            <Typography>
                                <img src={notes} alt='' className='title_icon'></img>Note
                            </Typography>
                        }
                        {iconName === "Photo" &&
                            <Typography>
                                <img src={cam} alt='' className='title_icon'></img>Photo
                            </Typography>
                        }
                        {iconName === "Video" &&
                            <Typography>
                                <VideocamOutlinedIcon className='title_icon' />Video
                            </Typography>
                        }
                    </div>
                    <div>{props.act === 'edit' &&
                        <>
                            <LightTooltip title="Edit Step" placement='top'>
                                <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'edit', cardname: props.cardname, apiname: 'updateinfostepdata' } }); }}>
                                    <CreateIcon color='primary' fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title="Add Step" placement='top'>
                                <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'add', cardname: props.addsteps, apiname: 'addinfostepdata' } }); }}>
                                    <AddIcon color='secondery' fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title="Delete Step" placement='top-start'>
                                <IconButton className='resultedit' aria-label="delete" onClick={() => setOpens(true)} >
                                    <DeleteIcon sx={{ color: 'red' }} fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                            {props?.addSubStep === true &&
                                <LightTooltip title="Add Sub Step" placement='top-start'>
                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, sourceid: props.source, type: 'General', process: 'add', cardname: props.substepname, apiname: 'addinfosubstepdata' } }); }}>
                                        <FileCopyIcon color='primary' fontSize='small' />
                                    </IconButton>
                                </LightTooltip>
                            }
                        </>
                    }
                    </div>
                </Card>

                    <Modal
                        open={opens}
                        onClose={modalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Do you want to delete Step and it's Substeps?
                            </Typography>
                            <Box className="fo-right">
                                <Box className="btn-flx">
                                    <div className='decline-btn'>
                                        <Button variant="contained" size="medium" color="secondary" startIcon={<CloseIcon />} onClick={() => setOpens(false)} >
                                            No
                                        </Button>
                                        <Button variant="contained" size="medium" color="primary" startIcon={<DoneIcon />} onClick={() => deleteStepData(props.resolutionstep, props.stepindex)} >
                                            Yes
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>

                    <Card className='resolution-cart-step'>
                        <CardContent>

                            <div className='resol_wrap'>
                                <div className='resol_left'>
                                {resolutionData?.length !== 0 &&
                                        <div className="line-sp 2">
                                            <>
                                                {iconName === "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element, ids) => {
                                                            return (<Typography key={ids} className="lineemit"> {element}</Typography>)
                                                        })
                                                        }
                                                    </>
                                                }
                                                {iconName !== "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element) => (
                                                            <>
                                                                {element.split(",").map((item) => (
                                                                    item.startsWith('https') ? <div> <a href={item} target="_blank"> {item}</a> </div> : <Typography className="lineemit"> {item}</Typography>
                                                                ))}
                                                            </>
                                                        )
                                                        )}
                                                    </>
                                                }
                                            </>
                                        </div>
                                    }
                                    {resolutionData?.length === 0 &&
                                        <Typography>No Data Available</Typography>
                                    }
                                </div>
                                <div className='resol_right'>
                                    <div className='icon-vertical-alien'>
                                        <IconButton className={iconName === "Resolution" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Resolution", props.source, "Resolutions")}>  <img src={document} alt='' className="res-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "CommonTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("CommonTools", props.source, "CommonTools")}>   <img src={setting} alt='' className="set-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "RequiredSpecialTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source, "RequiredSpecialTools")}>   <img src={toolicon} alt='' className="stool-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "SupportingDocuments" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("SupportingDocuments", props.source, "SupportingDocument")} >   <img src={file} alt='' className="file-icon"></img></IconButton><br />
                                        <IconButton className={iconName === "Note" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Note", props.source, "NoteDocument")}>   <img src={notes} alt='' className="note-icon" ></img></IconButton><br />
                                        <IconButton className={iconName === "Photo" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Photo", props.source, "Photo")}>  <img src={cam} alt='' className="cam-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "Video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Video", props.source, "Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card></>}
                {props.substep && <>   <Card className='resolution-box1 common-substep header_comp' >
                    <div>
                        {iconName === "Resolution" &&
                            <Typography>
                                <img src={document} alt='' className='title_icon'></img>Resolution
                            </Typography>
                        }
                        {iconName === "CommonTools" &&
                            <Typography>
                                <img src={setting} alt='' className='title_icon'></img>Common Tool
                            </Typography>
                        }
                        {iconName === "RequiredSpecialTools" &&
                            <Typography>
                                <img src={toolicon} alt='' className='title_icon'></img>Required Special Tool
                            </Typography>
                        }
                        {iconName === "SupportingDocuments" &&
                            <Typography>
                                <img src={file} alt='' className='title_icon'></img>Supporting Document
                            </Typography>
                        }
                        {iconName === "Note" &&
                            <Typography>
                                <img src={notes} alt='' className='title_icon'></img>Note
                            </Typography>
                        }
                        {iconName === "Photo" &&
                            <Typography>
                                <img src={cam} alt='' className='title_icon'></img>Photo
                            </Typography>
                        }
                        {iconName === "Video" &&
                            <Typography>
                                <VideocamOutlinedIcon className='title_icon' />Video
                            </Typography>
                        }
                    </div>
                    <div>{props.act === 'edit' &&
                        <>
                            <LightTooltip title="Edit Sub Step" placement='top'>
                                <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, type: 'General', process: 'edit', cardname: props.cardname, apiname: 'updateinfosubstepdata' } }); }}>
                                    <CreateIcon color='primary' fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title="Add Sub Step" placement='top'>
                                <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: props.statedata, value: props.source, sourceid: props.stepsource, type: 'General', process: 'add', cardname: props.addsubsteps, apiname: 'addinfosubstepdata' } }); }}>
                                    <AddIcon color='secondery' fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title="Delete Sub Step" placement='top-start'>
                                <IconButton className='resultedit' aria-label="delete" onClick={() => deleteSubstepData(props.resolutionssubstep, props.stepsource)} >
                                    <DeleteIcon sx={{ color: 'red' }} fontSize='small' />
                                </IconButton>
                            </LightTooltip>
                        </>
                    }
                    </div>
                </Card>

                    <Card className='resolution-cart-step'>
                        <CardContent>

                            <div className='resol_wrap'>
                                <div className='resol_left'>
                                {resolutionData?.length !== 0 &&
                                        <div className="line-sp 2">
                                            <>
                                                {iconName === "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element, ids) => {
                                                            return (<Typography key={ids} className="lineemit"> {element}</Typography>)
                                                        })
                                                        }
                                                    </>
                                                }
                                                {iconName !== "Resolution" &&
                                                    <>
                                                        {resolutionData?.map((element) => (
                                                            <>
                                                                {element.split(",").map((item) => (
                                                                    item.startsWith('https') ? <div> <a href={item} target="_blank"> {item}</a> </div> : <Typography className="lineemit"> {item}</Typography>
                                                                ))}
                                                            </>
                                                        )
                                                        )}
                                                    </>
                                                }
                                            </>
                                        </div>
                                    }
                                    {resolutionData?.length === 0 &&
                                        <Typography>No Data Available</Typography>
                                    }
                                </div>
                                <div className='resol_right'>
                                    <div className='icon-vertical-alien'>
                                        <IconButton className={iconName === "Resolution" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Resolution", props.source, "Resolutions")}>  <img src={document} alt='' className="res-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "CommonTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("CommonTools", props.source, "CommonTools")}>   <img src={setting} alt='' className="set-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "RequiredSpecialTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source, "RequiredSpecialTools")}>   <img src={toolicon} alt='' className="stool-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "SupportingDocuments" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("SupportingDocuments", props.source, "SupportingDocument")} >   <img src={file} alt='' className="file-icon"></img></IconButton><br />
                                        <IconButton className={iconName === "Note" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Note", props.source, "NoteDocument")}>   <img src={notes} alt='' className="note-icon" ></img></IconButton><br />
                                        <IconButton className={iconName === "Photo" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Photo", props.source, "Photo")}>  <img src={cam} alt='' className="cam-icon"></img> </IconButton><br />
                                        <IconButton className={iconName === "Video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Video", props.source, "Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </>
                }
            </div>
        </>

    )
}
// NOSONAR End
export default ResolutionCarddata;
