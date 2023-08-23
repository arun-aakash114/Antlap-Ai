import { CardContent, Box, Card } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../../../../components/layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Link } from 'react-router-dom';
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Container } from '@mui/system';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';


const Custommanage = () => {


const [customers, setCustomers]= useState([]);



  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/listcustomermaster`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setCustomers(response.data.Data)
        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }

  }, [])


  const useMenuStyles = makeStyles({
    paper: {
      maxHeight: "calc(100% - 96px)",
      WebkitOverflowScrolling: "touch"
    },
    list: {
      outline: 0
    }
  });

 
  const menuClasses = useMenuStyles();

  

  return (
    <div>


      <Layout >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box>


            <div className='box-header dt-mgmt'>
              <div className='left'>
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
                  <Typography color="text.primary">Manage Customers</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Manage Customers</h2>
              </div>
              <div className='right'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    type="text"
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton size="small" edge="end">
                          {<SearchOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Link to="/createcustomer" > <Button type='button' variant="contained"> Create </Button></Link>
              </div>

            </div>


            <Card>



              <CardContent className='custom'>
                <TableContainer component={Paper}>
                  <Table >
                    <TableHead>
                      <TableRow >
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">City&nbsp;</TableCell>
                        <TableCell align="right">Status&nbsp;</TableCell>
                        <TableCell align="right">Actions&nbsp;</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((data,ids) => (
                        <TableRow
                          key={ids}

                        >
                         
                          <TableCell align="right">{data.CustomerId}</TableCell>
                          <TableCell align="right">{data.StateId}</TableCell>
                          <TableCell align="right">{data.CityId}</TableCell>
                          <TableCell align="right">{data?.ContactData[0]?.isActive }</TableCell>

                          <TableCell>

                            <PopupState variant="popper" popupId="demo-popup-popper">
                              {(popupState) => (
                                <div>
                                  <IconButton className='us-cs-down' {...bindToggle(popupState)}>
                                    <MoreVertIcon />

                                  </IconButton>
                                  <Popper {...bindPopper(popupState)} transition>
                                    {({ TransitionProps }) => (
                                      <ClickAwayListener onClickAway={popupState.close} >

                                        <Fade {...TransitionProps} timeout={350}>
                                          <Paper>
                                            <MenuList className={menuClasses.list} autoFocus>
                                             <Link to="/viewcustomer"> <MenuItem ><RemoveRedEyeIcon /> View Customer</MenuItem></Link>
                                              <MenuItem ><PersonAddAlt1Icon /> Add Contact</MenuItem>
                                            </MenuList>
                                          </Paper>
                                        </Fade>
                                      </ClickAwayListener>
                                    )}
                                  </Popper>
                                </div>
                              )}
                            </PopupState>






                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>



              </CardContent>

            </Card>

          </Box>

        </Container>


      </Layout>

    </div>
  )
}

export default Custommanage