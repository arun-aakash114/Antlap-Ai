import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Explayout from '../../components/expert/explayout';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CreateGeneralResolution from '../../components/expert/createGeneralResolution';
import EditFormBom from '../../components/expert/editformBom';
import { useDispatch } from 'react-redux';
import { getCarddataforEdit } from '../../service/apiServices/resultServices';
import { updateData } from '../../store/reducers/cardData';
import AddFormBom from '../../components/expert/addformBom';

const Editresolutions = (props) => {
    let location = useLocation();
    let dispatch = useDispatch();
    const [BOM, setBom] = useState([]);

    
    useEffect(() => {
        async function fetchData() {
            if (location.state.type == 'General') {
                let Generalresponse = await getCarddataforEdit(location.state.type, location.state.value)
                sessionStorage.setItem("res", Generalresponse.data.data[0].Resolutions);
                sessionStorage.setItem('noteData', Generalresponse.data.data[0].Note)
                let data = Generalresponse.data.data
                let supportingDocuments = [];
                let reqsupportingDocuments = [];

                if (data[0].CommonTools.length == 0) {
                    data[0].CommonTools = [{ checked: false, PartsNo: '', PartsDescription: '', Quantity: '' }]
                    data[0]["PartNumberSupportingDocument"] = supportingDocuments[0]
                } else {
                    for (let item of data[0].CommonTools) {
                        item["Quantity"] = item["Qty"];
                        delete item["Qty"]; // delete the old key "Qty"
                        delete item["SourceFiles_SourceFileId"];
                        // Add the new key "checked" with value false to each object
                        item["checked"] = false;
                        supportingDocuments.push(item["PartNumberSupportingDocument"]);
                        delete item["PartNumberSupportingDocument"];

                    }
                    data[0]["PartNumberSupportingDocument"] = supportingDocuments[0]
                }
                data[0]["PartNumberSupportingDocumentRspl"] = reqsupportingDocuments[0]

                if (data[0].RequiredSpecialTools.length == 0) {
                    data[0].RequiredSpecialTools = [{ checked: false, PartsNo: '', PartsDescription: '', Quantity: '' }]
                    data[0]["PartNumberSupportingDocumentRspl"] = reqsupportingDocuments[0]
                } else {
                    for (let items of data[0].RequiredSpecialTools) {
                        items["Quantity"] = items["Qty"];
                        delete items["Qty"]; // delete the old key "Qty"
                        delete items["SourceFiles_SourceFileId"];
                        // Add the new key "checked" with value false to each object
                        items["checked"] = false;
                        reqsupportingDocuments.push(items["PartNumberSupportingDocument"]);
                        delete items["PartNumberSupportingDocument"];

                    }
                    data[0]["PartNumberSupportingDocumentRspl"] = reqsupportingDocuments[0]
                }
                data[0]["PartNumberSupportingDocument"] = supportingDocuments[0]

                dispatch(updateData({ value: data }))
            } else if (location.state.type == 'BOM') {
                let BOMresponse = await getCarddataforEdit(location.state.type, location.state.value, location.state.path)
                setBom(BOMresponse.data.data)
            }
        }
        if (location.state.process === 'edit') {
            fetchData();
        }
    }, [])

    return (
        <Explayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <div className='crt-general-resolution'>                    
                    <Box className='contact-info'>
                        <Card className='model-cart'>
                            <CardContent sx={{ overflow: 'overlay', height: '100%' }}>
                                <div className="rowdata">
                                    <ul>
                                        <li>
                                            <div className='iconwrap'></div> <div className='det_right'>
                                                <Typography className='font-14'>Model :</Typography>
                                                <Typography className='text-bold'>{location.state.data.model} </Typography>
                                            </div>
                                        </li>

                                        <li>
                                            <div className='iconwrap'> </div>

                                            <div className='det_right'>
                                                <Typography className='font-14'>Serial Prefix :</Typography >
                                                <Typography className='text-bold'>{location.state.data.Prefix}</Typography>

                                            </div>

                                        </li>

                                        <li>

                                            <div className='iconwrap'> </div>

                                            <div className='det_right'>
                                                <Typography className='font-14'>Serial No.Range :</Typography>
                                                {(location.state.data && location.state.data.serialNoRange) ?
                                                    <Typography className='text-bold'>{location.state.data.serialNoRange}</Typography>
                                                    :
                                                    <div>
                                                        <Typography className='text-bold'>No data available</Typography>
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                        {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Fault Code :</Typography>
                                                    {
                                                        location.state.data.faultCode.split(',').map((faultcode, ids) =>
                                                            <Typography key={ids} className='text-bold'>{faultcode}</Typography>
                                                        )
                                                    }

                                                    <b></b> </div>
                                            </li><li>

                                                    <div className='iconwrap'> </div>

                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Fault Code Description :</Typography>
                                                        {(location.state.data && location.state.data.faultDesc) ?
                                                            location.state.data.faultDesc.split(',').map((data, ids) => (
                                                                <Typography key={ids} className='text-bold'>{data}</Typography>
                                                            ))
                                                            :
                                                            <div className='text-bold'>No data available</div>
                                                        }
                                                    </div>
                                                </li></>}

                                        {sessionStorage.getItem('proType') === 'Non IoT' &&
                                            <>
                                                <li>

                                                    <div className='iconwrap'> </div>
                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Problem / Description Code :</Typography>
                                                        {
                                                            location.state.data.ProblemCode[0].split(',').map((data, ids) => (

                                                                <Typography key={ids} className='text-bold'>{data}</Typography>
                                                            ))
                                                        }
                                                    </div>
                                                </li>
                                            </>
                                        }
                                        <li>

                                            <div className='iconwrap'> </div>
                                            <div className='det_right'>
                                                <Typography className='font-14'>SMCS Component Code :</Typography>
                                                {(location.state.data && location.state.data.SMCScode[0]) ?
                                                    location.state.data.SMCScode[0].split(',').map((data, ids) => (
                                                        <Typography key={ids} className="text-bold">
                                                            {data}{" "}
                                                        </Typography>))
                                                    :
                                                    <div className='text-bold'>No data available</div>
                                                }
                                            </div>
                                        </li>
                                        {sessionStorage.getItem('proType') === 'Non IoT' && <li>

                                            <div className='iconwrap'> </div>
                                            <div className='det_right'>
                                                <Typography className='font-14'>Complaint Description :</Typography>
                                                <Typography className='text-bold'>{location.state.data.complaintDes} </Typography>

                                            </div>
                                        </li>}

                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                        <div className='resolution-path'>
                            {location.state.type === 'General' && <CreateGeneralResolution cardname={location.state.cardname} apiname={location.state.apiname} paramdatas={location.state.data} sourcefileid={location.state.value} />}
                            {location.state.type === 'BOM' && BOM.length !== 0 && <EditFormBom bomdata={BOM} paramdatas={location.state.data} />}
                            {location.state.type === 'BOM' && BOM.length === 0 && <AddFormBom paramdatas={location.state.data} path={location.state.path} apiname={location.state.apiname} sourcefileid={location.state.value} />}
                        </div>
                    </Box>
                </div>
            </Container>
        </Explayout>
    )
}

export default Editresolutions;