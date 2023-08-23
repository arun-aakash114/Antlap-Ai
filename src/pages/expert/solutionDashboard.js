import React, { useEffect } from 'react'
import Explayout from '../../components/expert/explayout'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import Filterform from '../../components/expert/filterform';
import AidataTable from '../../components/expert/AidataTable';
import { Container } from '@mui/system';
import { clearState } from '../../store/reducers/dataManageForm';


const SolutionDashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filterDrawer, setFilterDrawer] = React.useState(false)
    const [state, setState] = React.useState([])
    const [filterdata, setFilterData] = React.useState([]);
    const machineData = [
        {
            label: 'Non IoT',
        },
        {
            label: 'IoT',
        },
    ];



    useEffect(() => {
        sessionStorage.setItem('proType', sessionStorage.getItem("proType") ? sessionStorage.getItem("proType") : 'Non IoT');
        sessionStorage.setItem('cardPanel', `gr_resolution${0}`)
        setState([sessionStorage.getItem('proType')])
    }, [])



    const selectData = async (e) => {
        sessionStorage.setItem('proType', e.target.value);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const closeDrawer = (data) => {
        setFilterDrawer(!filterDrawer)
        setFilterData(data)
    }


    return (
        <Explayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <div className='box-header dt-mgmt'>
                    <h2 className="page-heding">AI Data - {state[0]} </h2>
                    <div className='tb-btns'>

                        <div className='dropdown-flex'>
                            <Typography variant="subtitle1" gutterBottom>
                                Equipment Type
                            </Typography>
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                defaultValue={sessionStorage.getItem('proType') ? sessionStorage.getItem('proType') : 'Non IoT'}
                                size="small"
                                SelectProps={{
                                    native: true,
                                }}
                                onClick={selectData}
                            >
                                {machineData.map((option) => (
                                    <option key={option.value} >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <Button variant="contained" size="medium" color="primary" onClick={() => { dispatch(clearState()); sessionStorage.removeItem('prefix'); navigate('/addSolution') }} startIcon={<AddIcon />}>
                            Add New
                        </Button>
                        {/* <Button variant="contained" size="medium" color="primary" startIcon={<LaunchIcon />}>
                        Export
                    </Button> */}
                        <Button className='ic-single' variant="contained" size="medium" color="secondary" onClick={() => setFilterDrawer(!filterDrawer)}>
                            <FilterAltIcon />
                        </Button>
                    </div>
                </div>
                <center>
                    <Card>
                        <CardContent>
                            <AidataTable filterdata={filterdata} />
                        </CardContent>
                    </Card>
                </center>

                <Drawer
                    sx={{
                        "& .MuiDrawer-paperAnchorRight": {
                            marginTop: '145px',
                            marginRight: '23px',
                            width: '350px',
                            borderRadius: '10px',
                            height: '65vh'
                        }
                    }}
                    anchor='right'
                    open={filterDrawer}
                    onClose={closeDrawer}
                >
                    <Filterform usedrawer={closeDrawer} />

                </Drawer>
            </Container>
        </Explayout>
    )
}

export default SolutionDashboard