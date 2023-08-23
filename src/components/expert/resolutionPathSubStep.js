import React from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch } from 'react-redux';
import { onlyNumbers } from './helper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ResolutionPathSubStep = (props) => {
    let dispatch = useDispatch()


    return (
        <div className='resol_wrap'>
            <div className='resol_left'>
                {props.iconName === `gr_resolution${props.index}` &&
                    <div className="line-sp">
                        <typography  className="typography">General Resolution</typography>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Type here"
                            name="Resolutions"
                        // value={row.generalRes}
                        // onChange={(e) => Dispatch(pathDataChange({ sollutionIndex: index, stepIndex: i, val: e.target.value, field: "generalRes" }))}

                        />
                    </div>
                }
                {props.iconName === `gr_common_tools${props.index}` &&
                    <div className="line-sp">

                        <div className='inner-table-header'>
                            <Typography>Common Tools</Typography>
                            <div className='right'>
                                <Button
                                    variant="text"
                                    component="label"
                                >
                                    <AttachFileIcon
                                        fontSize='small'
                                    /> &nbsp; Upload Document
                                    <input
                                        type="file"
                                        hidden
                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                    // onChange={(e) => Dispatch(addDocument({ field: 'commonToolsDoc', data: { resType: 'resolutionPath', resolutionIndex: index, cardIndex: i, val: e.target.files[0] } }))}
                                    />
                                </Button>
                                <Button className='text-light' variant="text" onClick={() => dispatch(addmoreInCommonTools({ sollutionIndex: index, stepIndex: i }))} startIcon={<AddIcon />}>Add More</Button>
                                <IconButton className='bg-danger' onClick={() => dispatch(deleteCommonTools({ sollutionIndex: index, stepIndex: i }))} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                        </div>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>Parts No.</StyledTableCell>
                                        <StyledTableCell >Parts Description</StyledTableCell>
                                        <StyledTableCell >Quantity</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {resolutionPath[index][0].step[i].commonTools.map((row, rowIndex) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell>
                                                <Checkbox {...label} checked={resolutionPath[index][0].step[i].commonTools[rowIndex].checked} onClick={(e) => Dispatch(checkboxclick({ sollutionIndex: index, stepIndex: i, lineIndex: rowIndex, val: e.target.checked }))} />
                                            </StyledTableCell>

                                            <StyledTableCell >
                                                <FormControl variant="standard">
                                                    <BootstrapInput placeholder='Type here' id="bootstrap-input" name="PartsNo" autoFocus={row.partNo ? true : false} value={row.partNo} onChange={(e) => Dispatch(commonToolsChange({ sollutionIndex: index, stepIndex: i, lineIndex: rowIndex, val: e.target.value, field: "partNo" }))} />
                                                </FormControl>
                                            </StyledTableCell>

                                            <StyledTableCell >
                                                <FormControl variant="standard">
                                                    <BootstrapInput placeholder='Type here' id="bootstrap-input" name="PartsDescription" autoFocus={row.partDesc ? true : false} value={row.partDesc} onChange={(e) => Dispatch(commonToolsChange({ sollutionIndex: index, stepIndex: i, lineIndex: rowIndex, val: e.target.value, field: "partDesc" }))} />
                                                </FormControl>
                                            </StyledTableCell>

                                            <StyledTableCell >
                                                <FormControl variant="standard">
                                                    <BootstrapInput placeholder='Type here' id="bootstrap-input" name="Quantity" autoFocus={row.qty ? true : false} value={row.qty} onKeyPress={(e) => {
                                                        const regex = /^\d+$/;
                                                        const { key } = e;
                                                        if (!regex.test(key)) {
                                                            e.preventDefault();
                                                        }
                                                    }} onChange={(e) => Dispatch(commonToolsChange({ sollutionIndex: index, stepIndex: i, lineIndex: rowIndex, val: e.target.value, field: "qty" }))}
                                                    onPaste={(e) => onlyNumbers(e)}  />
                                                </FormControl>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div className='attachments'>
                            <Stack direction="row" spacing={1}>
                                {documents.commonToolsDoc.map((row) => (
                                    (row.resType === 'resolutionPath' && row.cardIndex === i && row.resolutionIndex === index) &&

                                    <Chip label={row.val.name} variant="filled" />

                                ))}
                            </Stack>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ResolutionPathSubStep