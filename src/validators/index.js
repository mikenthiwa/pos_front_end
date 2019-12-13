export default ( productName ) => {
	const regExp = /^([a-z])+([0-9a-z]+)$/i;
	if(!productName) {
		this.setState(prevState => ({
			...prevState,
			error: 'required'
		}));
	}
	if(productName.match(regExp)) {
	    this.setState(prevState => ({
			...prevState,
			error: 'Let`s be honest :)'
		}));
	}
};
