import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import api from '../services/api';
import Button from '@material-ui/core/Button'
import Table2 from '../components/Table2'
// import { Container } from './styles';

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
function TableClients() {
    const [clients,setClients] = useState([])
    const [loading,setLoading] = useState(true)
  
    const classes = useStyles();
    
    useEffect( () => {
      api.get('/client/getall').then(client => {
        
      setClients(client.data)
       setLoading(false)
      
      })
    }, [])
  return (
                
    <div className={classes.tableClass}>
    <TableContainer component={Paper}>
<Table className={classes.table}  aria-label="simple table">
<TableHead>
<TableRow>
<TableCell>Nome</TableCell>
<TableCell align="center">Email</TableCell>
<TableCell align="center">Telefone</TableCell>
<TableCell align="center">CNPJ</TableCell>
<TableCell align="center">Endereço</TableCell>
</TableRow>
</TableHead>
<TableBody>
{clients.map((client) => (
<TableRow key={client._id}>
  <TableCell component="th" scope="row" width="40%">
    {client.nome}
  </TableCell>
  <TableCell align="center">{client.email}</TableCell>
  <TableCell align="center">{client.telefone}</TableCell>
  <TableCell align="center">{client.cnpj}</TableCell>
<TableCell align="center" width="40%">Rua {client.endereco.rua}, {client.endereco.bairro}, {client.endereco.cidade}/{client.endereco.UF} </TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
<Button>Cadastrar novo cliente</Button>
<Table2 Clients={clients}></Table2>
</div>


  );
}

export default TableClients;