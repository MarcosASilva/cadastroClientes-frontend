import React, { useState, useEffect } from 'react';
import api from '../services/api';
import MaterialTable from 'material-table';

export default function Table2(props) {

    const [clients, setCLients] = useState([])
   useEffect(() => {
    setCLients(props.Clients);
   })
   
    const [columns,setColumns] = useState([
        { title: 'Nome', field: 'nome' },
        { title: 'Email', field: 'email' },
        { title: 'Telefone', field: 'telefone' }

    ])

   const onDelete = async (id) => {
      const res = await api.delete('client/remove/'+id)
      console.log(res);
   }

    return (
        <MaterialTable 
        localization={{
          header: {
            actions: '#'
          },
          body: {
            emptyDataSourceMessage: 'Nenhum registro para exibir',
            editRow : {
              deleteText : 'Tem certeza que deseja deletar?'
            }
          },
          toolbar: {
            searchTooltip: 'Pesquisar',
            searchPlaceholder: 'Pesquisar'
          },
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          }
        }} 
          title="Tabela de clientes"
          columns={columns}
          data={clients}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                resolve()
                onDelete(oldData._id)
                
              }),
          }}
        />
        
      );
}