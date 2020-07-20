import React from 'react';
import Navbar from '../components/Navbar'
import './Inicio.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup'

import Container from '@material-ui/core/Container';
import api from  '../services/api'
import TableClients from '../components/Table2';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: 400,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  numeroClientes: {
    padding: 10,
    textAlign: 'center'
  },
  table: {
    minWidth: 650,
    borderCollapse: 'collapse',
    width: "100%",
  },
  tableClass: {
    marginTop: 30,
  }
});
// import { Container } from './styles';

function Inicio() {

  const [clients,setClients] = useState([])
  const [loading,setLoading] = useState(true)

  const classes = useStyles();
  
  useEffect(() => {
    api.get('/client/getall').then(client => {
      
    setClients(client.data)
     setLoading(false)
    
    })
  }, [])
  if(loading){
    return ( 
      <>
      <Navbar />
      <CircularProgress  /> Carregando...
    </>
    )
  }
  return (
    <>
     <Navbar />
     <Container>
  <div className="corpo">
      
        
          
            <Card className={classes.root} variant="outlined">
            <CardContent>
      
              <Typography variant="h4" component="p">
               Clientes
              </Typography>
      
              <Typography className={classes.numeroClientes} variant="h2" component="p">
              <CountUp start={0}  end = { clients?.length } />
              </Typography>
            </CardContent>
            <CardActions>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
          <div className={classes.tableClass}></div>
          <Button  href="cadastro">
Cadastrar Novo Cliente
</Button>
          <TableClients Clients = {clients}></TableClients>
          <div className="formCadastro">

          </div>

  </div>
  </Container>
  </>
  )
}

export default Inicio;