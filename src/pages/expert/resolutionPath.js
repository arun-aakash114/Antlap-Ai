import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import Explayout from '../../components/expert/explayout'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStep, addSubStep, changeStage, revertStepAndSubStep } from '../../store/reducers/stages';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { Circles } from 'react-loader-spinner'
import ShieldIcon from '@mui/icons-material/Shield';
import FormBom from '../../components/expert/formBom';
import { updateParams } from '../../store/reducers/dataManageForm';
import CreateGeneralResolution from '../../components/expert/createGeneralResolution';
import CreateResolutionPath from '../../components/expert/createResolutionPath';
import { addSolution } from '../../store/reducers/resolutionPath';
import { commonaddSolution } from '../../store/reducers/commonresolutionPath';
import { DoneOutline } from '@mui/icons-material';
import { getDataForApi, clearData } from '../../store/reducers/cardData';
import { addinfostepdata, addinfosubstepdata, generalResolution, submit, addinfodata } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import IconButton from '@mui/material/IconButton';
import CancelIcon from "@mui/icons-material/Cancel";
import Done from "@mui/icons-material/Done";
import CreateIcon from '@mui/icons-material/Create';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export const alphabets = [
    '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


const ResolutionPath = (props, ref) => {
    let { stages, cardData, toaster } = useSelector(state => state);
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const location = useLocation();
    
    // ______________ Create General Resolution

    const [generalResol, setGeneralResol] = React.useState([]);
    const [disablestatus, setDisablestatus] = React.useState({});
    const [currentstage, setCurrentstage] = React.useState('');
    const [modelControl, setModelControl] = React.useState(false)
    const [error, setError] = React.useState({});
    const creategeneralresref = useRef();

    const [addindex, setAddIndex] = React.useState(1);


    useEffect(() => {
        sessionStorage.setItem('buttonsDisable', true)
        sessionStorage.setItem('resolutionPathInd', 1);
        sessionStorage.removeItem('res')
        setAddIndex(1)
    }, [])

    const addGeneralResol = () => {
        setAddMore(true);
        if (sessionStorage.getItem('BOMpartno') === null || sessionStorage.getItem('BOMpartno') === '') {

            setCaradCont(false)
            setCurrentstage('create')
            dispatch(clearData())
            const addGenRes = [...generalResol, []]
            dispatch(commonaddSolution({ value: generalResol }))
            setGeneralResol(addGenRes)
            sessionStorage.removeItem('res')
            sessionStorage.removeItem('noteData')
            dispatch((changeStage('GenaralRes')))
            setDisablestatus({ ...disablestatus, add: false, create: true })
        } else {
            alert('Please save the data')
        }
    }

    // ______________ Create Resolution Path

    const [resolPath, setResolPath] = React.useState([]);


    const addResolPath = () => {
        sessionStorage.setItem('buttonsDisable', true)
        setAddMore(true);
        if (sessionStorage.getItem('BOMpartno') === null || sessionStorage.getItem('BOMpartno') === '') {

            setCaradCont(false)
            let res = sessionStorage.getItem('res');
            if (!res || res.length === 0) {
                setCurrentstage('add')
                dispatch(clearData())
                dispatch(revertStepAndSubStep())
                dispatch(changeStage('Solution Path'))
                const addResPath = [...resolPath, []]
                dispatch(addSolution({ value: resolPath }))
                setResolPath(addResPath)
                sessionStorage.removeItem('res')
                sessionStorage.removeItem('noteData')
                setDisablestatus({ ...disablestatus, add: true })

                if (currentstage !== 'create' && currentstage !== '') {
                    let resPathInd = sessionStorage.getItem('resolutionPathInd');
                    sessionStorage.setItem('resolutionPathInd', Number(resPathInd) + 1)
                    setAddIndex(Number(resPathInd) + 1)
                }
            } else {
                alert('Please save the data')
            }
        } else {
            alert('Please save the data')
        }
    }

    const submitForApproval = async () => {
        if (!creategeneralresref.current.bomdatacheck()) {
            if (sessionStorage.getItem('BOMpartno') === null || sessionStorage.getItem('BOMpartno') === '') {

                sessionStorage.removeItem('res')
                sessionStorage.removeItem('noteData')
                let res = await submit({ tenantId: localStorage.getItem('TenantId'), sourceId: sessionStorage.getItem('SourceId') });
                if (res.code === 200) {
                    navigate('/solutionDashboard')
                    setCaradCont(true)
                    window.location.reload(true)
                }
            } else {
                alert('Please save the data before submit for approval')
            }
        } else {
            alert('Please save the data before submit for approval')
        }
    }

    
    // _____________________  ai resolution path - Data submit
    const [cardCont, setCaradCont] = React.useState(false)
// NOSONAR Start
    const resPathDataSubmit = async () => {
        let val = creategeneralresref.current.getresolutionvalue();
        let reso = sessionStorage.getItem('res')
        let noteData = sessionStorage.getItem('noteData')
        if (reso.length < 10) {
            alert('Please enter resolution')
        } else {

            setError({
                resolution: ''
            })
            dispatch(updateToast({ field: 'valid' }));
            let proType = sessionStorage.getItem('proType');
            dispatch(getDataForApi())
            let payload
            if (stages.stage === 'Solution Path') {
                if (proType === 'Non IoT') {

                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        ProblemCode: location.state.data.ProblemCode[0] || '',
                        complaintDes: location.state.data.complaintDes || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        faultCode: location.state.data.faultCode || '',
                        faultCodeDes: location.state.data.faultDesc || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        sourceId: sessionStorage.getItem('SourceId'),
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: [cardData.SupportingDocumentURL.toString()],
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || []
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || []
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }
                let res = await addinfodata(payload);
                if (res.code === 200) {
                    sessionStorage.setItem('buttonsDisable', false)
                    sessionStorage.removeItem('res')
                    sessionStorage.removeItem('noteData')
                    sessionStorage.setItem('cardPanel', `gr_resolution${0}`)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                    setModelControl(false)
                    setsaveButtonCont(true)
                    setCaradCont(true)
                    setAddMore(false)
                    setDisablestatus({ ...disablestatus, create: true, add: false })
                    alert('Data added successfully')
                }
            } else if (stages.stage === 'GenaralRes') {
                if (proType === 'Non IoT') {

                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        ProblemCode: location.state.data.ProblemCode[0] || '',
                        complaintDes: location.state.data.complaintDes || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        commoninfo: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        faultCode: location.state.data.faultCode || '',
                        faultCodeDes: location.state.data.faultDesc || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        commoninfo: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }
                }
                payload.commoninfo[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || []
                    }
                )
                payload.commoninfo[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || []
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.commoninfo[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.commoninfo[0].RequiredSpecialTools.push(row)
                    }
                }
                let res = await generalResolution(payload);
                if (res.code === 200) {
                    sessionStorage.setItem('buttonsDisable', true)
                    sessionStorage.setItem('cardPanel', `gr_resolution${0}`)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                    setCaradCont(true)
                    setModelControl(false)
                    setsaveButtonCont(true)
                    setAddMore(false)
                    sessionStorage.removeItem('res')
                    sessionStorage.removeItem('noteData')
                    alert('Data added successfully')
                }

            } else if (stages.stage === 'Step') {
                if (proType === 'Non IoT') {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        ProblemCode: location.state.data.ProblemCode[0] || '',
                        complaintDes: location.state.data.complaintDes || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }
                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        faultCode: location.state.data.faultCode || '',
                        faultCodeDes: location.state.data.faultDesc || '',
                        step: `Step ${stages.stepIndex}`,
                        sourceId: sessionStorage.getItem('SourceId'),
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || [],
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || []
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }

                let res = await addinfostepdata(payload);
                if (res.code === 200) {
                    sessionStorage.setItem('buttonsDisable', false)
                    sessionStorage.setItem('cardPanel', `gr_resolution${0}`)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    sessionStorage.removeItem('res')
                    sessionStorage.removeItem('noteData')
                    dispatch(clearData())
                    setCaradCont(true)
                    setModelControl(false)
                    setsaveButtonCont(true)
                    setAddMore(false)
                    setDisablestatus({ ...disablestatus, add: false, create: true })
                    alert('Data added successfully')
                }

            } else {
                //sub-step
                if (proType === 'Non IoT') {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        ProblemCode: location.state.data.ProblemCode[0] || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        complaintDes: location.state.data.complaintDes || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Sub Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }
                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model || '',
                        Prefix: location.state.data.Prefix || '',
                        serialNoRange: location.state.data.serialNoRange || '',
                        SMCScode: location.state.data.SMCScode[0] || '',
                        faultCode: location.state.data.faultCode || '',
                        faultCodeDes: location.state.data.faultDesc || '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Sub Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: noteData ? noteData : '',
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || []
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || []
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }

                let res = await addinfosubstepdata(payload);
                if (res.code === 200) {
                    sessionStorage.setItem('buttonsDisable', false)
                    sessionStorage.setItem('cardPanel', `gr_resolution${0}`)
                    sessionStorage.removeItem('res')
                    sessionStorage.removeItem('noteData')
                    setModelControl(false)
                    setAddMore(false)
                    setsaveButtonCont(true)
                    setCaradCont(true)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                    alert('Data added successfully')
                }

            }
        }


    }
    const [saveButtonCont, setsaveButtonCont] = React.useState(true)

    useEffect(() => {
        if (stages.disableSave !== saveButtonCont) {
            setsaveButtonCont(stages.disableSave)
        }
    }, [stages.disableSave]);

    const [addmore, setAddMore] = useState(true)
    const addMore = () => {
        dispatch(clearData());
        sessionStorage.setItem('buttonsDisable', true);
        sessionStorage.removeItem('res')
        sessionStorage.removeItem('noteData')
        setAddMore(true)
        setCaradCont(false)
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
            dd.smcsCode = location.state.data.SMCScode[0].split(',').map(str => {
                if (str.length > 0) {
                    const [descc, ...rest] = str.split('-');
                    const desc = descc + '-' + rest.join('-')
                    return { desc };
                }
                return ""
            })
            dispatch(updateParams({ value: dd }))
            navigate("/addSolution", {
                state: { act: location.state.act, id: location.state.id },
            });
        } else {
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.serialNumber = location.state.data.model
            dd.complaintDescripton = location.state.data.complaintDes
            dd.serialNoRange = location.state.data.serialNoRange
            dd.problemCode = location.state.data.ProblemCode[0].split(',').map(str => {
                const [code, desc] = str.split('-');
                return { code, desc };
            })

            dd.smcsCode = location.state.data.SMCScode[0].split(',').map(str => {
                if (str.length > 0) {
                    const [descc, ...rest] = str.split('-');
                    const desc = descc + '-' + rest.join('-')
                    return { desc };
                }
                return ""
            })
            dispatch(updateParams({ value: dd }))
            navigate("/addSolution", {
                state: { act: location.state.act, id: location.state.id },
            });
        }

    }

    const ddStep = () => {
        let respo = sessionStorage.getItem('res');
        setCaradCont(false)
        if (!respo) {
            if (stages.stepIndex > 0 && creategeneralresref.current.getresolutionvalue().length === 0 && sessionStorage.getItem('buttonsDisable') === 'true') {
                alert('Please enter the data and save it')

            } else {
                dispatch(addStep())
                sessionStorage.setItem('stage', 'resolutionPathStep')
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', true);
                sessionStorage.removeItem('res')
                sessionStorage.removeItem('noteData')
            }
        } else {
            alert('Please save the data')
        }
    }

    return (
        <Explayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Create General Resolution layout ---------------------------------------------- */}
                {toaster.loader && <Circles
                    height="80"
                    width="80"
                    color="#2c79ff"
                    ariaLabel="circles-loading"
                    wrapperStyle={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    wrapperClass="loader-style"
                    visible={true}
                />}

                <div className='crt-general-resolution'>
                    <div className='box-header dt-mgmt'>
                        <h2 className="page-heding">Create General Resolution </h2>

                        <div className='tb-btns'>
                            <Button variant="contained" size="medium" color={disablestatus.add ? "secondary" : 'primary'} disabled={disablestatus.add} startIcon={< ShieldIcon />} onClick={() => addResolPath()}>
                                Add Resolution Path
                            </Button>


                            < Button variant="contained" size="medium" color={disablestatus.create ? "secondary" : 'primary'} disabled={disablestatus.create} startIcon={<AddIcon />} onClick={() => addGeneralResol()}>
                                Create General Resolution
                            </Button>


                        </div>
                    </div>


                    <Box className='contact-info'>
                        {addindex}
                        {/* _____________________ Left Panel _____________________ */}
                        <Card className='model-cart'>
                            {location.state.act === 'edit' && <IconButton aria-label="delete" onClick={editParams} className='sidebaredit'>
                                <CreateIcon color='primary' fontSize='small' />
                            </IconButton>}
                            <CardContent sx={{ overflow: 'overlay', height: '100%' }}>
                                <div className="rowdata">
                                    <ul>
                                        <li><div className='iconwrap'></div> <div className='det_right'><Typography className='font-14'>Model</Typography> <Typography className='text-bold'>{location.state.data.model} </Typography></div></li>

                                        <li>
                                            <div className='iconwrap'> </div>
                                            {location.state.data.Prefix &&
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Serial Prefix</Typography >
                                                    <Typography className='text-bold'>{location.state.data.Prefix}</Typography>

                                                </div>
                                            }

                                        </li>

                                        <li>

                                            <div className='iconwrap'> </div>
                                            {location.state.data.serialNoRange &&

                                                <div className='det_right'>
                                                    <Typography className='font-14'>Serial No.Range</Typography>
                                                    <Typography className='text-bold'>{location.state.data.serialNoRange}</Typography>
                                                </div>
                                            }
                                        </li>
                                        {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                {
                                                    location.state.data.faultCode &&

                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Fault Code</Typography>
                                                        {
                                                            location.state.data.faultCode.split(',').map((faultcode) =>
                                                                <Typography key={faultcode} className='text-bold'>{faultcode}</Typography>
                                                            )
                                                        }
                                                    </div>
                                                }

                                            </li>
                                                <li>

                                                    <div className='iconwrap'> </div>
                                                    {
                                                        location.state.data.faultDesc &&


                                                        <div className='det_right'><Typography className='font-14'>Fault Code Description</Typography>
                                                            {(location.state.data && location.state.data.faultDesc) ?
                                                                location.state.data.faultDesc.split(',').map((data) => (
                                                                    <Typography key={data} className='text-bold'>{data}</Typography>
                                                                ))
                                                                :
                                                                <div>No data available</div>
                                                            }
                                                        </div>
                                                    }
                                                </li>
                                            </>}

                                        {sessionStorage.getItem('proType') === 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Problem / Description Code</Typography>
                                                    {
                                                        location.state.data.ProblemCode[0].split(',').map((prblm) =>
                                                            <Typography key={prblm} className='text-bold'>{prblm}</Typography>
                                                        )
                                                    }
                                                    <b></b> </div>
                                            </li></>}
                                        <li>

                                            <div className='iconwrap'> </div>
                                            {
                                                location.state.data.SMCScode &&
                                                <div className='det_right'>
                                                    <Typography className='font-14'>SMCS Component Code</Typography>
                                                    {(location.state.data && location.state.data.SMCScode[0]) ?
                                                        location.state.data.SMCScode[0].split(',').map((data) => (
                                                            <Typography key={data} className="text-bold">
                                                                {data}{" "}
                                                            </Typography>))
                                                        :
                                                        <div>No data available</div>
                                                    }
                                                </div>
                                            }
                                        </li>
                                        {sessionStorage.getItem('proType') === 'Non IoT' && <li>

                                            <div className='iconwrap'> </div>
                                            <div className='det_right'>
                                                <Typography className='font-14'>Complaint Description</Typography>
                                                <Typography className='text-bold'>{location.state.data.complaintDes} </Typography>

                                            </div>
                                        </li>}

                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <div className='resolution-path'>
                            {/* _____________________ General Resolution _____________________ */}

                            {
                                stages.stage === 'GenaralRes' &&

                                <CreateGeneralResolution cardCont={cardCont} ref={creategeneralresref} />
                            }



                            {/* _____________________ Resolution Path _____________________ */}

                            <div className='add-resol-path'>
                                {
                                    (stages.stage === 'Solution Path' || stages.stage === 'Step' || stages.stage === 'Sub Step') &&
                                    <CreateResolutionPath cardCont={cardCont} ref={creategeneralresref} />
                                }

                            </div>

                            {/* _____________________ Add BOM _____________________ */}
                            {
                                stages.stage === 'Bom' &&

                                <div className='bom-content-wrapper'>
                                    <FormBom ref={creategeneralresref} />
                                </div>
                            }
                            {error.resolution && <div className='error'>{error.resolution}</div>}
                            <Box className='card-btns'>
                                {
                                    (['GenaralRes', 'Solution Path', 'Step', 'Sub Step'].includes(stages.stage)) &&
                                    <Button variant="contained" size="medium" disabled={saveButtonCont} color="primary" startIcon={<SaveIcon />} onClick={() => setModelControl(true)}>
                                        Save
                                    </Button>
                                }
                                {
                                    (['Solution Path', 'Step', 'Sub Step'].includes(stages.stage)) &&
                                    <Button variant="contained" size="medium" color="primary" startIcon={< ShieldIcon />} onClick={() => ddStep()}>
                                        Add step
                                    </Button>
                                }
                                {
                                    (['Solution Path'].includes(stages.stage)) &&
                                    <Button variant="contained" size="medium" color="primary" disabled={addmore} startIcon={< AddIcon />} onClick={() => addMore()}>
                                        Add More
                                    </Button>
                                }
                                {
                                    (['Sub Step', 'Step', 'Solution Path'].includes(stages.stage)) &&

                                    <Button variant="contained" size="medium" color="primary" disabled={sessionStorage.getItem('buttonsDisable') === 'true' ? true : false} startIcon={< AddIcon />} onClick={() => { dispatch(changeStage('Bom')); sessionStorage.setItem('buttonsDisable', true); sessionStorage.removeItem('noteData'); sessionStorage.removeItem('res'); }}>
                                        Add BOM
                                    </Button>
                                }
                                {
                                    (stages.stage === 'Step' || stages.stage === 'Sub Step') &&
                                    <Button variant="contained" disabled={sessionStorage.getItem('buttonsDisable') === 'true' ? true : false} size="medium" color="primary" startIcon={< AddIcon />} onClick={() => { dispatch(addSubStep()); sessionStorage.setItem('buttonsDisable', true); sessionStorage.removeItem('noteData'); sessionStorage.removeItem('res'); setCaradCont(false) }}>
                                        Add SubStep
                                    </Button>
                                }
                                {
                                    (stages.stage === 'Bom') &&
                                    <Button variant="contained" size="medium" color="primary" startIcon={<DoneOutline />} onClick={() => submitForApproval()}>
                                        Submit for Approval
                                    </Button>
                                }
                            </Box>
                        </div>
                    </Box>
                </div>
            </Container>
            <Dialog
                open={modelControl}
                onClose={() => setModelControl(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to save the entire form and proceed to a new form?"}</DialogTitle>
                <DialogActions>
                    <Button
                        className="btn-primary mr"
                        variant="contained"
                        startIcon={<Done />}
                        sx={{ mr: 2 }}
                        onClick={() => resPathDataSubmit()}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => setModelControl(false)}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Explayout >
    )
}
// NOSONAR End

export default ResolutionPath
