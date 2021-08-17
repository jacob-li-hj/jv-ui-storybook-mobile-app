import React, { useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { VStack } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';

import type { IStackProps } from 'native-base/lib/typescript/components/primitives/Stack';
import type {
	UseFormReturn,
	FieldValues,
	Mode,
	DefaultValues,
	SubmitHandler,
	SubmitErrorHandler
} from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

export interface FormProps<T> extends IStackProps {
	validateTrigger?: Mode;
	defaultValues?: DefaultValues<T>;
	rules?: AnyObjectSchema;
	onFinish?: SubmitHandler<T>;
	onError?: SubmitErrorHandler<T>;
	children?: React.ReactNode;
}

const Form = <T extends FieldValues = FieldValues>(
	props: FormProps<T>,
	ref: React.ForwardedRef<UseFormReturn<T>>
) => {
	const {
		validateTrigger = 'onChange',
		defaultValues,
		onFinish = noop,
		onError,
		rules,
		children,
		...themeProps
	} = props;

	const form = useForm({
		mode: validateTrigger,
		defaultValues,
		criteriaMode: 'all',
		resolver: rules ? yupResolver(rules) : undefined
	});

	useImperativeHandle(ref, () => form);

	return (
		<FormProvider<T> {...form} handleSubmit={() => form.handleSubmit(onFinish, onError)}>
			<VStack space={2} {...themeProps}>
				{children}
			</VStack>
		</FormProvider>
	);
};

function noop() {}

export default React.forwardRef<UseFormReturn, FormProps<FieldValues>>(Form) as <
	Values = FieldValues
>(
	props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<UseFormReturn<Values>> }
) => React.ReactElement;
