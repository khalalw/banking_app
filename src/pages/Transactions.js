import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

const accounts = [
  {
    id: 1,
    name: "Checking"
  },
  {
    id: 2,
    name: "Savings"
  }
];

export default function Transactions(props) {
  const classes = useStyles();

  const [fromAccount, setFromAccount] = React.useState("");
  const [toAccount, setToAccount] = React.useState("");
  const [transferType, setTransferType] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(setMinEndDate());

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }

  function handleFromAcctChange(event) {
    setFromAccount(event.target.value);
  }

  function handleToAcctChange(event) {
    setToAccount(event.target.value);
  }

  function handleTranferChange(event) {
    setTransferType(event.target.value);
  }

  function setMinEndDate() {
    var result = new Date(selectedDate);
    result.setDate(result.getDate() + 1);
    return result;
  }

  return (
    <div>
      <Paper className={classes.root}>
        <form className={classes.root} autoComplete="off">
          <Typography variant="h4" component="h4">
            Transfer Funds
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl} fullWidth={true}>
                <InputLabel htmlFor="from-acct">From Account:</InputLabel>
                <Select
                  value={fromAccount}
                  onChange={handleFromAcctChange}
                  inputProps={{
                    name: "from-acct",
                    id: "from-acct"
                  }}
                >
                  {accounts.map((a, index) => {
                    return (
                      <MenuItem value={a.id} key={index}>
                        {a.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Transfer Type</FormLabel>
                <RadioGroup
                  aria-label="transfer type"
                  name="transfer"
                  className={classes.group}
                  value={transferType}
                  onChange={handleTranferChange}
                >
                  <FormControlLabel
                    value="once"
                    control={<Radio />}
                    label="One-Time Transfer"
                  />
                  <FormControlLabel
                    value="recurring"
                    control={<Radio />}
                    label="Recurring Transfer"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl} fullWidth={true}>
                <InputLabel htmlFor="to-acct">To Account:</InputLabel>
                <Select
                  value={toAccount}
                  onChange={handleToAcctChange}
                  inputProps={{
                    name: "to-acct",
                    id: "to-acct"
                  }}
                >
                  {accounts.map(a => {
                    return <MenuItem value={a.id}>{a.name}</MenuItem>;
                  })}
                </Select>
                <TextField
                  id="standard-with-placeholder"
                  label="Amount"
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {transferType === "once" ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Tranfser Date"
                    format="M/d/yyyy"
                    minDate={new Date()}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              ) : transferType === "recurring" ? (
                <Grid container item>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="M/d/yyyy"
                        minDate={new Date()}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="M/d/yyyy"
                        minDate={setMinEndDate()}
                        value={endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
              <TextField
                id="standard-textarea"
                label="Memo (Optional)"
                multiline
                className={classes.textField}
                margin="normal"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
