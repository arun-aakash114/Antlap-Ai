import React from 'react'
import Layout from '../../../../components/layout'
import Box from '@mui/material/Box' 
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@mui/system';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Form from '../UserManagement/basic'



const User = () => {

  const { state} = useLocation();

 
  
  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

          <Box sx={{ flexGrow: 1 }}>
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
                  <Typography color="text.primary">Create User</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">{state ? "Edit User" : "Create User"}</h2>
              </div>  <div className='right'>
                <Link to="/manageusers"> <Button variant="outlined" size='small'>Back</Button></Link>
              </div></div>
              <Form editData={state}/>
             
            

          </Box>

        </Container>
      </Layout>
    </div>
  )
}

export default User;