import React, { useImperativeHandle } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { Card, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
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

import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { addData, addRow, deleteRow, checkboxclick, commonToolsData, specialToolsData, updateFiles } from '../../store/reducers/cardData';
import { Deletefiles, fileHandleing } from '../../service/apiServices/aisourceCreation';
import { disableSave, setCursor } from '../../store/reducers/stages';
import { onlyNumbers, setBGColor, getCount, setClassName } from './helper'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// NOSONAR Start
const CreateResolutionPath = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  let { stages, cardData } = useSelector(state => state)
  const [iconName, setIconName] = React.useState(sessionStorage.getItem('cardPanel'))
  const [resolutionText, setResolutionText] = React.useState('');
  const [notesData, setNotes] = React.useState('')
  // const [common, setCommon] = React.useState(false)
  // const [upload, setUpload] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (index, panel) => (isExpanded) => {
      setExpanded(isExpanded ? panel : false);

      setIconName(`gr_resolution${index}`);
  };
  const recommentationfunction = (e, index, data) => {
    e.preventDefault();
    setIconName(data + index);
    sessionStorage.setItem('cardPanel', data + index);
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
      backgroundColor: setBGColor(theme.palette.mode),
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


  const alphabets = [
    '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  

  const fileUpload = async (file, field, url) => {
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
  const commonToolData = cardData.CommonTools && cardData.CommonTools.length>0 && cardData.CommonTools[0];
  const specialToolData = cardData.RequiredSpecialTools && cardData.RequiredSpecialTools.length>0 && cardData.RequiredSpecialTools[0];
  return (
    <div>
      <Card >
        <CardContent >
          <Accordion className='remove-padding' expanded={expanded} onChange={handleChange(0, `panel${0}`)}>
            <AccordionSummary className='remove-padding'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div className='iconNameSol remove-bg remove-padding'>
                <div className='left'>
                  <Typography className='fo-border' >

                    <>
                      <span className='solution-count'>{alphabets[sessionStorage.getItem('resolutionPathInd')]} </span>{stages.stage}
                      {
                        stages.stage !== 'Solution Path' &&
                        <span>{stages.stage === 'Step' ? '-' + stages.stepIndex : '-' + `${stages.stepIndex}.${stages.subStepIndex}`}</span>

                      }
                    </>


                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className='resol_wrap'>
                <div className='resol_left'>
                  {iconName === `gr_resolution${0}` &&
                    <div className="line-sp" style={{ color: 'white', /*backgroundColor: '#669ffa',*/ justifyContent: 'center', display: 'flex' }}>
                      <typography  className="typography">Resolution</typography>
                      <div className="autoheight">
                        <TextField
                          rows={7}
                          multiline
                          disabled={props.cardCont}
                          style={{ backgroundColor: 'whitesmoke' }}
                          aria-label="empty textarea"
                          placeholder="Type here"
                          name="Resolutions"
                          autoFocus={sessionStorage.getItem('res') || !sessionStorage.getItem('res')}
                          value={resolutionText ? resolutionText : sessionStorage.getItem('res')}
                          onChange={(e) => {
                            dispatch((setCursor(e.target.selectionStart)))
                            const val = e.target.value
                            setResolutionText(val);
                            sessionStorage.setItem('res', val);
                            dispatch((disableSave(val.length < 10)))
                          }}
                          onFocus={(e) => {
                              e.target.selectionStart = stages.cursor;
                              e.target.selectionEnd = stages.cursor;
                             }}
                        />
                      </div>
                    </div>
                  }
                  {iconName === `gr_common_tools${0}` &&
                    <div className="line-sp">

                      <div className='inner-table-header'>
                        <Typography >Common Tools</Typography>
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
                          <Button 
                          className='text-light' 
                          disabled={cardData.PartNumberSupportingDocument.length !== 0 ? true : false} 
                          variant="text" onClick={() => 
                          dispatch(addRow({ field: 'CommonTools' }))
                          } 
                          startIcon={<AddIcon />}
                          >
                            Add More
                            </Button>
                          <IconButton 
                          className='bg-danger' 
                          aria-label="delete" 
                          onClick={() => dispatch(deleteRow({ field: 'CommonTools' }))}>
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
                            {cardData.CommonTools.map((row, rowIndex) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell>
                                  <Checkbox {...label} 
                                  checked={cardData.CommonTools[rowIndex].checked} 
                                  disabled={cardData.PartNumberSupportingDocument.length !== 0 ? true : false} 
                                  onClick={(e) => dispatch(checkboxclick({ lineIndex: rowIndex, value: e.target.checked, field: 'CommonTools' }))} />
                                </StyledTableCell>

                                <StyledTableCell >
                                  <FormControl variant="standard">
                                    <BootstrapInput 
                                    disabled={cardData.PartNumberSupportingDocument.length !== 0 ? true : false}
                                    placeholder='Type here' 
                                    id="bootstrap-input" 
                                    name="PartsNo" 
                                    autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false} 
                                    value={row.PartsNo} 
                                    onChange={(e) => {
                                      dispatch(setCursor(e.target.selectionStart)); 
                                      dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsNo" })); 
                                      sessionStorage.setItem('focus', `PartsNo${rowIndex}`) }}
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
                                    disabled={cardData.PartNumberSupportingDocument.length !== 0 ? true : false} 
                                    placeholder='Type here' 
                                    id="bootstrap-input" 
                                    name="PartsDescription" 
                                    autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false} 
                                    value={row.PartsDescription} 
                                    onChange={(e) => {
                                      dispatch((setCursor(e.target.selectionStart))); 
                                      dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsDescription" })); 
                                      sessionStorage.setItem('focus', `PartsDescription${rowIndex}`) }}
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
                                    disabled={cardData.PartNumberSupportingDocument.length !== 0 ? true : false} 
                                    onKeyPress={(e) => {
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
                                    autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false} 
                                    value={row.Quantity} 
                                    onChange={(e) => {
                                      dispatch((setCursor(e.target.selectionStart)));
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
                        <Stack direction="row" spacing={1} flexWrap='wrap'>
                          {cardData.PartNumberSupportingDocument.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocument', 'PartNumberSupportingDocumentURL') }} />
                          ))}
                        </Stack>
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
                              onChange={(e) => fileUpload(e.target.files, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL')}
                            />
                          </Button>

                          <Button 
                          className='text-light' 
                          variant="text" 
                          disabled={cardData.PartNumberSupportingDocumentRspl.length !== 0 ? true : false } 
                          onClick={() => 
                          dispatch(addRow({ field: 'RequiredSpecialTools' }))
                          } 
                          startIcon={<AddIcon />}
                          >
                            Add More
                            </Button>
                          <IconButton 
                          className='bg-danger' 
                          aria-label="delete"
                          onClick={() => 
                          dispatch(deleteRow({ field: 'RequiredSpecialTools' }))
                          }
                          >
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
                                  checked={cardData.RequiredSpecialTools[rowIndex].checked} 
                                  disabled={cardData.PartNumberSupportingDocumentRspl.length !== 0 ? true : false } 
                                  onClick={(e) => 
                                  dispatch(checkboxclick({ lineIndex: rowIndex, field: 'RequiredSpecialTools', value: e.target.checked }))
                                  } 
                                  />
                                </StyledTableCell>

                                <StyledTableCell >
                                  <FormControl variant="standard">
                                    <BootstrapInput 
                                    disabled={cardData.PartNumberSupportingDocumentRspl.length !== 0 ? true : false } 
                                    placeholder='Type here' 
                                    id="bootstrap-input" 
                                    name="PartsNo" 
                                    autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false} 
                                    value={row.PartsNo} 
                                    onChange={(e) => {
                                      dispatch((setCursor(e.target.selectionStart))); 
                                      dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsNo' })); 
                                      sessionStorage.setItem('focus', `PartsNo${rowIndex}`) }}
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
                                    disabled={cardData.PartNumberSupportingDocumentRspl.length !== 0 ? true : false } 
                                    placeholder='Type here' 
                                    id="bootstrap-input" 
                                    name="PartsDescription" 
                                    autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false} 
                                    value={row.PartsDescription} 
                                    onChange={(e) => {
                                      dispatch((setCursor(e.target.selectionStart))); 
                                      dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsDescription' })); 
                                      sessionStorage.setItem('focus', `PartsDescription${rowIndex}`) }}
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
                                      disabled={cardData.PartNumberSupportingDocumentRspl.length !== 0 ? true : false }
                                      onKeyPress={(e) => {
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
                                      autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false} 
                                      value={row.Quantity} 
                                      onChange={(e) => {
                                        dispatch((setCursor(e.target.selectionStart)))
                                        dispatch(specialToolsData({
                                          value: e.target.value, rowIndex: rowIndex, column: 'Quantity'
                                        })); 
                                        sessionStorage.setItem('focus', `Quantity${rowIndex}`)
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
                        <Stack direction="row" spacing={1}>
                          {cardData.PartNumberSupportingDocumentRspl.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL') }} />
                          ))}
                        </Stack>
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
                          onChange={(e) => fileUpload(e.target.files, 'SupportingDocument', 'SupportingDocumentURL')}
                        />
                      </Button>

                      {<div className='attachments'>
                        <Stack direction="row" spacing={1} flexWrap='wrap'>
                          {cardData.SupportingDocument.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'SupportingDocument', 'SupportingDocumentURL') }} />
                          ))}
                        </Stack>
                      </div>}
                    </div>
                  }
                  {iconName === `gr_note${0}` &&
                    <div className="line-sp">

                      <Typography>Notes</Typography>
                      <TextField
                        aria-label="empty textarea"
                        placeholder="Type here"
                        rows={7}
                        disabled={cardData.NoteDocument.length > 0}
                        multiline
                        name="Resolutions"
                        autoFocus={notesData ? true : false}
                        value={notesData ? notesData : sessionStorage.getItem('noteData')}
                        onChange={(e) => {
                          setNotes(e.target.value)
                          sessionStorage.setItem('noteData', e.target.value)
                          if(e.target.value.length === 0){
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
                        <Stack direction="row" spacing={1} flexWrap='wrap'>
                          {cardData.NoteDocument.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'NoteDocument', 'NoteDocumentURL') }} />
                          ))}
                        </Stack>
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
                        <Stack direction="row" spacing={1} flexWrap='wrap'>
                          {cardData.Photo.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Photo', 'PhotoURL') }} />
                          ))}
                        </Stack>
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
                        <Stack direction="row" spacing={1} flexWrap='wrap'>
                          {cardData.Video.map((row, i) => (
                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Video', 'VideoURL') }} />
                          ))}
                        </Stack>
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

        </CardContent>
      </Card>

    </div>
  )
})
// NOSONAR End

export default CreateResolutionPath