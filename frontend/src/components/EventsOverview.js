import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function EventsOverview({events}) {
    const eventsData = events
    //console.log(eventsData)
    //console.log(parseInt(claimsData[0].coverId))
    const covers = {
        "1" : "Coinbase",
        "2" : "FTX",
        "3" : "Kraken",
        "4" : "USDT"
    }
    const rootCause = {
        "1" : "Smart contract hack",
        "2" : "Governance",
        "3" : "front-end"
    }
    return (
        <div>
                <div>
                    <TableContainer component={Paper} sx={{ m: '50px', width: 'auto'}}>
                    <Table sx={{ minWidth: 50 }} size="small" aria-label="simple table" >
                        <TableHead style={{
                            backgroundColor:"#235680",
                            }}>
                        <TableRow>
                            <TableCell style={{color:"white"}} align="center">Hacked asset</TableCell>
                            <TableCell style={{color:"white"}} align="center">Lost assets amount USD</TableCell>
                            <TableCell style={{color:"white"}} align="center">Root cause</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {eventsData?.map((row) => (
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{covers[row.coverId.toString()]}</TableCell>
                            <TableCell align="center">{row.lossAmount.toString()}</TableCell>
                            <TableCell align="center">{rootCause[row.rootCauseId.toString()]}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            <div>
            </div>
        </div>
    )}
    ;