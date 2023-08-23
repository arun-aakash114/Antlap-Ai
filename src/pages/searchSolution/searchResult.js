import React, { useEffect } from "react";
import Layout from "../../components/searchLayout";
import { Button, Card } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import {
  aisearch,
  customerAisearch,
  directsearch,
} from "../../service/apiServices/searchService";
import { resetForm } from "../../store/reducers/knowledgeBaseForm";

function Search() {
  let dispatch = useDispatch();
  const [allSolutions, setallSolutions] = React.useState();
  const [complaintdesclist, setcomplaintdesclist] = React.useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    setallSolutions(location.state.length);
    if (location.state.ai) {
      setcomplaintdesclist(location.state.complaintDesc);
    } else {
      setcomplaintdesclist([]);
    }
    dispatch(resetForm());
  }, []);

  const backfunction = () => {
    navigate("/knowledgeBase");
    localStorage.removeItem("fault");
    localStorage.removeItem("range");
    localStorage.removeItem("model");
  };
// NOSONAR Start
  const resultfunction = async (id, comdes) => {
    const modelprefix = location.state.modelprefix?.split("/") || "";
    const smcs = location.state.smcs?.split("-") || "";
    const pd = location.state.problemcode?.split("-") || "";
    let fData = {
      modelprefix: modelprefix[0]?.trim() || "",
      serialno: modelprefix[1] || "",
      serialnoRange: location.state.range?.toUpperCase() || "",
      problemdes: pd[0]?.replace(/^0+/, "") || "",
      smcs: smcs[0] || "",
      faultcode: location.state.faultcode?.toUpperCase() || "",
      PCode_description: pd[1] || "",
      SCode_description: smcs[1] || "",
      Actual_serialno: location.state.serialnumber && modelprefix[1],
      probleminwords: location.state.probleminwords || '',
    };

    let result;

    if (location.state.ai) {
      let response = location.state.probleminwords && location.state.probleminwords.length !== 0 ? await customerAisearch(id, fData) : await aisearch(id, fData);
      if (response.length !== 0) {
        result = response.data.results;
      }
    } else {
      let responce = await directsearch(id, fData);
      if (responce.length !== 0) {
        result = responce.data.results;
      }
    }

    let val = {
      serialno: location.state.serialno,
      modelprefix: location.state.modelprefix,
      range: location.state.range,
      smcs: location.state.smcs,
      faultcode: location.state.faultcode,
      problemcode: location.state.problemcode,
      length: location.state.length,
      results: result,
      ai:location.state.ai || "",
      CommonResolutionnumber: id,
      viewall: location.state.viewall,
      serialNo: location.state.serialnumber,
      complaintDesc: location.state.complaintDesc,
      probcode: location.state.probcode || "",
      smcscode : location.state.smcscode || "",
      probleminwords: location.state.probleminwords || "",
    };

    navigate("/result", { state: val });
  };
  
  let x;
  if (sessionStorage.getItem('proType') === "Non IoT") {
    x = 'Complaint Description'
  }
  else{
    x = 'Fault Code Description'
  }
  return (
    <>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box className="box-header">
            <h2 className="page-heding">
              Result(s)Found{" "}
              <span className="header-count">
                {allSolutions < 10 ? `0${allSolutions}` : allSolutions}
              </span>{" "}
            </h2>
            <Button
              type="submit"
              variant="contained"
              className="btn-secondary"
              onClick={backfunction}
            >
              Back
            </Button>
          </Box>
          <Card sx={{ marginTop: 0 }} className="result-card">
            {
              <>
                {complaintdesclist.length > 0 &&
                  complaintdesclist.map((element, id) => {
                    return (
                      <Card
                        type="submit"
                        variant="contained"
                        className="result-count-btn results-list"
                        onClick={() => resultfunction(id + 1, element)}
                      >
                        <a className="s-count">
                          {id + 1 < 10 ? `0${id + 1}` : id + 1}
                        </a>

                        <div className="det_right">
                          <Typography className="font-14">
                            {x}
                          </Typography>
                          <Typography className="rs-des">
                            <b> {element}</b>
                          </Typography>
                        </div>
                      </Card>
                    );
                  })}
              </>
            }
          </Card>
        </Container>
      </Layout>
    </>
  );
}
// NOSONAR End
export default Search;
