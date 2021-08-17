import React from 'react';

import { Input, QuantityInput, Form, Button } from '@components';

import * as yup from 'yup';

const rules = yup.object().shape({
	msg: yup.string().required('This field is required'),
	msg1: yup.string().required('This is warning message')
});

export const FormExample = () => (
	<Form rules={rules}>
		<Form.Field label="Error Message" name="msg" trigger="onChangeText">
			<Input />
		</Form.Field>
		<Form.Field label="Warning Message" errorStatus="warning" name="msg1" trigger="onChangeText">
			<QuantityInput />
		</Form.Field>
		<Form.Submit>
			<Button variant="primary">submit</Button>
		</Form.Submit>
	</Form>
);

FormExample.storyName = 'Form';
