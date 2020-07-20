 
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  Inicio  from './pages/Inicio'
import Cadastro from './pages/Cadastro';

const routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component ={Inicio} />
            <Route path='/cadastro' exact component ={Cadastro} />
            
        </Switch>
        </BrowserRouter>
    )
}
export default routes;