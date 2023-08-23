import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { fileHandleing, updateBomdata } from '../../service/apiServices/aisourceCreation';
import EditBomCrud from './editbomCrud';
import { getCount, onlyNumbers } from './helper';


const initialState = {
  id: '',
  PartsNo: '',
  PartsDescription: '',
  Qty: '',
  PartNumberSupportingDocument: [],
  // sdocURL: [],
  Note: '',
  PartNumberSupportingDocumentName: [],
  // NoteDocument : []
}
const EditFormBom = (props) => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const [noteDoc, setNoteDoc] = useState([]);
  const [noteDocUrl, setNoteDocUrl] = useState([]);

  const [supportDocumentName, setSupportDocumentName] = useState([]);
  const [supportDocumentUrl, setSupportDocumentUrl] = useState([])

  const [bomData, setBomData] = useState([]);

  const { PartsNo, PartsDescription, Qty, PartNumberSupportingDocumentName, Note } = state;

  useEffect(() => {
    setBomData(props.bomdata)
  }, [])

  const setDataforEdit = (data, index) => {
    setNoteDocUrl(data.NoteDocument)
    data.PartNumberSupportingDocumentName = []
    setSupportDocumentUrl(data.PartNumberSupportingDocument)
    setState(data)
  }

  const handleDelete = async (field,data, i) => {
    const newNote = [...noteDocUrl.slice(0, i), ...noteDocUrl.slice(i + 1)];
    setNoteDocUrl(newNote)
    
  };

  const handleDeletesupDoc = async (field, data, i) => {
    const newSupport = [...supportDocumentUrl.slice(0, i), ...supportDocumentUrl.slice(i + 1)];
    setSupportDocumentUrl(newSupport)
   
  };
  
  const bomHandleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
  };

// NOSONAR Start
  const fileUpload = async (val, field, index) => {
  if (field === 'supportingDocuments') {
    let name = [...supportDocumentName];
    const formData = new FormData();
    for (let item of val) {
      if (!name.includes(item.name)) {
        name.push(item.name)
        formData.append("files", item);
      }
    }
  const count = getCount(formData)
    if (count) {
      let res = await fileHandleing(formData)
      if (res.status === 200) {
        setSupportDocumentName(name);
        let url = [...supportDocumentUrl]
        res.path.forEach(element => {
          url.push(element)
        });
        setSupportDocumentUrl(url);
      }
    }

  } else {
    let name = [...noteDoc];
    const formData = new FormData();
    for (let items of val) {
      if (!name.includes(items.name)) {
        name.push(items.name)
        formData.append("files", items);
      }
    }
    const count = getCount(formData)
    if (count) {
      let res = await fileHandleing(formData)
      if (res.status === 200) {
        setNoteDoc(name);
        let url = [...noteDocUrl];
        res.path.forEach((element) => {
          url.push(element)
        })
        setNoteDocUrl(url)
      }
    }
  }
  const saveFunc = async () => {
    let payload = {
      type: sessionStorage.getItem('proType') === "Non IoT" ? 'NonIOT' : 'IOT',
      tenantId: localStorage.getItem('TenantId'),
      model: props.paramdatas.model ? props.paramdatas.model : '',
      Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
      serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
      SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
      sourceId: sessionStorage.getItem('SourceId'),
      BOMPartId: state.BOMPartId,
      BomData: []
    }


    let obj = {
      PartsNo: state.PartsNo,
      PartsDescription: state.PartsDescription,
      Quantity: state.Qty,
      Notes: state.Note,
      NotesDocument: noteDocUrl.length !== 0 ? [noteDocUrl.toString()] : [],
      PartNumberSupportingDocument: supportDocumentUrl.length !== 0 ? [supportDocumentUrl.toString()] : []
    }

    payload.BomData.push(obj)



    if (sessionStorage.getItem('proType') === 'Non IoT') {
      payload.ProblemCode = props.paramdatas.ProblemCode;
      payload.complaintDes = props.paramdatas.complaintDes;
    } else {
      payload.faultCode = props.paramdatas.faultCode;
      payload.faultCodeDes = props.paramdatas.faultDesc
    }


    let res = await updateBomdata(payload)
    if (res.code === 200) {
      alert('Bom Edited successfully')
      navigate('/resolutions', { state: { data: props.paramdatas, act: 'edit', id: sessionStorage.getItem('SourceId') } })
    }
  }
// NOSONAR End

  return (

    <div>

      <Card>
        <CardContent>
          <div className='bom-form' >
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <div className='input-wrapper top'>
                <TextField id="outlined-basic" label="Parts No" variant="outlined" name="PartsNo" value={PartsNo} onChange={bomHandleChange} />
                <TextField id="outlined-basic" label="Quantity" variant="outlined" name="Qty" value={Qty} onKeyPress={(e) => {
                  const regex = /^\d+$/;
                  const { key } = e;
                  if (!regex.test(key)) {
                    e.preventDefault();
                  }
                }} onChange={bomHandleChange}
                onPaste={(e) => onlyNumbers(e)} />

              </div>
              <div className='stage-fullwidth'>
                <TextField
                  id="outlined-multiline-static"
                  label="Part Description"
                  multiline
                  rows={3}
                  value={PartsDescription}
                  name="PartsDescription"
                  onChange={bomHandleChange}

                />
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Supporting Documents"
                    placeholder='Supporting Documents'
                    multiline
                    rows={1}
                    value={PartNumberSupportingDocumentName}
                    name="PartNumberSupportingDocumentName"
                    // onChange={bomHandleChange}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '6px', top: '6px' }} component="label">
                    < input multiple hidden onChange={(e) => fileUpload(e.target.files, 'supportingDocuments')} type="file" />
                    <InsertDriveFileIcon />
                  </IconButton>
                </div>
                <div className='attachments'>
                  <Stack direction='row' spacing={1}>
                    {
                      supportDocumentUrl?.map((row, id) => (
                        <Chip key={id} label={row} variant='filled' name="supportingDocuments" onDelete={() => { handleDeletesupDoc('supportingDocuments', row, id) }} />
                      ))
                    }
                  </Stack>
                </div>
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={1}
                    value={Note}
                    disabled={noteDocUrl.length !==0}
                    name="Note"
                    onChange={bomHandleChange}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '15px', top: '6px' }} component="label">
                    <input multiple disabled={Note.length !==0} hidden onChange={(e) => fileUpload(e.target.files, 'notes')} type="file" />
                    <StickyNote2Icon />
                  </IconButton>

                </div>
                {<div className='attachments'>
                  <Stack direction="row" spacing={1}>
                    {noteDocUrl?.map((row, id) => (
                      <Chip label={row} key={id} variant="filled" name="notes" onDelete={() => { handleDelete('notes', row, id) }} />
                    ))
                    }
                  </Stack>
                </div>}
              </div>




              <Box className='card-btns'>

                {state.PartsDescription !== "" && <Button variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={saveFunc}>
                  Save
                </Button>}
              </Box>
            </Box>
          </div>
          <TableContainer component={Paper}>
            <EditBomCrud bomDatas={bomData} editcall={setDataforEdit} />

          </TableContainer>
        </CardContent>
      </Card>

    </div>
  )
}
}
export default EditFormBom
