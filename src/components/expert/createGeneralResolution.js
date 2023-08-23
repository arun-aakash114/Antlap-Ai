import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { Card, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

// import '../../App.css'
import cam from '../../assets/cam.svg';
import setting from '../../assets/settingsicon.svg';
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import document from '../../assets/document.svg';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import { addData, addRow, deleteRow, checkboxclick, commonToolsData, specialToolsData, clearData, deleteURL, getDataForApi, updateFiles } from '../../store/reducers/cardData';
import { Deletefiles, fileHandleing, generalResolution, addinfodata, addinfostepdata, addeditinfosubstepdata, updateAPI, DelCommonReq } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import { setCursor, disableSave } from '../../store/reducers/stages';
import { onlyNumbers, setBGColor, getCount, setClassName } from './helper'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// NOSONAR Start
const CreateGeneralResolution = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const location = useLocation();
    let partref = useRef();
    let { cardData, stages } = useSelector(state => state)
    const [nores, setNores] = React.useState(location.state.process === "add" ? true : false);
    const [iconName, setIconName] = React.useState(sessionStorage.getItem('cardPanel'))
    const [notesData, setNotes] = React.useState('')
    const [resolutionText, setResolutionText] = React.useState('');
    const recommentationfunction = (e, index, data) => {
        e.preventDefault();
        setIconName(data + index);
        sessionStorage.setItem('cardPanel', data + index)
        sessionStorage.setItem('focus', 'PartsNo0')
    }

    //_____________________ Bootstrap Input
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor:  setBGColor(theme.palette.mode),
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    // ______________ Accordion Table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // ______________ Accordion Expand

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (index, panel) => (isExpanded) => {
        setExpanded(isExpanded ? panel : false);

        setIconName(`gr_resolution${index}`);
    };




    // ______________ Create Sub General Resolution

    const [subGeneralResol, setSubGeneralResol] = React.useState([]);

    useEffect(() => {
        addSubGeneralResol();
        if (props.cardname) {
            sessionStorage.setItem('res', cardData.Resolutions)
        }
    }, [])

    const addSubGeneralResol = (index) => {

        const addSubGenRes = [...subGeneralResol, []]
        setSubGeneralResol(addSubGenRes)



    }

    const handleDelete = async (name, value, index) => {
        const urlofapi = cardData[name][index]
        let res = await Deletefiles({ Url: [urlofapi] });
        if (res.code === 200) {
            dispatch(deleteURL({ name: name, index: index }))
        }

    }
    const removeToolData = async (field) => {
        if (props?.cardname) {
            let BOMids = []
            const DeletedData = cardData[field].filter((item) => item.checked === true);
            DeletedData.map((row, index) => (
                BOMids.push(row.BOMPartId)

            ))
            let payload = {
                "Bomids": BOMids.join(','),
                "SourceFileId": props.sourcefileid,
                "DataType": "Data",
                "Type": field
            }
            CallDeleteApi();
            async function CallDeleteApi() {
                if (BOMids.length !== 0) {
                    let res = await DelCommonReq(payload)
                    if (res.code === 200) {
                        dispatch(deleteRow({ field: field }))
                    }
                }
            }
        }
        else {
            dispatch(deleteRow({ field: field }))
        }
    }
    const handleClick = (name, value, index) => {
        window.open(value, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }

    const fileUpload = async (file, field, url) => {
        console.log(file)
        let docName = []
        const formData = new FormData();
        for (let item of file) {
            if (!cardData[field].includes(item.name)) {
                docName.push(item.name)
                formData.append("files", item);
            }
        }
        const count = getCount(formData)
        if (count) {
            let res = await fileHandleing(formData)
            if (res.status === 200) {
                dispatch(addData({ field: field, value: docName }));
                dispatch(addData({ field: url, value: res.path }))
            }
        }
    }

    const SaveEditData = async () => {
        dispatch(updateToast({ field: 'valid' }));
        let proType = sessionStorage.getItem('proType');
        dispatch(getDataForApi())
        let payload
        if (props.apiname === 'updateinfodata') {
            if (proType === 'Non IoT') {

                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode.join(',') : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }
            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: [cardData.SupportingDocumentURL.toString()],
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }

            }
            payload.info[0].CommonTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL ? cardData.PartNumberSupportingDocumentURL : ""
                }
            )
            payload.info[0].RequiredSpecialTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL ? cardData.PartNumberSupportingDocumentRsplURL : ""
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
            let res = await updateAPI(props.apiname, payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }
        } else if (props.apiname === 'addinfodata') {
            let [pathname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    path: pathname,
                    ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode[0] : '',
                    complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }

            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                    faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    path: pathname,
                    sourceId: sessionStorage.getItem('SourceId'),
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: [cardData.SupportingDocumentURL.toString()],
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
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
                alert('Data added successfully')
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }

        } else if (props.apiname === 'updategeneralResolution') {
            if (proType === 'Non IoT') {

                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode.join(',') : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    commoninfo: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }

            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    commoninfo: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }
            }
            payload.commoninfo[0].CommonTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL ? cardData.PartNumberSupportingDocumentURL : []
                }
            )
            payload.commoninfo[0].RequiredSpecialTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL ? cardData.PartNumberSupportingDocumentRsplURL : []
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
            let res = await updateAPI('updategeneralResolution', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })

            }

        } else if (props.apiname === 'updateinfostepdata') {
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode.join(',') : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }
            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    step: stepname.join(" "),
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }

            }
            payload.info[0].CommonTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL ? cardData.PartNumberSupportingDocumentURL : "",
                }
            )
            payload.info[0].RequiredSpecialTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL ? cardData.PartNumberSupportingDocumentRsplURL : ""
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

            let res = await updateAPI('updateinfostepdata', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }

        } else if (props.apiname === 'addinfostepdata') {
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode[0] : '',
                    complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }
            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                    faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                    step: stepname.join(" "),
                    sourceId: sessionStorage.getItem('SourceId'),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
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
                alert('Data added successfully')
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }
        } else if (props.apiname === 'generalResolution') {
            if (proType === 'Non IoT') {

                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode[0] : '',
                    complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    commoninfo: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]

                }

            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                    faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    commoninfo: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
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
                alert('Data added successfully')
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }
        } else if (props.apiname === 'addinfosubstepdata') {
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode[0] : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    sourceFileId: location.state.sourceid || "",
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }
            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: location.state.data.model ? location.state.data.model : '',
                    Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                    serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                    SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode[0] : '',
                    faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                    faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    sourceFileId: location.state.sourceid || "",
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
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
            let res = await addeditinfosubstepdata(payload);
            if (res.code === 200) {
                alert('Data added successfully')
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }
        } else {
            //sub-step
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode.join(',') : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }
            } else {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode.join(',') : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    step: stepname.join(" "),
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
                            CommonTools: [],
                            RequiredSpecialTools: [],
                            SupportingDocument: cardData.SupportingDocumentURL,
                            Photo: cardData.PhotoURL,
                            Video: cardData.VideoURL,
                            Note: sessionStorage.getItem('noteData') ? sessionStorage.getItem('noteData') : "",
                            NoteDocument: cardData.NoteDocumentURL
                        }
                    ]
                }

            }
            payload.info[0].CommonTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL ? cardData.PartNumberSupportingDocumentURL : ""
                }
            )
            payload.info[0].RequiredSpecialTools.push(
                {
                    PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL ? cardData.PartNumberSupportingDocumentRsplURL : ""
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

            let res = await updateAPI('updateinfosubstepdata', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
                navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
            }

        }
    }

    useImperativeHandle(ref, () => {
        return {
            getresolutionvalue: () => {
                return resolutionText;
            }
        }
    }, [resolutionText]);

    const removeSpecialToolfiles = async (file, key1, key2) => {
        const dataURL = cardData[key2];
        const data = cardData[key1];
        const index = data.findIndex((e) => e === file)

        let res = await Deletefiles({ Url: [dataURL[index]] });
        if (res.code === 200) {
            dispatch(updateFiles({ file, key1, key2 }))
        }
    }
    const commonToolData = cardData.CommonTools && cardData.CommonTools.length > 0 && cardData.CommonTools[0];
    const specialToolData = cardData.RequiredSpecialTools && cardData.RequiredSpecialTools.length > 0 && cardData.RequiredSpecialTools[0];

    return (
        <div>
            <div>
                <Card>
                    <CardContent className='remove-padding'>
                        <Accordion expanded={expanded} onChange={handleChange(0, `panel${0}`)}>
                            <AccordionSummary className='rm-bs'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className='iconNameSol'>
                                    <>
                                        {
                                            props.cardname ? props.cardname : "General Resolution"
                                        }
                                    </>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='resol_wrap'>
                                    <div className='resol_left'>
                                        {iconName === `gr_resolution${0}` &&
                                            <div className="line-sp">
                                                <typography className="typography">Resolution</typography>
                                                <TextField
                                                    className='autoheight'
                                                    multiline
                                                    disabled={props.cardCont}
                                                    rows={7}
                                                    height='auto'
                                                    placeholder="Type here"
                                                    name="Resolutions"
                                                    value={
                                                        resolutionText
                                                            ? resolutionText
                                                            : sessionStorage.getItem('res')
                                                    }
                                                    autoFocus={sessionStorage.getItem('res') || !sessionStorage.getItem('res')}
                                                    onChange={(e) => {
                                                        dispatch((setCursor(e.target.selectionStart)))
                                                        const val = e.target.value
                                                        setResolutionText(val)
                                                        sessionStorage.setItem('res', val);
                                                        dispatch((disableSave(val.length < 10)))
                                                        if (e.target.value.length < 10) {
                                                            setNores(true)
                                                        } else {
                                                            setNores(false)
                                                        }
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.selectionStart = stages.cursor;
                                                        e.target.selectionEnd = stages.cursor;
                                                    }}
                                                />

                                            </div>
                                        }
                                        {iconName === `gr_common_tools${0}` &&
                                            <div className="line-sp commn_tool_tbl">

                                                <div className='inner-table-header'>
                                                    <Typography>Common Tools</Typography>
                                                    <div className='right'>
                                                        <Button
                                                            variant="text"
                                                            component="label"
                                                            disabled={(commonToolData && (commonToolData.PartsNo || commonToolData.PartsDescription || commonToolData.Quantity))}
                                                        >
                                                            <AttachFileIcon
                                                                fontSize='small'
                                                            /> &nbsp; Upload Document
                                                            <input
                                                                type="file"
                                                                hidden
                                                                multiple
                                                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                                onChange={(e) => fileUpload(e.target.files, 'PartNumberSupportingDocument', 'PartNumberSupportingDocumentURL')}
                                                            />
                                                        </Button>
                                                        <Button className='text-light' variant="text" disabled={cardData.PartNumberSupportingDocumentURL?.length !== 0 ? true : false} onClick={() => dispatch(addRow({ field: 'CommonTools' }))} startIcon={<AddIcon />}>Add More</Button>
                                                        <IconButton className='bg-danger' aria-label="delete" onClick={(e) => { removeToolData("CommonTools") }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>

                                                </div>

                                                {/* table content and input goes here */}
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>#</StyledTableCell>
                                                                <StyledTableCell>Parts No.</StyledTableCell>
                                                                <StyledTableCell >Parts Description</StyledTableCell>
                                                                <StyledTableCell >Quantity</StyledTableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cardData.CommonTools.map((row, rowIndex) => (
                                                                <StyledTableRow key={rowIndex}>
                                                                    <StyledTableCell>
                                                                        <Checkbox {...label} checked={cardData.CommonTools[rowIndex].checked} disabled={cardData.PartNumberSupportingDocumentURL.length !== 0 ? true : false} onClick={(e) => dispatch(checkboxclick({ lineIndex: rowIndex, value: e.target.checked, field: 'CommonTools' }))} />
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput
                                                                                placeholder='Type here'
                                                                                name="PartsNo"
                                                                                ref={partref}
                                                                                id={`PartsNo-${rowIndex}`}
                                                                                disabled={cardData.PartNumberSupportingDocumentURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false}
                                                                                value={row.PartsNo}
                                                                                onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)))
                                                                                    dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsNo" }));
                                                                                    sessionStorage.setItem('focus', `PartsNo${rowIndex}`)
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </StyledTableCell>



                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput
                                                                                placeholder='Type here'
                                                                                name="PartsDescription"
                                                                                disabled={cardData.PartNumberSupportingDocumentURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false}
                                                                                value={row.PartsDescription}
                                                                                onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)));
                                                                                    dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsDescription" }));
                                                                                    sessionStorage.setItem('focus', `PartsDescription${rowIndex}`)
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput
                                                                                onKeyPress={(e) => {

                                                                                    const regex = /^\d+$/;
                                                                                    const { key } = e;
                                                                                    if (!regex.test(key)) {
                                                                                        e.preventDefault();
                                                                                    }
                                                                                }}
                                                                                placeholder='Type here'
                                                                                type="text"
                                                                                name="Quantity"
                                                                                disabled={cardData.PartNumberSupportingDocumentURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false}
                                                                                value={row.Quantity}
                                                                                onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)))
                                                                                    dispatch(commonToolsData({
                                                                                        value: e.target.value, rowIndex: rowIndex, column: "Quantity"
                                                                                    })); sessionStorage.setItem('focus', `Quantity${rowIndex}`)
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }}
                                                                                onPaste={(e) => onlyNumbers(e)}
                                                                            />
                                                                        </FormControl>
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>


                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.PartNumberSupportingDocumentURL.map((row, id) => (
                                                                    <Chip key={id} label={row.substring(0, 20)} variant="filled" name="PartNumberSupportingDocumentURL" onDelete={() => { handleDelete('PartNumberSupportingDocumentURL', row, id) }} onClick={() => { handleClick('PartNumberSupportingDocumentURL', row, id) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                                {cardData.PartNumberSupportingDocument.map((row, id) => (
                                                                    <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocument', 'PartNumberSupportingDocumentURL') }} />
                                                                ))}
                                                            </Stack>
                                                    }

                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_special_tools${0}` &&
                                            <div className="line-sp">

                                                <div className='inner-table-header'>
                                                    <Typography>Special tools</Typography>
                                                    <div className='right'>
                                                        <Button
                                                            variant="text"
                                                            component="label"
                                                            disabled={(specialToolData && (specialToolData.PartsNo || specialToolData.PartsDescription || specialToolData.Quantity))}
                                                        >
                                                            <AttachFileIcon
                                                                fontSize='small'
                                                            /> &nbsp; Upload Document
                                                            <input
                                                                type="file"
                                                                hidden
                                                                multiple
                                                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                                // onChange={(e) => Dispatch(addData({ field: 'PartNumberSupportingDocumentRspl', value: e.target.files[0].name }))}
                                                                onChange={(e) => {
                                                                    fileUpload(e.target.files, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL')
                                                                }}
                                                            />
                                                        </Button>

                                                        <Button
                                                            className='text-light'
                                                            variant="text"
                                                            disabled={cardData.PartNumberSupportingDocumentRsplURL.length !== 0 ? true : false}
                                                            onClick={() =>
                                                                dispatch(addRow({ field: 'RequiredSpecialTools' }))}
                                                            startIcon={<AddIcon />}>
                                                            Add More
                                                        </Button>
                                                        <IconButton
                                                            className='bg-danger'
                                                            aria-label="delete"
                                                            onClick={(e) => {
                                                                removeToolData("RequiredSpecialTools")
                                                            }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>

                                                </div>

                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>#</StyledTableCell>
                                                                <StyledTableCell>Parts No.</StyledTableCell>
                                                                <StyledTableCell >Parts Description</StyledTableCell>
                                                                <StyledTableCell >Quantity</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cardData.RequiredSpecialTools.map((row, rowIndex) => (
                                                                <StyledTableRow key={rowIndex}>
                                                                    <StyledTableCell>
                                                                        <Checkbox {...label}
                                                                            disabled={cardData.PartNumberSupportingDocumentRsplURL.length !== 0 ? true : false}
                                                                            checked={cardData.RequiredSpecialTools[rowIndex].checked}
                                                                            onClick={(e) =>
                                                                                dispatch(checkboxclick({ lineIndex: rowIndex, field: 'RequiredSpecialTools', value: e.target.checked }))
                                                                            } />
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput
                                                                                placeholder='Type here'
                                                                                id="bootstrap-input"
                                                                                name="PartsNo"
                                                                                disabled={cardData.PartNumberSupportingDocumentRsplURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false}
                                                                                value={row.PartsNo}
                                                                                onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)));
                                                                                    dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsNo' }));
                                                                                    sessionStorage.setItem('focus', `PartsNo${rowIndex}`)
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput
                                                                                placeholder='Type here'
                                                                                id="bootstrap-input"
                                                                                name="PartsDescription"
                                                                                disabled={cardData.PartNumberSupportingDocumentRsplURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }}
                                                                                value={row.PartsDescription}
                                                                                onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)));
                                                                                    dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsDescription' }));
                                                                                    sessionStorage.setItem('focus', `PartsDescription${rowIndex}`)
                                                                                }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput onKeyPress={(e) => {
                                                                                const regex = /^\d+$/;
                                                                                const { key } = e;
                                                                                if (!regex.test(key)) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            }}
                                                                                placeholder='Type here'
                                                                                type="text"
                                                                                id="bootstrap-input"
                                                                                name="Quantity"
                                                                                disabled={cardData.PartNumberSupportingDocumentRsplURL.length !== 0 ? true : false}
                                                                                autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false}
                                                                                onFocus={(e) => {
                                                                                    e.target.selectionStart = stages.cursor;
                                                                                    e.target.selectionEnd = stages.cursor;
                                                                                }}
                                                                                value={row.Quantity} onChange={(e) => {
                                                                                    dispatch((setCursor(e.target.selectionStart)));
                                                                                    dispatch(specialToolsData({
                                                                                        value: e.target.value, rowIndex: rowIndex, column: 'Quantity'
                                                                                    })); sessionStorage.setItem('focus', `Quantity${rowIndex}`)
                                                                                }}
                                                                                onPaste={(e) => onlyNumbers(e)}
                                                                            />
                                                                        </FormControl>
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.PartNumberSupportingDocumentRsplURL.map((row, id) => (
                                                                    <Chip key={id} label={row.substring(0, 20)} variant="filled" name="PartNumberSupportingDocumentRsplURL" onDelete={() => { handleDelete('PartNumberSupportingDocumentRsplURL', row, id) }} onClick={() => { handleClick('PartNumberSupportingDocumentRsplURL', row, id) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                                {
                                                                    cardData.PartNumberSupportingDocumentRspl.map((row, id) => (
                                                                        <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL') }} />
                                                                    ))
                                                                }
                                                            </Stack>
                                                    }
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_pdf${0}` &&
                                            <div className="line-sp">

                                                <Typography>Supporting Documents</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        // onChange={(e) => Dispatch(addData({ field: 'SupportingDocument', value: e.target.files[0].name }))}
                                                        onChange={(e) => fileUpload(e.target.files, 'SupportingDocument', 'SupportingDocumentURL')}
                                                    />
                                                </Button>

                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.SupportingDocumentURL.map((row, id) => (
                                                                    <Chip key={id} label={row.substring(0, 20)} variant="filled" name="SupportingDocument" onDelete={() => { handleDelete('SupportingDocumentURL', row, id) }} onClick={() => { handleClick('SupportingDocumentURL', row, id) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' alignItems='center' spacing={1}>
                                                                {cardData.SupportingDocument.map((row, id) => (
                                                                    <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'SupportingDocument', 'SupportingDocumentURL') }} />
                                                                ))}
                                                            </Stack>
                                                    }
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_note${0}` &&
                                            <div className="line-sp">

                                                <Typography>Notes</Typography>
                                                <TextField
                                                    className='autoheight'
                                                    multiline
                                                    disabled={cardData.NoteDocumentURL.length > 0}
                                                    rows={7}
                                                    height='auto'
                                                    placeholder="Type here"
                                                    name="Resolutions" //for design here we are using Resolutions
                                                    value={notesData ? notesData : sessionStorage.getItem('noteData')}
                                                    onChange={(e) => {
                                                        setNotes(e.target.value)
                                                        sessionStorage.setItem('noteData', e.target.value)
                                                        if (e.target.value.length === 0) {
                                                            sessionStorage.removeItem('noteData');
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    disabled={sessionStorage.getItem('noteData') ? true : false}
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        onChange={(e) => fileUpload(e.target.files, 'NoteDocument', 'NoteDocumentURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.NoteDocumentURL.map((row, id) => (
                                                            <Chip key={id} label={row.substring(0, 20)} variant="filled" name="NoteDocument" onDelete={() => { handleDelete('NoteDocumentURL', row, id) }} onClick={() => { handleClick('NoteDocumentURL', row, id) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                        {cardData.NoteDocument.map((row, id) => (
                                                            <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'NoteDocument', 'NoteDocumentURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_camera${0}` &&
                                            <div className="line-sp">

                                                <Typography>Photo</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="image/png, image/jpeg"
                                                        onChange={(e) => fileUpload(e.target.files, 'Photo', 'PhotoURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.PhotoURL.map((row, id) => (
                                                            <Chip key={id} label={row.substring(0, 20)} variant="filled" name="PhotoURL" onDelete={() => { handleDelete('PhotoURL', row, id) }} onClick={() => { handleClick('PhotoURL', row, id) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                        {cardData.Photo.map((row, id) => (
                                                            <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Photo', 'PhotoURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_video${0}` &&
                                            <div className="line-sp">

                                                <Typography>Video</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="video/mp4,video/x-m4v,video/*"
                                                        onChange={(e) => fileUpload(e.target.files, 'Video', 'VideoURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.VideoURL.map((row, id) => (
                                                            <Chip key={id} label={row.substring(0, 20)} variant="filled" name="VideoURL" onDelete={() => { handleDelete('VideoURL', row, id) }} onClick={() => { handleClick('VideoURL', row, id) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" spacing={1}>
                                                        {cardData.Video.map((row, id) => (
                                                            <Chip key={id} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Video', 'VideoURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                    </div>
                                    <div className='resol_right'>
                                        <div className='icon-vertical-alien'>

                                            <IconButton disabled={props.cardCont} className={setClassName(iconName,`gr_resolution${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_resolution")}>  <img src={document} alt='' className="res-icon"></img></IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName,`gr_common_tools${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_common_tools")}> <img src={setting} alt='' className="set-icon"></img> </IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName, `gr_special_tools${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_special_tools")}>  <img src={toolicon} alt='' className="stool-icon"></img></IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName, `gr_pdf${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_pdf")}> <img src={file} alt='' className="file-icon"></img></IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName, `gr_note${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_note")}>    <img src={notes} alt='' className="note-icon" ></img></IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName, `gr_camera${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_camera")}> <img src={cam} alt='' className="cam-icon"></img> </IconButton><br />
                                            <IconButton disabled={props.cardCont} className={setClassName(iconName, `gr_video${0}`)} onClick={(e) => recommentationfunction(e, 0, "gr_video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        {props.cardname && <Box className='card-btns commonresbutton'>

                            <Button disabled={nores} variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={SaveEditData}>
                                Save
                            </Button>
                        </Box>}
                    </CardContent>
                </Card>
            </div>

        </div >
    )
})
// NOSONAR End

export default React.memo(CreateGeneralResolution)