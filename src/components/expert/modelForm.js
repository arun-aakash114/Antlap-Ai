import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { updateForm } from "../../store/reducers/dataManageForm";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import {
  modellist,
  prefixlist,
} from "../../service/apiServices/aisourceCreation";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Unstable_Grid2";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ModelForm = (props) => {

  const [modelList, setModelList] = React.useState([]);
  const [selectOpen, setSelectOpen] = React.useState(false);
  let dispatch = useDispatch();
  let formData = useSelector((state) => state.dataForm);
  const handleSearch = async (event) => {
    dispatch(updateForm({ field: "serial_number", value: event.target.value }));
    if (event.target.value.length !== 0) {
      let res = await modellist(event.target.value);
      if (res.code === 200) {
        setModelList(res.data);
        setPersonName([]);
      }
    } else {
      setModelList([]);
      setPrefixlist([]);
      setPersonName([]);
    }
  };

  const [personName, setPersonName] = React.useState([]);
  const [prefixList, setPrefixlist] = React.useState([]);
  const [prefixFocus, setPrefixFocus] = React.useState(false);
  const prefixSelection = async (model) => {
    if (model.length !== 0) {
      dispatch(updateForm({ field: "serial_number", value: model }));
      let res = await prefixlist(model);
      if (res.code === 200) {
        setPrefixlist(res.data);
        setPersonName([]);
        setPrefixFocus(true);
        setSelectOpen(true)
      }
    } else {
      setPrefixlist([])
      setPersonName([]);
    }
  };
  useEffect(() => {
    setPersonName([sessionStorage.getItem('prefix')])
    async function fetchData() {
      if (props.canedit == "edit") {
        let res = await modellist(formData.serialNumber);
        if (res.code === 200) {
          setModelList(res.data);
          setPersonName([formData.modelPrefix[0]]);
        }
      } else {
        setPersonName([]);
        setModelList([]);
      }
    }
    fetchData();
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    sessionStorage.setItem('prefix', typeof value === "string" ? value.split(",") : value)
    dispatch(updateForm({ field: "model_prefix", value: value }));
  };
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Autocomplete
            freeSolo
            id="outlined-basic"
            disableClearable
            variant="outlined"
            Value={formData.serialNumber}
            options={modelList.map((row) => row.EquipmentModel)}
            onChange={(e, v) => prefixSelection(v)}
            onClose={(e, reason) => {
              if (reason === "selectOption" && e.target.innerText === formData.serialNumber) {
                prefixSelection(e.target.innerText)
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="autoCompleteText"
                required
                onMouseDownCapture={(e) => e.stopPropagation()}
                onChange={(e) => handleSearch(e)}
                fullWidth
                label="Model"
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <FormControl
              variant="outlined"
              margin={"1"}
              style={{ width: "100%", marginBottom: 25 }}
            >
              <InputLabel id="demo-multiple-checkbox-label">
                Serial Prefix
              </InputLabel>

              <Select
                open={selectOpen}
                onClose={() => setSelectOpen(false)}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                // label='Prefix'
                label="Serial Prefix"
                className="SelectPrefix"
                value={personName}
                defaultValue={formData.modelPrefix[0]}
                onChange={handleChange}
                input={<OutlinedInput
                  label="Serial Prefix"
                  onClick={() => {
                    if (modelList.length !== 0) {
                      setSelectOpen(true)
                    }
                  }}
                />}
                renderValue={(selected) => selected.join(",")}
                MenuProps={MenuProps}
                autoFocus={prefixFocus}
              >
                {prefixList.map((name, id) => (
                  <MenuItem key={id} value={name.EquipmentPrefix}>
                    <Checkbox onChange={(e) =>{
                      if (e.target.checked) {
                        setSelectOpen(false)
                      }
                    }}
                      checked={personName.indexOf(name.EquipmentPrefix) > -1}
                    />
                    <ListItemText primary={name.EquipmentPrefix} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Serial No. Range"
            variant="outlined"
            value={formData.serialNoRange}
            onChange={(e) =>
              dispatch(
                updateForm({ field: "serial_no_range", value: e.target.value })
              )
            }
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ModelForm;