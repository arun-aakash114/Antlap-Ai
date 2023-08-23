import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BomCrud = ({ bomDatas, supportDoc, editcall, canedit }) => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Parts No.</TableCell>
          <TableCell align="right">Part Description</TableCell>
          <TableCell align="right">Qty</TableCell>
          <TableCell align="right">Supporting Docs</TableCell>
          <TableCell align="right">Notes</TableCell>
          {canedit && <TableCell align="right">Actions </TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {bomDatas.map((row, index) => (
          <TableRow
            key={row?.BOMPartId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.partno}
            </TableCell>
            <TableCell align="right">{row.desc}</TableCell>
            <TableCell align="right">{row.qty}</TableCell>
            <TableCell align="right">{supportDoc[index]}</TableCell>
            <TableCell align="right">{row.notes}</TableCell>
            {canedit && <TableCell align="right"><button onClick={() => editcall(row, index)}>Edit</button></TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BomCrud