import React from 'react';
import './cardStyle.scss';

const customCard = (props) => {
	const { isLoading, getSingleProduct } = props;
	return (
		<div
			className={`${isLoading
				? 'cardContainerLoading col-sm-2 mr-4 mb-2' 
				: 'cardContainer col-sm-2 mr-4 mb-2'}`}
			onClick={getSingleProduct}
		>
			{props.children}
		</div>
	);
};

export default customCard;

