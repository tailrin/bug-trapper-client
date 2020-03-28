export default {
    API: process.env.REACT_APP_API_ENDPOINT,
    getOptions: method => {
        return {
			method: method.toUpperCase(),
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `bearer ${window.sessionStorage.jwt}`
			}
		}
	},
	
	checkForAuth: history => {
		if(!window.sessionStorage.jwt){
			history.push('/Login')
		}
	}
}