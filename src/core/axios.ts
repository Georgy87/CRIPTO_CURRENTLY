import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://test-front-spa.mmtestprojectsfactory.com/api',
});

export { instance };
