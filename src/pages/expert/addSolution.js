import React from "react";
import Explayout from "../../components/expert/explayout";
import { Container } from "@mui/system";
import { Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {   useLocation } from "react-router-dom";
import ParamFaultForm from "../../components/expert/paramFaultForm";
import ModelForm from "../../components/expert/modelForm";

const AddSolution = (props) => {
  const location = useLocation();

  return (
    <Explayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div className="crt-parameters">
          <div className="box-header dt-mgmt">
            <h2 className="page-heding">
              Create Parameters for {sessionStorage.getItem("proType")}{" "}
            </h2>

            <div className="tb-btns">
              {/* <Button className='back-btn' variant="contained" size="medium" onClick={() => navigate('/solutionDashboard')} startIcon={<ChevronLeftIcon />}>
                                Back
                            </Button> */}
            </div>
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className="create-input-section"
          >
            <Card>
              <CardContent>
                <ModelForm canedit={location?.state?.act} />

                <ParamFaultForm
                  canedit={location?.state?.act}
                  sourceid={location.state?.id}
                />
              </CardContent>
            </Card>
          </Box>
        </div>
      </Container>
    </Explayout>
  );
};

export default AddSolution;
