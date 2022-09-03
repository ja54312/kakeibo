import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { TextField } from "@mui/material";

export function Date() {
  const [value, setValue] = useState(dayjs());

  console.log(value)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["month","year"]}
        label="Year and Month"
        minDate={dayjs("2012-03-01")}
        maxDate={dayjs("2023-06-01")}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
}
