import React, { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import {
    aiDataTable,
    approve,
    removeAllData,
    uploadforaprove,
    decline,
    declineReasons,
    statuschange,
    getCode
} from '../../service/apiServices/aisourceCreation';
import TablePagination from '@mui/material/TablePagination';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import DoneIcon from '@mui/icons-material/Done';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { updateToast, revertDec } from '../../store/reducers/toasters';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import { updateResponce } from '../../store/reducers/apiResponces';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { ClickAwayListener } from '@mui/base';
import { Fade, MenuList, Paper, Popper, menuClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// improve approve

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[10],
        fontSize: 14,
    },
}));

const headCellsNonIoT = [
    {
        id: 'Model',
        numeric: false,
        disablePadding: false,
        label: 'Model',
        sortable: true
    },
    {
        id: 'Prefix',
        numeric: true,
        disablePadding: false,
        label: 'Serial Prefix',
        sortable: true
    },
    {
        id: 'SerialNumber',
        numeric: false,
        disablePadding: true,
        label: 'Serial No Range',
        sortable: true
    },
    {
        id: 'Complaint_Description',
        numeric: true,
        disablePadding: false,
        label: 'Complaint Description',
        sortable: true
    },
    {
        id: 'ProblemDescription',
        numeric: true,
        disablePadding: false,
        label: 'Problem/Desc Code',
        sortable: true
    },
    {
        id: 'SMCS',
        numeric: true,
        disablePadding: false,
        label: 'SMCS Comp.Code',
        sortable: true
    },
    {
        id: 'StatusDescription',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        sortable: true
    },
    {
        id: 'CreatedBy',
        numeric: true,
        disablePadding: false,
        label: 'Created By',
        sortable: true
    },
    {
        id: 'CreatedDate',
        numeric: true,
        disablePadding: false,
        label: 'Created On',
        sortable: true
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        sortable: false
    },
];

const headCellIoT = [
    {
        id: 'Model',
        numeric: false,
        disablePadding: false,
        label: 'Model',
        sortable: true
    },
    {
        id: 'Prefix',
        numeric: true,
        disablePadding: false,
        label: 'Serial Prefix',
        sortable: true
    },
    {
        id: 'SerialNumber',
        numeric: false,
        disablePadding: true,
        label: 'Serial No Range',
        sortable: true
    },
    {
        id: 'FaultCode',
        numeric: true,
        disablePadding: false,
        label: 'Fault code',
        sortable: true
    },
    {
        id: 'FalutCodeDescription',
        numeric: true,
        disablePadding: false,
        label: 'Fault code Description',
        sortable: true
    },
    {
        id: 'SMCS',
        numeric: true,
        disablePadding: false,
        label: 'SMCS Comp.Code',
        sortable: true
    },
    {
        id: 'StatusDescription',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        sortable: true
    },
    {
        id: 'CreatedBy',
        numeric: true,
        disablePadding: false,
        label: 'Created By',
        sortable: true
    },
    {
        id: 'CreatedDate',
        numeric: true,
        disablePadding: false,
        label: 'Created On',
        sortable: true
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
        sortable: false
    },

]

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);

    };
    let headCells = [];
    if (sessionStorage.getItem('proType') === 'Non IoT') {
        headCells = [...headCellsNonIoT]
    } else {
        headCells = [...headCellIoT]
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            disabled={!headCell.sortable ? true : false}
                        // hideSortIcon={true}
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AidataTable = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { toaster, apiResponce } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [declinereason, setDeclineReason] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [order, setOrder] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('');
    const [opens, setOpens] = useState(false);
    const modalClose = () => setOpens(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        setOrderBy(property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

    };

    const open = Boolean(anchorEl);


    const handleClick = async (event, id) => {
        setAnchorEl(event.currentTarget);
        let res = await declineReasons(id);
        if (res.code === 200) {
            setDeclineReason(res.Data)
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [declineReasonList, setdeclineReasonList] = React.useState([])
    const [decReason, setdecReason] = React.useState('')
    const [commands, setCommands] = React.useState('')
    const reasonFunc = async (id) => {
        let res = await declineReasons(id);
        if (res.code === 200) {

            res.Data.forEach((row) => {
                setdeclineReasonList(res.Data)
            })
        }
    }

    const decLine = async () => {
        let payload = {
            "tenantId": localStorage.getItem('TenantId'),
            "reason": decReason,
            "comment": commands,
            "sourceId": sessionStorage.getItem('sourceId')
        }
        let res = await decline(payload);
        if (res.code === 200) {
            sessionStorage.removeItem('sourceId')
            window.location.reload(true)
        } else {
            sessionStorage.removeItem('sourceId')
            alert('Data not declined')
            window.location.reload(true)
        }
    }

    const deleteAllData = async () => {
        let payload = {
            "SourceId": sessionStorage.getItem('Idsource'),
        }
        let res = await removeAllData(payload);
        if (res.code === 200) {
            window.location.reload(true)
        }
    }

    const uploadaprove = async (id, i) => {
        let payloads = {}
        let res = await uploadforaprove(payloads)
        if (res.code === 200) {
            const viewlist = JSON.parse(JSON.stringify(apiResponce.viewList))
            const newList = viewlist.map((item, key) => {
                let x = item
                if (i === key) {
                    x.Approved = true
                }
                return x
            })
            dispatch(updateResponce({ field: 'viewList', value: newList }));
        }
    }
    const Actions = async (allData, act) => {
        sessionStorage.setItem('CompID', allData?.DescriptionId);
        let response = await getCode(allData.SourceId);
        if (act === 'approve') {
            let payload = {
                "tenantId": localStorage.getItem('TenantId'),
                "sourceId": Number(allData.SourceId)
            }
            let res = await approve(payload);
            if (res.code === 200) {
                window.location.reload(true)
            }
        } else if (act === 'view' || act === 'edit') {
            let payload = sessionStorage.getItem('proType') !== 'IoT' ? {
                "model": allData.Model,
                "Prefix": allData.Prefix,
                "serialNoRange": allData.SerialNumber,

                // "SMCScode": (allData.SMCS !== null && Array.isArray(allData.SMCS)) ? allData.SMCS.join(',') : allData.SMCS[0],
                "SMCScode": response.data.SMCS,
                "ProblemCode": response.data.ProblemDescription,
                "complaintDes": allData.Complaint_Description
            } : {
                "model": allData.Model,
                "Prefix": allData.Prefix,
                "serialNoRange": allData.SerialNumber,
                "SMCScode": response.data.SMCS,
                // "SMCScode": allData.SMCS !==null ? allData.SMCS.join(',') : "",
                // "SMCScode": (allData.SMCS !== null && Array.isArray(allData.SMCS)) ? allData.SMCS.join(',') : allData.SMCS == null ? '' : allData.SMCS[0],
                "faultCode": allData.FaultCode,
                "faultDesc": allData.FalutCodeDescription
            }
            if (localStorage.getItem('userDesc') === 'Expert Admin' && act === 'edit') {

                let res = await statuschange({ tenantId: localStorage.getItem('TenantId'), sourceId: Number(allData.SourceId) })
                if (res.code === 200) {

                    navigate('/resolutions', { state: { data: payload, act: act, id: allData.SourceId } })
                }
            } else {
                navigate('/resolutions', { state: { data: payload, act: act, id: allData.SourceId, progress: allData.StatusDescription } })
            }


        }

    }
    useEffect(() => {

        (async () => {

            if (props.filterdata.length === 0) {
                if (apiResponce.viewList.length === 0) {

                    let res = await aiDataTable(sessionStorage.getItem('proType') === 'IoT' ? 'IOT' : 'NONIOT')
                    if (res.code === 200) {
                        // setSourceDataList(res.Data)
                        dispatch(updateResponce({ field: 'viewList', value: res.Data }));
                    }
                }
            }
        })();
        reasonFunc();



    }, [])
    // NOSONAR Start
    return (
        <>
  
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        // numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={apiResponce.viewList?.length}
                    />
                    <TableBody>
                        {
                            stableSort(apiResponce.viewList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, id) => (
                                    <>
                                        {
                                            sessionStorage.getItem('proType') === 'Non IoT' &&

                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={id}
                                            >
                                                <TableCell >{row.Model}</TableCell>
                                                <TableCell >{row.Prefix}</TableCell>
                                                <TableCell >{row.SerialNumber || '--'}</TableCell>
                                                <TableCell >{row.Complaint_Description}</TableCell>
                                                <TableCell >{row.ProblemDescription.join(',')}</TableCell>
                                                <TableCell >{row.SMCS?.join(',') || '--'}</TableCell>
                                                {row.StatusDescription === 'In Progress' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                                                        <span className='status-inprogress'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Declined' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }} >
                                                        <span className='status-declined'>{row.StatusDescription}</span>
                                                        <InfoOutlinedIcon className='info' aria-describedby={id} onClick={(e) => { handleClick(e, row.SourceId) }} />
                                                        <>
                                                            <Popover
                                                                id={id}
                                                                open={open}
                                                                anchorEl={anchorEl}
                                                                onClose={handleClose}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                            >
                                                                <div className='poppercontent'>
                                                                    <h5 >Reason</h5>
                                                                    <h6  >{declinereason[0]?.ReasonCodes_M_ReasonCode}</h6>

                                                                    <h5 style={{ marginTop: '10px' }}>Comment</h5>
                                                                    <h6  >{declinereason[0]?.Comments}</h6>
                                                                </div>
                                                            </Popover>
                                                        </>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Approved' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }} >
                                                        <span className='status-approved'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Waiting For Approval' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                                                        <span className='status-waitingApproval'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                <TableCell >{row.CreatedBy}</TableCell>
                                                <TableCell >{new Date(row.CreatedDate).toDateString()}</TableCell>
                                                <TableCell style={{ display: 'flex', justifyContent: 'center' }} >
                                                    {
                                                        <PopupState variant="popper" popupId="demo-popup-popper">
                                                            {(popupState) => (
                                                                <div>
                                                                    <IconButton className='arrow-btn' {...bindToggle(popupState)}>
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <Popper {...bindPopper(popupState)} transition>
                                                                        {({ TransitionProps }) => (
                                                                            <ClickAwayListener onClickAway={popupState.close} >
                                                                                <Fade {...TransitionProps} timeout={350}>
                                                                                    <Paper>
                                                                                        <MenuList className={menuClasses.list} autoFocus >
                                                                                            {
                                                                                                row.StatusDescription !== 'In Progress' &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="View" placement='left-start'>
                                                                                                        <IconButton sx={{ marginRight: '0px' }} aria-label="delete" onClick={() => Actions(row, 'view')} className='tablebutton grey'>
                                                                                                            <VisibilityIcon fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Approve" placement='left-start'>
                                                                                                        <span>
                                                                                                            <IconButton aria-label="delete" disabled={!row.Approved} className='tablebutton success' onClick={() => Actions(row, 'approve')} >
                                                                                                                <DoneIcon color={!row.Approved ? 'disabled' : 'success'} fontSize='small' />
                                                                                                            </IconButton>
                                                                                                        </span>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Decline" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" className='tablebutton error' onClick={() => Actions(row, 'decline')} >
                                                                                                            <CancelIcon sx={{ color: 'red' }} fontSize='small' onClick={() => { dispatch(updateToast({ field: 'declineState' })); reasonFunc(); sessionStorage.setItem('sourceId', row.SourceId) }} />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && row.StatusDescription !== 'Declined') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Edit" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                                                                            <CreateIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert' && (row.StatusDescription === 'In Progress' || row.StatusDescription === 'Declined')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Edit" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                                                                            <CreateIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription === 'Approved' || row.StatusDescription === 'Waiting For Approval' || row.StatusDescription === 'Declined')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Delete" placement='left-start'>
                                                                                                        <span>
                                                                                                            <IconButton aria-label="delete" disabled={row.StatusDescription === 'Waiting For Approval'} onClick={() => setOpens(true)} className='tablebutton primary'>
                                                                                                                <DeleteIcon sx={{ color: (row.StatusDescription === 'Waiting For Approval') ? 'secondary' : 'red' }} fontSize='small' onClick={() => sessionStorage.setItem("Idsource", row.SourceId)} />
                                                                                                            </IconButton>
                                                                                                        </span>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription === 'Waiting For Approval')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Upload" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => uploadaprove(row.Approved, id)} className='tablebutton primary'>
                                                                                                            <AttachFileIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                        </MenuList>
                                                                                    </Paper>
                                                                                </Fade>
                                                                            </ClickAwayListener>
                                                                        )}
                                                                    </Popper>
                                                                </div>
                                                            )}
                                                        </PopupState>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        }
                                        {
                                            sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={id}
                                            >
                                                <TableCell >{row.Model}</TableCell>
                                                <TableCell >{row.Prefix}</TableCell>
                                                <TableCell >{row.SerialNumber || '--'}</TableCell>
                                                <TableCell >{row.FaultCode}</TableCell>
                                                <TableCell >{row.FalutCodeDescription}</TableCell>
                                                <TableCell >{row.SMCS?.join(',') || '--'}</TableCell>
                                                {row.StatusDescription === 'In Progress' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                                                        <span className='status-inprogress'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Declined' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }} >
                                                        <span className='status-declined'>{row.StatusDescription}</span>
                                                        <InfoOutlinedIcon className='info' aria-describedby={id} onClick={(e) => { handleClick(e, row.SourceId) }} />
                                                        <>
                                                            <Popover
                                                                id={id}
                                                                open={open}
                                                                anchorEl={anchorEl}
                                                                onClose={handleClose}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                            >
                                                                <div className='poppercontent'>
                                                                    <h5 >Reason</h5>
                                                                    <h6  >{declinereason[0]?.ReasonCodes_M_ReasonCode}</h6>

                                                                    <h5 style={{ marginTop: '10px' }}>Comment</h5>
                                                                    <h6  >{declinereason[0]?.Comments}</h6>
                                                                </div>
                                                            </Popover>
                                                        </>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Approved' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }} >
                                                        <span className='status-approved'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                {row.StatusDescription === 'Waiting For Approval' &&
                                                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                                                        <span className='status-waitingApproval'>{row.StatusDescription}</span>
                                                    </TableCell>
                                                }
                                                <TableCell >{row.CreatedBy}</TableCell>
                                                <TableCell >{new Date(row.CreatedDate).toDateString()}</TableCell>
                                                <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                                                    {
                                                        <PopupState variant="popper" popupId="demo-popup-popper">
                                                            {(popupState) => (
                                                                <div>
                                                                    <IconButton className='arrow-btn' {...bindToggle(popupState)}>
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <Popper {...bindPopper(popupState)} transition>
                                                                        {({ TransitionProps }) => (
                                                                            <ClickAwayListener onClickAway={popupState.close} >
                                                                                <Fade {...TransitionProps} timeout={350}>
                                                                                    <Paper>
                                                                                        <MenuList className={menuClasses.list} autoFocus >
                                                                                            {
                                                                                                row.StatusDescription !== 'In Progress' &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="View" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'view')} className='tablebutton grey'>
                                                                                                            <VisibilityIcon fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Approve" placement='left-start'>
                                                                                                        <span>
                                                                                                            <IconButton aria-label="delete" disabled={!row.Approved} onClick={() => Actions(row, 'approve')} className='tablebutton success'>
                                                                                                                <DoneIcon color={!row.Approved ? 'disabled' : 'success'} fontSize='small' />
                                                                                                            </IconButton>
                                                                                                        </span>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Decline" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" className='tablebutton error' fontSize='small' onClick={() => { dispatch(updateToast({ field: 'declineState' })); reasonFunc(); sessionStorage.setItem('sourceId', row.SourceId) }} >
                                                                                                            <CancelIcon fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && row.StatusDescription !== 'Declined') &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Edit" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                                                                            <CreateIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }

                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert' && (row.StatusDescription === 'In Progress' || row.StatusDescription === 'Declined')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Edit" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                                                                            <CreateIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription === 'Approved' || row.StatusDescription === 'Waiting For Approval' || row.StatusDescription === 'Declined')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Delete" placement='left-start'>
                                                                                                        <span>
                                                                                                            <IconButton aria-label="delete" disabled={row.StatusDescription === 'Waiting For Approval'} onClick={() => setOpens(true)} className='tablebutton primary'>
                                                                                                                <DeleteIcon sx={{ color: (row.StatusDescription === 'Waiting For Approval') ? 'secondary' : 'red' }} fontSize='small' onClick={() => sessionStorage.setItem("Idsource", row.SourceId)} />
                                                                                                            </IconButton>
                                                                                                        </span>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                            {
                                                                                                (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription === 'Waiting For Approval')) &&
                                                                                                <MenuItem sx={[{ justifyContent: 'center' }, { '&:hover': { backgroundColor: 'white' } }]}>
                                                                                                    <LightTooltip title="Upload" placement='left-start'>
                                                                                                        <IconButton aria-label="delete" onClick={() => uploadaprove(row.Approved, id)} className='tablebutton primary'>
                                                                                                            <AttachFileIcon color='primary' fontSize='small' />
                                                                                                        </IconButton>
                                                                                                    </LightTooltip>
                                                                                                </MenuItem>
                                                                                            }
                                                                                        </MenuList>
                                                                                    </Paper>
                                                                                </Fade>
                                                                            </ClickAwayListener>
                                                                        )}
                                                                    </Popper>
                                                                </div>
                                                            )}
                                                        </PopupState>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={apiResponce.viewList.length}
                labelRowsPerPage={"Show"}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} />

            <Modal
                open={toaster.declineState}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => dispatch(revertDec())}
            >
                <Box sx={style} className='decline-box'>
                    <div className='close-btn-modal'>
                        <Typography id="modal-modal-title1" variant="h6" component="h2">Decline</Typography>
                        <CloseIcon className='civ' onClick={() => dispatch(revertDec())} />
                    </div>
                    {/* <div>{declineReasonList}</div> */}

                    <TextField
                        id="outlined-select-currency"
                        select
                        label='Select Reason'
                        fullWidth
                    >
                        {
                            declineReasonList.map((row, id) => (
                                <MenuItem key={id} value={row.Reasons} onClick={() => setdecReason(row.Reasons)} >{row.Reasons}</MenuItem>
                            ))
                        }

                    </TextField>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <TextField id="outlined-basic" placeholder='Enter in Detail' multiline variant="outlined" value={commands} onChange={(e) => setCommands(e.target.value)} />

                    <div className='decline-btn'>
                        <Button variant="contained" size="medium" color="secondary" startIcon={<CloseIcon />} onClick={() => { setCommands(''); dispatch(revertDec()) }} >
                            No
                        </Button>
                        <Button variant="contained" size="medium" color="primary" startIcon={<DoneIcon />} onClick={() => decLine()}>
                            Yes
                        </Button>

                    </div>
                </Box>

            </Modal>
            <Modal
                open={opens}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete the entire data?
                    </Typography>
                    <div className='decline-btn'>
                        <Button variant="contained" size="medium" color="secondary" startIcon={<CloseIcon />} onClick={() => setOpens(false)} >
                            No
                        </Button>
                        <Button variant="contained" size="medium" color="primary" startIcon={<DoneIcon />} onClick={() => deleteAllData()} >
                            Yes
                        </Button>
                    </div>
                </Box>
            </Modal>

        </>
    )
}
// NOSONAR End

export default AidataTable