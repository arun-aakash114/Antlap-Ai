import { TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector, useDispatch } from "react-redux";
import { updateForm, initialState } from "../store/reducers/knowledgeBaseForm";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import {
  problemCodeApi,
  smcsCodeApi,
  complaintDescriptionApi,
} from "../service/apiServices/knoledgeBaseService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        ) : null,
      }}
    />
  );
};

function FaultCodeText() {
  let dispatch = useDispatch();
  let formData = useSelector((state) => state.knowledgeForm);
  const [fault, setFault] = React.useState(true);
  const [compdesc, setCompdesc] = React.useState([]);
  const [procodedata, setprocodedata] = React.useState([]);
  const [smcsdata, setsmcsdata] = React.useState([]);
  const [complaint, setComplaint] = React.useState(true);
  const [problem, setProblem] = React.useState(true);
  const [smcs, setSmcs] = React.useState(false);
  const [compdescModelOpen, setCompdescModelOpen] = React.useState(false);
  const [problemCodeModelOpen, setproblemCodeModelOpen] = React.useState(false);
  const [modelsmcs, setModelSmcs] = React.useState(false);
  const [searchvalue, setsearchvalue] = React.useState("");
  const [smcsValue, setSmcsValue] = React.useState("");
  const [compdesValue, setCompdesValue] = React.useState("");

  useEffect(() => {
    if (JSON.stringify(formData) === JSON.stringify(initialState)) {
      clearData()
    }
  }, [formData])

  const clearData = () => {
    setFault(true);
    setProblem(true);
    setComplaint(true);
    setSmcs(false);
    setCompdesValue("");
    setCompdesc([]);
    setsearchvalue("");
    setprocodedata([]);
    setSmcsValue("");
    setsmcsdata([]);
  }


  const problemCodeChange = (val) => {
    dispatch(updateForm({ field: "fault_code", value: val }));
    if (val) {
      setComplaint(false);
      setProblem(false);
      setSmcs(true);
    } else {
      setComplaint(true);
      setProblem(true);
      setSmcs(false);

    }
  };

  const searchCompDesc = async (value) => {

    let modelprefix = formData.modelPrefix ? formData.modelPrefix.split("/") : "";
    let model = modelprefix[0] ? modelprefix[0].trim() : "";
    let prefix = modelprefix[1] ? modelprefix[1] : "";
    setCompdesValue(value);
    // setCompdescModelOpen(true)
    if (model && prefix && value) {
      let data = await complaintDescriptionApi(prefix, model, value);
      setCompdesc(data.Data);
    }else{
      setCompdesc([]);
    }
  }

  const chooseCompdesc = (value) => {
    let data = value.ComplaintDescription;
    dispatch(updateForm({ field: "complaint_description", value: data }));
    setFault(false);
    setCompdescModelOpen(false);
    setSmcs(false);
    setProblem(false);
     
  };

  const searchProblemCode = async (value) => {
    setsearchvalue(value);
    if (value) {
      let data = await problemCodeApi(value);
      setprocodedata(data);
    } else {
      setprocodedata([]);
    }
  };
  const chooseProblemCode = (value) => {
    let data = value.ProblemCode + "-" + value.ProblemDescription;
    dispatch(updateForm({ field: "problem_code", value: data }));
    setFault(false);
    setproblemCodeModelOpen(false);
    setSmcs(true);
    setComplaint(false)
    
  };

  const searchSmcsValue = async (value) => {
    setSmcsValue(value);
    if (value) {
      let data = await smcsCodeApi(value);
      setsmcsdata(data);
    } else {
      setsmcsdata([]);
    }
  };
  const chooseSmcs = (value) => {
    dispatch(updateForm({ field: "smcs_code", value: value }));
    setModelSmcs(false);
     
  };

  return (
    <>
      <div className={`status ${fault}`}>
        <TextField
          margin="normal"
          fullWidth
          id="faultcode"
          label="Fault Code"
          name="faultcode"
          autoCorrect="off"
          autoComplete="off"
          value={formData.faultCode}
          onChange={(e) => {
            problemCodeChange(e.target.value);
          }}
          disabled={!fault}
          className="fault-top"
        />
      </div>

      <Typography className="required-btn">
        or(<span className="required-textBox"></span>)
      </Typography>

      <Box>
        <div className={`status ${complaint}`}>
          <IconTextField
            label="Complaint Description"
            margin="normal"
            fullWidth
            id="complaintdesc"
            placeholder="Complaint Description"
            name="complaintdesc"
            autoCorrect="off"
            autoComplete="off"
            value={formData.complaintDescription}
            disabled={!complaint}
            onClick={complaint? ()=>   setCompdescModelOpen(true): Boolean}
            iconEnd={
              complaint && (
                <IconButton
                  className="a-i"
                  onClick={() => setCompdescModelOpen(true)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              )
            }
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </Box> 

      <Typography className="required-btn">
        or(<span className="required-textBox"></span>)
      </Typography>

      <Box className="flx-input">
        <div className={`status ${problem}`}>
          <IconTextField
            label="Select Problem Code / Description"
            margin="normal"
            fullWidth
            id="problemcode"
            placeholder="Problem Code / Description"
            name="problemcode"
            autoCorrect="off"
            autoComplete="off"
            value={formData.problemCode}
            disabled={!problem}
            onClick={problem ? () => setproblemCodeModelOpen(true) : Boolean}
            iconEnd={
              problem && (
                <IconButton
                  className="a-i"
                  onClick={() => setproblemCodeModelOpen(true)}
                >
                  <ArrowForwardIcon />
                </IconButton>
              )
            }
            InputProps={{
              readOnly: true,
            }}
          />
          {problem ? (
            <Typography
              className="cpc1-txt"
              onClick={() => setproblemCodeModelOpen(true)}
            >
              Change Problem Code / Description
            </Typography>
          ) : (
            ""
          )}
        </div>
        <div className={`status ${smcs}`}>
          <IconTextField
            label="Select SMCS Component / Description"
            margin="normal"
            fullWidth
            id="smcs"
            placeholder="SMCS Component"
            name="smcs"
            autoCorrect="off"
            autoComplete="off"
            value={formData.smcsCode}
            onClick={smcs ? () => setModelSmcs(true) : Boolean}
            disabled={!smcs}
            iconEnd={
              smcs && (
                <IconButton className="a-i" onClick={() => setModelSmcs(true)}>
                  <ArrowForwardIcon />
                </IconButton>
              )
            }
            InputProps={{
              readOnly: true,
            }}
          />
          {smcs ? (
            <Typography className="cpc-txt" onClick={() => setModelSmcs(true)}>
              Change SMCS Component / Description
            </Typography>
          ) : (
            ""
          )}
        </div>
      </Box>

      {/* model Area */}
      {compdescModelOpen &&
        <Modal
          className="modal-scroll"
          open={compdescModelOpen}
          onClose={() => setCompdescModelOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="close-btn-modal">
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                Select Complaint Description
              </Typography>
              <CloseIcon
                className="civ"
                onClick={() => setCompdescModelOpen(false)}
              />
            </div>

            <IconTextField
              fullWidth
              label="Search"
              name="Search"
              value={compdesValue}
              onChange={(event) => searchCompDesc(event.target.value)}
              iconEnd={
                <IconButton>
                  <CloseIcon onClick={() => setCompdesValue("")} />
                </IconButton>
              }
              autoCorrect="off"
              autoComplete="off"
              autoFocus="autofocus"
            />

            {compdesc.map((value, index) => (
              <Typography key={index}
                className="se-txt"
                onClick={() => { chooseCompdesc(value); }}
              >
                {value.ComplaintDescription}
              </Typography>
            ))}
          </Box>
        </Modal>
      }
      {problemCodeModelOpen &&
        <Modal
          className="modal-scroll"
          open={problemCodeModelOpen}
          onClose={() => setproblemCodeModelOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="close-btn-modal">
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                Select Problem Code / Description
              </Typography>
              <CloseIcon
                className="civ"
                onClick={() => setproblemCodeModelOpen(false)}
              />
            </div>

            <IconTextField
              fullWidth
              label="Search"
              name="Search"
              value={searchvalue}
              onChange={(event) => searchProblemCode(event.target.value)}
              iconEnd={
                <IconButton>
                  <CloseIcon onClick={() => setsearchvalue("")} />
                </IconButton>
              }
              autoCorrect="off"
              autoComplete="off"
              autoFocus="autofocus"
            />

            {procodedata.map((value, index) => (
              <Typography key={index}
                className="se-txt"
                onClick={() => { chooseProblemCode(value); }}
              >
                {value.ProblemCode}-{value.ProblemDescription}
              </Typography>
            ))}
          </Box>
        </Modal>
      }
      {modelsmcs &&
        <Modal
          open={modelsmcs}
          onClose={() => setModelSmcs(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="close-btn-modal">
              <Typography id="modal-modal-title1" variant="h6" component="h2">
                Select SMCS Component / Description
              </Typography>
              <CloseIcon className="civ" onClick={() => setModelSmcs(false)} />
            </div>

            <IconTextField
              fullWidth
              label="Search"
              name="Search"
              value={smcsValue}
              onChange={(event) => searchSmcsValue(event.target.value)}
              iconEnd={
                <IconButton>
                  <CloseIcon onClick={() => setSmcsValue("")} />
                </IconButton>
              }
              autoCorrect="off"
              autoComplete="off"
              autoFocus="autofocus"
            />
            {smcsdata.map((value, index) => (
              <Typography key={index} className="se-txt" onClick={() => chooseSmcs(value)}>
                {value}
              </Typography>
            ))}
          </Box>
        </Modal>
      }
    </>
  );
}

export default FaultCodeText;