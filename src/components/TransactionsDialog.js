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

  const [errors, setErrors] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrors({});
    setOpen(false);
  };


  const validateInputs = () => {
    const { amount, nominal, destination, source } = values;
    const errors = {};
    let isValid = true;

    if (!nominal.trim()) {
      errors.nominal = '名目を入力してください';
      isValid = false;
    }
    if (amount <= 0) {
      errors.amount = '金額を正の整数で入力してください';
      isValid = false;
    }
    if (!destination) {
      errors.destination = '支払先を選択してください';
      isValid = false;
    }
    if (!source) {
      errors.source = '支払元を選択してください';
      isValid = false;
    }
    
    return { isValid, errors };
  };

  const submit = () => {
    const { isValid, errors } = validateInputs();
    
    if (!isValid) {
      setErrors(errors);
      return;
    }

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
            defaultValue={''}    
            displayEmpty    
          >
            <MenuItem value={''} disabled style={{display:"none"}}>支払先を選択してください</MenuItem>
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
            displayEmpty
          >
            <MenuItem value={''} disabled style={{display:"none"}}>支払元を選択してください</MenuItem>
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
          {errors.nominal && <p style={{color: 'red'}}>{errors.nominal}</p>}
          {errors.amount && <p style={{color: 'red'}}>{errors.amount}</p>}
          {errors.destination && <p style={{color: 'red'}}>{errors.destination}</p>}
          {errors.source && <p style={{color: 'red'}}>{errors.source}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={submit}>送信</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
