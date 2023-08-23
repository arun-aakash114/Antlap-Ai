import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import { getResolutions } from '../../service/apiServices/resultServices';
import CreateIcon from '@mui/icons-material/Create';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Icon from 'react-bootstrap-icons';
import LayersIcon from '@mui/icons-material/Layers';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import 'react-slideshow-image/dist/styles.css';
import { Button } from '@mui/material';
import "plyr-react/plyr.css"
import IconButton from '@mui/material/IconButton';
import Layout from '../../components/searchLayout';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { updateParams } from '../../store/reducers/dataManageForm';
import ResolutionCarddata from '../../components/expert/cardResolution';
import ResolutionPath from './resolutionPath';
import AddIcon from '@mui/icons-material/Add';
import { DoneOutline } from '@mui/icons-material';
import { BomDataDelete, SolutionPathDelete, submit, updateSoluPathName } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import { Circles } from "react-loader-spinner";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { getStep } from '../../components/expert/helper';



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
// NOSONAR Start
const ViewResolutions = (props) => {
    let location = useLocation();
    const navigate = useNavigate();
    let dispatch = useDispatch()
    let { toaster } = useSelector(state => state);
    const [resolutions, setResolutions] = useState([]);
    const [commenresolutiondata, setcommenresolutiondata] = React.useState([]);
    const [viewedit, setViewEdit] = React.useState();


    useEffect(() => {
        getResolution();
    }, [])

    const getResolution = async () => {
        let response = await getResolutions(location.state.id);
        sessionStorage.setItem('SourceId', location.state.id)
        if (response.status === 200 && response.data.data.length !== 0) {
            setResolutions(response.data.data)
            setcommenresolutiondata(response.data.data)
            setViewEdit(true)
        } else {
            setViewEdit(false)
        }
    }

    const submitForApproval = async () => {
        if (sessionStorage.getItem('BOMpartno') === null || sessionStorage.getItem('BOMpartno') === '') {

            sessionStorage.removeItem('res')
            sessionStorage.removeItem('noteData')
            let res = await submit({ tenantId: localStorage.getItem('TenantId'), sourceId: sessionStorage.getItem('SourceId') });
            if (res.code === 200) {
                navigate('/solutionDashboard')
                window.location.reload(true)
            }
        } else {
            alert('Please save the data before submit for approval')
        }
    }

    const editParams = () => {
        let dd = {}
        let combinedArray = []
        if (sessionStorage.getItem('proType') === 'IoT') {
            location.state.data.faultCode.split(',').map((str, i) => {
                let obj = {};
                obj.code = location.state.data.faultCode.split(',')[i];
                obj.desc = location.state.data.faultDesc.split(',')[i];
                combinedArray.push(obj); //to store in redux structure of faultCode
            })
            dd.serialNumber = location.state.data.model
            dd.serialNoRange = location.state.data.serialNoRange
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.faultCode = combinedArray
            dd.smcsCode = location.state.data.SMCScode.join(',').split(',').map(str => {
                if (str.length > 0) {
                    const [descc, ...rest] = str.split('-');
                    const desc = descc + '-' + rest.join('-')
                    return { desc };
                }
                return ""
            })
            dispatch(updateParams({ value: dd }))
            navigate('/addSolution', { state: { act: location.state.act, id: location.state.id } })
        } else {
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.serialNumber = location.state.data.model
            dd.complaintDescripton = location.state.data.complaintDes
            dd.serialNoRange = location.state.data.serialNoRange
            dd.problemCode = location.state.data.ProblemCode.join(',').split(',').map(str => {
                const [code, desc] = str.split('-');
                return { code, desc };
            })

            dd.smcsCode =
                location.state.data.SMCScode.join(',').split(',').map(str => {
                    if (str.length > 0) {
                        const [descc, ...rest] = str.split('-');
                        const desc = descc + '-' + rest.join('-')
                        return { desc };
                    }
                    return ""
                })
            dispatch(updateParams({ value: dd }))
            navigate('/addSolution', { state: { act: location.state.act, id: location.state.id } })
        }
    }

    const deleteSolutionPath = async (val) => {
        dispatch(updateToast({ field: 'loader' }));
        let fdata = {
            "ResolutionPath": val,
            "SourceId": sessionStorage.getItem('SourceId'),
        }
        let res = await SolutionPathDelete(fdata)
        if (res.code === 200) {
            const filterPath = resolutions[0].SolutionPath.filter((item) => item.ResolutionPath > val)
            for (let items of filterPath) {
                const req = {
                    "ResolutionPathName": String.fromCharCode(items.ResolutionPath.charCodeAt(0) - 1),
                    "SourceId": Number(sessionStorage.getItem('SourceId')),
                    "SourceFileId": items.SourceFileId,
                }
                await updateSoluPathName(req)
            }
            dispatch(updateToast({ field: 'revertLoader' }));
            window.location.reload(true)
        }
    }

    const deleteBomData = async (val, partno) => {
        dispatch(updateToast({ field: 'loader' }));
        let Bomids = []
        Bomids.push(partno)
        let fdata = {
            "BomId": Bomids,
            "ResolutionPath": val,
            "SourceId": Number(sessionStorage.getItem('SourceId')),
        }
        let res = await BomDataDelete(fdata)
        if (res.code === 200) {
            dispatch(updateToast({ field: 'revertLoader' }));
            window.location.reload(true)
        }
    }

    return (
        <>{viewedit ?
            <>
                <Layout>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                            <Box className='box-header'>
                                <h3 className="page-heading">{location.state.act} Solution</h3>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className='btn-secondary'
                                        onClick={() => navigate('/solutionDashboard')}
                                    >
                                        Back
                                    </Button>
                                    {location.state.act === 'edit' &&
                                        commenresolutiondata[0]?.Resolution.length === 0 &&
                                        < Button
                                            variant="contained"
                                            size="medium"
                                            color={commenresolutiondata[0]?.Resolution.length === 0 ? "primary" : 'secondary'}
                                            disabled={commenresolutiondata[0]?.Resolution.length !== 0 ? true : false}
                                            startIcon={<AddIcon />}
                                            onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, act: location.state.act, source: sessionStorage.getItem('SourceId'), type: 'General', cardname: 'General Resolution', process: 'add', apiname: 'generalResolution' } }); }} >
                                            Create General Resolution
                                        </Button>}
                                </div>
                            </Box>
                            <Box className='contact-info'>
                                <Card className='model-cart'>
                                    {location.state.act === 'edit' && <IconButton aria-label="delete" onClick={editParams} className='sidebaredit'>
                                        <CreateIcon color='primary' fontSize='small' />
                                    </IconButton>}
                                    <CardContent sx={{ overflow: 'overlay', height: '100%' }}>
                                        <div className="rowdata d-block">
                                            <ul>
                                                <li>
                                                    <div className='iconwrap'><Icon.GearFill className='icon' /> </div>
                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Model/Prefix :</Typography >
                                                        <Typography className='text-bold'>{location.state.data.model} / {location.state.data.Prefix}</Typography>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='iconwrap'><Icon.DatabaseFill className='icon' /></div>
                                                    <div className='det_right'><Typography className='font-14'>Serial No Range :</Typography>
                                                        <Typography className='text-bold'> {location.state.data.serialNoRange || "No data available"}</Typography>
                                                    </div>
                                                </li>

                                                {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                                    <>
                                                        <li>

                                                            <div className='iconwrap'><Icon.ExclamationCircleFill className='icon' /> </div>
                                                            <div className='det_right'>
                                                                <Typography className='font-14'>Fault Code :</Typography>
                                                                {
                                                                    location.state.data.faultCode.split(',').map((data) => (
                                                                        <Typography key={data} className='text-bold'>{data}</Typography>
                                                                    ))

                                                                }
                                                                <b></b> </div>
                                                        </li>
                                                        <li>
                                                            <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>

                                                            <div className='det_right'><Typography className='font-14'>Fault Code Description :</Typography>
                                                                {(location.state.data && location.state.data.faultDesc) ?
                                                                    location.state.data.faultDesc.split(',').map((data) => (
                                                                        <Typography key={data} className='text-bold'>{data}</Typography>
                                                                    ))
                                                                    :
                                                                    <div>No data available</div>
                                                                }
                                                            </div>
                                                        </li>
                                                    </>
                                                }
                                                {sessionStorage.getItem('proType') === 'Non IoT' && <li>
                                                    <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>
                                                    <div className='det_right'><Typography className='font-14'>Problem Code / Description :</Typography>
                                                        {/* <Typography className='text-bold'>{location.state.data.ProblemCode}</Typography> */}
                                                        {location.state.data.ProblemCode[0].split(',').map(
                                                            (probCode) => (
                                                                <Typography key={probCode} className="text-bold">
                                                                    {probCode}{" "}
                                                                </Typography>
                                                            )
                                                        )}
                                                    </div>
                                                </li>}
                                                {location.state.data.SMCScode !== "" && <li>
                                                    <div className='iconwrap'><Icon.BoxSeamFill className='icon' /> </div>
                                                    <div className='det_right'>
                                                        <Typography className='font-14'>SMCS Component :</Typography>
                                                        {/* <Typography className='text-bold'>{location.state.data.SMCScode}</Typography> */}
                                                        {(location.state.data && location.state.data.SMCScode[0]) ?
                                                            location.state.data.SMCScode[0].split(',').map((data) => (
                                                                <Typography key={data} className="text-bold">
                                                                    {data}{" "}
                                                                </Typography>))
                                                            :
                                                            <div>No data available</div>
                                                        }
                                                    </div>
                                                </li>}
                                                {sessionStorage.getItem('proType') === 'Non IoT' &&
                                                    <li>
                                                        <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>
                                                        <div className='det_right'><Typography className='font-14'>Complaint Description:</Typography>

                                                            <Typography className='text-bold'>{location.state.data.complaintDes}</Typography>
                                                        </div>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className='resolution-box1'>

                                    {commenresolutiondata[0]?.Resolution?.map((elem, ids) => {
                                        return (
                                            <Card key={ids} style={{ marginTop: '10px' }} className='solutionpath-box fo-width' >
                                                <CardContent>
                                                    <ResolutionCarddata Resolution={[elem.Resolutionvalue]} commoninfo={true} source={elem.SourceFileId} statedata={location.state.data} index={ids} cardname={`General Resolution`} addgen={`General Resolution ${commenresolutiondata[0].Resolution.length + 1}`} act={location.state.act} solutionpathname={`A Solution Path`} addResPath={getStep(resolutions[0]?.SolutionPath)} />
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                    {resolutions[0]?.SolutionPath?.map((value, key) => (
                                        <><Card style={{ marginTop: '10px' }} className='solutionpath-box fo-width'>
                                            <CardContent>
                                                <div className='bom-align'>
                                                    <Typography className='fo-border'>
                                                        <span className='solution-count'>{value.ResolutionPath}</span>Solution Path
                                                    </Typography>
                                                    {location.state.act === 'edit' &&
                                                        <div>
                                                            {
                                                                (resolutions[0]?.SolutionPath?.length - 1 === key) &&
                                                                <LightTooltip title="Add Solution Path" placement='top'>
                                                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, source: value.SourceFileId, type: 'General', cardname: `${String.fromCharCode(value.ResolutionPath.charCodeAt(0) + 1)} Solution Path`, process: 'add', apiname: 'addinfodata' } }); }}>
                                                                        <AddIcon color='secondery' fontSize='small' />
                                                                    </IconButton>
                                                                </LightTooltip>
                                                            }
                                                            {
                                                                (value.Resolutions.length === 0) &&
                                                                <LightTooltip title="Add Path Resolution" placement='top'>
                                                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, source: value.SourceFileId, type: 'General', cardname: `${value.ResolutionPath} Path Resolution`, process: 'add', apiname: 'addinfodata' } }); }}>
                                                                        <NoteAddIcon color='primary' fontSize='small' />
                                                                    </IconButton>
                                                                </LightTooltip>
                                                            }
                                                            <LightTooltip title="Delete Solution Path" placement='top-start'>
                                                                <IconButton className='resultedit' aria-label="delete" onClick={() => deleteSolutionPath(value.ResolutionPath)} >
                                                                    <DeleteIcon sx={{ color: 'red' }} fontSize='small' />
                                                                </IconButton>
                                                            </LightTooltip>
                                                        </div>
                                                    }
                                                </div>
                                                {value.Resolutions.map((val, id) => (
                                                    <ResolutionCarddata key={id} Resolution={[val.Resolutions]} info={true} source={val.SourceFileId} statedata={location.state.data} index={id} cardname={`${value.ResolutionPath} Path Resolution ${id + 1}`} addres={`${value.ResolutionPath} Path Resolution ${resolutions[0].SolutionPath[key].Resolutions.length + 1}`} stepname={`${value.ResolutionPath} Step 1`} act={location.state.act} addStep={getStep(value.Step)} addBom={getStep(value.Bom)} />


                                                ))}
                                                {value.Step.map((data, keys) => (
                                                    <>
                                                        <h2 className='border'>{data.ResolutionSteps}</h2>
                                                        <ResolutionCarddata Resolution={data.Resolutions} resstep={resolutions[0].SolutionPath[key].Step} stepindex={keys} step={true} statedata={location.state.data} source={data.SourceFileId} cardname={`${value.ResolutionPath} ${data.ResolutionSteps}`} addsteps={`${value.ResolutionPath} Step ${resolutions[0].SolutionPath[key].Step.length + 1}`} index={keys} act={location.state.act} substepname={`${value.ResolutionPath} Sub Step 1`} addSubStep={getStep(data.substep)} resolutionstep={data.ResolutionSteps} solpath={value.ResolutionPath} />

                                                        {data.substep.map((valu, i) => (
                                                            <>
                                                                <h2 className='border'>{`Sub Step ${data.ResolutionSteps.split(" ")[1]} : ${valu.ResolutionSteps.split(" ")[2]}`}</h2>
                                                                <ResolutionCarddata Resolution={[valu.Resolutions]} ressubstep={resolutions[0].SolutionPath[key].Step[keys]} stepindex={keys} substepindex={i} source={valu.SourceFileId} stepsource={data.SourceFileId} statedata={location.state.data} substep={true} index={i} act={location.state.act} cardname={`${value.ResolutionPath} ${valu.ResolutionSteps}`} addsubsteps={`${value.ResolutionPath} Sub Step ${resolutions[0].SolutionPath[key].Step[keys].substep.length + 1}`} resolutionssubstep={valu.ResolutionSteps} solupath={value.ResolutionPath} />

                                                            </>
                                                        ))}
                                                    </>
                                                ))}
                                                <>
                                                    {value.Bom.length !== 0 && <Card className='resolution-box1 common-step header_comp'>
                                                        <div><Typography> <span> <LayersIcon className='title_icon' />BOM</span>
                                                        </Typography></div>
                                                        <div> {location.state.act === 'edit' &&
                                                            <>
                                                                <LightTooltip title="Edit BOM Data" placement='top'>
                                                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, value: value.Bom[0].SourceFiles_SourceFileId, type: 'BOM', process: 'edit', apiname: 'updatebomdata', path: value.ResolutionPath } }); }}>
                                                                        <CreateIcon color='primary' fontSize='small' />
                                                                    </IconButton>
                                                                </LightTooltip>
                                                                <LightTooltip title="Add BOM Data" placement='top-start'>
                                                                    <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, value: sessionStorage.getItem('SourceId'), type: 'BOM', process: 'add', apiname: 'addbomdata', path: value.ResolutionPath } }); }}>
                                                                        <AddIcon color='secondery' fontSize='small' />
                                                                    </IconButton>
                                                                </LightTooltip>
                                                            </>
                                                        }</div>
                                                    </Card>}
                                                    {value.Bom.length !== 0 && <Card className='resolution-cart-step'>
                                                        <CardContent>
                                                            {value.Bom.map((data, ids) => {
                                                                if (data.PartsNo !== "")
                                                                    return (
                                                                        <> 
                                                                        <Accordion>
                                                                            <AccordionSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                id="panel1a-header"
                                                                                className='bom-box'
                                                                            >
                                                                                <Typography >Parts No. {data.PartsNo}</Typography>
                                                                                {location.state.act === 'edit' && 
                                                                                <>
                                                                                <LightTooltip title="Delete BOM" placement='top'>
                                                                                    <IconButton className='resultedit' aria-label="delete" onClick={() => deleteBomData(value.ResolutionPath, value.Bom[ids].BOMPartId)} >
                                                                                        <DeleteIcon sx={{ color: 'red' }} fontSize='small' />
                                                                                    </IconButton>
                                                                                </LightTooltip>
                                                                                </>

                                                                                }
                                                                            </AccordionSummary>
                                                                            <AccordionDetails className='solutionaccdetails'>
                                                                                <div className='bom-det'>
                                                                                    <Typography>Description:</Typography>
                                                                                    <>
                                                                                        {data.PartsDescription &&
                                                                                            <Typography className="text-bold">{data.PartsDescription}</Typography> ||
                                                                                            <Typography className="text-bold">Not Available</Typography> 
                                                                                        }
                                                                                    </>
                                                                                </div>

                                                                                <div className='bom-det'>
                                                                                    <Typography>Qty: </Typography>
                                                                                    <>
                                                                                        {data.Qty &&
                                                                                            <Typography className="text-bold">{Math.round(data.Qty)}</Typography> || 
                                                                                            <Typography className="text-bold">Not Available</Typography> 
                                                                                        }
                                                                                    </>
                                                                                </div>

                                                                                <div className='bom-det'>
                                                                                    <Typography >Supporting Document:
                                                                                    </Typography>
                                                                                    <>
                                                                                        {data.PartNumberSupportingDocument && data.PartNumberSupportingDocument.split(",").map((item, id) => {
                                                                                            return (
                                                                                                <div key={id}>
                                                                                                    <a className="bom-txt" href={item} target="_blank">{item}</a>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                            || 
                                                                                            <Typography className="text-bold">Not Available</Typography> 
                                                                                        }
                                                                                    </>
                                                                                </div>
                                                                                <div className='bom-det'>
                                                                                    <Typography>Note: </Typography>

                                                                                    {data.Note ? <div>
                                                                                        <Typography className='lineemit text-bold'>{data.Note}</Typography>
                                                                                    </div> :
                                                                                        <>
                                                                                            {data.NoteDocument && data.NoteDocument.split(",").map((items, id) => {
                                                                                                return (
                                                                                                    <div key={id}>
                                                                                                        <a className="bom-txt" href={items} target="_blank">{items} </a>
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                                ||
                                                                                                <Typography className="text-bold">Not Available</Typography> 
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                        </>)
                                                            })}
                                                        </CardContent>
                                                    </Card>}</>
                                            </CardContent>
                                        </Card> </>
                                    ))}
                                </div>

                            </Box>
                            <Box className='card-btns'>
                                {
                                    ((localStorage.getItem('userDesc') === 'Expert' && location.state.act === 'edit') &&
                                        (location.state.progress === 'In Progress' || location.state.progress === 'Declined')) &&
                                    <Button variant="contained" size="medium" color="primary" startIcon={<DoneOutline />} onClick={() => submitForApproval()}>
                                        Submit for Approval
                                    </Button>
                                }
                            </Box>
                        </div>
                    </Container>
                </Layout>
            </>

            : <ResolutionPath />}
        </>


    )
}

// NOSONAR End
export default ViewResolutions;