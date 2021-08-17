import React from 'react';
import { useFormContext } from 'react-hook-form';

type HandlerKey = 'handleSubmit' | 'reset';

export type FormHandlerProps<T> = {
	children: T;
};

const createFormHandler =
	(key: HandlerKey) =>
	<T extends React.ReactElement<{ onPress?: (p: any) => void }>>(props: FormHandlerProps<T>) => {
		const { children } = props;
		const form = useFormContext();
		if (!form) {
			console.warn(
				`Form.${key === 'handleSubmit' ? 'Submit' : 'Reset'} need wrap in <Form /> component.`
			);
			return children;
		}
		return React.cloneElement(children, {
			onPress: key === 'handleSubmit' ? form[key](() => {}) : form[key]
		});
	};

export const FormSubmit = createFormHandler('handleSubmit');
export const FormReset = createFormHandler('reset');
