import React, { useState, useEffect } from 'react'
import Layout from '../../../../components/layout'
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import { Table, TableBody, TableHead, TableRow, Card, CardContent } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';




const UsertypeMapping = () => {

  let navigate = useNavigate()

  

  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/viewusertypemap?TenantId=GAINWELL_01`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setUserdata(response.data.data)
          setFoundUserData(response.data.data)
          
        }).catch(function (response) {
// NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }

  }, []);
  // NOSONAR Start

  // Get data for update user type
  // NOSONAR End
  const updateusertypemap =  async (mappingId) => {
    const getMappingData =  await userdata.find((item) => item.MappingId == mappingId);
    navigate('/createmaptype',
            {
              mapEditMode: "test",
                state: {
                  usertypeid: getMappingData.UserType_M_UserTypeId,
                  userId: getMappingData.Users_M_UserId,
                  mappingid:getMappingData.MappingId,
                  userEmail:getMappingData.userEmail,
                  UserType:getMappingData.UserType
                    
                }
            });
  }

  const [userdata, setUserdata]= useState([]);
// the search result
const [kname, setKname] = useState('');
const [foundUserData, setFoundUserData] = useState(userdata);

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== '') {
    const results = userdata.filter((usr) => {
      let filterEmail = usr.userEmail.toLowerCase().startsWith(keyword.toLowerCase());
      let filterType = usr.UserType.toLowerCase().startsWith(keyword.toLowerCase());

      return filterEmail || filterType
      // NOSONAR Start
      // Use the toLowerCase() method to make it case-insensitive
      // NOSONAR End
    });
    setFoundUserData(results);
  } else {
    setFoundUserData(userdata);
    // NOSONAR Start
    // If the text field is empty, show all users
    // NOSONAR End
  }

  setKname(keyword);
};

// NOSONAR Start
  // const handleSave = (e) => {
    
  //   e.preventDefault();

   
  //   const payload = { 
       
  //     "TenantId":localStorage.getItem('TenantId'),
  //     "userid":userdata.Users_M_UserId,
  //     "usertypeid":userdata.UserType_M_UserTypeId,

      
  //    }; // create an updated user object with the new user type
  //   try {
  //     axios({
  //       method: 'put',
  //       url: `https://${backEndDomain}/masterapi/master/updateusertypemap`,
  //       data: payload ,
  //       headers: {
  //         'Content-type': 'application/json',
  //         'token': localStorage.getItem('UserToken'),
  //       },
  //       // pass the updated user data as the request payload
  //     })
  //       .then(function (response) {
  //         navigate ('/createmaptype')  
  //         // handle success response
  //       }).catch(function (response) {
  //         // handle error response
  //       });
  //   } catch (err) {
  //   }
  // };
  // NOSONAR End

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
                  <Typography color="text.primary">Assign User Type </Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Assign User Type</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    autoFocus
                    value={kname}
                    onChange={filter}
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
                <Link to="/createmaptype" > <Button type='button' variant="contained"> Assign Type </Button></Link>
                
              </div></div>
            
            <Card>
              <CardContent>

                <Table>

                  <TableHead>
                    <TableRow>

                      <TableCell>User Email</TableCell>
                      <TableCell align="right">User Type</TableCell>
                      <TableCell align="right">Actions</TableCell>


                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {foundUserData.map((data,ids) => ( 


                
                  <TableRow
                          key={ids}

                        >

                    <TableCell align="right">{data.userEmail}</TableCell>
                    <TableCell align="right">{data.UserType}</TableCell>

                   {// NOSONAR Start
                   
                   /* <Link to="/createmaptype"> <TableCell align="right"><IconButton ><ModeEditIcon   color='blue' size="small" /> </IconButton>


                    </TableCell></Link> */
                    // NOSONAR End
                    
                    }
                    <TableCell align="right">
                      <IconButton onClick={() => updateusertypemap(data.MappingId)}><ModeEditIcon   color='blue' size="small" /> </IconButton>
                    </TableCell>
                    </TableRow>
                       ))}
                       

                  </TableBody>
                  
            
                  {// NOSONAR Start
                  
                  /* <TableBody>
                    <TableCell align="right">Ram Charan</TableCell>
                    <TableCell align="right">EXPERT</TableCell>

                    <TableCell align="right"><IconButton><ModeEditIcon color='blue'  size="small" />  </IconButton></TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell align="right">Santosh</TableCell>
                    <TableCell align="right">-</TableCell>

                    <TableCell align="right"><IconButton><ModeEditIcon color='blue' size="small" />  </IconButton></TableCell>
                  </TableBody>
                  <TableBody>
                    <TableCell align="right">Gokul</TableCell>
                    <TableCell align="right">EXPERT</TableCell>

                    <TableCell align="right"><IconButton><ModeEditIcon color='blue' size="small"  />  </IconButton></TableCell>
                  </TableBody> */ 
                  // NOSONAR End
                  }
                </Table>
              </CardContent>
            </Card>


          </Box>
        </Container>
      </Layout>


    </div>
  )
}

export default UsertypeMapping