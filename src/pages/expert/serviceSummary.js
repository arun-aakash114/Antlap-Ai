import React, {  useEffect } from 'react'
import Explayout from '../../components/expert/explayout';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Modal from '@mui/material/Modal';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import { Card, Grid } from '@mui/material';
import { Container } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { makeStyles } from '@mui/styles';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import axios from "axios";
import meet from './../../assets/meet.png';
import { backEndDomain } from '../../service/apiserver';

const useMenuStyles = makeStyles({
  paper: {
    maxHeight: "calc(100% - 96px)",
    WebkitOverflowScrolling: "touch"
  },
  list: {
    outline: 0
  }
});



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// NOSONAR Start

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// NOSONAR End
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'customername',
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'Equipmentstatus',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Status',
  },
  {
    id: 'City',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Location',
  },
  {
    id: 'customernumber',
    numeric: true,
    disablePadding: false,
    label: 'Contact Number',
  },
  {
    id: 'UserName',
    numeric: true,
    disablePadding: false,
    label: 'Assigned Engineer',
  },
  {
    id: 'EquipmentPrefix',
    numeric: true,
    disablePadding: false,
    label: 'Prefix',
  },
  {
    id: 'EquipmentModel',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  // NOSONAR Start
  //  {
  //    id: 'complainttype',
  //    numeric: true,
  //    disablePadding: false,
  //    label: 'Complaint Type',
  //  },
  // NOSONAR End
  {
    id: 'IssueDescription',
    numeric: true,
    disablePadding: false,
    label: 'Issue Description',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5

};

function EnhancedTableHead(props) {
  const {  order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



function ServiceSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [openassign, setOpenassign] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const menuClasses = useMenuStyles()
  const [nodata, setnodata] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [tabledata, settabledata] = React.useState([]);

  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/allocationdata?status=${location.state.id}&TenantId=${localStorage.getItem('TenantId')}`,
        //data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          // let dataaa= response.data.data

          if (response.data.data.length == 0) {
            setnodata(true)

          } else {
            let dataaa1 = []
            response.data.data.map((data) => {
              if (data.AssignedEngineer) {
                let hlo = {
                  customername: data.customerdetails.customername,
                  Equipmentstatus: data.equipmentdata.Equipmentstatus,
                  State: data.State,
                  City: data.City,
                  District: data.District,
                  // Address:data.Address,
                  customernumber: data.customerdetails.customernumber,
                  EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
                  EquipmentModel: data.equipmentdata.EquipmentModel,
                  IssueDescription: data.equipmentdata.IssuDescription,
                  UserName: data.AssignedEngineer.UserName,
                  RequestId: data.RequestId


                }
                dataaa1.push(hlo)

              } else {
                let hlo = {
                  customername: data.customerdetails.customername,
                  Equipmentstatus: data.equipmentdata.Equipmentstatus,
                  State: data.State,
                  City: data.City,
                  District: data.District,
                  // Address:data.Address,
                  customernumber: data.customerdetails.customernumber,
                  EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
                  EquipmentModel: data.equipmentdata.EquipmentModel,
                  IssueDescription: data.equipmentdata.IssuDescription,
                  // UserName:data.AssignedEngineer.UserName,
                  RequestId: data.RequestId


                }
                dataaa1.push(hlo)

              }

            });
            settabledata(dataaa1)
            // settabledata(getfilterdata)
          }


        }).catch(function (response) {
          if (response.response.data.message == "Data Not Found") {
            setnodata(true)
          }
        });
    } catch (err) {

    }
  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const assignClose = () => setOpenassign(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Explayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


        {/* __________from 287 to 378 will be rendered only if location value is open_____________ */}
        {location.state.id == "open" && <><Box sx={{ width: '100%' }}>
        <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding"> Open <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id == "InProgress" && <h2 className="page-heding"> In Progress <span className='header-count'>{tabledata.length}</span></h2>}
              
            </Box>
          </div>
        )}
      </PopupState>
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              {!nodata ?
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                  >
                    <EnhancedTableHead
                      // numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={tabledata.length} />
                    <TableBody>
                      {stableSort(tabledata, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          // const isItemSelected = isSelected(row.name);
                          // const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              // onClick={(event) => handleClick(event, row.customername)}
                              // role="checkbox"
                              // aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                            // selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                              </TableCell>
                              <TableCell
                                component="th"
                                // id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.customername}
                              </TableCell>
                              <TableCell align="right">{row.Equipmentstatus}</TableCell>
                              <TableCell align="right">{row.City},{row.District},{row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              <TableCell align="right">{row.UserName ? row.UserName : "-"}</TableCell>
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" >{row.complainttype}</TableCell> ,{row.City},{row.State}*/}
                              <TableCell align="right">{row.IssueDescription}</TableCell>
                              <TableCell>

                                <PopupState variant="popper" popupId="demo-popup-popper">
                                  {(popupState) => (
                                    <div>
                                      <IconButton className='arrow-btn' {...bindToggle(popupState)}>
                                        <ArrowDropDownIcon />
                                      </IconButton>
                                      <Popper {...bindPopper(popupState)} transition>
                                        {({ TransitionProps }) => (
                                          <ClickAwayListener onClickAway={popupState.close} >

                                            <Fade {...TransitionProps} timeout={350}>
                                              <Paper>
                                                <MenuList className={menuClasses.list} autoFocus>
                                                  {/* <MenuItem onClick={openAssignModal}><TextSnippetIcon/>SME Notes</MenuItem> */}
                                                  <MenuItem onClick={() => { navigate('/knowledgeBase', { state: { cid: row.RequestId } }) }}><SearchIcon />&nbsp;Find Solution</MenuItem>

                                                  <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>
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
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer> :
                <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>
              }
              {!nodata ? <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} /> : ""}
            </CardContent>
          </Card>
        </Box>
          <Modal
            open={openassign}
            onClose={assignClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SME Notes
              </Typography>
              <Box className='show-case'>
                <Typography className='detail-text'>Some SME Notes here</Typography>
              </Box>

              <Box textAlign='right'>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="cancel-btn"
                  onClick={() => { setOpenassign(false); }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="save-btn"
                  onClick={() => { setOpenassign(false); }}
                >
                  Save
                </Button>

              </Box>
            </Box>
          </Modal></>
        }

        {/* ________________render another table if location value is inprogress_______________ */}
        {location.state.id == "InProgress" && <><Box sx={{ width: '100%' }}>
        <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding"> Open <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id == "InProgress" && <h2 className="page-heding"> In Progress <span className='header-count'>{tabledata.length}</span></h2>}
              
            </Box>
          </div>
        )}
      </PopupState>
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              {!nodata ?
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                  >
                    <EnhancedTableHead
                      // numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={tabledata.length} />
                    <TableBody>
                      {stableSort(tabledata, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          // NOSONAR Start
                          // const isItemSelected = isSelected(row.name);
                          // const labelId = `enhanced-table-checkbox-${index}`;
// NOSONAR End
                          return (
                            <TableRow
                              hover
                              // NOSONAR Start
                              // onClick={(event) => handleClick(event, row.customername)}
                              // role="checkbox"
                              // aria-checked={isItemSelected}
                              // NOSONAR End
                              tabIndex={-1}
                              key={row.name}
                              // NOSONAR Start
                            // selected={isItemSelected}
                            // NOSONAR End
                            >
                              <TableCell padding="checkbox">
                              </TableCell>
                              <TableCell
                                component="th"
                                // NOSONAR Start
                                // id={labelId}
                                // NOSONAR End
                                scope="row"
                                padding="none"
                              >
                                {row.customername}
                              </TableCell>
                              <TableCell align="right">{row.Equipmentstatus}</TableCell>
                              <TableCell align="right">{row.City},{row.District},{row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              <TableCell align="right">{row.UserName}</TableCell>
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" >{row.complainttype}</TableCell> ,{row.City},{row.State}*/}
                              <TableCell align="right">{row.IssueDescription}</TableCell>
                              <TableCell>

                                <PopupState variant="popper" popupId="demo-popup-popper">
                                  {(popupState) => (
                                    <div>
                                      <IconButton className='arrow-btn' {...bindToggle(popupState)}>
                                        <ArrowDropDownIcon />
                                      </IconButton>
                                      <Popper {...bindPopper(popupState)} transition>
                                        {({ TransitionProps }) => (
                                          <ClickAwayListener onClickAway={popupState.close} >

                                            <Fade {...TransitionProps} timeout={350}>
                                              <Paper>
                                                <MenuList className={menuClasses.list} autoFocus>
                                                  {/* <MenuItem onClick={openAssignModal}><TextSnippetIcon/>SME Notes</MenuItem> */}
                                                  <MenuItem onClick={() => { navigate('/knowledgeBase', { state: { cid: row.RequestId, name: "expert" } }) }}><SearchIcon />&nbsp;Find Solution</MenuItem>
                                                  <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>
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
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer> :
                <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>
              }
              {!nodata ? <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} /> : ""}
            </CardContent>
          </Card>
        </Box><Modal
          open={openassign}
          onClose={assignClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SME Notes
              </Typography>
              <Box className='show-case'>
                <Typography className='detail-text'>Some SME Notes here</Typography>
              </Box>
              <Box textAlign='right'>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="cancel-btn"
                  onClick={() => { setOpenassign(false); }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="save-btn"
                  onClick={() => { setOpenassign(false); }}
                >
                  Save
                </Button>

              </Box>
            </Box>
          </Modal></>
        }

      </Container>
    </Explayout>
  )
}

export default ServiceSummary;


