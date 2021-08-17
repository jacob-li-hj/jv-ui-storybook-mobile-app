import React from 'react';
import { useController } from 'react-hook-form';
import { HStack, VStack } from 'native-base';

import type { IBoxProps } from 'native-base';

import Text from '@components/global/Text';
import Icon from '@components/global/Icon';

import type { InputProps } from '@components/global/Input/Input';

type ValidateStatus = NonNullable<InputProps['validateStatus']>;

export interface FormFieldProps extends IBoxProps {
	label?: string;
	name: string;
	valuePropName?: string;
	trigger?: string;
	errorStatus?: ValidateStatus;
	validatePropsName?: string;
	children: React.ReactElement;
}

export interface FieldErrorMessageProp {
	status: ValidateStatus;
	message?: string;
}

const iconStatusMap = {
	info: 'Info',
	success: 'Success',
	warning: 'Warning',
	error: 'Error'
} as const;

const ErrorMessage = (props: FieldErrorMessageProp) => {
	const { status, message } = props;
	const iconNode = message ? <Icon name={iconStatusMap[status]} size={14.4} mr="5px" /> : null;

	return (
		<HStack alignItems="center">
			{iconNode}
			<Text sm>{message}</Text>
		</HStack>
	);
};

const FormField = (props: FormFieldProps) => {
	const {
		name,
		label,
		valuePropName = 'value',
		trigger = 'onChange',
		errorStatus = 'error',
		validatePropsName = 'validateStatus',
		children,
		_text,
		...themeProps
	} = props;

	const { field, fieldState } = useController({
		name
	});

	const { onChange, onBlur, value } = field;

	const { error } = fieldState;

	const controlledChild = React.cloneElement(children, {
		[trigger]: onChange,
		[valuePropName]: value,
		...(error && { [validatePropsName]: errorStatus }),
		onBlur
	});

	return (
		<VStack space={2} {...themeProps}>
			{label && (
				<Text semibold {..._text}>
					{label}
				</Text>
			)}
			{controlledChild}
			{error && <ErrorMessage status={errorStatus} message={error.message} />}
		</VStack>
	);
};

export default FormField;
