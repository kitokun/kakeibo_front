import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import createTransactions from '../scripts/api/createTransactions';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: Number(values.value),
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
      decimalScale={0}
      suffix='円'
    />
  );
});

export default function TransactionsDialog() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    amount: 0,
    nominal: '',
    destination: '',
    source: '',
    description: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    createTransactions(
      values.amount, 
      values.nominal,
      values.destination,
      values.source,
      values.description
    );
    setOpen(false);
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        取引登録
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            value={values.nominal}
            onChange={handleChange}
            name='nominal'
            id='nominal'
            label='名目'
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            value={values.amount}
            onChange={handleChange}
            name='amount'
            id='amount'
            label='金額'
            variant='standard'
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            value={values.destination}
            onChange={handleChange}
            name='destination'
            id='destination'
            label='支払先'
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            value={values.source}
            onChange={handleChange}
            name='source'
            id='source'
            label='支払元'
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            value={values.description}
            onChange={handleChange}
            name='description'
            id='description'
            label='説明'
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={submit}>送信</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
