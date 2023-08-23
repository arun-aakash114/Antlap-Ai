import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { updateFaultCode, updateForm, addElement, updateProblemCode, removeElement, updateSMCSCode } from '../../store/reducers/dataManageForm'
import { createIotData, createNonIotData, smcscodelist, problemcodelist, updateIotData, updateNonIotData, editComplaintDes, saveComplaintDes } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const ParamFaultForm = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const [smcsList, setSmcsList] = React.useState([]);
    const [openinvalid, setInvalid] = React.useState(false);
    let formData = useSelector((state) => state.dataForm)
    const [problemList, setProblemList] = React.useState([])
    const [protype, setproType] = React.useState('')



    useEffect(() => setproType(sessionStorage.getItem('proType')), []);

    const addAndRemove = (field, i) => {
        if (i === 0) {
            dispatch(addElement({ field: field }))
        } else {
            dispatch(removeElement({ field: field, index: i }))
        }
    }
    const prefixSelection = async (model, i, source) => {
        if (source === 'problemCode') {
            dispatch(updateProblemCode({ field: 'code', index: i, val: model === null ? '' : model.slice(0, model.indexOf('-')) }))
            dispatch(updateProblemCode({ field: 'desc', index: i, val: model === null ? '' : model.slice(model.indexOf('-') + 1) }))
        } else {
            dispatch(updateSMCSCode({ index: i, desc: model === null ? '' : model }))
        }

    }

    const handleSearch = async (event, source) => {
        if (source === 'problem') {
            if (event.target.value.length !== 0) {
                let res = await problemcodelist(event.target.value);

                if (res.code === 200) {
                    setProblemList(res.problemCodeData)
                }
            } else {
                setProblemList([])
            }
        }
        else {
            if (event.target.value.length !== 0) {
                let res = await smcscodelist(event.target.value);

                if (res.code === 200) {
                    setSmcsList(res.SMCSComponentDesc)

                }
            } else {
                setSmcsList([])
            }
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    }
// NOSONAR Start
    const saveAndContinue = async () => {
        let { modelPrefix, serialNumber, faultCode, problemCode } = formData;
        if ((!modelPrefix || !serialNumber)) {
            alert('Give the correct Details')
        } else if (sessionStorage.getItem('proType') === 'IoT' && faultCode[0].code.length === 0) {
            alert('Please give the fault code')
        } else if (sessionStorage.getItem('proType') !== 'IoT' && problemCode[0].code.length === 0) {
            alert('Please give the problem code')
        } else {
            if (sessionStorage.getItem('proType') === 'IoT') {
                let faultCode = [];
                let faultDesc = [];
                formData.faultCode.forEach(element => {
                    faultCode.push(element.code);
                    faultDesc.push(element.desc);
                });

                let payload = props.canedit === 'edit' ? {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": formData.smcsCode.map(obj => obj.desc).join(','),
                    "faultCode": faultCode.join(','),
                    "faultCodeDes": faultDesc.join(','),
                    "sourceId": sessionStorage.getItem('SourceId')
                } : {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": formData.smcsCode.map(obj => obj.desc).join(','),
                    "faultCode": faultCode.join(','),
                    "faultCodeDes": faultDesc.join(',')
                }


                let res = props.canedit === 'edit' ? await updateIotData(payload) : await createIotData(payload)
                if (res.code === 200) {
                    if (props.canedit === 'edit') {
                        delete payload.SMCScode;
                        delete payload.faultCodeDes;
                        payload.SMCScode = [formData.smcsCode.map(obj => obj.desc).join(',')]
                        payload.faultDesc = faultDesc.join(',')
                        navigate('/resolutions', { state: { data: payload, act: 'edit', id: sessionStorage.getItem('SourceId') } })
                    } else {
                        delete payload.SMCScode;
                        delete payload.faultCodeDes;
                        payload.SMCScode = [formData.smcsCode.map(obj => obj.desc).join(',')]
                        payload.faultDesc = faultDesc.join(',')
                        sessionStorage.setItem('SourceId', res.data.SourceId)
                        navigate('/resolutionPath', { state: { data: payload, act: 'edit' } })
                    }

                } else {
                    setInvalid(true);
                }


            } else {
                let { modelPrefix, serialNumber, problemCode } = formData;
                if (!(modelPrefix || serialNumber || problemCode[0].code)) {
                    alert('Give the correct Details')
                }
                let probCode = [];
                formData.problemCode.forEach(element => {
                    probCode.push(element.code + "-" + element.desc);
                });

                let payload = props.canedit === 'edit' ? {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": formData.smcsCode.map(obj => obj.desc).join(','),
                    "ProblemCode": probCode.join(','),
                    "complaintDes": formData.complaintDescripton,
                    "sourceId": sessionStorage.getItem('SourceId')
                } : {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": formData.smcsCode.map(obj => obj.desc).join(','),
                    "ProblemCode": probCode.join(','),
                    "complaintDes": formData.complaintDescripton,
                }
                let descriptionSaver  = props.canedit === 'edit' ? {
                    "Description": formData.complaintDescripton.trim(),
                    "model": formData.serialNumber,
                    "prefix": formData.modelPrefix.join(','),
                    "DescriptionId": sessionStorage.getItem('CompID') || ""
                  } : {
                    "Description": formData.complaintDescripton.trim(),
                    "model": formData.serialNumber,
                    "prefix": formData.modelPrefix.join(','),
                  }
                let res = props.canedit === 'edit' ? await updateNonIotData(payload) : await createNonIotData(payload)
                let resp = props.canedit === 'edit' ? await editComplaintDes(descriptionSaver) : await saveComplaintDes(descriptionSaver)
                console.log(resp)
                if (res.code === 200) {
                    if (props.canedit === 'edit') {
                        delete payload.ProblemCode;
                        delete payload.SMCScode;
                        payload.SMCScode = [formData.smcsCode.map(obj => obj.desc).join(',')]
                        payload.ProblemCode = [probCode.join(',')]
                        navigate('/resolutions', { state: { data: payload, act: 'edit', id: sessionStorage.getItem('SourceId') } })
                    } else {
                        delete payload.SMCScode;
                        delete payload.ProblemCode;
                        payload.SMCScode = [formData.smcsCode.map(obj => obj.desc).join(',')]
                        payload.ProblemCode = [probCode.join(',')]
                        sessionStorage.setItem('SourceId', res.data.SourceId)
                        navigate('/resolutionPath', { state: { data: payload, act: 'edit' } })
                    }
                } else {
                    setInvalid(true);
                }
            }

        }

    }


    return (
        <>
            <div className='divider divider-top'></div>
            {protype === 'IoT' && formData?.faultCode?.map((row, i) => (

                <div className='input-wrapper stage2' key={i}>
                    <TextField id="outlined-basic" label="Fault Code" key={"code"} required variant="outlined" autoFocus={row.code ? true : false} value={row.code} onChange={(e) => dispatch(updateFaultCode({ index: i, field: 'code', val: e.target.value }))} />
                    <TextField id="outlined-basic" label="Fault Code Description" required={i === 0 ? true : false} variant="outlined" value={row.desc} onChange={(e) => dispatch(updateFaultCode({ index: i, field: 'desc', val: e.target.value }))} />
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('faultCode', i)}>
                        {i === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}
            {protype === 'Non IoT' && formData?.problemCode?.map((row, id) => (
                <div className='input-wrapper stage2' key={id}>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable={false}
                        fullWidth
                        variant="outlined"
                        defaultValue={row.code ? row.code + '-' + row.desc : ''}
                        options={problemList.map((row) => row.ProblemCode + '-' + row.ProblemDescription)}
                        onChange={(e, v) => prefixSelection(v, id, 'problemCode')}
                        renderInput={(params) => <TextField {...params} required style={{ width: '98%' }} 
                        onMouseDownCapture={(e) => e.stopPropagation()} onChange={(e) => handleSearch(e, 'problem')} fullWidth label="Problem / Description Code" />} />
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('problemCode', id)}>
                        {id === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}
            <div className='divider'></div>
            {formData?.smcsCode?.map((row, id) => (

                <div className='input-wrapper stage2 f-des' key={id}>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable={false}
                        fullWidth
                        variant="outlined"
                        defaultValue={row?.desc}
                        options={smcsList.map((row) => row)}
                        onChange={(e, v) => prefixSelection(v, id, 'smcs')}
                        renderInput={(params) => <TextField {...params} 
                        onMouseDownCapture={(e) => e.stopPropagation()} required={sessionStorage.getItem('proType') === 'Non IoT' ? true : false} style={{ width: '98%' }} onChange={(e) => handleSearch(e, 'smcs')} fullWidth autoFocus={row.desc ? true : false} label="SMCS Component Code" />} />
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('smcs', id)}>
                        {id === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}

            <div className='divider'></div>

            {protype === 'Non IoT' &&
                <div className='input-wrapper stage2 f-des'>
                    <TextField id="outlined-basic" required multiline={true} label="Complaint Description" variant="outlined" value={formData.complaintDescripton} onChange={(e) => dispatch(updateForm({ field: 'complaint_desc', value: e.target.value }))} />
                </div>}
            <Box className='card-btns'>
                <Button variant="contained" size="medium" color="secondary" onClick={() => dispatch(updateToast({ field: 'clearForm' }))} startIcon={<CloseIcon />}>
                    Clear
                </Button>
                <Button variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={() => saveAndContinue()}>
                    Save & Continue
                </Button>
            </Box>

            <Snackbar open={openinvalid} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" sx={{ width: '50%' }} onClose={handleClose}>
                    Duplicate Data not allowed
                </Alert>
            </Snackbar></>
    )
}
// NOSONAR End

export default ParamFaultForm;