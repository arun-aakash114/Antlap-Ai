import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Select from '@mui/material/Select';
import TableHead from '@mui/material/TableHead';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { Card } from '@mui/material';
import { Container } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { makeStyles } from '@mui/styles';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import man from '../../assets/man.png';
import CloseIcon from '@mui/icons-material/Close';
import { Oval } from 'react-loader-spinner'
import axios from "axios";
import meet from './../../assets/meet.png';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
  // {
  //   id: 'servicetype',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Service Type',
  // },
  // {
  //   id: 'issue',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Issue Description',
  // },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];
const headCells1 = [
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
  // {
  //   id: 'servicetype',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'ServiceType',
  // },
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
  // {
  //   id: 'Status',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status',
  // },
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style1 = {
  position: 'relative',
  width: 330,
  bgcolor: 'background.paper',
  p: 1,
};


const EnhancedTableHead = (props) => {
  const location = useLocation();
  const { orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {location.state.id == "open" && <> <TableCell padding="checkbox">
        </TableCell>
          {headCells1.map((headCell) => (
            <TableCell
              key={headCell.id}
              align= 'right'
              padding='normal'
              sortDirection={orderBy === headCell.id}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id }
              </TableSortLabel>
            </TableCell>
          ))}
        </>}
        {location.state.id == "Yet to accept" && <> <TableCell padding="checkbox">
        </TableCell>
          {headCells1.map((headCell) => (
            <TableCell
              key={headCell.id}
              align= 'left'
              padding= 'normal'
              sortDirection={orderBy === headCell.id}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id}
              </TableSortLabel>
            </TableCell>
          ))}
        </>}
        {location.state.id == "Declined" && <> <TableCell padding="checkbox">
        </TableCell>
          {headCells1.map((headCell) => (
            <TableCell
              key={headCell.id}
              align= 'left'
              padding='normal'
              sortDirection={orderBy === headCell.id}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id }
              </TableSortLabel>
            </TableCell>
          ))}
        </>}
        {location.state.id == "Waiting for feedback" && <> <TableCell padding="checkbox">
        </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='right'
              padding= 'normal'
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id }
              </TableSortLabel>
            </TableCell>
          ))}
        </>}
      </TableRow>
    </TableHead>
  );
}


function Actionitems() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [openassign, setOpenassign] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const menuClasses = useMenuStyles();
  const [loader, setloader] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);
  const [equipstatus1, setequipstatus1] = React.useState([]);
  const [state1, setstate1] = React.useState([]);

  const [status, setstatus] = React.useState('');
  const [equipstatus, setequipstatus] = React.useState('');
  const [state, setstate] = React.useState('');
  const [district, setdistrict] = React.useState('');
  const [city, setcity] = React.useState('');
  const [pincode, setpincode] = React.useState('');
  const [pincode1, setpincode1] = React.useState('');
  const [city1, setcity1] = React.useState([]);
  const [district1, setdistrict1] = React.useState([]);


  const [Wstatus, setWstatus] = React.useState('');
  const [searchvalue, setsearchvalue] = React.useState('');
  const [paper, setpaper] = React.useState(false);
  const [employeeData, setemployeeData] = React.useState([]);
  const [employeeSkillLevel, setemployeeSkillLevel] = React.useState([]);

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

          if (response.data.employeeData.length > 0) {
            setemployeeData(response.data.employeeData)
            setpaper(true)
          } else {
            setpaper(false)
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
  const chooseitem = (val, value) => {
    setsearchvalue(val)
    setpaper(false)

    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webskillLevel?employeeid=${value.userid}`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setemployeeSkillLevel(response.data.skilldata)


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

  const assignfun = () => {
    let assign = {
      "warrentyStatus": Wstatus,
      "employeeDetail": searchvalue,
      "skillLevel": employeeSkillLevel.SkillsDescription,
      "CreatedBy": "admin",
      "ModifiedBy": "admin",
      "requestId": cidd,
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
            assignClose()
            setsuccessmsg(true)
            tablefunction()

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

  const handlefilterChange = (event) => {
    setstatus(event.target.value);
  };
  const handlefilterChange1 = (event) => {
    setequipstatus(event.target.value);
  };
  const handlefilterChange2 = (event) => {
    setstate(event.target.value);
    // NOSONAR Start
    // let stateid={
    //   "stateid": 29
    // }
    // NOSONAR End


    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webexpert/districtlist?stateid=${event.target.value.StateId}`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setdistrict1(response.data.Data)

        })
    } catch (err) {

    }

  };
  const handlefilterChange3 = (event) => {
    setcity(event.target.value);
    setpincode1(event.target.value.ZipCode)
  };
  const handlefilterChange4 = (event) => {
    setpincode(event.target.value);
  };
  const handlefilterChange5 = (event) => {
    setdistrict(event.target.value);
    let stateid = {
      "districtid": event.target.value.DistrictId
    }
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webuserInput/webcity`,
        data: stateid,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setcity1(response.data.Data)

        }).catch(function (response) {
          // NOSONAR Start
          //   if(response.response.status == 422){
          //   }
          // NOSONAR End
        });
    } catch (err) {

    }
  };
  const applyfilter = () => {
    let applydata = {
      "state": state.StateName,
      "city": city.Locality,
      "district": district.DistrictName,
      "pincode": city.ZipCode,
      "equipmentStatus": equipstatus,
      // NOSONAR Start
      // "status": status
      // NOSONAR End
    }
    try {
      axios({
        method: 'post',
        url: `${backEndDomain}/webapi/webuserInput/webfilter`,
        data: applydata,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          if (response.data.message == "Select anyone field to apply filter!") {
            setopenalert(true)
          } else {
            setopenalert(false)
          }
        })
    } catch (err) {

    }
  }
  const clearfilter = () => {
    tablefunction()
  }

  const [searchVall, setSearchVall] = useState("");

  const searchfun = () => {
    if (searchVall.length != 0) {
      localStorage.setItem('searchVall', searchVall);
      const keyword = searchVall;
      const filtered = tabledata.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
      settabledata(filtered)
    } else {
      localStorage.removeItem("searchVall")
      tablefunction()
    }

  }

  const searchVallue = localStorage.getItem('searchVall')

  useEffect(() => {
    setloader(true)
    tablefunction()
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/webequipmentStatus`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setequipstatus1(response.data.equipmentStatus)



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
        url: `${backEndDomain}/webapi/webuserInput/webstate`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          setstate1(response.data.stateData)


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
        url: `${backEndDomain}/webapi/webuserInput/webStatus`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          // 
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


  }, [])
  const tablefunction = () => {
    try {
      axios({
        method: 'get',
        url: `${backEndDomain}/webapi/webuserInput/allocationdata?status=${location.state.id}&TenantId=${localStorage.getItem('TenantId')}&Type=${location.state.type}`,
        // NOSONAR Start
        //data: Data,
        // NOSONAR End
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          // NOSONAR Start
          // let dataaa= response.data.data
          // NOSONAR End
          if (response.data.data.length == 0) {
            setnodata(true)
            setloader(false)

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
                  // NOSONAR Start
                  // Address:data.Address,
                  // NOSONAR End
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
                  // NOSONAR Start
                  // Address:data.Address,
                  // NOSONAR End
                  customernumber: data.customerdetails.customernumber,
                  EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
                  EquipmentModel: data.equipmentdata.EquipmentModel,
                  IssueDescription: data.equipmentdata.IssuDescription,
                  // NOSONAR Start
                  // UserName:data.AssignedEngineer.UserName,
                  // NOSONAR End
                  RequestId: data.RequestId


                }
                dataaa1.push(hlo)

              }

            });
            settabledata(dataaa1)
            // NOSONAR Start
            // settabledata(getfilterdata)
            // NOSONAR End
            setloader(false)
          }


        }).catch(function (response) {
          if (response.response.data.message == "Data Not Found") {
            setnodata(true)
            setloader(false)
          }
        });
    } catch (err) {

    }
  }
  const [successmsg, setsuccessmsg] = React.useState(false);
  const handleClose = () => {
    setopenalert(false)
    setsuccessmsg(false)
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const assignClose = () => setOpenassign(false);
  const [cidd, setcidd] = React.useState('');

  const openAssignModal = (cid) => {
    setcidd(cid)
    setOpenassign(true);

  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const [openalert, setopenalert] = React.useState(false);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [warrentyStatus, setwarrentyStatus] = React.useState([]);

  return (
    <Layout>
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

          { /* __________from 287 to 378 will be rendered only if location value is open_____________ */}
          {location.state.id == "open" && <><Box sx={{ width: '100%' }}>
          <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding">Open Complaint(s) <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id != "open" && <h2 className="page-heding">{location.state.id}  <span className='header-count'>{tabledata.length}</span></h2>}
              {/* // NOSONAR Start { location.state.id == "Yet to accept" &&  <h2 className="numbr">{location.state.id}  <span className='header-count'>12</span></h2>}
              { location.state.id == "Waiting for feedback" &&  <h2 className="numbr">{location.state.id} <span className='header-count'>12</span></h2>} // NOSONAR End */ }

              {!nodata && location.state.id == "open" ?
                <Box className='Srch-fld'>
                  {/* <TextField id="outlined-search" label="Search" type="search" size='small'>
                  <SearchIcon />

                </TextField> */}
                  <FormControl className='Srch-fld-color' size='small'>
                    <InputLabel size='small'>Search</InputLabel>
                    <OutlinedInput
                      size='small'
                      // NOSONAR Start
                      //type={svalues.search}
                      // value={searchVall}
                      // NOSONAR End
                      defaultValue={searchVallue ?? ''}
                      onChange={e => setSearchVall(e.target.value)}

                      endAdornment={<InputAdornment position="end"> <SearchIcon className='search-icon' onClick={searchfun} /></InputAdornment>}
                      label="Search"
                    />
                  </FormControl>
                  <Tooltip title="Filter list">

                    <IconButton >
                      <FilterAltOutlinedIcon {...bindToggle(popupState)} />
                    </IconButton>
                  </Tooltip>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      // NOSONAR Start
                      // <ClickAwayListener onClickAway={popupState.close} >
// NOSONAR End
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <MenuList className={menuClasses.list} autoFocus>
                            <Box sx={style1}>

                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose Filter <CloseIcon sx={{ marginLeft: 20 }} onClick={popupState.close} />

                              </Typography>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={status}
                                  onChange={handlefilterChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Status
                                  </MenuItem>
                                  <MenuItem value="10">
                                    Open
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={equipstatus}
                                  onChange={handlefilterChange1}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Equipment Status
                                  </MenuItem>
                                  {equipstatus1.map((value, ids) => (
                                    <MenuItem key={ids} value={value.StatusId}>{value.StatusId}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={state}
                                  onChange={handlefilterChange2}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    State
                                  </MenuItem>
                                  {state1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.StateName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={district}
                                  onChange={handlefilterChange5}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    District
                                  </MenuItem>
                                  {district1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.DistrictName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={city}
                                  onChange={handlefilterChange3}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    City
                                  </MenuItem>

                                  {city1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.Locality}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={pincode}
                                  onChange={handlefilterChange4}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Pin/Zip Code
                                  </MenuItem>
                                  {pincode1}

                                </Select>
                              </FormControl>

                              <Box textAlign='center'>
                                <Button className='outline-btn'
                                  type="submit"
                                  size="large"
                                  variant="outlined"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={clearfilter}

                                >
                                  Clear
                                </Button>
                                <Button className='apply-btn'
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={applyfilter}

                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          </MenuList>
                        </Paper>
                      </Fade>
                      // NOSONAR Start
                      // </ClickAwayListener>// NOSONAR End
                    )}
                  </Popper>
                </Box>
                : ""}
            </Box>
          </div>
        )}
      </PopupState>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                {!nodata  ? <TableContainer>
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
                        .map((row, ids) => {
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
                              key={ids}
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
                              <TableCell align="right">{row.City},  {row.District},  {row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              {/* <TableCell align="right">{row.servicetype}</TableCell>,{row.City},{row.State} */}
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" className={`status ${row.Status}`}>{row.Status}</TableCell> */}
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
                                                  <MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp;Assign</MenuItem>
                                                  <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon /> &nbsp;View</MenuItem>
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
                {!nodata  ? <TablePagination
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
            {/* ____________________Assign modal____________ */}

            <>
      <Modal className="assign"
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <CloseIcon className="actnSvg" onClick={handleClose}/> */}
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
                    <MenuItem key={ids} value={value.username} onClick={() => chooseitem(value.username, value)}>{value.username}</MenuItem>


                  ))}

                </Paper>

              }

            </FormControl>


            <InputLabel htmlFor="anrede">Employee Skill Level</InputLabel>

            <FormControl className='filter-show-case1'>
              <TextField
                fullWidth
                value={employeeSkillLevel.SkillsDescription}
                autoCorrect='off'
                autoComplete='off'
                placeholder='Employee Skill Level'
              />

            </FormControl>
          </Box>
          <Button className='assignbtn' variant="contained" onClick={assignfun}>Assign</Button>

        </Box>
      </Modal>
    </>

          </>
          }

          {/* ________________render another table if location value is yet to accept_______________ */}
          {location.state.id == "Yet to accept" && <><Box sx={{ width: '100%' }}>
          <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding">Open Complaint(s) <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id != "open" && <h2 className="page-heding">{location.state.id}  <span className='header-count'>{tabledata.length}</span></h2>}
              {/* // NOSONAR Start  { location.state.id == "Yet to accept" &&  <h2 className="numbr">{location.state.id}  <span className='header-count'>12</span></h2>}
              { location.state.id == "Waiting for feedback" &&  <h2 className="numbr">{location.state.id} <span className='header-count'>12</span></h2>} // NOSONAR End */}

              {!nodata && location.state.id == "open" ?
                <Box className='Srch-fld'>
                  {/* <TextField id="outlined-search" label="Search" type="search" size='small'>
                  <SearchIcon />

                </TextField> */}
                  <FormControl className='Srch-fld-color' size='small'>
                    <InputLabel size='small'>Search</InputLabel>
                    <OutlinedInput
                      size='small'
                      // NOSONAR Start
                      //type={svalues.search}
                      // value={searchVall}
                      // NOSONAR End
                      defaultValue={searchVallue ?? ''}
                      onChange={e => setSearchVall(e.target.value)}

                      endAdornment={<InputAdornment position="end"> <SearchIcon className='search-icon' onClick={searchfun} /></InputAdornment>}
                      label="Search"
                    />
                  </FormControl>
                  <Tooltip title="Filter list">

                    <IconButton >
                      <FilterAltOutlinedIcon {...bindToggle(popupState)} />
                    </IconButton>
                  </Tooltip>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      // NOSONAR Start
                      // <ClickAwayListener onClickAway={popupState.close} >
                      // NOSONAR End
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <MenuList className={menuClasses.list} autoFocus>
                            <Box sx={style1}>

                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose Filter <CloseIcon sx={{ marginLeft: 20 }} onClick={popupState.close} />

                              </Typography>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={status}
                                  onChange={handlefilterChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Status
                                  </MenuItem>
                                  <MenuItem value="10">
                                    Open
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={equipstatus}
                                  onChange={handlefilterChange1}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Equipment Status
                                  </MenuItem>
                                  {equipstatus1.map((value, ids) => (
                                    <MenuItem key={ids} value={value.StatusId}>{value.StatusId}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={state}
                                  onChange={handlefilterChange2}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    State
                                  </MenuItem>
                                  {state1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.StateName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={district}
                                  onChange={handlefilterChange5}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    District
                                  </MenuItem>
                                  {district1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.DistrictName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={city}
                                  onChange={handlefilterChange3}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    City
                                  </MenuItem>

                                  {city1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.Locality}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={pincode}
                                  onChange={handlefilterChange4}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Pin/Zip Code
                                  </MenuItem>
                                  {pincode1}

                                </Select>
                              </FormControl>

                              <Box textAlign='center'>
                                <Button className='outline-btn'
                                  type="submit"
                                  size="large"
                                  variant="outlined"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={clearfilter}

                                >
                                  Clear
                                </Button>
                                <Button className='apply-btn'
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={applyfilter}

                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          </MenuList>
                        </Paper>
                      </Fade>
                      // </ClickAwayListener>
                    )}
                  </Popper>
                </Box>
                : ""}
            </Box>
          </div>
        )}
      </PopupState>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                {!nodata  ? <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                  >
                    <EnhancedTableHead
                    // NOSONAR Start
                      // numSelected={selected.length}
                      // NOSONAR End
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
                              <TableCell align="right">{row.City}, {row.District}, {row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              {/* <TableCell align="right">{row.servicetype}</TableCell> */}
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" className={`status ${row.Status}`}>{row.Status}</TableCell> ,{row.City},{row.State}*/}
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
                                                  <MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp; Re-Assign</MenuItem>
                                                  <MenuItem onClick={() => { navigate('/alldetails', { state: { id: location.state.id, cid: row.RequestId } }) }}><RemoveRedEyeIcon /> &nbsp;View</MenuItem>
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
                </TableContainer> : <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>}
                {!nodata  ? <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={tabledata.length}
                  rowsPerPage={rowsPerPage}
                  showFirstButton={true}
                  showLastButton={true}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> : ""}
              </CardContent>
            </Card>
          </Box>
            {/* ____________________Assign modal____________ */}
            <>
      <Modal className="assign"
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <CloseIcon className="actnSvg" onClick={handleClose}/> */}
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
                // label="Employee Name"
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
                    <MenuItem key={ids} value={value.username} onClick={() => chooseitem(value.username, value)}>{value.username}</MenuItem>


                  ))}

                </Paper>

              }

            </FormControl>


            <InputLabel htmlFor="anrede">Employee Skill Level</InputLabel>

            <FormControl className='filter-show-case1'>
              <TextField
                fullWidth
                value={employeeSkillLevel.SkillsDescription}
                autoCorrect='off'
                autoComplete='off'
                placeholder='Employee Skill Level'
              />

            </FormControl>
          </Box>
          <Button className='assignbtn' variant="contained" onClick={assignfun}>Assign</Button>

        </Box>
      </Modal>
    </>
  

          </>
          }
          {/* _______________template for declined ______________ */}
          {location.state.id == "Declined" && <><Box sx={{ width: '100%' }}>
          <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding">Open Complaint(s) <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id != "open" && <h2 className="page-heding">{location.state.id}  <span className='header-count'>{tabledata.length}</span></h2>}
              {/*  // NOSONAR Start { location.state.id == "Yet to accept" &&  <h2 className="numbr">{location.state.id}  <span className='header-count'>12</span></h2>}
              { location.state.id == "Waiting for feedback" &&  <h2 className="numbr">{location.state.id} <span className='header-count'>12</span></h2>}  // NOSONAR End */}

              {!nodata && location.state.id == "open" ?
                <Box className='Srch-fld'>
                  {/* <TextField id="outlined-search" label="Search" type="search" size='small'>
                  <SearchIcon />

                </TextField> */}
                  <FormControl className='Srch-fld-color' size='small'>
                    <InputLabel size='small'>Search</InputLabel>
                    <OutlinedInput
                      size='small'
                      // NOSONAR Start
                      //type={svalues.search}
                      // value={searchVall}
                      // NOSONAR End
                      defaultValue={searchVallue ?? ''}
                      onChange={e => setSearchVall(e.target.value)}

                      endAdornment={<InputAdornment position="end"> <SearchIcon className='search-icon' onClick={searchfun} /></InputAdornment>}
                      label="Search"
                    />
                  </FormControl>
                  <Tooltip title="Filter list">

                    <IconButton >
                      <FilterAltOutlinedIcon {...bindToggle(popupState)} />
                    </IconButton>
                  </Tooltip>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      // <ClickAwayListener onClickAway={popupState.close} >

                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <MenuList className={menuClasses.list} autoFocus>
                            <Box sx={style1}>

                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose Filter <CloseIcon sx={{ marginLeft: 20 }} onClick={popupState.close} />

                              </Typography>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={status}
                                  onChange={handlefilterChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Status
                                  </MenuItem>
                                  <MenuItem value="10">
                                    Open
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={equipstatus}
                                  onChange={handlefilterChange1}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Equipment Status
                                  </MenuItem>
                                  {equipstatus1.map((value, ids) => (
                                    <MenuItem key={ids} value={value.StatusId}>{value.StatusId}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={state}
                                  onChange={handlefilterChange2}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    State
                                  </MenuItem>
                                  {state1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.StateName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={district}
                                  onChange={handlefilterChange5}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    District
                                  </MenuItem>
                                  {district1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.DistrictName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={city}
                                  onChange={handlefilterChange3}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    City
                                  </MenuItem>

                                  {city1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.Locality}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={pincode}
                                  onChange={handlefilterChange4}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Pin/Zip Code
                                  </MenuItem>
                                  {pincode1}

                                </Select>
                              </FormControl>

                              <Box textAlign='center'>
                                <Button className='outline-btn'
                                  type="submit"
                                  size="large"
                                  variant="outlined"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={clearfilter}

                                >
                                  Clear
                                </Button>
                                <Button className='apply-btn'
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={applyfilter}

                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          </MenuList>
                        </Paper>
                      </Fade>
                      // </ClickAwayListener>
                    )}
                  </Popper>
                </Box>
                : ""}
            </Box>
          </div>
        )}
      </PopupState>

            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                {!nodata  ? <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                  >
                    <EnhancedTableHead
                    // NOSONAR Start
                      // numSelected={selected.length}
                      // NOSONAR End
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
                              key={row.name}// NOSONAR Start
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
                              <TableCell align="right">{row.City}, {row.District}, {row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              {/* // NOSONAR Start <TableCell align="right">{row.servicetype}</TableCell>  // NOSONAR End */}
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/*  // NOSONAR Start <TableCell align="right" className={`status ${row.Status}`}>{row.Status}</TableCell> ,{row.City},{row.State} // NOSONAR End */}
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
                                                  <MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon />  &nbsp; Re-Assign</MenuItem>
                                                  <MenuItem onClick={() => { navigate('/alldetails', { state: { id: location.state.id, cid: row.RequestId } }) }}><RemoveRedEyeIcon /> &nbsp;View</MenuItem>
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
                </TableContainer> : <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>}
                {!nodata  ? <TablePagination
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
 
          </>
          }
          {location.state.id == "Waiting for feedback" && <><Box sx={{ width: '100%' }}>
          <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              {location.state.id == "open" && <h2 className="page-heding">Open Complaint(s) <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id != "open" && <h2 className="page-heding">{location.state.id}  <span className='header-count'>{tabledata.length}</span></h2>}
              {/* // NOSONAR Start  { location.state.id == "Yet to accept" &&  <h2 className="numbr">{location.state.id}  <span className='header-count'>12</span></h2>}
              { location.state.id == "Waiting for feedback" &&  <h2 className="numbr">{location.state.id} <span className='header-count'>12</span></h2>} // NOSONAR End  */}

              {!nodata && location.state.id == "open" ?
                <Box className='Srch-fld'>
                  {/* // NOSONAR Start  <TextField id="outlined-search" label="Search" type="search" size='small'>
                  <SearchIcon />

                </TextField>  // NOSONAR End */}
                  <FormControl className='Srch-fld-color' size='small'>
                    <InputLabel size='small'>Search</InputLabel>
                    <OutlinedInput
                      size='small'
                      // NOSONAR Start
                      //type={svalues.search}
                      // value={searchVall}
                      // NOSONAR End
                      defaultValue={searchVallue ?? ''}
                      onChange={e => setSearchVall(e.target.value)}

                      endAdornment={<InputAdornment position="end"> <SearchIcon className='search-icon' onClick={searchfun} /></InputAdornment>}
                      label="Search"
                    />
                  </FormControl>
                  <Tooltip title="Filter list">

                    <IconButton >
                      <FilterAltOutlinedIcon {...bindToggle(popupState)} />
                    </IconButton>
                  </Tooltip>
                  <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      // NOSONAR Start
                      // <ClickAwayListener onClickAway={popupState.close} >
                      // NOSONAR End

                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <MenuList className={menuClasses.list} autoFocus>
                            <Box sx={style1}>

                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose Filter <CloseIcon sx={{ marginLeft: 20 }} onClick={popupState.close} />

                              </Typography>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={status}
                                  onChange={handlefilterChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Status
                                  </MenuItem>
                                  <MenuItem value="10">
                                    Open
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={equipstatus}
                                  onChange={handlefilterChange1}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Equipment Status
                                  </MenuItem>
                                  {equipstatus1.map((value, ids) => (
                                    <MenuItem key={ids} value={value.StatusId}>{value.StatusId}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={state}
                                  onChange={handlefilterChange2}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    State
                                  </MenuItem>
                                  {state1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.StateName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={district}
                                  onChange={handlefilterChange5}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="" >
                                    District
                                  </MenuItem>
                                  {district1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.DistrictName}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={city}
                                  onChange={handlefilterChange3}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    City
                                  </MenuItem>

                                  {city1.map((value, ids) => (
                                    <MenuItem key={ids} value={value}>{value.Locality}</MenuItem>


                                  ))}

                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={pincode}
                                  onChange={handlefilterChange4}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                    Pin/Zip Code
                                  </MenuItem>
                                  {pincode1}

                                </Select>
                              </FormControl>

                              <Box textAlign='center'>
                                <Button className='outline-btn'
                                  type="submit"
                                  size="large"
                                  variant="outlined"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={clearfilter}

                                >
                                  Clear
                                </Button>
                                <Button className='apply-btn'
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={applyfilter}

                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          </MenuList>
                        </Paper>
                      </Fade>
                      // NOSONAR Start
                      // </ClickAwayListener>
                      // NOSONAR End
                    )}
                  </Popper>
                </Box>
                : ""}
            </Box>
          </div>
        )}
      </PopupState>
            <Card sx={{ width: '100%', mb: 2 }}>
              <CardContent>
                {!nodata  ? <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                  >
                    <EnhancedTableHead
                    // NOSONAR Start
                      // numSelected={selected.length}
                      // NOSONAR End
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={tabledata.length} />
                    <TableBody>
                      {stableSort(tabledata, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          // NOSONAR Start
                          //  const isItemSelected = isSelected(row.name);
                          // const labelId = `enhanced-table-checkbox-${index}`;
// NOSONAR End
                          return (
                            <TableRow
                              hover
                              // NOSONAR Start
                            //onClick={(event) => handleClick(event, row.customername)}
                            //role="checkbox"
                            //aria-checked={isItemSelected}
                            //tabIndex={-1}
                            //key={row.name}
                            //selected={isItemSelected}
                            // NOSONAR End
                            >
                              <TableCell padding="checkbox">
                              </TableCell>
                              <TableCell
                                component="th"
                                //id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.customername}
                              </TableCell>
                              <TableCell align="right">{row.Equipmentstatus}</TableCell>
                              <TableCell align="right">{row.City},  {row.District},  {row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              <TableCell align="right">{row.UserName}</TableCell>
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" className={`status ${row.Status}`}>{row.Status}</TableCell>,{row.City},{row.State} */}
                              {/* // NOSONAR Start <TableCell align="right">{row.servicetype}</TableCell> // NOSONAR End */}  
                              <TableCell>  <IconButton className='eye-grn-btn' onClick={() => { navigate('/alldetails', { state: { id: location.state.id, cid: row.RequestId } }) }}>
                                <RemoveRedEyeIcon />
                              </IconButton></TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer> : <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>}
                {!nodata  ? <TablePagination
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
          </Box></>
          }
        </div>
        <Snackbar open={openalert} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className="alert-leng">
          <Alert severity="error" sx={{ width: '50%' }}>
            Select anyone field to apply filter!
          </Alert>
        </Snackbar>
        <Snackbar open={successmsg} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className="alert-leng">
          <Alert severity="success" sx={{ width: '50%' }}>
            Complaint Assigned Successfully
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  )
}

export default Actionitems;


