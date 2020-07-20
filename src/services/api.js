
import axios from 'axios'
//Conexão com a API.
const api = axios.create({
    baseURL: "https://apicadastroclientes001.herokuapp.com"
});

export default api 