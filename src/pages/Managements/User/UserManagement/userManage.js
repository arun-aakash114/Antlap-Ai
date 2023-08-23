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
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';




const UserManage = () => {
  
  let navigate = useNavigate()

  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/viewuser?TenantId=GAINWELL_01&${localStorage.getItem('userid')} `,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setUsers(response.data.data)
          setFoundUsers(response.data.data)
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
  // Get data for update user
// NOSONAR End
  const getUpdateUser =  async (UserId) => {
    const getUsersData =  await users.find((item) => item.UserId == UserId);
    navigate('/createuser',
            {
                state: {
                  UserId: getUsersData.UserId,
                  phone: getUsersData.PrimayNumber,
                  TenantId:getUsersData.Tenants_M_TenantId,
                  email:getUsersData.Email,
                  password:getUsersData.Password,
                  firstname:getUsersData.FirstName,
                  lastname:getUsersData.LastName,
                  username:getUsersData.UserName,
                  alterphone:getUsersData.AlternateNumber,
                  activestatus:getUsersData.Status_M_StatusId                    
                }
            });
  }

  const [users, setUsers]= useState([]);
  // the search result
  const [name, setName] = useState('');
  const [foundUsers, setFoundUsers] = useState(users);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = users.filter((user) => {
        let filterFname = user.FirstName.toLowerCase().startsWith(keyword.toLowerCase());
        let filterLname = user.LastName.toLowerCase().startsWith(keyword.toLowerCase());
        let filterEmail = user.Email.toLowerCase().startsWith(keyword.toLowerCase());
        let filterMobile = user.PrimayNumber.toLowerCase().startsWith(keyword.toLowerCase());

        return filterFname || filterLname || filterEmail || filterMobile
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(users);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };


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
                  <Typography color="text.primary">Manage Users</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Manage Users</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    autoFocus
                    value={name}
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
                <Link to="/createuser" > <Button type='button' variant="contained"> Create </Button></Link>
              </div></div>
            
            <Card>
              <CardContent>

                <Table>

                  <TableHead>
                    <TableRow>

                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Moblie Number</TableCell>
                      <TableCell>Alt.Phone Number</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>User Status</TableCell>
                      <TableCell>Actions</TableCell>


                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {foundUsers.map((data,ids) => (
                    <TableRow
                    key={ids}>

                      <TableCell>{data.FirstName} </TableCell>
                      <TableCell> {data.LastName}</TableCell>
                      <TableCell>{data.PrimayNumber} </TableCell>
                      <TableCell> {data.AlternateNumber}</TableCell>
                      <TableCell>{data.Email} </TableCell>
                      <TableCell> {data.Status_M_StatusId}</TableCell>

                      <TableCell>
                      <IconButton onClick={() => getUpdateUser(data.UserId)}>
                        <ModeEditIcon color='blue' size="small" />
                        </IconButton>
                      
                        </TableCell>
                    </TableRow>
                             ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>


          </Box>
        </Container>
      </Layout>


    </div>
  )
}

export default UserManage