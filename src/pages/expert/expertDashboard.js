import React, { useEffect } from 'react'
import Explayout from '../../components/expert/explayout';
import '../../App.css';
import { Card, Grid } from '@mui/material';
import { Container } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Modal from '@mui/material/Modal';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { makeStyles } from '@mui/styles';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import meet from './../../assets/meet.png';
import SearchIcon from '@mui/icons-material/Search';
import { backEndDomain } from '../../service/apiserver'


// NOSONAR Start
// function createData(customername, equipstatus, equiploc, contactnum, Prefix, Model, Status, complainttype, issue) {
//   return {
//     customername, equipstatus, equiploc, contactnum, Prefix, Model, Status, complainttype, issue
//   };
// }
// NOSONAR End
const useMenuStyles = makeStyles({
  paper: {
    maxHeight: "calc(100% - 96px)",
    WebkitOverflowScrolling: "touch"
  },
  list: {
    outline: 0
  }
});
// NOSONAR Start
// const rows = [
//   createData('Ada Lovelace', 'Breakdown', 'LA', 9878789874, '4Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Mike', 'Running', 'Hawkins', 9878789874, '2Z', 'VIK12', 'Declined', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Jonas', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Max', 'Running', 'Hawkins', 9878789874, '9Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Wheeler', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Hopper', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Declined', 'Oil leakeage', 'Oil leakeage while steering'),
//   createData('Eleven', 'Running', 'Upside Down', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering')
// ];
// NOSONAR End
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
// ____________modal style ________________
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5

};
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
    id: 'assignedeng',
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
  // NOSONAR Start
  // {
  //   id: 'complainttype',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Complaint Type',
  // },
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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


function ExpertDashboard() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  // NOSONAR Start
  // const [selected, setSelected] = React.useState([]);
  // const [open, setOpen] = React.useState(false);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [noteopen, setNoteopen] = React.useState(false);
  // const id = open ? "faked-reference-popper" : undefined;
  // NOSONAR End
  const menuClasses = useMenuStyles();
  const [openassign, setOpenassign] = React.useState(false);
  const [openlogin, setOpenlogin] = React.useState(false);
  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [inprogresscount, setinprogress] = React.useState([]);
  const [opened, setopened] = React.useState([]);

  useEffect(() => {
    if (localStorage.getItem('alert')) {
      setOpenlogin(true)
      setTimeout(() => {
        localStorage.removeItem("alert");
        setOpenlogin(false);

      }, 2000)
    } else {
      setOpenlogin(false);

    }

    setloader(true)
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/profile`,
        // NOSONAR Start
        //data: UserId,
        // NOSONAR End
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          // NOSONAR Start
          // setprofileimg(response.data.data.ImgPath)
          // NOSONAR End
          localStorage.setItem('Profilepic', response.data.data.ImgPath);
          // NOSONAR Start
          // setprofilepic(response.data.data.ImgPath)
          // NOSONAR End

        })
    } catch (err) {

    }
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webexpert/webComplaintList`,
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
          if (response.data.message === "No new complaints available for the day") {
            setnodata(true)
            // NOSONAR Start
            // setloader(false)
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
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webtotalCount`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setopened(response.data.totalCount[0].Registered)
          setinprogress(response.data.totalCount[4].InProgress)

          setloader(false)

        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }
  }, [])

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const assignClose = () => setOpenassign(false);
// NOSONAR Start
  // const openAssignModal = () => {
  //   setOpenassign(true);
  // }
  // NOSONAR End

  return (

    <Explayout>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          <Box className='box-header'>
            <h2 className="page-heding">Service Summary </h2>
            <Box className='db-right'>
              <h4 onClick={() => { navigate('/servicestat', { state: { id: "open" } }) }} >Open </h4><span sx={{ mr: 2 }} className='header-count red' onClick={() => { navigate('/servicestat', { state: { id: "open" } }) }}>{opened}</span>
              <h4 onClick={() => { navigate('/servicestat', { state: { id: "InProgress" } }) }}> In Progress </h4><span className='header-count yellow' onClick={() => { navigate('/servicestat', { state: { id: "InProgress" } }) }}>{inprogresscount}</span>
            </Box>
          </Box>


          {nodata === false ? <Grid item xs={12}>
            {/* <Typography>Today's Complaints <Chip label="0" /></Typography> */}

            <Card>
              <CardContent>
                <Box className='box-header'>
                  <Typography variant="h5" component="div">
                    Today's Complaint <span className='header-count'>{tabledata.length}</span>
                  </Typography>

                  {/* <Button variant='text' endIcon={<ChevronRightIcon />} onClick={() => { navigate('/etodayscomplaints') }}>View All</Button> */}
                  <Button className="outlined" endIcon={<ArrowForwardIcon />} onClick={() => { navigate('/etodayscomplaints') }}>View All</Button>
                  {/* <Typography onClick={() => { navigate('/etodayscomplaints') }}>View All<ArrowForwardIcon/></Typography> */}
                </Box>
                <Box sx={{ width: '100%' }}>

                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      // NOSONAR Start
                    // aria-labelledby="tableTitle"
                    // size={dense ? 'small' : 'medium'}
                    // NOSONAR End
                    >
                      <EnhancedTableHead
                      // NOSONAR Start
                        // numSelected={selected.length}
                        // NOSONAR End
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tabledata.length}
                      />
                      <TableBody>
                        {stableSort(tabledata, getComparator(order, orderBy))
                          .slice(0, 9)
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
                                key={row.customername}
                                // NOSONAR Start
                              // selected={isItemSelected}
                              // NOSONAR End
                              >
                                <TableCell
                                  component="th"
                                  // NOSONAR Start
                                  // id={labelId}
                                  // NOSONAR End
                                  scope="row"
                                  padding="none"
                                >
                                  {row.customerName}
                                </TableCell>
                                <TableCell align="right">{row.Equipment_Status != null ? row.Equipment_Status : "-"}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.customerContact}</TableCell>
                                <TableCell align="right">{row.AssignedEngineer != null ? row.AssignedEngineer : "-"}</TableCell>
                                <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                                <TableCell align="right">{row.EquipmentModel}</TableCell>
                                <TableCell align="right" className={`status ${row.StatusDescription}`}>{row.StatusDescription}</TableCell>
                                {/* <TableCell align="right">{row.complainttype}</TableCell> */}
                                <TableCell align="right">{row.IssueDescription}</TableCell>
                                <TableCell align="right">

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
                                                    <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEye />&nbsp;View</MenuItem>
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
                </Box>
                {/* <Button className="outlined" endIcon={<ArrowForwardIcon />} onClick={() => { navigate('/etodayscomplaints') }}>View All</Button> */}
              </CardContent>
            </Card>
            <Typography className='show-txt'>Showing 09 of 20<Button className="outlined" endIcon={<ArrowForwardIcon />} onClick={() => { navigate('/etodayscomplaints') }}>View All</Button></Typography>
          </Grid>
            : <Box className="fo-bg-wrap1">
              <img src={meet}></img>
              <Typography className='no-available'>No complaints available at the moment</Typography>
            </Box>}
          <Snackbar className='eloginalert' open={openlogin} autoHideDuration={1000} >
            <Alert severity="success" sx={{ width: '30%' }}>
              Login successfully
            </Alert>
          </Snackbar>
        </div>
      </Container>
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
            <Typography className='detail-text'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo</Typography>
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
      </Modal>

    </Explayout>

  )
}

export default ExpertDashboard;
