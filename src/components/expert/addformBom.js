import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Button from '@mui/material/Button';
import BomCrud from './bomCrud';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { addBomdata, fileHandleing, Deletefiles } from '../../service/apiServices/aisourceCreation';
import { getCount, onlyNumbers } from './helper';


const initialState = {
  partno: '',
  desc: '',
  qty: '',
  notes: ''
}
const AddFormBom = (props) => {
  const [state, setState] = useState(initialState);
  const supportDocsfileref = useRef();
  const noteDocsfileref = useRef();
  const [noteDoc, setNoteDoc] = useState([]);
  const [noteDocUrl, setNoteDocUrl] = useState([]);
  const [noteDocApi, setNoteDocApi] = useState([]);

  const [supportDocumentName, setSupportDocumentName] = useState([]);
  const [supportDocTable, setSupportDocTable] = useState([])
  const [supportDocumentUrl, setSupportDocumentUrl] = useState([])
  const [supportDocApi, setSupportDocApi] = useState([])

  const [bomData, setBomData] = useState([]);
   console.log(props,"PROPS PASSES")
  const { partno, desc, qty, notes } = state;

  const bomHandleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
    sessionStorage.setItem('BOMpartno', value)
  };

  const addMoreFunc = (e) => {
    sessionStorage.removeItem('BOMpartno')
    e.preventDefault();
    if (partno) {

      setBomData(newdata => [...newdata, state])
      let stateVal = { ...state }
      stateVal.desc = '';
      stateVal.partno = '';
      stateVal.qty = '';
      stateVal.notes = '';
      setState(stateVal)
      setNoteDoc([])

      let supportDoc = [...supportDocApi];
      supportDoc.push(supportDocumentUrl);
      setSupportDocApi(supportDoc)
      setSupportDocumentUrl([])

      let noteDoc = [...noteDocApi];
      noteDoc.push(noteDocUrl);
      setNoteDocApi(noteDoc)
      setNoteDocUrl([])

      let suportDocTable = [...supportDocTable];
      suportDocTable.push(supportDocumentName);
      setSupportDocTable(suportDocTable);
      setSupportDocumentName([])

    } else {
      alert('Please enter BOM data')
    }
  };


  const removeDoc = async (index, field) => {

    if (field === 'supportingDocuments') {
      let name = [...supportDocumentName];

      let url = [...supportDocumentUrl];
      let res = await Deletefiles({ Url: [url[index]] });

      if (res.code === 200) {
        name.splice(index, 1);
        url.splice(index, 1);

        setSupportDocumentName(name);
        setSupportDocumentUrl(url)
        supportDocsfileref.current.value = ''
      }

    } else {
      let name = [...noteDoc];
      let url = [...noteDocUrl];
      let res = await Deletefiles({ Url: [url[index]] });
      if (res.code === 200) {
        name.splice(index, 1);
        url.splice(index, 1);
        setNoteDoc(name);
        setNoteDocUrl(url)
        noteDocsfileref.current.value = ''
      }
    }

  }
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

  }
  // NOSONAR End
// NOSONAR Start
  const saveFunc = async () => {
    if (bomData.length !== 0) {

      let payload = {
        type: sessionStorage.getItem('proType') === "Non IoT" ? 'NonIOT' : 'IOT',
        tenantId: localStorage.getItem('TenantId'),
        path: props.path, 
        model: props.paramdatas.model || '',
        Prefix: props.paramdatas.Prefix || '',
        serialNoRange: props.paramdatas.serialNoRange || '',
        SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode[0] : '',
        sourceId: sessionStorage.getItem('SourceId'),
        BomData: []
      }

      for (let [i, val] of bomData.entries()) {
        if (val.partno.length !== 0) {

          let obj = {
            PartsNo: val.partno,
            PartsDescription: val.desc,
            Quantity: val.qty,
            Notes: val.notes,
            NotesDocument: noteDocApi[i].length !== 0 ? [noteDocApi[i].toString()] : [],
            PartNumberSupportingDocument: supportDocApi[i].length !== 0 ? [supportDocApi[i].toString()] : []
          }

          payload.BomData.push(obj)
        }
      }

      if (sessionStorage.getItem('proType') === 'Non IoT') {
        payload.ProblemCode = props.paramdatas.ProblemCode[0];
        payload.complaintDes = props.paramdatas.complaintDes;
      } else {
        payload.faultCode = props.paramdatas.faultCode;
        payload.faultCodeDes = props.paramdatas.faultDesc
      }


      let res = await addBomdata(payload)
      if (res.code === 200) {
        alert('Bom added successfully')
        setBomData([])
        setSupportDocTable([])
        setNoteDocApi([])
        setSupportDocApi([])
      }
    } else {
      alert('Please save BOM data')
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
                <TextField id="outlined-basic" label="Parts No." variant="outlined" name="partno" value={partno} onChange={bomHandleChange} />
                <TextField id="outlined-basic" type="text" label="Quantity" variant="outlined" name="qty" value={qty} onKeyPress={(e) => {
                  const regex = /^\d+$/;
                  const { key } = e;
                  if (!regex.test(key)) {
                    e.preventDefault();
                  }
                }} onChange={bomHandleChange} 
                onPaste={(e) => onlyNumbers(e)}/>

              </div>
              <div className='stage-fullwidth'>
                <TextField
                  id="outlined-multiline-static"
                  label="Part Description"
                  multiline
                  rows={3}
                  value={desc}
                  name="desc"
                  onChange={bomHandleChange}

                />
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Supporting Documents"
                    placeholder='Supporting Documents'
                    multiline
                    rows={1}
                    value={supportDocumentName}
                    name="sdoc"
                    // onChange={bomHandleChange}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '6px', top: '6px' }} component="label">
                    <input hidden ref={supportDocsfileref} multiple onChange={(e) => { fileUpload(e.target.files, 'supportingDocuments'); }} type="file" />
                    <InsertDriveFileIcon />
                  </IconButton>
                </div>
                <div className='attachments'>
                  <Stack direction="row" spacing={1}>
                    {
                      supportDocumentName.map((row, id) => (
                        <Chip label={row} key={id} variant="filled" onDelete={() => { removeDoc(id, 'supportingDocuments') }} />
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
                    value={notes}
                    disabled={noteDoc.length !==0}
                    name="notes"
                    onChange={bomHandleChange}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '15px', top: '6px' }} component="label">
                    <input ref={noteDocsfileref} disabled={notes.length !== 0} hidden multiple onChange={(e) => fileUpload(e.target.files, 'notes')} type="file" />
                    <StickyNote2Icon />
                  </IconButton>

                </div>
                {<div className='attachments'>
                  <Stack direction="row" spacing={1}>
                    {noteDoc.map((row, id) => (
                      <Chip label={row} key={id} variant="filled" onDelete={() => { removeDoc(id, 'notesDocuments') }} />
                    ))
                    }
                  </Stack>
                </div>}
              </div>




              <Box className='card-btns'>

                <Button variant="contained" size="medium" disabled={bomData.length !== 0 ? false : true} color="primary" startIcon={<SaveIcon />} onClick={saveFunc}>
                  Save
                </Button>
                <Button variant="contained" size="medium" color="primary" startIcon={<AddIcon />} onClick={addMoreFunc}>
                  Add
                </Button>
              </Box>
            </Box>
          </div>
          <TableContainer component={Paper}>
            <BomCrud bomDatas={bomData} supportDoc={supportDocTable} />

          </TableContainer>
        </CardContent>
      </Card>

    </div>
  )
}

export default AddFormBom
