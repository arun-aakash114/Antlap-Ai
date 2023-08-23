import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import React from "react";
import Layout from "../../../../components/layout";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";

const Mapeqcustomer = () => {

  return (
    <Box>
      <Layout>
        <Container>
          <div className="arrange">
            <div className="search-input">
              <Breadcrumbs className="crumbs-master">
                <Link color={"inherit"}>Masters</Link>
                <Link color={"inherit"}>Asset Management</Link>
                <Link color={"textPrimary"}>Map Equipment's & Customers</Link>
              </Breadcrumbs>
              <h3 className="heading">Map Equipment's & Customers</h3>
            </div>
            <div className="btn-create">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Search
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end">
                        {<SearchOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search"
                />
              </FormControl>
              <Link to="/addcustomer">
                <Button variant="contained" size="medium">
                  Create
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Equipment Serial No</TableCell>
                    <TableCell align="right">Date of Commissioning</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="right">Sairam Earth Movers</TableCell>
                  <TableCell align="right">BWZ02711</TableCell>
                  <TableCell align="right">12th Oct, 2023</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="blue" />{" "}
                    </IconButton>
                  </TableCell>
                </TableBody>
                <TableBody>
                  <TableCell align="right">Sairam Earth Movers</TableCell>
                  <TableCell align="right">BWZ02711</TableCell>
                  <TableCell align="right">12th Oct, 2023</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="blue" />{" "}
                    </IconButton>
                  </TableCell>
                </TableBody>

                <TableBody>
                  <TableCell align="right">ERC Earth Movers</TableCell>
                  <TableCell align="right">BWZ02711</TableCell>
                  <TableCell align="right">12th Oct, 2023</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="blue" />{" "}
                    </IconButton>
                  </TableCell>
                </TableBody>

                <TableBody>
                  <TableCell align="right">ERC Earth Movers</TableCell>
                  <TableCell align="right">BWZ02711</TableCell>
                  <TableCell align="right">12th Oct, 2023</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="blue" />{" "}
                    </IconButton>
                  </TableCell>
                </TableBody>

                <TableBody>
                  <TableCell align="right">Samir Gowswami</TableCell>
                  <TableCell align="right">BWZ02711</TableCell>
                  <TableCell align="right">12th Oct, 2023</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="blue" />{" "}
                    </IconButton>
                  </TableCell>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    </Box>
  );
};

export default Mapeqcustomer;
