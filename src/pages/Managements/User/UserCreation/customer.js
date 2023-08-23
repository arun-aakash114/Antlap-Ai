import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import Fromcustomercreate from "./formCustomerCreate";

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

const Customer = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  

  const [ customerData, setCustomerData ] = useState([]);
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
          setCustomerData(response.data.Data)
        })
    } catch (err) {

    }

  }, [])

  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <div className="box-header dt-mgmt">
            {customerData}
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
              <h2 className="page-heding">Create Customer</h2>
            </div>
            <div className="right">
            <Link to="/managecustomers" >
              <Button className="bck-btn" type="button" variant="contained">
                Back
              </Button>
              </Link>
              
            </div>
          </div>
          <div>
            <div className="customer-create">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Fromcustomercreate/>
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

export default Customer;
