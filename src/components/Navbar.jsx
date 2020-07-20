import React from 'react';
import './Navbar.css'
import { Button } from '@material-ui/core';
const Navbar = () => {
    return (
        <div className="nav">
                      <Button  href="/">
Inicio
</Button>
<Button  href="cadastro">
Cadastrar Novo Cliente
</Button>
        </div>
    );
};

export default Navbar;