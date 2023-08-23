import React, { useState } from 'react'
import { Grid, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddEquipForm = (props) => {
  let navigate = useNavigate()
  const [equipmentData, setEquipmentData] = useState({
    EquipmentSerialNo: "",
    EquipmentMake: "",
    EquipmentDescription: "",
    EquipmentPurchaseDate: "",
    DateOfCommissioning: "",
    EquipmentModel: "",
    EquipmentPrefix: "",
    EquipStatus: "",
    SerialNumError: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({ ...equipmentData, [name]: value })
  }


  //______________________ Validation _________________________

  const validateSerialNum = () => {
    const serialNumPattern = /[a-zA-Z0-9]{8,}$/;
    if (!serialNumPattern.test(equipmentData.EquipmentSerialNo)) {
      setEquipmentData({ ...equipmentData, SerialNumError: '"Serial Number must be 8 "' });
    } else {
      setEquipmentData({ ...equipmentData, SerialNumError: '' });
    }
  };



  //_________________________ Post Equipment ______________________

  const handleSave = () => {

    if (props.equipData) {

      const payload = {

        "EquipmentSerialNo": equipmentData.EquipmentSerialNo,
        "EquipmentDescription": equipmentData.EquipmentDescription,
        "EquipmentPrefix": equipmentData.EquipmentPrefix,
        "EquipmentModel": equipmentData.EquipmentModel,
        "EquipmentMake": equipmentData.EquipmentMake,
        "EquipmentPurchaseDate": equipmentData.EquipmentPurchaseDate,
        "TenantId": localStorage.getItem('TenantId'),
        "DateOfCommissioning": equipmentData.DateOfCommissioning

      };

      // create an updated user object with the new user type

      try {
        Axios({
          method: "put",
          url: ` ${backEndDomain}/masterapi/master/updateequipmentmaster`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
        })
          .then(function (response) {
            navigate('/manageequips')
          })
          .catch(function (response) {
            // NOSONAR Start
            //   if(response.response.status == 422){
            //   }
            // NOSONAR End
          });
      } catch (err) {
      }

    } else {

      validateSerialNum();

      if (equipmentData.EquipmentSerialNo !== '') {
        const payload = {

          "EquipmentSerialNo": equipmentData.EquipmentSerialNo,
          "EquipmentDescription": equipmentData.EquipmentDescription,
          "EquipmentPrefix": equipmentData.EquipmentPrefix,
          "EquipmentModel": equipmentData.EquipmentModel,
          "EquipmentMake": equipmentData.EquipmentMake,
          "EquipmentPurchaseDate": equipmentData.EquipmentPurchaseDate,
          "TenantId": localStorage.getItem('TenantId'),
          "DateOfCommissioning": equipmentData.DateOfCommissioning

        };
// NOSONAR Start
        // create an updated user object with the new user type
// NOSONAR End
        try {
          Axios({
            method: "post",
            url: `${backEndDomain}/masterapi/master/create`,
            data: payload,
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("UserToken"),
            },
          })
            .then(function (response) {
              
            })
            .catch(function (response) {
              // NOSONAR Start
              //   if(response.response.status == 422){
              //   }
              // NOSONAR End
            });
        } catch (err) {
        }
      }

    }




  }






  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Serial Number</InputLabel>

            <TextField
              placeholder="Type Here"
              variant="outlined"
              size="small"
              type="text"
              name="EquipmentSerialNo"
              value={equipmentData.EquipmentSerialNo}
              onChange={handleChange}
              onBlur={validateSerialNum}
              disabled={props.equipData}
            />
            {equipmentData.SerialNumError && (
              <Typography color="error">
                {equipmentData.SerialNumError}
              </Typography>
            )}

          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Equipment Make</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentMake"
                value={equipmentData.EquipmentMake}
                onChange={handleChange}
              />
            </Item>
          </Grid>


          <Grid item xs={12} md={12}>
            <InputLabel className='input'>Equipment Description</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentDescription"
                value={equipmentData.EquipmentDescription}
                onChange={handleChange}
              />
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Model</InputLabel>
            <Item>
              <TextField

                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentModel"
                value={equipmentData.EquipmentModel}
                onChange={handleChange}
              />
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Prefix</InputLabel>
            <Item>
              <TextField

                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentPrefix"
                value={equipmentData.EquipmentPrefix}
                onChange={handleChange}
              />
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Purchase Date</InputLabel>
            <Item>
              <TextField

                placeholder="Type Here"
                variant="outlined"
                size="small"
                type="date"
                // NOSONAR Start
                // InputProps={{
                //   endAdornment: <InputAdornment position="end"><CalendarMonthIcon/></InputAdornment>,
                // }}
                // NOSONAR End
                name="EquipmentPurchaseDate"
                defaultValue={equipmentData.EquipmentPurchaseDate}
                value={equipmentData.EquipmentPurchaseDate}
                onChange={handleChange}
              />
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className='input'>Commissioning Date</InputLabel>
            <Item>
              <TextField

                placeholder="Type Here"
                variant="outlined"
                size="small"
                type="date"
                name="DateOfCommissioning"
                value={equipmentData.DateOfCommissioning}
                onChange={handleChange}
                disabled={props.equipData ? (props.equipData.EquipmentPurchaseDate ? false : true) : (equipmentData.EquipmentPurchaseDate ? false : true)}
              />
            </Item>
          </Grid>
        </Grid>
        <Box className="cs-btn btn-mrgn-20">
          <Stack spacing={2} direction="row">
            <Button variant="outlined">Clear</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </Stack>
        </Box>


      </Box>
    </>
  )
}

export default AddEquipForm
