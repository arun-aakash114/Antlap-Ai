import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const Fromcustomercreate = () => {
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
          // NOSONAR Start
          // Use the system font instead of the default Roboto font.
          // NOSONAR End
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
  
// NOSONAR Start
// Get State list
// NOSONAR End
const [stateList, setStateList]=useState([]);
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
        // NOSONAR Start
        //   if(response.response.status == 422){
        //   }
        // NOSONAR End
      });
  } catch (err) {

  }

}, [])
// NOSONAR Start
// Get City list
// NOSONAR End
const [cityList, setCityList]=useState([]);
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

  const [stateValue, setStateValue] = React.useState("");
  const [cityValue, setCityValue] = React.useState("");
// NOSONAR Start
// State & City Filter
// NOSONAR End
  const availableCities = cityList.filter(
    (s) => s.StateName === stateValue
  );
 // NOSONAR Start

  //// Find Unique City
  // NOSONAR End
  const uniqueCity = [];
  availableCities.map(x => uniqueCity.filter(a => a.DistrictName == x.DistrictName).length > 0 ? null : uniqueCity.push(x));
  
    // NOSONAR Start
  //// Create Customer post
// NOSONAR End
  useEffect(() => {
 
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/masterapi/master/listcustomermaster`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          // NOSONAR Start
        ////   setCustomerData(response.data.Data)
        // NOSONAR End
        }).catch(function (response) {
            if(response.response.status == 422){
             
            }
        });
    } catch (err) {

    }

  }, [])




  return (
    <>
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
                   
                    <Box sx={{ flexGrow: 1, mt:2 }}>
                      <Grid container spacing={2}>                        
                        <Grid item xs={4}>
                          <Item> 
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={stateList.map((state) => state.StateName)}
    sx={{ width: 300 }}
    value={stateValue}
    onChange={(event, newValue) => {
          setStateValue(newValue);
          setCityValue("");
        }}
    renderInput={(params) => <TextField {...params} label="State" /> 
  }
/>


                          </Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>
                            
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={uniqueCity.map((city) => city.DistrictName)}
                            sx={{ width: 300 }}
                            value={cityValue}
                            onChange={(event, newValue) => {
                                setCityValue(newValue);
                                }}
                            renderInput={(params) => <TextField {...params} label="City" /> 
                        }
                        />
                          </Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item>
  
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
                  <Button style={{marginLeft:'auto', display:'block'}}
                type="submit"
                variant="contained"
                className='btn-primary'
            >
                Save
            </Button>
    </>
  )
}

export default Fromcustomercreate
