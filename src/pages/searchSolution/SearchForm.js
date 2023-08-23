import React from "react";
import face from "../../assets/face.svg";
import Layout from "../../components/searchLayout";
import { Container } from "@mui/system";
import { Circles } from "react-loader-spinner";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography , Button} from "@mui/material";
import FaultCodeText from "../../components/faultCodeText";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { revertToast, updateToast } from "../../store/reducers/toasters";
import FooterButton from "../../components/footerButton";
import Modal from "@mui/material/Modal";
import ModelPrefix from "../../components/modelPrefix";
import { resetForm } from "../../store/reducers/knowledgeBaseForm";
import { useNavigate } from "react-router-dom";

function Searchform() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let toaster = useSelector((state) => state.toaster);

  const style1 = {
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

  const toasterClose = () => {
    dispatch(updateToast({ field: "revert_valid" }));
    window.location.reload(true);
  };

  const backFunc = () => {
    navigate("/solutionDashboard");
    dispatch(resetForm());
  };


  return (
    <>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <div
            className={toaster.loader === true ? "parentDisable" : ""}
            width="100%"
          >
            {toaster.loader === true && (
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
            <Box className="box-header">
              <h3 className="page-heading">Search Solution </h3>
              {localStorage.getItem("type") !== "3" && (
                <Button
                  type="submit"
                  variant="contained"
                  className="btn-secondary"
                  onClick={backFunc}
                >
                  Back
                </Button>
              )}
            </Box>
            <Card style={{ overflow: "unset" }}>
              <Typography className="section-header">
                Select anyone of the following field&nbsp;&nbsp;
                <span className="required-field"></span>
              </Typography>
              <CardContent className="src-box">
                <Box className="flx-input">
                  <>
                    <ModelPrefix />
                  </>
                </Box>
              </CardContent>
            </Card>
            <Box className="knowledgebase_input_wrapperr">
              <Card className="fc-box">
                <Typography className="section-header">
                  Select the 'Fault Code' or 'Complaint Description' or 'Problem Code' & 'SMCS
                  Component'&nbsp;&nbsp;<span className="required-field"></span>
                </Typography>
                <CardContent>
                  <>
                    <FaultCodeText />
                  </>
                </CardContent>
              </Card>
            </Box>
            <Snackbar
              open={toaster.toast}
              autoHideDuration={2000}
              onClose={() => dispatch(revertToast())}
              className="pop-alert"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                Prefix not found
              </Alert>
            </Snackbar>
            <Snackbar
              open={toaster.match}
              autoHideDuration={2000}
              onClose={() => dispatch(updateToast({ field: "revertMatch" }))}
              className="pop-alert"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                No match found
              </Alert>
            </Snackbar>
            <Snackbar
              open={toaster.valide}
              autoHideDuration={2000}
              onClose={() => toasterClose()}
              className="pop-alert"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                Please give mandatory inputs
              </Alert>
            </Snackbar>
            <Box className="btn_align_right">
              <div className="err-msg">
                {/* { alert ? (<Typography sx={{ color:"#fc4d53"}} className='alert-txt'>Model/Prefix && Fault Code / Problem Code && SMCS Component is mandatory</Typography>):""} */}
                <FooterButton />
              </div>
            </Box>
          </div>
        </Container>
        <Modal
          open={toaster.reasonopen}
          onClose={() => dispatch(updateToast({ field: "reasonRevert" }))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <div className="face-align">
              <img src={face}></img>
            </div>

            <p className="no-data">
              No exact match found
            </p>
            {/* <AiButtons onClose={() => dispatch(updateToast({ field: "reasonRevert" }))} /> */}
          </Box>
        </Modal>
      </Layout>
    </>
  );
}

export default Searchform;
