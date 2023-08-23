import React, { useEffect } from "react";
import Layout from "../../components/searchLayout";
import { Button, Card } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as Icon from "react-bootstrap-icons";

function Bom() {

  const location = useLocation();

  const navigate = useNavigate();

  const { probcode, smcscode } = location.state


  useEffect(() => {
  }, []);
  const backbtn = () => {
    if (location.state.Viewresult) {
      navigate("/viewresult", {
        state: {
          serialno: location.state.serialno,
          modelprefix: location.state.modelprefix,
          range: location.state.range,
          smcs: location.state.smcs,
          faultcode: location.state.faultcode,
          problemcode: location.state.problemcode,
          length: location.state.length,
          results: location.state.results,
          CommonResolutionnumber: location.state.CommonResolutionnumber,
          solutionpathvalue: location.state.solutionpathvalue,
          solutionpath: location.state.solutionpath,
          faultdesc: location.state.faultDesc,
          ai: location.state.ai,
          altFaultCode: location.state.altFaultCode,
          complaintDesc: location.state.complaintDesc,
          probleminwords: location.state.probleminwords || "",
          probcode: location.state.probcode || "",
          smcscode: location.state.smcscode || "",
        },
      });
    } else {
      navigate("/result", {
        state: {
          serialno: location.state.serialno,
          modelprefix: location.state.modelprefix,
          range: location.state.range,
          smcs: location.state.smcs,
          faultcode: location.state.faultcode,
          problemcode: location.state.problemcode,
          length: location.state.length,
          results: location.state.results,
          CommonResolutionnumber: location.state.CommonResolutionnumber,
          solutionpathvalue: location.state.solutionpathvalue,
          solutionpath: location.state.solutionpath,
          ai: location.state.ai,
          altFaultCode: location.state.altFaultCode,
          complaintDesc: location.state.complaintDesc,
          probleminwords: location.state.probleminwords || "",
          probcode: location.state.probcode || "",
          smcscode: location.state.smcscode || "",
        },
      });
    }
  };
  let commonRes =
    location.state.CommonResolutionnumber !== null
      ? location.state.CommonResolutionnumber
      : 1;
  const { complaintDesc } = location.state;
  const complaintDescVal = typeof complaintDesc === "string" ? complaintDesc :
    complaintDesc && complaintDesc.length > 0 && complaintDesc[commonRes - 1];

  return (
    <>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box className="box-header">
            <h2 className="page-heding">
              Result{" "}
              <span className="header-count">
                {commonRes < 10
                  ? `0${commonRes}`
                  : commonRes}
              </span>{" "}
            </h2>

            {/* <img src={bom} ></img> */}
            <Button
              type="submit"
              // size="large"
              variant="contained"
              className="btn-secondary"
              // onClick={() => { navigate('/result',{state:{serialno:location.state.serialno,modelprefix: location.state.modelprefix,range: location.state.range,smcs: location.state.smcs,faultcode: location.state.faultcode,problemcode: location.state.problemcode,length:location.state.length,results:location.state.results,CommonResolutionnumber:location.state.CommonResolutionnumber}}) }}
              onClick={backbtn}
            >
              Back
            </Button>
          </Box>
          <Box className="contact-info">
            <Card className="model-cart">
              <CardContent sx={{ overflow: "overlay", height: "100%" }}>
                <div className="rowdata">
                  <ul>
                    {location.state.serialno !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.DatabaseFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Serial No :
                          </Typography>

                          <Typography className="text-bold">
                            {location.state.serialno
                              ? location.state.serialno
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}
                    {location.state.modelprefix !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.GearFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Model/Prefix :
                          </Typography>

                          <Typography className="text-bold">
                            {location.state.modelprefix
                              ? location.state.modelprefix
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}
                    {location.state.range !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.CollectionFill className="icon" />{" "}
                        </div>

                        <div className="det_right">
                          <Typography className="font-14">
                            Sl. No Range :
                          </Typography>

                          <Typography className="text-bold">
                            {location.state.range ? location.state.range : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {location.state.faultcode !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.ExclamationCircleFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Fault Code :
                          </Typography>
                          <Typography className="text-bold">
                            {location.state.faultcode
                              ? location.state.faultcode
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {/* <li><div className='det_right'>{ location.state.problemcode &&<br/> }</div></li> */}
                    {location.state.problemcode !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.ChatRightTextFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Problem Code / Description :
                          </Typography>

                          <Typography className="text-bold">
                            {location.state.problemcode
                              ? location.state.problemcode
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {location.state.smcs !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.BoxSeamFill className="icon" />{" "}
                        </div>

                        <div className="det_right">
                          <Typography className="font-14">
                            SMCS Component :
                          </Typography>
                          <Typography className="text-bold">
                            {location.state.smcs ? location.state.smcs : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {location.state.altFaultCode.length > 0 && (
                      <li>
                        <div className="det_right">
                          <Typography className="font-14">
                            Alternate Fault Code:
                          </Typography>
                          <b>
                            {location.state.altFaultCode.length > 0
                              ? location.state.altFaultCode.map(
                                (val, i, last) => {
                                  return (
                                    <>
                                      {val}
                                      {i + 1 !== last.length && ","}
                                    </>
                                  );
                                }
                              )
                              : "-"}
                          </b>
                        </div>
                      </li>
                    )}

                    {location.state.faultDesc !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.ChatRightTextFill className="icon" />{" "}
                        </div>

                        <div className="det_right">
                          <Typography className="font-14">
                            Fault Code Description:
                          </Typography>
                          <Typography className="text-bold">
                            {location.state.faultDesc
                              ? location.state.faultDesc
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {complaintDescVal &&
                      location.state.faultDesc === "" && (
                        <li>
                          <div className="iconwrap">
                            <Icon.ChatRightTextFill className="icon" />{" "}
                          </div>

                          <div className="det_right">
                            <Typography className="font-14">
                              Complaint Description:
                            </Typography>

                            <Typography className="text-bold">
                              {complaintDescVal
                                ? complaintDescVal
                                : "-"}
                            </Typography>
                          </div>
                        </li>
                      )}

                    {location.state.problemcode === "" && probcode && probcode.length && probcode[commonRes - 1] &&
                      (<li>
                        <div className="iconwrap">
                          <Icon.ChatRightTextFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Problem Code / Description:
                          </Typography>
                          {probcode.map((item, id) => (
                            <Typography key={id} className="text-bold">
                              {item}
                            </Typography>
                          ))}

                        </div>
                      </li>)
                    }
                    {location.state.smcs === "" && smcscode && smcscode.length && smcscode[commonRes - 1] &&
                      (<li>
                        <div className="iconwrap">
                          <Icon.BoxSeamFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            SMCS Component:
                          </Typography>
                          {smcscode.map((items, id) => (
                            <Typography key={id} className="text-bold">
                              {items}
                            </Typography>
                          ))}

                        </div>
                      </li>)
                    }
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bom-box1">
              <CardContent>
                <h4>
                  <span className="solution-count-result-bom">
                    {location.state.solutionpathvalue.pathName}
                  </span>{" "}
                  BOM
                </h4>
                {location.state.solutionpathvalue.Bom.map((data, ids) => {
                  if (data.partno !== "")
                    return (
                      <>
                        {" "}
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="bom-box"
                          >
                            {/* <Card sx={{marginTop:0}} className='bom-box'>

<CardContent >    */}
                            <Typography>Parts No. {data.partno}</Typography>
                            {/* </CardContent></Card>       */}
                          </AccordionSummary>
                          <AccordionDetails>
                            {/* 
                <Box className='knowledgebase_input_wrapperr'>
                    <Card sx={{marginTop:0,marginBottom:2}}>
                        <CardContent> */}

                            <div className="bom-det">
                              <Typography>Description:</Typography>
                              {data.description &&
                                <Typography className="text-bold">
                                  {data.description}
                                </Typography>
                                || "Not Available"
                              }
                            </div>

                            <div className="bom-det">
                              <Typography>Qty: </Typography>
                              {data.qty &&
                                <Typography className="text-bold">
                                  {Math.round(data.qty)}
                                </Typography>
                                || "Not Available"
                              }
                            </div>

                            <div className="bom-det">
                              <Typography>Supporting Document:</Typography>
                              {data.document && data.document.length !== 0 && (
                                <>
                                  {data.document[0].split(',').map((elem, ids) => (
                                    elem.startsWith('https') ?
                                      <div>
                                        <a className="bom-txt"
                                          href={elem}
                                          target="_blank">
                                          {elem}
                                        </a>
                                      </div>
                                      : <Typography className="text-bold">Not Available</Typography>
                                  ))}
                                </>
                              )}
                            </div>
                            <div className="bom-det">
                              <Typography>Note: </Typography>
                              {data.note && data.note !== "" &&
                                <>
                                  {data.note.split(",").map((elems, id) => {
                                    const elem = elems.trim()
                                    return (elem.startsWith('https') ?
                                      <div>
                                        <a className="bom-txt"
                                          href={elem}
                                          target="_blank"
                                        >
                                          {elem}
                                        </a>
                                      </div>
                                      : <div>
                                        <Typography className="lineemit text-bold">{elem || "Not Available"}</Typography>
                                      </div>)
                                  }
                                  )}
                                </> ||
                                <Typography className="text-bold">Not Available</Typography>}
                            </div>
                            {/* </CardContent></Card>
 
                </Box>   */}
                          </AccordionDetails>
                        </Accordion>
                      </>
                    );
                })}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
export default Bom;
