import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import { styled, alpha } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));



const RegisterForm = ({ handleSave }) => {

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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

  const label = { inputProps: { "aria-label": "Switch demo" } };




  // Get State list
  const [stateList, setStateList] = useState([]);
  useEffect(() => {

    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/viewState`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setStateList(response.data.districtData)
        }).catch(function (response) {
          
        });
    } catch (err) {

    }

  }, [])

  
  const [cityList, setCityList] = useState([]);
  useEffect(() => {

    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/viewcity`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setCityList(response.data.cityData)
        }).catch(function (response) {
           
        });
    } catch (err) {

    }

  }, [])


  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');



  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <div className="box-header dt-mgmt">
            <div className="left">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Masters 
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  User Management
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                  Manage Customers
                </Link>
                <Typography color="text.primary">Create Customer</Typography>
              </Breadcrumbs>
              <h2 className="page-heding">View Customer</h2>
            </div>
            <div className="right">
              <Link to="/managecustomers" >
                <Button className="bck-btn" type="button" variant="contained">
                  Back
                  {cityList}
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <div className="customer-create">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <div className="top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-building-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                    <FormControl variant="standard">
                      <BootstrapInput
                        placeholder="Enter Customer Name"
                        id="bootstrap-input"
                      />
                    </FormControl>
                    <div className="toggle">
                      <label>Status</label>
                      <Switch {...label} />
                    </div>
                    <div className="status">
                      <Typography className="success" variant="h6">
                        Active
                      </Typography>
                      <Typography className="danger" variant="h6">
                        In Active
                      </Typography>
                    </div>
                  </div>
                  <div className="inputs-wrapper mt:2">

                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Item>
                            <FormControl>
                              <label>City</label>
                              <Select
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="">
                                  <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>
                            {" "}
                            <FormControl>
                              <label>State</label>

                            </FormControl>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}

                              inputValue={inputValue}
                              onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                              }}
                              options={stateList.map((state) => state.StateName)}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Movie" />
                              }
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>
                            {" "}
                            <FormControl>
                              <label>Zip Code</label>
                              <Select
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="">
                                  <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, mb: 2, mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Item>
                            <FormControl variant="standard">
                              <InputLabel shrink htmlFor="bootstrap-input">
                                Address
                              </InputLabel>
                              <BootstrapInput
                                placeholder="Enter Address"
                                id="bootstrap-input"
                              />
                            </FormControl>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                  <Button style={{ marginLeft: 'auto', display: 'block' }}
                    type="submit"
                    variant="contained"
                    className='btn-primary'
                  // onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </CardContent>
              </Card>
            </div>



            <div className='create-contacts-list'>
              <Card>
                <CardContent>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                      <Typography>Customer Contact list</Typography>
                      <Link style={{ marginLeft: 'auto', marginRight: '20px', fontSize: '16px' }} to="/addnewcontacts" underline="none">
                        {'Add New Contacts'}
                      </Link>
                    </AccordionSummary>


                    <AccordionDetails>
                      <Table>

                        <TableHead>
                          <TableRow>

                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Alt.Mobile </TableCell>
                            <TableCell>Status </TableCell>
                            <TableCell>Is Primary </TableCell>
                            <TableCell>Action </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableCell>Arun</TableCell>
                          <TableCell>Arun@gmail.com</TableCell>
                          <TableCell>1234567890</TableCell>
                          <TableCell>0987654321 </TableCell>
                          <TableCell>Active</TableCell>
                          <TableCell>Yes </TableCell>
                          <TableCell><IconButton color="primary" aria-label="add to shopping cart">
                            <ModeEditOutlineRoundedIcon />
                          </IconButton></TableCell>
                        </TableBody>
                        <TableBody>
                          <TableCell>Arun</TableCell>
                          <TableCell>Arun@gmail.com</TableCell>
                          <TableCell>1234567890</TableCell>
                          <TableCell>0987654321 </TableCell>
                          <TableCell>Active</TableCell>
                          <TableCell>Yes </TableCell>
                          <TableCell><IconButton color="primary" aria-label="add to shopping cart">
                            <ModeEditOutlineRoundedIcon />
                          </IconButton></TableCell>
                        </TableBody>
                      </Table>

                    </AccordionDetails>

                  </Accordion>
                </CardContent>
              </Card>

            </div>

          </div>
        </Container>
      </Layout>
    </div>
  );
};

export default RegisterForm;
