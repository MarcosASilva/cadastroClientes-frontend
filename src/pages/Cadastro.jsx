import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Container from '@material-ui/core/Container'
import { Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import { cnpjMask } from '../services/mask'
// import { Container } from './styles';

import { makeStyles } from '@material-ui/core/styles';
import api from '../services/api';

const useStyles  = makeStyles((theme) =>  ({
    title: {

    },
    formControl : {
    margin: theme.spacing(1),
    minWidth: 120,
    },
    formGroup: {
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 40 

    },
    forms: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
        padding: 40,
        marginTop: 30
    }
}))

function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const classes = useStyles()

    const onHandleSubmit = async (e) => {

        e.preventDefault()
        let client = {
            nome,
            email,
            cnpj,
            telefone,
            endereco: {
                rua,
                bairro,
                cidade,
                uf
            }

        }

        const res = await api.post('client/create', client)
        console.log(res);
    }

  return (
      <>
      
      <Navbar></Navbar>
      <Container>


        
        <form className={classes.forms} onSubmit={onHandleSubmit}>
        <div className={classes.title}>
            <Typography variant="h4" component="h4">Cadastro de Clientes</Typography>
        </div>
        <div className={classes.formGroup}>
            
      <TextField label='Nome' onChange={event => setNome(event.target.value)} />
      <TextField label='Email' type="email" onChange={event => setEmail(event.target.value)} />
      <TextField label='Telefone'  onChange={event => setTelefone(event.target.value)} />
      <TextField label='CNPJ' value={cnpj} onChange={event => {setCnpj(cnpjMask(event.target.value))}} />
      </div>
        <div className={classes.formGroup}>
      <TextField label='Rua' onChange={event => setRua(event.target.value)} />
      <TextField label='Bairro' onChange={event => setBairro(event.target.value)} />
      <TextField label='Cidade'  onChange={event => setCidade(event.target.value)} />
      <FormControl className={classes.formControl}>
      <InputLabel id="Estado" >Estado</InputLabel>
      <Select
          labelId="Estado"
          labelWidth = {100}
          id="demo-controlled-open-select"
        onChange = { event => setUf(event.target.value)}
          value={uf}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="MG">Minas Gerais</MenuItem>
          <MenuItem value="RJ">Rio Janeiro</MenuItem>
          <MenuItem value="SP">São Paulo</MenuItem>
        </Select>
        </FormControl>
      </div>
      <Button type="submit"> Enviar </Button>
      </form>
      </Container>
  </>
  );
}
export default Cadastro;