import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import "react-slideshow-image/dist/styles.css";
import "plyr-react/plyr.css";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import setting from "../../assets/settingsicon.svg";
import notes from "../../assets/notes.svg";
import file from "../../assets/file.svg";
import toolicon from "../../assets/toolicon.svg";
import cam from "../../assets/cam.svg";
import document from "../../assets/document.svg";
import {
  getCardDataAi,
  getCardData,
  getCustomerCardDataAi
} from "../../service/apiServices/cardDataservices";
// NOSONAR Start
function Carddata(props) {
  const [resolutionData, setResolutionData] = useState([]);
  const [iconName, setIconName] = useState("resolution");
  useEffect(() => {
    setResolutionData(props.Resolution);
  }, []);
  const { probleminwords } = props.searchedval
  const iconfunction = async (iconname, id) => {
    const obj = {
      modelprefix: props.searchedval.modelprefix ||"",
      serialno: props.searchedval.serialno || "",
      serialnoRange: props.searchedval.serialnoRange,
      problemdes: props.searchedval.problemdes || "",
      smcs: props.searchedval.smcs || "",

      faultcode: props.searchedval.faultcode || "",
      CommonResolutionnumber: props.searchedval.CommonResolutionnumber || "",
      Path_name: props.pathName ? props.pathName : "",
      iconname: iconname,
      probleminwords: probleminwords || "",
      Step_number: props.stepNumber,
      sub_step_number: props.substeps && props.subStepNumber || "",
      infonumber: "",
    };
    if (props.info) {
      const infoObj = {
        modelprefix: props.searchedval.modelprefix || "",
        serialno: props.searchedval.serialno || "",
        serialnoRange: props.searchedval.serialnoRange || "",
        problemdes: props.searchedval.problemdes || "",
        smcs: props.searchedval.smcs || "",
        faultcode: props.searchedval.faultcode || "",
        CommonResolutionnumber: props.searchedval.CommonResolutionnumber?.toString() || "",
        probleminwords: probleminwords || "",
        Path_name: props.pathName,
        iconname: iconname,
        Step_number: props.stepNumber || "",
        sub_step_number: props.substeps && props.subStepNumber || '',
        infonumber: String(id + 1),
      };
      if (props.info && props.ai) {
        let response = probleminwords && probleminwords.length !== 0 ? await getCustomerCardDataAi("info", infoObj) : await getCardDataAi("info", infoObj);
        setResolutionData(response.data.data);
        setIconName(iconname);
      } else {
        let response = await getCardData("info", infoObj);

        setResolutionData(response.data.data);
        setIconName(iconname);
      }
    } else if (props.steps) {
      if (props.steps && props.ai) {
        let response = probleminwords && probleminwords.length !== 0 ? await getCustomerCardDataAi("stepname", obj) : await getCardDataAi("stepname", obj);
        setResolutionData(response.data.data);
        setIconName(iconname);
      } else {
        let response = await getCardData("stepname", obj);


        setResolutionData(response.data.data);
        setIconName(iconname);
      }
    } else if (props.substeps) {
      const substepsObj = {
        modelprefix: props.searchedval.modelprefix || "",
        serialno: props.searchedval.serialno || "",
        serialnoRange: props.searchedval.serialnoRange || "",
        problemdes: props.searchedval.problemdes || "",
        probleminwords: probleminwords || "",
        smcs: props.searchedval.smcs || "",
        faultcode: props.searchedval.faultcode || "",
        CommonResolutionnumber: props.searchedval.CommonResolutionnumber?.toString() || "",
        Path_name: props.pathName || "",
        Step_number: String(props.stepsIndex + 1),
        sub_step_number: props.substeps && String(props.subStepNumber),
        infonumber: "",
        iconname: iconname,
      };
      if (props.substeps && props.ai) {
        let response = probleminwords && probleminwords.length !== 0 ? await getCustomerCardDataAi("substeps", substepsObj) : await getCardDataAi("substeps", substepsObj);

        setResolutionData(response.data.data);
        setIconName(iconname);
      } else {
        let response = await getCardData("substeps", substepsObj);
        setResolutionData(response.data.data);
        setIconName(iconname);
      }
    }
  };
  return (
    <>
      {props.info && (
        <>
          {" "}
          <Card className="resolution-box1 common-info">

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
          <Card className="resolution-cart-step">
            <CardContent>
              <div className="resol_wrap">
                <div className="resol_left">
                  {resolutionData?.length > 0 ? (
                    resolutionData.map((elem, id) => {
                      return (
                        <div key={id} className="line-sp">
                          {elem.split(",").map((item) =>
                            item.startsWith("https") ?
                              (<div>
                                <a className="bom-txt"
                                  href={item}
                                  target="_blank">{item}</a>
                              </div>
                              ) : (
                                <Typography className="lineemit">{item}</Typography>
                              ))}
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
                          : "info_btn"
                      }
                      onClick={() => iconfunction("resolution", props.id)}
                    >
                      {" "}
                      <img src={document} className="res-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "common_tools"
                          ? "resol_btn_active"
                          : "info_btn"
                      }
                      onClick={() => iconfunction("common_tools", props.id)}
                    >
                      {" "}
                      <img src={setting} className="set-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "special_tools"
                          ? "resol_btn_active"
                          : "info_btn"
                      }
                      onClick={() => iconfunction("special_tools", props.id)}
                    >
                      {" "}
                      <img src={toolicon} className="stool-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "pdf" ? "resol_btn_active" : "info_btn"
                      }
                      onClick={() => iconfunction("pdf", props.id)}
                    >
                      {" "}
                      <img src={file} className="file-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "note" ? "resol_btn_active" : "info_btn"
                      }
                      onClick={() => iconfunction("note", props.id)}
                    >
                      {" "}
                      <img src={notes} className="note-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "camera" ? "resol_btn_active" : "info_btn"
                      }
                      onClick={() => iconfunction("camera", props.id)}
                    >
                      {" "}
                      <img src={cam} className="cam-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "video" ? "resol_btn_active" : "info_btn"
                      }
                      onClick={() => iconfunction("video", props.id)}
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

      {props.steps && (
        <>
          {" "}
          <Card className="resolution-box1 common-step">

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
          <Card className="resolution-cart-step">
            <CardContent>
              <div className="resol_wrap">
                <div className="resol_left">
                  {resolutionData?.length > 0 ? (
                    resolutionData.map((elem, id) => {
                      return (
                        <div key={id} className="line-sp">
                          {elem.split(",").map((item) =>
                            item.startsWith("https") ?
                              (<div>
                                <a className="bom-txt"
                                  href={item}
                                  target="_blank">{item}</a>
                              </div>
                              ) : (
                                <Typography className="lineemit">{item}</Typography>
                              ))}
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
                          : "step_btn"
                      }
                      onClick={() => iconfunction("resolution", props.id)}
                    >
                      {" "}
                      <img src={document} className="res-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "common_tools"
                          ? "resol_btn_active"
                          : "step_btn"
                      }
                      onClick={() => iconfunction("common_tools", props.id)}
                    >
                      {" "}
                      <img src={setting} className="set-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "special_tools"
                          ? "resol_btn_active"
                          : "step_btn"
                      }
                      onClick={() => iconfunction("special_tools", props.id)}
                    >
                      {" "}
                      <img src={toolicon} className="stool-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "pdf" ? "resol_btn_active" : "step_btn"
                      }
                      onClick={() => iconfunction("pdf", props.id)}
                    >
                      {" "}
                      <img src={file} className="file-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "note" ? "resol_btn_active" : "step_btn"
                      }
                      onClick={() => iconfunction("note", props.id)}
                    >
                      {" "}
                      <img src={notes} className="note-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "camera" ? "resol_btn_active" : "step_btn"
                      }
                      onClick={() => iconfunction("camera", props.id)}
                    >
                      {" "}
                      <img src={cam} className="cam-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "video" ? "resol_btn_active" : "step_btn"
                      }
                      onClick={() => iconfunction("video", props.id)}
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

      {props.substeps && (
        <>
          {" "}
          <Card className="resolution-box1 common-substep">
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
          <Card className="resolution-cart-step">
            <CardContent>
              <div className="resol_wrap">
                <div className="resol_left">
                  {resolutionData?.length > 0 ? (
                    resolutionData.map((elem, id) => {
                      return (
                        <div key={id} className="line-sp">
                          {elem.split(",").map((item) =>
                            item.startsWith("https") ?
                              (<div>
                                <a className="bom-txt"
                                  href={item}
                                  target="_blank">{item}</a>
                              </div>
                              ) : (
                                <Typography className="lineemit">{item}</Typography>
                              ))}
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
                          : "substep_btn"
                      }
                      onClick={() => iconfunction("resolution", props.id)}
                    >
                      {" "}
                      <img src={document} className="res-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "common_tools"
                          ? "resol_btn_active"
                          : "substep_btn"
                      }
                      onClick={() => iconfunction("common_tools", props.id)}
                    >
                      {" "}
                      <img src={setting} className="set-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "special_tools"
                          ? "resol_btn_active"
                          : "substep_btn"
                      }
                      onClick={() => iconfunction("special_tools", props.ids)}
                    >
                      {" "}
                      <img src={toolicon} className="stool-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "pdf" ? "resol_btn_active" : "substep_btn"
                      }
                      onClick={() => iconfunction("pdf", props.id)}
                    >
                      {" "}
                      <img src={file} className="file-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "note" ? "resol_btn_active" : "substep_btn"
                      }
                      onClick={() => iconfunction("note", props.id)}
                    >
                      {" "}
                      <img src={notes} className="note-icon"></img>
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "camera"
                          ? "resol_btn_active"
                          : "substep_btn"
                      }
                      onClick={() => iconfunction("camera", props.id)}
                    >
                      {" "}
                      <img src={cam} className="cam-icon"></img>{" "}
                    </IconButton>
                    <br />
                    <IconButton
                      className={
                        iconName == "video" ? "resol_btn_active" : "substep_btn"
                      }
                      onClick={() => iconfunction("video", props.id)}
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
    </>
  );
}
// NOSONAR End
export default Carddata;
