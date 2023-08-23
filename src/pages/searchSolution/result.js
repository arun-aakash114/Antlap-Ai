import React, { useEffect } from "react";
import Layout from "../../components/searchLayout";
import { Button, Card } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import LayersIcon from "@mui/icons-material/Layers";
import "react-slideshow-image/dist/styles.css";
import "plyr-react/plyr.css";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import setting from "../../assets/settingsicon.svg";
import notes from "../../assets/notes.svg";
import file from "../../assets/file.svg";
import toolicon from "../../assets/toolicon.svg";
import cam from "../../assets/cam.svg";
import document from "../../assets/document.svg";
import * as Icon from "react-bootstrap-icons";
import {
  getCardData,
  getFaultDesc,
  getCardDataAi,
  getCustomerCardDataAi
} from "../../service/apiServices/resultServices";
import { useDispatch } from "react-redux";
import { resetForm } from "../../store/reducers/knowledgeBaseForm";
// NOSONAR Start

function Result() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [commenresolutiondata, setcommenresolutiondata] = React.useState([]);
  const [iconName, setIconName] = React.useState("resolution");
  const [faultdes, setfaultdes] = React.useState("");
  const [altFaultCode, setaltFaultCode] = React.useState("");

  const { probcode, smcscode } = location.state

  const faultFunc = async (data) => {
    let response = await getFaultDesc(data);

    setfaultdes(response.data.faultDesc);
    setaltFaultCode(response.data.altFaultCode);
  };
  useEffect(() => {
    let data = location.state.results[0]
      ? location.state.results[0].Resolution
      : "";
    setcommenresolutiondata(data);
    const modelprefix = location.state.modelprefix?.split("/") || "";
    const smcs = location.state.smcs?.split("-") || "";
    const pd = location.state.problemcode
      ? location.state.problemcode.split("-")
      : "";
    let fData = {
      modelprefix: modelprefix[0]?.trim() || "",
      serialno: modelprefix[1] || "",
      serialnoRange: location.state.range || "",
      problemdes: pd[0]?.replace(/^0+/, "") || "",
      smcs: smcs[0] || "",
      faultcode: location.state.faultcode || "",
    };
    if (location.state.faultcode !== "") {
      faultFunc(fData);
    }
    dispatch(resetForm());
  }, []);

  const recommentationfunction = async (data) => {
    const modelprefix = location.state.modelprefix?.split("/") || "";
    const smcs = location.state.smcs?.split("-") || "";
    const pd = location.state.problemcode
      ? location.state.problemcode.split("-")
      : "";
    let fData = {
      modelprefix: modelprefix[0]?.trim() || "",
      serialno: modelprefix[1]?.toUpperCase() || "",
      serialnoRange: location.state.range || "",
      problemdes: pd[0]?.replace(/^0+/, "") || "",
      smcs: smcs[0] || "",
      faultcode: location.state.faultcode || "",
      probleminwords: location.state.probleminwords || "",
      CommonResolutionnumber: commonRes,
      iconname: data,
      Step_number: "",
      sub_step_number: "",
      infonumber: "",
      Path_name: ""
    };

    if (location.state.ai) {
      let response = location.state.probleminwords && location.state.probleminwords.length !== 0 ? await getCustomerCardDataAi(fData) : await getCardDataAi(fData);

      setcommenresolutiondata(response.data.data);
      setIconName(response.data.iconname);
    } else {
      let response = await getCardData(fData);

      setcommenresolutiondata(response.data.data);
      setIconName(response.data.iconname);
    }
  };
  const viewAllFunc = () => {
    navigate("/searchresult", {
      state: {
        serialno: location.state.serialno || "",
        modelprefix: location.state.modelprefix || "",
        range: location.state.range || "",
        smcs: location.state.smcs || "",
        faultcode: location.state.faultcode || "",
        problemcode: location.state.problemcode || "",
        length: location.state.length || "",
        viewall: location.state.viewall || "",
        ai: location.state.ai || "",
        altFaultCode: altFaultCode || "",
        complaintDesc: location.state.complaintDesc || "",
        probcode: location.state.probcode || "",
        smcscode: location.state.smcscode || "",
        probleminwords: location.state.probleminwords || "",
      },
    });
  };

  const backfunction = () => {
    if (location.state.viewall === true) {
      navigate("/searchresult", {
        state: {
          serialno: location.state.serialno || "",
          complaintDesc: location.state.complaintDesc || "",
          modelprefix: location.state.modelprefix || "",
          range: location.state.range || "",
          smcs: location.state.smcs || "",
          faultcode: location.state.faultcode || "",
          problemcode: location.state.problemcode || "",
          length: location.state.length || "",
          viewall: location.state.viewall || "",
          ai: location.state.ai || "",
          altFaultCode: altFaultCode || "",
          probcode: location.state.probcode || "",
          smcscode: location.state.smcscode || "",
          probleminwords: location.state.probleminwords || "",
        },
      });
    } else {
      navigate("/knowledgeBase");
      localStorage.removeItem("fault");
      localStorage.removeItem("range");
      localStorage.removeItem("model");
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
                {commonRes < 10 ? `0${commonRes}` : commonRes}
              </span>{" "}
            </h2>
            <div>
              <Button
                type="submit"
                size="small"
                variant="contained"
                className="btn-secondary fo-rig"
                onClick={backfunction}
              >
                Back
              </Button>
              {location.state.viewall === true && (
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  className="btn-primary"
                  onClick={viewAllFunc}
                >
                  View All Results
                </Button>
              )}
            </div>
          </Box>
          <Box className="contact-info">
            <Card className="model-cart">
              <CardContent sx={{ overflow: "overlay", height: "100%" }}>
                <div className="rowdata">
                  <ul>
                    {location.state.serialNo && (
                      <li>
                        <div className="iconwrap">
                          <Icon.DatabaseFill className="icon" />
                        </div>{" "}
                        <div className="det_right">
                          <Typography className="font-14">
                            Serial No :
                          </Typography>{" "}
                          <Typography className="text-bold">
                            {" "}
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
                            {location.state.range
                              ? location.state.range.toUpperCase()
                              : "No Data Available"}
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
                          <b></b>{" "}
                        </div>
                      </li>
                    )}
                    {/* <li><div className='det_right'>{ location.state.problemcode &&<br/> }</div></li> */}

                    {location.state.problemcode !== "" &&
                      location.state.problemcode !== null &&
                      location.state.faultcode === "" && (
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

                    {location.state.smcs !== "" &&
                      location.state.smcs !== null && (
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

                    {altFaultCode !== "" && altFaultCode.length !== 0 && (
                      <li>
                        <div className="iconwrap">
                          <Icon.LayersFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Alternate Fault Code:
                          </Typography>

                          <Typography className="text-bold">
                            {altFaultCode.length > 0
                              ? altFaultCode.map((val, i, last) => {
                                return (
                                  <div key={val}>
                                    {val}
                                    {i + 1 !== last.length && ","}
                                  </div>
                                );
                              })
                              : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {faultdes !== "" && (
                      <li>
                        <div className="iconwrap">
                          <Icon.ChatRightTextFill className="icon" />{" "}
                        </div>

                        <div className="det_right">
                          <Typography className="font-14">
                            Fault Code Description:
                          </Typography>

                          <Typography className="text-bold">
                            {faultdes ? faultdes : "-"}
                          </Typography>
                        </div>
                      </li>
                    )}

                    {complaintDescVal &&
                      location.state.faultcode === "" && (
                        <li>
                          <div className="iconwrap">
                            <Icon.ChatRightTextFill className="icon" />{" "}
                          </div>
                          <div className="det_right">
                            <Typography className="font-14">
                              Complaint Description:
                            </Typography>

                            <Typography className="text-bold">
                              {complaintDescVal ? complaintDescVal : "-"}
                            </Typography>
                          </div>
                        </li>
                      )}

                    {location.state.problemcode === "" && probcode && probcode.length &&
                      (<li>
                        <div className="iconwrap">
                          <Icon.ChatRightTextFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            Problem Code / Description:
                          </Typography>
                          {probcode.map((id) =>
                            <Typography className="text-bold">{id} </Typography>
                          )}
                        </div>
                      </li>)
                    }
                    {location.state.smcs === "" && smcscode && smcscode.length &&
                      (<li>
                        <div className="iconwrap">
                          <Icon.BoxSeamFill className="icon" />{" "}
                        </div>
                        <div className="det_right">
                          <Typography className="font-14">
                            SMCS Component:
                          </Typography>
                          {smcscode.map((id) =>
                            <Typography className="text-bold">{id} </Typography>
                          )}
                        </div>
                      </li>)
                    }

                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="resolution-box1">
              {location.state.results && location.state.results.length > 0 && location.state.results[0].Resolution &&
                location.state.results[0].Resolution.length != 0 && (
                  <>
                    <Card
                      style={{ marginLeft: "25px", width: "auto" }}
                      className="resolution-box1 common-info"
                    >
                      <div>
                        {iconName === "resolution" &&
                          <Typography>
                            <img src={document} alt='' className='title_icon'></img>Resolution
                          </Typography>
                        }
                        {iconName === "common_tools" &&
                          <Typography>
                            <img src={setting} alt='' className='title_icon'></img>Common Tool
                          </Typography>
                        }
                        {iconName === "special_tools" &&
                          <Typography>
                            <img src={toolicon} alt='' className='title_icon'></img>Required Special Tool
                          </Typography>
                        }
                        {iconName === "pdf" &&
                          <Typography>
                            <img src={file} alt='' className='title_icon'></img>Supporting Document
                          </Typography>
                        }
                        {iconName === "note" &&
                          <Typography>
                            <img src={notes} alt='' className='title_icon'></img>Note
                          </Typography>
                        }
                        {iconName === "camera" &&
                          <Typography>
                            <img src={cam} alt='' className='title_icon'></img>Photo
                          </Typography>
                        }
                        {iconName === "video" &&
                          <Typography>
                            <VideocamOutlinedIcon className='title_icon' />Video
                          </Typography>
                        }
                      </div>
                    </Card>
                    <Card className="resolution-cart">
                      <CardContent>
                        <div className="resol_wrap">
                          <div className="resol_left">
                            {commenresolutiondata?.length > 0 ? (
                              commenresolutiondata.map((elem, id) => {

                                return (
                                  <div key={id} className="line-sp">
                                    <>{elem.split(",").map((item) =>
                                      item.startsWith("https") ?
                                        (<div>
                                          <a className="bom-txt"
                                            href={item}
                                            target="_blank">{item}</a>
                                        </div>
                                        ) : (
                                          <Typography className="lineemit">{item}</Typography>
                                        ))}
                                    </>
                                  </div>
                                );
                              })
                            ) : (
                              <Typography>No Data Available</Typography>
                            )}
                          </div>
                          <div className="resol_right">
                            <div className="icon-vertical-alien">
                              <IconButton
                                className={
                                  iconName == "resolution"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() =>
                                  recommentationfunction("resolution")
                                }
                              >
                                {" "}
                                <img src={document} className="res-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "common_tools"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() =>
                                  recommentationfunction("common_tools")
                                }
                              >
                                {" "}
                                <img
                                  src={setting}
                                  className="set-icon"
                                ></img>{" "}
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "special_tools"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() =>
                                  recommentationfunction("special_tools")
                                }
                              >
                                {" "}
                                <img src={toolicon} className="stool-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "pdf"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() => recommentationfunction("pdf")}
                              >
                                {" "}
                                <img src={file} className="file-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "note"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() => recommentationfunction("note")}
                              >
                                {" "}
                                <img src={notes} className="note-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "camera"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() => recommentationfunction("camera")}
                              >
                                {" "}
                                <img src={cam} className="cam-icon"></img>{" "}
                              </IconButton>
                              <br />
                              <IconButton
                                className={
                                  iconName == "video"
                                    ? "resol_btn_active"
                                    : "resol_btn"
                                }
                                onClick={() => recommentationfunction("video")}
                              >
                                {" "}
                                <VideocamOutlinedIcon />{" "}
                              </IconButton>
                              <br />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              <div className="sp-top">
                {location.state.results && location.state.results.length > 0 && location.state.results[0].SolutionPath &&
                  location.state.results[0].SolutionPath.map((value, key) => (
                    <Card
                      style={{ marginTop: "10px" }}
                      className="SolutionPath-cart"
                    >
                      {value.pathName && value.pathName.length !== 0 &&
                        (
                          <div className="SolutionPath-align">
                            <Typography className="fd-step">
                              <span className="solution-count-result">
                                {value.pathName}
                              </span>
                              Solution Path
                            </Typography>
                            <div>
                              <IconButton
                                className="btn-light"
                                onClick={() => {
                                  navigate("/viewresult", {
                                    state: {
                                      serialno: location.state.serialno || "",
                                      faultdesc: faultdes || "",
                                      modelprefix: location.state.modelprefix || "",
                                      range: location.state.range || "",
                                      smcs: location.state.smcs || "",
                                      faultcode: location.state.faultcode || "",
                                      problemcode: location.state.problemcode || "",
                                      results: location.state.results || "",
                                      solutionpath: value.pathName || "",
                                      length: location.state.length || "",
                                      solutionpathvalue: value,
                                      CommonResolutionnumber: commonRes,
                                      viewall: location.state.viewall || "",
                                      faultDesc: faultdes || "",
                                      altFaultCode: altFaultCode || "",
                                      ai: location.state.ai || "",
                                      complaintDesc: location.state.complaintDesc || "",
                                      probcode: location.state.probcode || "",
                                      smcscode: location.state.smcscode || "",
                                      probleminwords: location.state.probleminwords || "",
                                    },
                                  });
                                }}
                              >
                                <VisibilityOutlinedIcon />{" "}
                              </IconButton>

                              {value.Bom && value.Bom.length !== 0 && (
                                <IconButton
                                  className="btn-outlined bom"
                                  onClick={() => {
                                    navigate("/bom", {
                                      state: {
                                        solutionpathvalue: value,
                                        serialno: location.state.serialno || "",
                                        modelprefix: location.state.modelprefix || "",
                                        range: location.state.range || "",
                                        smcs: location.state.smcs || "",
                                        faultcode: location.state.faultcode || "",
                                        problemcode: location.state.problemcode || "",
                                        length: location.state.length || "",
                                        results: location.state.results || "",
                                        CommonResolutionnumber: commonRes,
                                        faultDesc: faultdes || "",
                                        altFaultCode: altFaultCode || "",
                                        ai: location.state.ai || "",
                                        complaintDesc: location.state.complaintDesc || "",
                                        probcode: location.state.probcode || "",
                                        smcscode: location.state.smcscode || "",
                                        probleminwords: location.state.probleminwords || "",
                                      },
                                    });
                                  }}
                                >
                                  <LayersIcon />
                                  BOM
                                </IconButton>
                              )}
                              {/* <img src={bom} onClick={() =>  { navigate('/bom',{state:{solutionpathvalue:value,serialno:location.state.serialno,modelprefix: location.state.modelprefix,range: location.state.range,smcs: location.state.smcs,faultcode: location.state.faultcode,problemcode: location.state.problemcode,length:location.state.length,results:location.state.results,CommonResolutionnumber:location.state.CommonResolutionnumber}}) }} ></img>} */}
                            </div>
                          </div>)}
                    </Card>
                  ))}
              </div>
            </div>
          </Box>
        </Container>
      </Layout>
    </>
  );
}
// NOSONAR End

export default Result;
