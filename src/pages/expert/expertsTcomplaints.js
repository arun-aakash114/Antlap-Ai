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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { visuallyHidden } from '@mui/utils';
import Modal from '@mui/material/Modal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CardContent, Popper } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import Explayout from '../../components/expert/explayout';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import { backEndDomain } from '../../service/apiserver';




// ____________modal style ________________
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

const style1 = {
  position: 'relative',
  width: 330,
  bgcolor: 'background.paper',
  p: 1,
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
  // NOSONAR Start
  // {
  //   id: 'assignedeng',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Assigned Engineer',
  // },
  // NOSONAR End
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

const EnhancedTableHead = (props)=> {
  const { order, orderBy,   onRequestSort } =
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



function ExpertsTcomplaints() {

  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const menuClasses = useMenuStyles();
  const [openassign, setOpenassign] = React.useState(false);
  const [tabledata, settabledata] = React.useState([]);
  const [loader, setloader] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')

  useEffect(() => {
    setloader(true)
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
          if (response.data.message == "No Data Found") {
            // NOSONAR Start
            // setloader(false)
// NOSONAR End
          }
        })
    } catch (err) {

    }

  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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


  const assignClose = () => setOpenassign(false);

  return (
    <Explayout>
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
          {/* <EnhancedTableToolbar /> */}
          <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              <h2 className="page-heding"> Today's Complaint <span className='header-count'>{tabledata.length}</span></h2>


            </Box>
          </div>
        )}
      </PopupState>
          <Card sx={{ width: '100%', mb: 2, mt: 2 }}>
            <CardContent>

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
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
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
                            <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                            <TableCell align="right">{row.EquipmentModel}</TableCell>
                            <TableCell align="right" className={`status ${row.StatusDescription}`}>{row.StatusDescription}</TableCell>
                            {/* <TableCell align="right">{row.complainttype}</TableCell> */}
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
      </Modal>
    </Explayout>
  );
}

export default ExpertsTcomplaints;
