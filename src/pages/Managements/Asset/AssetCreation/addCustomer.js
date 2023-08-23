import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import React from "react";
import Layout from "../../../../components/layout";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Container,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Addcustomer = () => {
  return (
    <Layout>
      
        <Box>
          <div className="arrange">
            <div className="search-input">
              <Breadcrumbs className="crumbs-master">
                <Link color={"inherit"}>Masters</Link>
                <Link color={"inherit"}>Map Equipment's & Customers</Link>
                <Link>Create</Link>
              </Breadcrumbs>
              <h3 className="heading">Create</h3>
            </div>
            <div className="btn-create">
              <Link to="/manageEqcustomer">
                <Button variant="contained">Back</Button>
              </Link>
            </div>
          </div>
          <Container>
          <Card>
            <CardContent>
              <InputLabel>Customer</InputLabel>
              <TextField id="outlined-select-currency" select label="Select" />
              <InputLabel>Equipment Serial No.</InputLabel>
              <TextField id="outlined-select-currency" select label="Select" />
              <InputLabel>Date of Commissioning</InputLabel>

              <TextField
                id="outlined-basic"
                label="Choose"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <InputLabel>Status</InputLabel>
              <TextField id="outlined-select-currency" select label="Select" />

              <Box className="cs-btn">
                <Button variant="contained">Clear</Button>
                <Button variant="contained">Save</Button>
              </Box>
            </CardContent>
          </Card>
          </Container>
        </Box>
    </Layout>
  );
};

export default Addcustomer;
