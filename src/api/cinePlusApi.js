import axios from 'axios';

const cinePlusApi = axios.create({
    baseURL: 'http://localhost:8080/api'});

export default cinePlusApi

