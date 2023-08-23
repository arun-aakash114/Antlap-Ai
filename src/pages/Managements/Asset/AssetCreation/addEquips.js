import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Layout from "../../../../components/layout";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Card, CardContent, Container } from "@mui/material";
import AddEquipForm from "./addEquipForm";
import { useLocation} from 'react-router-dom';


const AddEquips = () => {

  const { state } = useLocation();




  return (
    <div>
    <Layout>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <div className='box-header dt-mgmt'>
          <div className="left">
            <Breadcrumbs className="crumbs-master">
              <Link color={"inherit"}>Masters</Link>
              <Link color={"inherit"}>Asset Management</Link>
              <Link color={"textPrimary"}>Manage Equipment's</Link>
              <Link>Create</Link>

            </Breadcrumbs>
            <h3 className="heading">Create</h3>
          </div>
          <div className="right">
            <Link to="/manageequips">
              <Button variant="contained">Back</Button>
            </Link>
          </div>
        </div>
        <Card className='user'>
          <CardContent>
            <AddEquipForm equipData={state}/>
          </CardContent>
        </Card>

      </Box>
      </Container>
    </Layout>
    </div>
  );
};

export default AddEquips;
