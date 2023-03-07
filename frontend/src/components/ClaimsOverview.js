import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function ClaimsOverview({claims}) {
    const claimsData = claims
    //console.log(claimsData)
    //console.log(parseInt(claimsData[0].coverId))
    //Claims status 0 = submitted-FirstClaim, 1 = submitted-ClassAction, 2 = Rejected, 3 = Accepted
    const covers = {
        "1" : "Coinbase",
        "2" : "FTX",
        "3" : "Kraken",
        "4" : "USDT"
    }
    const claimsStatus = {
        "1" : "First Claim",
        "2" : "ClassAction",
        "3" : "Accepted",
        "4" : "Rejected"
    }
    const insurers = {
        "1" : "Nexus Mutual",
        "2" : "InsurAce",
        "3" : "Ease"
    }

    
    return (
        <div>
                <div>
                    <TableContainer component={Paper} sx={{ m: '50px', width: 'auto'}}>
                    <Table sx={{ minWidth: 50 }} size="small" aria-label="simple table" >
                        <TableHead style={{
                            backgroundColor:"#235680",
                            }}>
                        <TableRow
                        >
                            <TableCell style={{color:"white"}} align="center">Insured asset</TableCell>
                            <TableCell style={{color:"white"}} align="center">Insurer</TableCell>
                            <TableCell style={{color:"white"}} align="center">Address client</TableCell>
                            <TableCell style={{color:"white"}} align="center">Submission time</TableCell>
                            <TableCell style={{color:"white"}} align="center">Claim status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {claimsData?.map((row, i) => (
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">{covers[row.coverId.toString()]}</TableCell>
                            <TableCell align="center">{insurers[row.insurerId.toString()]}</TableCell>
                            <TableCell align="center">{row.coverBuyer}</TableCell>
                            <TableCell align="center">{Date(row.submissionTime.toString()*1000)}</TableCell>
                            <TableCell align="center">{claimsStatus[row.status.toString()]}</TableCell>
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