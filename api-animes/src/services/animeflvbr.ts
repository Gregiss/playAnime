import axios from 'axios';

const FormData = require('form-data');

export const animesRequest = axios.create({ 
  baseURL: 'https://www.branitube.net/'
}); 

export const getAnimeVideo = (idEp: any) => {
  var querystring = require('querystring');

  return axios.post('https://www.branitube.net/api/v1/load-player', querystring.stringify({ ep_id: idEp }))
}