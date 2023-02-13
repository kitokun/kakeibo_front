import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';

import submitNewTransactionEntity from '../scripts/api/createNewTransactionEntity'

import { MenuItem, TextField } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransactionsDialog() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    transactionEntity: '',
    transactionEntityType: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    submitNewTransactionEntity(values.transactionEntity, values.transactionEntityType);
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
        取引主体登録
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Select
            value={values.transactionEntityType}
            name='transactionEntityType'
            id='transaction-entity-type'
            label="登録項目"
            onChange={handleChange}         
          >
            <MenuItem value={"source"}>支払い元</MenuItem>
            <MenuItem value={"destination"}>支払い先</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin='dense'
            value={values.transactionEntity}
            onChange={handleChange}
            name='transactionEntity'
            id='transaction-entity'
            label="取引主体"
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
