import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Container from '@material-ui/core/Container'
import { Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import { cnpjMask } from '../services/mask'

import MuiAlert from '@material-ui/lab/Alert';
// import { Container } from './styles';


import { makeStyles } from '@material-ui/core/styles';
import api from '../services/api';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles  = makeStyles((theme) =>  ({
    container: {

    },
    formControl : {
      margin: theme.spacing(4),
    minWidth: 200,
    },
    formGroup: {

      display:"flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: 40,
      flexGrow: 1,
      flexWrap: "wrap",
       


    },
    forms: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
        padding: 40,
        marginTop: 30
    },
    formTextField: {
     //margin: "10px 10px 30px 10px",
      minWidth: 250,
      
      margin: theme.spacing(4)
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
    const [sucess, setSucess] = useState(false)
    const [insucess, setInsucess] = useState(false)
    const classes = useStyles()

    let alertCadastro = ''
    if(sucess){
      alertCadastro = <Alert severity="success">Cadastrado com sucesso!</Alert> 
        
    }
    
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
        try {
          const res = await api.post('client/create', client)
       
          if(res.status = 201) {
            setNome('')
            setEmail('')
            setCnpj('')
            setTelefone('')
            setRua('')
            setBairro('')
            setCidade('')
            setUf('')
            setSucess(true)
            setTimeout(() => {
              setSucess(false)
            }, 6000)


          }

        } catch (error) {
          alertCadastro = 'erro'
        }

    }

  return (
      <>
      
      <Navbar></Navbar>
      <Container className={classes.container}>


            
     
        <form className={classes.forms} onSubmit={onHandleSubmit}>
        <div className={classes.title}>
            <Typography variant="h4" component="h4">Cadastro de Clientes</Typography>
        </div>

        {alertCadastro}
        
        <div className={classes.formGroup}>
      <TextField required label='Nome' value={nome} onChange={event => setNome(event.target.value)} className={classes.formTextField} />
      <TextField required label='Email' type="email" value={email} onChange={event => setEmail(event.target.value)} className={classes.formTextField} />
      <TextField required  label='Telefone' value={telefone}  onChange={event => setTelefone(event.target.value)} className={classes.formTextField}  />
      <TextField required label='CNPJ' value={cnpj} onChange={event => {setCnpj(cnpjMask(event.target.value))}} className={classes.formTextField}  />
  
      <TextField required label='Rua' value={rua} onChange={event => setRua(event.target.value)} className={classes.formTextField}  />
      <TextField required label='Bairro' value={bairro} onChange={event => setBairro(event.target.value)} className={classes.formTextField}  />
      <TextField required label='Cidade' value={cidade} onChange={event => setCidade(event.target.value)} className={classes.formTextField}  />
      <FormControl className={classes.formControl}>
      <InputLabel id="Estado" >Estado</InputLabel>
      <Select
      required 
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