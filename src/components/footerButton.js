import React, { useState } from 'react'
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '../store/reducers/knowledgeBaseForm';
import {
    formSubmit,
    webAISearchHistory,
    dataNumber,
    aiSearch,
    aiDatanumber,
    customerAiSearch,
    customerAiDatanumber
} from '../service/apiServices/knoledgeBaseService'
import { useNavigate } from 'react-router-dom';
import { updateToast } from '../store/reducers/toasters'
import { updateResponce } from '../store/reducers/apiResponces'


function FooterButton() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [aisearch] = useState(true)
    let formData = useSelector((state) => state.knowledgeForm);
    let { serialNumber, modelPrefix, modelPrefixStatus, serialNoRange, faultCode, problemCode, smcsCode, complaintDescription } = formData;
    const comData = formData.complaintDescription.length || formData.smcsCode.length
    const cleardata = () => {
        dispatch(resetForm());
        // window.location.reload(true)
    }
// NOSONAR Start
    const handleSubmit = async () => {

        if (!faultCode && !problemCode && !complaintDescription) {
            dispatch(updateToast({ field: 'valid' }));
        } else {
            dispatch(updateToast({ field: 'loader' }));

            let responce = await formSubmit(formData);
            if (responce.data.length === 0) {
                dispatch(updateToast({ field: 'reasonopen' }))
            } else {
                if (complaintDescription) {
                    dispatch(updateResponce({
                        field: 'directsearchlength', value: {
                            probcode: responce.data.probcode,
                            smcscode: responce.data.smcscode,
                        }
                    }))

                } else {
                    dispatch(updateResponce({ field: 'directsearchlength', value: responce.data.complaintDesc }))

                }
                if (responce.data.length !== 0) {
                    await webAISearchHistory(formData);
                    let complaintDescdata = faultCode.length !== 0 ? responce.data.faultCodeDesc : responce.data.complaintDesc;
                    if (responce.data.length === 1) {
                        let res = await dataNumber(responce.data.length, formData);
                        if (res.data.results.length !== 0) {
                            const results = res.data.results;

                            let val = {
                                serialno: serialNumber?.toUpperCase() || '',
                                modelprefix: modelPrefix || '',
                                range: serialNoRange || '',
                                smcs: smcsCode || '',
                                faultcode: faultCode?.toUpperCase() || '',
                                problemcode: problemCode || '',
                                length: responce.data.length,
                                results: results,
                                CommonResolutionnumber: 1,
                                complaintDesc: complaintDescdata.length > 0 ? complaintDescdata[0] : "",
                                comdes: complaintDescdata.length > 0 ? complaintDescdata[0] : "",
                                probcode: responce.data.probcode || "",
                                smcscode: responce.data.smcscode || "",
                                probleminwords: complaintDescription || "",
                            };
                            navigate('/result', { state: val })

                        } else {
                            dispatch(updateToast({ field: 'match' }))
                        }
                    } else {

                        let val = {
                            serialno: serialNumber?.toUpperCase() || '',
                            modelprefix: modelPrefix || '',
                            range: serialNoRange || '',
                            smcs: smcsCode || '',
                            faultcode: faultCode?.toUpperCase() || '',
                            problemcode: problemCode || '',
                            length: responce.data.length,
                            viewall: true,
                            serialnumber: modelPrefixStatus,
                            complaintDesc: complaintDescdata,
                            probcode: responce.data.probcode || "",
                            smcscode: responce.data.smcscode || "",
                            probleminwords: complaintDescription || '',
                        }
                        navigate('/searchresult', { state: val });
                    }

                }
            }
            dispatch(updateToast({ field: 'revertLoader' }));
        }

        // dispatch(resetForm())

    }
    // NOSONAR End
    const aisearchfun = async () => {
        if (!faultCode && !problemCode && !complaintDescription) {
            dispatch(updateToast({ field: 'valid' }));
        } else {
            dispatch(updateToast({ field: 'loader' }));
            let response = formData.complaintDescription.length !== 0 ? await customerAiSearch(formData) : await aiSearch(formData);
            let complaintDescdata = response.data.complaintDesc;

            if (response.data.length !== 0) {
                dispatch(updateResponce({ field: 'aisearchlength', value: complaintDescdata }))
                let lengthdata = response.data.length;
                if (response.data.length === 1) {
                    let res = formData.complaintDescription.length !== 0 ? await customerAiDatanumber(response.data.length, formData) : await aiDatanumber(response.data.length, formData);
                    let results = res.data.results;
                    if (results) {
                        let val = {
                            serialno: serialNumber?.toUpperCase() || '',
                            modelprefix: modelPrefix || '',
                            range: serialNoRange || '',
                            smcs: smcsCode || '',
                            faultcode: faultCode?.toUpperCase() || '',
                            problemcode: problemCode || '',
                            length: lengthdata,
                            results: results,
                            CommonResolutionnumber: 1,
                            ai: "true",
                            complaintDesc: complaintDescdata.length > 0 ? complaintDescdata[0] : "",
                            comdes: complaintDescdata.length > 0 ? complaintDescdata[0] : "",
                            probleminwords: complaintDescription || '',
                        };
                        navigate('/result', { state: val })
                    }
                } else {
                    let val = {
                        serialno: serialNumber?.toUpperCase() || '',
                        modelprefix: modelPrefix ||'',
                        range: serialNoRange || '',
                        smcs: smcsCode || '',
                        faultcode: faultCode?.toUpperCase() || '',
                        problemcode: problemCode || '',
                        length: lengthdata,
                        viewall: true,
                        ai: "true",
                        serialnumber: modelPrefix,
                        complaintDesc: complaintDescdata,
                        probleminwords: complaintDescription || '',
                    };
                    navigate('/searchresult', { state: val })
                }
            } else {
                dispatch(updateToast({ field: 'match' }));
                cleardata();
            }
            dispatch(updateToast({ field: 'reasonRevert' }))
            dispatch(updateToast({ field: 'revertLoader' }))

        }
    }

    return (
        <div>
            <Button
                sx={{ mr: 1 }}
                type="submit"
                size="small"
                variant="contained"
                className="btn-secondary"
                onClick={cleardata}
            >
                <CloseIcon /> Clear
            </Button>


            <Button
                sx={{ mr: 1 }}
                type="submit"
                variant="contained"
                className='btn-primary'
                onClick={handleSubmit}
            >
                <SearchIcon />Search
            </Button>

            <Button
                type="submit"
                variant="contained"
                onClick={aisearchfun}
                disabled={comData !== 0 ? !aisearch : aisearch}
            >
                <SearchIcon />AI Search
            </Button>
        </div>
    )
}

export default FooterButton