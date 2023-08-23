import { CardContent, Box, Card, MenuItem, Stack } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Layout from '../../../../components/layout';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Container } from '@mui/system';
import InputLabel from "@mui/material/InputLabel";
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import Select from '@mui/material/Select';

import { useNavigate, useLocation,Link  } from 'react-router-dom';

const Usermaptype = () => {

  const { state } = useLocation();
  let navigate = useNavigate()

  const [username, setUsername] = useState({

    userEmail:'',
    UserType:'',
  });

  const [usrId, setUserId] = useState('');
  const [typId, setTypeId] = useState('');

  const handleChange = (e, index) => {
    const { name, value} = e.target;
    setUsername({ ...username, [name]: value });
    const indVal = index.props.id;
    if(e.target.name === "userEmail"){
      setUserId(indVal)
    } else if (e.target.name === "UserType"){
      setTypeId(indVal)
    } else {
      setTypeId('')
    }
    
  
  };

  const loadState = () => {
    setUsername({});
  }

   

  const [user, setUser]= useState([]);

  useEffect(() => {
    loadState()
       
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/viewalluserdata`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setUser(response.data.data)
        }).catch(function (response) {
           
        });
    } catch (err) {

    }

  }, [])


  const [type, setType]= useState([]);

  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/masterapi/master/ViewUserTypedata`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          setType(response.data.data)
        }).catch(function (response) {
         
        });
    } catch (err) {

    }

  }, [])

  const handleSave = (e) => {

    if(state){
      e.preventDefault();
    const payload = { 
       
      "TenantId":localStorage.getItem('TenantId'),
      "userid":(usrId ? usrId : state.userId),
      "usertypeid":(typId ? typId : state.usertypeid),
      "mappingid": (state.mappingid)
  
      
     }; // create an updated user object with the new user type
    
    try {
      axios({
        method: 'put',
        url: `${backEndDomain}/masterapi/master/updateusertypemap`,
        data: payload ,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        },
        // pass the updated user data as the request payload
        
      })
        .then(function (response) {
          navigate ('/usertypemapping')  
          // handle success response
        }).catch(function (response) {
          // handle error response
        });
    } catch (err) {
    }
    } else {
      e.preventDefault();
    const payload = { 
       
      "TenantId":localStorage.getItem('TenantId'),
      "userid":(usrId),
      "usertypeid":(typId), 
      
     }; // create an updated user object with the new user type
    
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/masterapi/master/UserTypemapping`,
        data: payload ,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        },
        // pass the updated user data as the request payload
      })
        .then(function (response) {
          navigate ('/usertypemapping')  
          // handle success response
        }).catch(function (response) {
          // handle error response
        });
    } catch (err) {
    }
    }
    
    
  };

  return (
    <div>

      <Layout>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              <h2 className="page-heding">{state ? "Edit User Type" : "Assign User Type"}</h2>
            </div>  <div className='right'>

              <Link to="/usertypemapping" > <Button className='bck-btn' type='button' variant="contained"> Back </Button></Link>
            </div></div>
          <Box className='map'>
            <Card>
              <CardContent>

                <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                  Select User
                </InputLabel>
          
                <Select
                defaultValue={state ? state.userEmail : username.userEmail}
                value={username.userEmail} 
                    name='userEmail'
                    onChange={handleChange}
                    
                >
      {user.map((data,ids) => (
                  <MenuItem key={ids} 
                  id={data.UserId}
                  value={data.Email}
                                  
                 >
                    {data.Email}
                  </MenuItem>
                  ))}

                </Select>
                  
                <CardContent>
                </CardContent>
                <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                  User Type
                </InputLabel>
              
                
                <Select
                  defaultValue={state ? state.UserType : username.UserType}
                  
                   value={username.UserType} 
                   name='UserType'
                   onChange={handleChange}
                      
                >
      {type.map((data,ids) => (
                  <MenuItem   key={ids} 
                  id={data.UserTypeId}
                  value= {data.UserTypeDescription}
                   
                 >
                    {data.UserTypeDescription}
                  </MenuItem>
                  ))}

                </Select>
             
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" size='small'>Clear</Button>
                  <Button variant="outlined" size='small' onClick={handleSave} >Save</Button>

                </Stack>
              </CardContent>


            </Card>

          </Box>

        </Container>
      </Layout>

    </div>
  )
}

export default Usermaptype