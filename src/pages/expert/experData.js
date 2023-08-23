import React from "react";
import Explayout from "../../components/expert/explayout";
import { Card } from "@mui/material";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { styled } from "@mui/material/styles";
// import '../../App.css'
import cam from "../../assets/cam.svg";
import setting from "../../assets/settingsicon.svg";
import notes from "../../assets/notes.svg";
import file from "../../assets/file.svg";
import toolicon from "../../assets/toolicon.svg";
import document from "../../assets/document.svg";
import AddIcon from "@mui/icons-material/Add";
import LaunchIcon from "@mui/icons-material/Launch";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShieldIcon from "@mui/icons-material/Shield";
import DeleteIcon from "@mui/icons-material/Delete";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import { setClassName } from "../../components/expert/helper";

// equipment type ___________________________

const currencies = [
  {
    label: "IoT",
  },
  {
    label: "Non IoT",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Inner tab ___________________________

function ExperData() {
  const [iconName, setIconName] = React.useState("resolution");
  const [solIconName, setSolIconName] = React.useState("General");
  const recommentationfunction = (data) => {
    setIconName(data);
  };

  // Table  ___________________________

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  // Bootstrap Input ___________________________

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
    <Explayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Table Html ---------------------------------------- */}
        <div className="box-header dt-mgmt">
          <h2 className="page-heding">AI Data - IoT </h2>

          <div className="tb-btns">
            <div className="dropdown-flex">
              <Typography variant="subtitle1" gutterBottom>
                Equipment Type
              </Typography>

              <TextField
                id="outlined-select-currency-native"
                select
                defaultValue="IoT"
                size="small"
                SelectProps={{
                  native: true,
                }}
                //   helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>

            <Button
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add New
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<LaunchIcon />}
            >
              Export
            </Button>
            <Button
              className="ic-single"
              variant="contained"
              size="medium"
              color="secondary"
            >
              <FilterAltIcon />
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>Table details comes here</CardContent>
        </Card>

        {/* Create Parameters ---------------------------------------------- */}

        <div className="crt-parameters">
          <div className="box-header dt-mgmt">
            <h2 className="page-heding">Create Parameters </h2>

            <div className="tb-btns">
              <div className="dropdown-flex">
                <Typography variant="subtitle1" gutterBottom>
                  Equipment Type
                </Typography>

                <TextField
                  id="outlined-select-currency-native"
                  select
                  defaultValue="IoT"
                  size="small"
                  SelectProps={{
                    native: true,
                  }}
                  //   helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <Button
                className="back-btn"
                variant="contained"
                size="medium"
                startIcon={<ChevronLeftIcon />}
              >
                Back
              </Button>
            </div>
          </div>

          <div className="create-input-section">
            <Card>
              <CardContent>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="Model"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="Serial Prefix"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="Serial No. Range"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>
                  </Grid>
                </Box>

                <div className="divider"></div>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="Fault Code"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="Fault Code Description"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Item>
                        {" "}
                        <Button
                          className="ic-single stage2"
                          variant="contained"
                          size="medium"
                          color="primary"
                        >
                          <AddIcon />
                        </Button>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>

                <div className="divider"></div>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={11}>
                      <Item>
                        <TextField
                          id="outlined-basic"
                          label="SMCS Component Code"
                          variant="outlined"
                        />
                      </Item>
                    </Grid>

                    <Grid item xs={12} md={1}>
                      <Item>
                        {" "}
                        <Button
                          className="ic-single stage2"
                          variant="contained"
                          size="medium"
                          color="primary"
                        >
                          <AddIcon />
                        </Button>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
            <Box className="card-btns">
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                startIcon={<CloseIcon />}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save & Continue
              </Button>
            </Box>
          </div>
        </div>

        {/* Create General Resolution layout ---------------------------------------------- */}

        <div className="crt-general-resolution">
          <div className="box-header dt-mgmt">
            <h2 className="page-heding">Create General Resolution </h2>

            <div className="tb-btns">
              <Button
                className="back-btn"
                variant="contained"
                size="medium"
                startIcon={<ChevronLeftIcon />}
              >
                Back
              </Button>

              <Button
                variant="contained"
                size="medium"
                color="secondary"
                startIcon={<ShieldIcon />}
              >
                Add Resolution Path
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                startIcon={<AddIcon />}
              >
                Create General Resolution
              </Button>
            </div>
          </div>

          <Box className="contact-info">
            
            {/* Side bar details ---------------------------------------------- */}

            <Card className="model-cart">
              <CardContent sx={{ overflow: "overlay", height: "100%" }}>
                <div className="rowdata">
                  <ul>
                    <li>
                      <div className="iconwrap"></div>{" "}
                      <div className="det_right">
                        <Typography className="font-14">Modal</Typography>{" "}
                        <Typography className="text-bold">120 </Typography>
                      </div>
                    </li>

                    <li>
                      <div className="iconwrap"> </div>

                      <div className="det_right">
                        <Typography className="font-14">
                          Serial Prefix
                        </Typography>
                        <Typography className="text-bold">Y92</Typography>
                      </div>
                    </li>

                    <li>
                      <div className="iconwrap"> </div>

                      <div className="det_right">
                        <Typography className="font-14">
                          Serial No.Range
                        </Typography>
                        <Typography className="text-bold">Y92</Typography>
                      </div>
                    </li>

                    <li>
                      <div className="iconwrap"> </div>
                      <div className="det_right">
                        <Typography className="font-14">
                          Fault Code :
                        </Typography>
                        <Typography className="text-bold">
                          3719-16, E995 (2)
                        </Typography>
                        <b></b>{" "}
                      </div>
                    </li>

                    <li>
                      <div className="iconwrap"> </div>

                      <div className="det_right">
                        <Typography className="font-14">
                          Fault Code Description :
                        </Typography>
                        <Typography className="text-bold">
                          DPF #1 Soot Loading Percent : High - moderate severity
                          (2)
                        </Typography>
                        <div className="divider inner"></div>
                        <Typography className="text-bold">
                          DPF #1 Soot Loading Percent : High - moderate severity
                          (2)
                        </Typography>
                      </div>
                    </li>

                    <li>
                      <div className="iconwrap"> </div>
                      <div className="det_right">
                        <Typography className="font-14">
                          SMCS Component
                        </Typography>
                        <Typography className="text-bold">
                          1102 - ROCKER SHAFT ASSEMBLY{" "}
                        </Typography>
                        <div className="divider inner"></div>
                        <Typography className="text-bold">
                          1102 - ROCKER SHAFT ASSEMBLY{" "}
                        </Typography>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="resolution-path">
              <Card>
                <CardContent>
                  <Accordion className="remove-padding">
                    <AccordionSummary
                      className="rm-bs"
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="iconNameSol">
                        {solIconName}
                        {setSolIconName}
                        <div className="right-btns">
                          <Button variant="text" startIcon={<AddIcon />}>
                            Add General Resolution
                          </Button>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="resol_wrap">
                        <div className="resol_left">
                          {iconName === "resolution" && (
                            <div className="line-sp">
                              <typography>General Resolution</typography>
                              <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Type here"
                              />
                            </div>
                          )}
                          {iconName === "common_tools" && (
                            <div className="line-sp">
                              <div className="inner-table-header">
                                <Typography>Common Tools</Typography>
                                <div className="right">
                                  <Button
                                    className="text-primary"
                                    variant="text"
                                    startIcon={<AttachFileIcon />}
                                  >
                                    Upload Document
                                  </Button>
                                  <Button
                                    className="text-light"
                                    variant="text"
                                    startIcon={<AddIcon />}
                                  >
                                    Add More
                                  </Button>
                                  <IconButton
                                    className="bg-danger"
                                    aria-label="delete"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              </div>

                              <TableContainer component={Paper}>
                                <Table
                                  sx={{ minWidth: 700 }}
                                  aria-label="customized table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>
                                        Dessert (100g serving)
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Calories
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Fat&nbsp;(g)
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Carbs&nbsp;(g)
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Protein&nbsp;(g)
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {rows.map((row) => (
                                      <StyledTableRow key={row.name}>
                                        <StyledTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {row.calories}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {row.fat}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {row.carbs}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {row.protein}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              <div className="attachments">
                                <Stack direction="row" spacing={1}>
                                  <Chip label="Sample...jpg" variant="filled" />
                                  <Chip label="Sample...jpg" variant="filled" />
                                  <Chip label="Sample...jpg" variant="filled" />
                                  <Chip label="Sample...jpg" variant="filled" />
                                </Stack>
                              </div>
                            </div>
                          )}
                          {iconName === "special_tools" && (
                            <div className="line-sp">
                              <Typography>Required Special Tools</Typography>
                            </div>
                          )}
                          {iconName === "pdf" && (
                            <div className="line-sp">
                              <Typography>Supporting Documents</Typography>
                            </div>
                          )}
                          {iconName === "note" && (
                            <div className="line-sp">
                              <Typography>Notes</Typography>
                            </div>
                          )}
                          {iconName === "camera" && (
                            <div className="line-sp">
                              <Typography>Photo</Typography>
                            </div>
                          )}
                          {iconName === "video" && (
                            <div className="line-sp">
                              <Typography>Video</Typography>
                            </div>
                          )}
                          {iconName === "video1" && (
                            <div className="line-sp">
                              <Typography>Video</Typography>
                            </div>
                          )}
                        </div>
                        <div className="resol_right">
                          <div className="icon-vertical-alien">
                            <IconButton
                              className={setClassName(iconName, "resolution")}
                              onClick={() =>
                                recommentationfunction("resolution")
                              }
                            >
                              {" "}
                              <img src={document} className="res-icon"></img>
                            </IconButton>
                            <br />
                            <IconButton
                              className={setClassName(iconName, "common_tools")}
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
                              className={setClassName(iconName, "special_tools")}
                              onClick={() =>
                                recommentationfunction("special_tools")
                              }
                            >
                              {" "}
                              <img src={toolicon} className="stool-icon"></img>
                            </IconButton>
                            <br />
                            <IconButton
                              className={setClassName(iconName, "pdf")}
                              onClick={() => recommentationfunction("pdf")}
                            >
                              {" "}
                              <img src={file} className="file-icon"></img>
                            </IconButton>
                            <br />
                            <IconButton
                              className={setClassName(iconName, "note")}
                              onClick={() => recommentationfunction("note")}
                            >
                              {" "}
                              <img src={notes} className="note-icon"></img>
                            </IconButton>
                            <br />
                            <IconButton
                              className={setClassName(iconName, "camera")}
                              onClick={() => recommentationfunction("camera")}
                            >
                              {" "}
                              <img src={cam} className="cam-icon"></img>{" "}
                            </IconButton>
                            <br />
                            <IconButton
                              className={setClassName(iconName, "video")}
                              onClick={() => recommentationfunction("video")}
                            >
                              {" "}
                              <VideocamOutlinedIcon />{" "}
                            </IconButton>
                            <br />
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Add Resolution Path ---------------------------------------------- */}

              <div className="add-resol-path">
                <div className="box-header dt-mgmt">
                  <h2 className="page-heding">Add Resolution Path </h2>
                </div>
                <Card>
                  <CardContent>
                    <Accordion className="remove-padding">
                      <AccordionSummary
                        className="remove-padding"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <div className="iconNameSol remove-bg remove-padding">
                          <div className="left">
                            <Typography className="fo-border">
                              <span className="solution-count">A</span>Solution
                              Path
                            </Typography>
                          </div>
                          <div className="right-btns">
                            <Link href="#" underline="none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-stack"
                                viewBox="0 0 16 16"
                              >
                                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                              </svg>
                              {"Add BOM"}
                            </Link>
                            <Link href="#" underline="none">
                              <AddIcon />
                              {"Add Step"}
                            </Link>
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="remove-padding">
                        <div className="resol_wrap br-top">
                          <div className="resol_left">
                            {iconName === "resolution" && (
                              <div className="line-sp">
                                <typography>General Resolution</typography>
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Type here"
                                />
                              </div>
                            )}
                            {iconName === "common_tools" && (
                              <div className="line-sp">
                                <div className="inner-table-header">
                                  <Typography>Common Tools</Typography>
                                  <div className="right">
                                    <Button
                                      className="text-primary"
                                      variant="text"
                                      startIcon={<AttachFileIcon />}
                                    >
                                      Upload Document
                                    </Button>
                                    <Button
                                      className="text-light"
                                      variant="text"
                                      startIcon={<AddIcon />}
                                    >
                                      Add More
                                    </Button>
                                    <IconButton
                                      className="bg-danger"
                                      aria-label="delete"
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                </div>

                                <TableContainer component={Paper}>
                                  <Table
                                    sx={{ minWidth: 700 }}
                                    aria-label="customized table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>
                                          Parts No.
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Parts Description
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Quantity
                                        </StyledTableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                          <StyledTableCell>
                                            <Checkbox
                                              {...label}
                                              defaultChecked
                                            />
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>

                                <div className="attachments">
                                  <Stack direction="row" spacing={1}>
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                  </Stack>
                                </div>
                              </div>
                            )}
                            {iconName === "special_tools" && (
                              <div className="line-sp">
                                <Typography>Required Special Tools</Typography>
                              </div>
                            )}
                            {iconName === "pdf" && (
                              <div className="line-sp">
                                <Typography>Supporting Documents</Typography>
                              </div>
                            )}
                            {iconName === "note" && (
                              <div className="line-sp">
                                <Typography>Notes</Typography>
                              </div>
                            )}
                            {iconName === "camera" && (
                              <div className="line-sp">
                                <Typography>Photo</Typography>
                              </div>
                            )}
                            {iconName === "video" && (
                              <div className="line-sp">
                                <Typography>Video</Typography>
                              </div>
                            )}
                            {iconName === "video1" && (
                              <div className="line-sp">
                                <Typography>Video</Typography>
                              </div>
                            )}
                          </div>
                          <div className="resol_right">
                            <div className="icon-vertical-alien">
                              <IconButton
                              className={setClassName(iconName, "resolution")}
                                onClick={() =>
                                  recommentationfunction("resolution")
                                }
                              >
                                {" "}
                                <img src={document} className="res-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                              className={setClassName(iconName, "common_tools")}
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
                              className={setClassName(iconName, "special_tools")}
                                onClick={() =>
                                  recommentationfunction("special_tools")
                                }
                              >
                                {" "}
                                <img
                                  src={toolicon}
                                  className="stool-icon"
                                ></img>
                              </IconButton>
                              <br />
                              <IconButton
                              className={setClassName(iconName, "pdf")}
                                onClick={() => recommentationfunction("pdf")}
                              >
                                {" "}
                                <img src={file} className="file-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                              className={setClassName(iconName, "note")}
                                onClick={() => recommentationfunction("note")}
                              >
                                {" "}
                                <img src={notes} className="note-icon"></img>
                              </IconButton>
                              <br />
                              <IconButton
                              className={setClassName(iconName, "camera")}
                                onClick={() => recommentationfunction("camera")}
                              >
                                {" "}
                                <img src={cam} className="cam-icon"></img>{" "}
                              </IconButton>
                              <br />
                              <IconButton
                              className={setClassName(iconName, "video")}
                                onClick={() => recommentationfunction("video")}
                              >
                                {" "}
                                <VideocamOutlinedIcon />{" "}
                              </IconButton>
                              <br />
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Accordion className="remove-padding">
                      <AccordionSummary
                        className="remove-padding"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <div className="iconNameSol remove-bg remove-padding">
                          <div className="left">
                            <Typography className="fo-border">
                              <span className="solution-count">B</span>Solution
                              Path
                            </Typography>
                          </div>
                          <div className="right-btns">
                            <Link href="#" underline="none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-stack"
                                viewBox="0 0 16 16"
                              >
                                <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                                <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                              </svg>
                              {"Add BOM"}
                            </Link>
                            <Link href="#" underline="none">
                              <AddIcon />
                              {"Add Step"}
                            </Link>                           
                          </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="remove-padding">
                        <div className="resol_wrap br-top">
                          <div className="resol_left">
                            {iconName === "resolution" && (
                              <div className="line-sp">
                                <typography>General Resolution</typography>
                                <TextareaAutosize
                                  aria-label="empty textarea"
                                  placeholder="Type here"
                                />
                              </div>
                            )}
                            {iconName === "common_tools" && (
                              <div className="line-sp">
                                <div className="inner-table-header">
                                  <Typography>Common Tools</Typography>
                                  <div className="right">
                                    <Button
                                      className="text-primary"
                                      variant="text"
                                      startIcon={<AttachFileIcon />}
                                    >
                                      Upload Document
                                    </Button>
                                    <Button
                                      className="text-light"
                                      variant="text"
                                      startIcon={<AddIcon />}
                                    >
                                      Add More
                                    </Button>
                                    <IconButton
                                      className="bg-danger"
                                      aria-label="delete"
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                </div>

                                <TableContainer component={Paper}>
                                  <Table
                                    sx={{ minWidth: 700 }}
                                    aria-label="customized table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>
                                          Parts No.
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Parts Description
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          Quantity
                                        </StyledTableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                          <StyledTableCell>
                                            <Checkbox
                                              {...label}
                                              defaultChecked
                                            />
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>

                                          <StyledTableCell>
                                            <FormControl variant="standard">
                                              <BootstrapInput
                                                placeholder="Type here"
                                                id="bootstrap-input"
                                              />
                                            </FormControl>
                                          </StyledTableCell>
                                        </StyledTableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>

                                <div className="attachments">
                                  <Stack direction="row" spacing={1}>
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                    <Chip
                                      label="Sample...jpg"
                                      variant="filled"
                                    />
                                  </Stack>
                                </div>
                              </div>
                            )}
                            {iconName === "special_tools" && (
                              <div className="line-sp">
                                <Typography>Required Special Tools</Typography>
                              </div>
                            )}
                            {iconName === "pdf" && (
                              <div className="line-sp">
                                <Typography>Supporting Documents</Typography>
                              </div>
                            )}
                            {iconName === "note" && (
                              <div className="line-sp">
                                <Typography>Notes</Typography>
                              </div>
                            )}
                            {iconName === "camera" && (
                              <div className="line-sp">
                                <Typography>Photo</Typography>
                              </div>
                            )}
                            {iconName === "video" && (
                              <div className="line-sp">
                                <Typography>Video</Typography>
                              </div>
                            )}
                            {iconName === "video1" && (
                              <div className="line-sp">
                                <Typography>Video</Typography>
                              </div>
                            )}
                          </div>
                          <div className="resol_right">
                            <div className="icon-vertical-alien">
                              <IconButton
                                className={
                                  iconName === "resolution"
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
                                  iconName === "common_tools"
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
                                <img
                                  src={toolicon}
                                  className="stool-icon"
                                ></img>
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
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/*BOM Section ---------------------------------------------- */}

              <div className="bom-content-wrapper">
                <div className="box-header dt-mgmt">
                  <h2 className="page-heding">Add BOM </h2>
                </div>

                <Card>
                  <CardContent>
                    <div className="bom-form">
                      <div className="input-wrapper top">
                        <TextField
                          id="outlined-basic"
                          label="Parts No."
                          variant="outlined"
                        />
                        <TextField
                          id="outlined-basic"
                          label="Quantity"
                          variant="outlined"
                          onKeyPress={(e) => {
                            const regex = /^\d+$/;
                            const { key } = e;
                            if (!regex.test(key)) {
                              e.preventDefault();
                            }
                          }} 
                        />
                      </div>
                      <div className="stage-fullwidth">
                        <TextField
                          id="outlined-multiline-static"
                          label="Part Description"
                          multiline
                          rows={3}
                          defaultValue="Type here"
                        />
                        <div className="field-wrap">
                          <TextField
                            id="outlined-multiline-static"
                            label="Supporting Documents"
                            multiline
                            rows={1}
                            defaultValue="Type here"
                          />
                          <IconButton aria-label="delete">
                            <InsertDriveFileIcon />
                          </IconButton>
                        </div>
                        <div className="field-wrap">
                          <TextField
                            id="outlined-multiline-static"
                            label="Notes"
                            multiline
                            rows={1}
                            defaultValue="Type here"
                          />
                          <IconButton aria-label="delete">
                            <StickyNote2Icon />
                          </IconButton>
                        </div>
                      </div>
                    </div>

                    <Box className="card-btns">
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        startIcon={<SaveIcon />}
                      >
                        Save
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
                <Box className="card-btns">
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    startIcon={<VisibilityOutlinedIcon />}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    startIcon={<CheckOutlinedIcon />}
                  >
                    Submit for Approval
                  </Button>
                </Box>
              </div>
            </div>
          </Box>
        </div>
      </Container>
    </Explayout>
  );
}

export default ExperData;
