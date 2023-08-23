import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { visuallyHidden } from '@mui/utils';
import Modal from '@mui/material/Modal';
import Layout from '../../components/layout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CardContent, Popper } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import meet from './../../assets/meet.png';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useLocation } from 'react-router-dom';
import man from '../../assets/man.png';
import { backEndDomain } from '../../service/apiserver';


// ____________modal style ________________
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
    id: 'customerName',
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'Equipment_Status',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Status',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Location',
  },
  {
    id: 'customerContact',
    numeric: true,
    disablePadding: false,
    label: 'Contact Number',
  },
  {
    id: 'AssignedEngineer',
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
  {
    id: 'StatusDescription',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
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


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, ids) => (
          <TableCell
            key={ids}
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






function TodaysComplaints() {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const menuClasses = useMenuStyles();
  const [loader, setloader] = React.useState(false);
  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [Wstatus, setWstatus] = React.useState('');
  const [warrentyStatus, setwarrentyStatus] = React.useState([]);
  const [employeeSkillLevel, setemployeeSkillLevel] = React.useState([]);
  const [skilllevel, setskilllevel] = React.useState('');
  const [employeeData, setemployeeData] = React.useState([]);
  const [paper, setpaper] = React.useState(false);
  const [openassign, setOpenassign] = React.useState(false);
  const location = useLocation();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  useEffect(() => {
    setloader(true)
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webpsmtdycomplaint`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          response.data.Complaints.map((data) => {
            if (data.StatusDescription === "Registered") {
              data.StatusDescription = "Open";
            } else if (data.StatusDescription === "Assigned") {
              data.StatusDescription = "Yet to accept";
            } else {
              data.StatusDescription = "Inprogress";
            }
          });
          settabledata(response.data.Complaints)
          setloader(false)
          if (response.data.message == "No new complaints available for the day") {
            setnodata(true)
          }
        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }

  }, [])
  const assignClose = () => setOpenassign(false);
  const [cidd, setcidd] = React.useState('');

  const openAssignModal = (cid) => {
    setcidd(cid)
    setOpenassign(true);
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webwarrentyStatus`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setwarrentyStatus(response.data.warrentyStatus)



        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }

    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webskillLevel`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setemployeeSkillLevel(response.data.employeeSkillLevel)


        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }
  }
  const handleChangeWStatus = (event) => {
    setWstatus(event.target.value);
  };
  const handleChangeskilllevel = (event) => {
    setskilllevel(event.target.value);
  };
  const [searchvalue, setsearchvalue] = React.useState('');
  const handleSearch = (event) => {
    setsearchvalue(event.target.value)
    if (event.target.value.length == 0) {
      setpaper(false)

    }
    let employeeDetail = {
      "employeeDetail": event.target.value
    }
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webuserInput/webemployeeDetail`,
        data: employeeDetail,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setemployeeData(response.data.employeeData)
          setpaper(true)

        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }


  }

  const chooseitem = (val) => {
    setsearchvalue(val)
    setpaper(false)
  }
  const assignfun = () => {
    let assign = {
      "warrentyStatus": Wstatus,
      "employeeDetail": searchvalue,
      "skillLevel": skilllevel,
      "CreatedBy": "admin",
      "ModifiedBy": "admin",
      "requestId": location.state.cid,
      "tenantId": localStorage.getItem('TenantId')
    }
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webuserInput/webassign`,
        data: assign,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          if (response.data.message == "Complaint Assigned Successfully") {
            // NOSONAR Start
            //// handleClose()
            // NOSONAR End
          }


        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <Container sx={{ width: '100%' }}>
        <div className={loader ? 'parentDisable' : ''} width="100%">

          {loader && <Oval
            height={80}
            width={80}
            color="#4b61ff"
            wrapperStyle={{
              position: 'absolute',
              top: '45%',
              left: '50%',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#2c79ff"
            strokeWidth={4}
            strokeWidthSecondary={4}

          />}
          <PopupState variant="popper" popupId="demo-popup-popper" >
            {(popupState) => (
              <div>
                <Box className='box-header'>
                  <h2 className="page-heding"> Today's Complaint
                    {!nodata ? <span className='header-count'>{tabledata.length}</span> : <span className='header-count'>0</span>}

                  </h2>
                </Box>
              </div>
            )}
          </PopupState>
          <Card sx={{ width: '100%', mb: 2, mt: 2 }}>
            <CardContent>

              {!nodata ? <TableContainer  >
                <Table

                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={tabledata.length}
                  />
                  <TableBody>
                    {stableSort(tabledata, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {


                        return (
                          <TableRow
                            hover

                            tabIndex={-1}
                            key={row.customername}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              {row.customerName}
                            </TableCell>
                            <TableCell align="right">{row.Equipment_Status}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.customerContact}</TableCell>
                            <TableCell align="right">{row.AssignedEngineer}</TableCell>
                            <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                            <TableCell align="right">{row.EquipmentModel}</TableCell>
                            <TableCell align="right" className={`status ${row.StatusDescription}`}>{row.StatusDescription}</TableCell>
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
                                                {row.StatusDescription == "Resolved" && <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>}
                                                {row.StatusDescription == "Open" && <>
                                                  <MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp;Assign</MenuItem>
                                                  <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem></>}
                                                {row.StatusDescription == "Inprogress" && <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem> }
                                                {row.StatusDescription == "Accepted" && <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>}
                                                {row.StatusDescription == "Yet to accept" &&
                                                  <><MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp;Re-Assign</MenuItem><MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem></>}
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
              </TableContainer>
                : <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No complaints available at the moment</Typography>
                </Box>}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                showFirstButton={true}
                showLastButton={true}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
      {/* ____________________Assign modal____________ */}


      <Modal className="assign"
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon className="actnSvg" onClick={assignClose} />
          <Box className='pp-content'>
            <img className='pp-img' src={man}></img>
          </Box>
          <Typography className='main-title' variant="h5" component="div" >
            Allocation
          </Typography>
          <Typography className='title-hlp' variant="h6" component="div">
            Complaint ID :{cidd}
          </Typography>
          <Box className='inputs'>
            <InputLabel htmlFor="anrede">Warranty Status</InputLabel>
            <FormControl className='filter-show-case1'>
              <Select
                value={Wstatus}
                onChange={handleChangeWStatus}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  Warranty Status
                </MenuItem>
                {warrentyStatus.map((value, ids) => (
                  <MenuItem key={ids} value={value.StatusDescription}>{value.StatusDescription}</MenuItem>


                ))}
              </Select>
            </FormControl>
            <InputLabel htmlFor="anrede">Employee Name</InputLabel>
            <FormControl className='filter-show-case1'>

              <TextField
                fullWidth
                // NOSONAR Start
                // label="Employee Name"
                // NOSONAR End
                name="Employee Name"
                value={searchvalue}
                onChange={(event) => handleSearch(event)}
                autoCorrect='off'
                autoComplete='off'
                autoFocus="autofocus"
                placeholder='Type here'
              />
              {paper &&

                <Paper elevation={3} >
                  {employeeData.map((value, ids) => (
                    <MenuItem key={ids} value={value} onClick={() => chooseitem(value)}>{value}</MenuItem>


                  ))}

                </Paper>

              }

            </FormControl>


            <InputLabel htmlFor="anrede">Employee Skill Level</InputLabel>

            <FormControl className='filter-show-case1'>
              <Select
                value={skilllevel}
                onChange={handleChangeskilllevel}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                  Employee Skill Level
                </MenuItem>
                {employeeSkillLevel.map((value, ids) => (
                  <MenuItem key={ids} value={value.SkillsLevelDesc}>{value.SkillsLevelDesc}</MenuItem>


                ))}
              </Select>
            </FormControl>
          </Box>
          <Button className='assignbtn' variant="contained" onClick={assignfun}>Assign</Button>

        </Box>
      </Modal>
    </Layout>
  );
}

export default TodaysComplaints;
