import React, {Fragment} from 'react';
import _ from 'lodash';
import './formElements.scss';

export const InputLabel = (label, required, inputName, type, errors, onChange, value) =>  {
	return (
		<Fragment>
			<div className='labelStyle'>
				{required
					? <span className='asteric'>* <span className='labelStyleFont'>{label}</span></span>
					: label
				}
			</div>
			<div>
				<small className='inputErrors'>{errors[inputName] ? _.upperFirst(errors[inputName]) : ''}</small>
				<input
					className={ errors[inputName] ? 'inputStyleError' : 'inputStyle'}
					name={inputName}
					onChange={onChange}
					type={type}
					value={value}
				/>
			</div>
		</Fragment>
	);
};

