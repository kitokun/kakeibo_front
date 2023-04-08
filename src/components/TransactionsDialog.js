import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';

import createTransactions from '../scripts/api/createTransactions';
import { MenuItem, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import fetchTransactionEntities from '../scripts/api/fetchTransactionEntities';

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

  const [transactionEntities, setTransactionEntities] = React.useState([]);
  React.useEffect(()=>{
    const get = async() => {
      const data = await fetchTransactionEntities();

      setTransactionEntities(data);
    };
    get();
    }, [])

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
         <Select
            value={values.destination}
            name='destination'
            id='destination'
            label="支払先"
            onChange={handleChange}         
          >
            {transactionEntities
              .filter(t => t.transaction_entity_type === 'destination')
              .map(t => (
                <MenuItem key={t.id} value={t.transaction_entity}>
                  {t.transaction_entity}
                </MenuItem>
              ))}
          </Select>
         <Select
            value={values.source}
            name='source'
            id='source'
            label="支払元"
            onChange={handleChange}         
          >
            {transactionEntities
              .filter(t => t.transaction_entity_type === 'source')
              .map(t => (
                <MenuItem key={t.id} value={t.transaction_entity}>
                  {t.transaction_entity}
                </MenuItem>
              ))}
          </Select>
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
