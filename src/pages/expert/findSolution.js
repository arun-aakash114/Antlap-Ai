import React from 'react'
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Explayout from '../../components/expert/explayout';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import Modal from '@mui/material/Modal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { backEndDomain } from '../../service/apiserver';


const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
    />
  );
};

function FindSolution() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('UserToken')
  const [findsolution, setfindsolution] = React.useState({});


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      serialno: data.get('serialno'),
      modelprefix: data.get('modelprefix'),
      range: data.get('issue'),
      smcs: data.get('smcs'),
      faultcode: data.get('faultcode'),
      problemcode: data.get('problemcode'),

    });
    setTimeout(() => {
      navigate('/result')
    }, 1000)
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [textInput, setTextInput] = React.useState('');
  const [textInput1, setTextInput1] = React.useState('');
  const [modelopen, setmodelopen] = React.useState(false);
  const [modelopen1, setmodelopen1] = React.useState(false);
  const [searchvalue, setsearchvalue] = React.useState('');
  const [searchvalue1, setsearchvalue1] = React.useState('');
  const [procodedata, setprocodedata] = React.useState([]);
  const [smcsdata, setsmcsdata] = React.useState([]);

  const modelClose = () => { setmodelopen(false) }
  const modelClose1 = () => { setmodelopen1(false) }
  const mpcopen = () => { setmodelopen(true) }
  const mpcopen1 = () => { setmodelopen1(true) }


  const handleSearch = (event) => {
    setsearchvalue(event.target.value)
    let Data = {
      problemCodeDescription: event.target.value
    }


    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webuserInput/webproblemCode`,
        data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,

        }
      })
        .then(function (response) {
          setprocodedata(response.data.problemCodeData)
        }).catch(function (response) {

        });
    } catch (err) {
    }


  }
  const handleSearch1 = (event) => {
    setsearchvalue1(event.target.value)
    let Data = {
      SMCSComponentDescription: event.target.value
    }

    if (event.target.value.length >= 3) {
      try {
        axios({
          method: 'post',
          url: `${backEndDomain}/webapi/webuserInput/webSMCSComponent`,
          data: Data,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,

          }
        })
          .then(function (response) {
            setsmcsdata(response.data.SMCSComponentDesc)
          }).catch(function (response) {

          });
      } catch (err) {
      }
    }

  }

  const closefun = () => {
    setsearchvalue('')
    setsearchvalue1('')

  }
  const chooseitem = (val) => {
    let text1 = val.ProblemCode;
    let text2 = val.ProblemDescription;
    let result = text1.concat("-", text2);
    setTextInput(result)
    modelClose()
  }
  const chooseitem1 = (val) => {
    setTextInput1(val)
    modelClose1()
  }


  return (
    <>
      <Explayout>
        {setfindsolution}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box className='box-header'>
            <h2 className="page-heding">Find Solution </h2>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} >
            <Box className='knowledgebase_input_wrapperr'>
              <Card sx={{ marginTop: 0 }}>

                <CardContent>
                  <Typography className='required-btn1'>(<span className='required-field'></span>)</Typography>

                  <Box className='flx-input'>

                    <TextField
                      margin="normal"
                      // required
                      fullWidth
                      id="serialno"
                      label="Serial No"
                      name="serialno"
                      // autoComplete="serialno"
                      // autoFocus 
                      value={findsolution.EquipmentSerialNo}
                      autoCorrect='off'
                      autoComplete='off'
                    />
                    {/* <Typography sx={{marginRight:2}}>or</Typography> */}
                    <TextField
                      margin="normal"
                      // required
                      fullWidth
                      id="modelprefix"
                      label="Model/Prefix"
                      name="modelprefix"
                      autoCorrect='off'
                      autoComplete='off'
                      value={findsolution.modelOrPrefix}

                    // autoComplete="modelprefix"
                    // autoFocus 
                    />
                    {/* <Typography sx={{marginRight:2}}>or</Typography> */}
                    <div className="issue-des">
                      <TextField
                        margin="normal"
                        // required
                        fullWidth
                        id="issue"
                        label="Issue Description"
                        name="issue"
                        autoCorrect='off'
                        autoComplete='off'
                        value={findsolution.IssueDescription}

                      //  autoComplete="range"
                      //autoFocus 
                      /></div>
                  </Box>
                </CardContent>

              </Card>

            </Box>
            <Box className='knowledgebase_input_wrapper'>
              <Card sx={{ marginTop: 0 }} className='fault-input'>
                <CardContent>
                  <Box className='flx-input'>
                    <TextField
                      margin="normal"
                      // required
                      fullWidth
                      id="faultcode"
                      label="Fault Code"
                      name="faultcode"
                      autoCorrect='off'
                      autoComplete='off'
                    // autoComplete="faultcode"
                    //autoFocus 
                    />

                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Typography className='required-btn'>or(<span className='required-field'></span>)</Typography>

            <Box className='knowledgebase_input_wrapper'>


              <Card sx={{ marginTop: 0 }} className='code-input'>
                <CardContent>
                  <Box className='flx-input'>
                    <div className='change-pcd'>
                      <IconTextField
                        // label="Select Problem Code / Description"
                        margin="normal"
                        //required
                        fullWidth
                        id="problemcode"
                        placeholder="Problem Code / Description"
                        name="problemcode"
                        //autoComplete="problemcode"
                        autoCorrect='off'
                        autoComplete='off'
                        value={textInput}
                        //autoFocus
                        onClick={textInput == '' ? (mpcopen) : Boolean}
                        // multiline
                        // rows={4}

                        // defaultValue="Problem Code / Description"
                        iconEnd={textInput == '' && (<IconButton className="a-i" onClick={mpcopen}><ArrowForwardIcon /></IconButton>)}

                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      {/* &nbsp;<IconButton className="a-i"  onClick={mpcopen}><ArrowForwardIcon/></IconButton>&nbsp;<IconButton className="a-i"  onClick={mpcopen1}><ArrowForwardIcon/></IconButton> */}
                      {textInput != '' ? (
                        <Typography className='cpc1-txt' onClick={mpcopen}>Change Problem Code / Description</Typography>
                      ) : ""}
                    </div>
                    <div className='change-pcd1'>

                      <IconTextField
                        // label="Select SMCS Component / Description"
                        margin="normal"
                        //required
                        fullWidth
                        id="smcs"
                        placeholder="SMCS Component"
                        name="smcs"
                        //autoComplete="smcs"
                        autoCorrect='off'
                        autoComplete='off'
                        value={textInput1}
                        onClick={textInput1 == '' ? (mpcopen1) : Boolean}
                        iconEnd={textInput1 == '' && (<IconButton className="a-i" onClick={mpcopen1}><ArrowForwardIcon /></IconButton>)}

                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      {textInput1 != '' ? (
                        <Typography className='cpc-txt' onClick={mpcopen1}>Change SMCS Component / Description</Typography>
                      ) : ""}


                    </div>

                  </Box>
                </CardContent>
              </Card>
            </Box>


            <Box className="btn_align_right">
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 2, mr: 3, bgcolor: "#dbdbdb", color: "black" }}


              > <CloseIcon /> Clear
              </Button>
              <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                <SearchIcon />Search
              </Button>
            </Box>
          </Box>
        </Container>
        <>
        
        {/* ____________________problemcode model____________ */}
        <Modal
          className="modal-scroll"
          open={modelopen}
          onClose={modelClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='close-btn-modal'>
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                Select Problem Code / Description
              </Typography><CloseIcon className='civ' onClick={modelClose} /></div>

            <IconTextField
              fullWidth
              label="Search"
              name="Search"
              value={searchvalue}
              onChange={(event) => handleSearch(event)}
              iconEnd={<IconButton><CloseIcon onClick={closefun} /></IconButton>}
              autoCorrect='off'
              autoComplete='off'
              autoFocus="autofocus"

            />

            {procodedata.map((value, id) => (
              <Typography key={id} className='se-txt' onClick={() => chooseitem(value)}  >{value.ProblemCode}-{value.ProblemDescription}</Typography>

            ))}
          </Box>
        </Modal>
        {/* ____________________problemcode model____________ */}
        <Modal
          open={modelopen1}
          onClose={modelClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='close-btn-modal'>
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                Select SMCS Component / Description
              </Typography><CloseIcon className='civ' onClick={modelClose1} /></div>

            <IconTextField
              fullWidth
              label="Search"
              name="Search"
              value={searchvalue1}
              onChange={(event) => handleSearch1(event)}
              iconEnd={<IconButton><CloseIcon onClick={closefun} /></IconButton>}
              autoCorrect='off'
              autoComplete='off'
              autoFocus="autofocus"

            />
            {smcsdata.map((value, id) => (
              <Typography key={id} className='se-txt' onClick={() => chooseitem1(value)}  >{value}</Typography>

            ))}



          </Box>
        </Modal>
      </>

      </Explayout>

    </>

  )
}

export default FindSolution;