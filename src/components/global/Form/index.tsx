import BaseForm from './Form';
import FormField from './FormField';
import * as FormHandler from './FormHandler';

import { useWatch, useFormState } from 'react-hook-form';

import type { UseFormReturn, FieldValues } from 'react-hook-form';

import type { FormProps } from './Form';
import type { FormFieldProps } from './FormField';

type FormInstance<T = FieldValues> = UseFormReturn<T>;

const Form = BaseForm as typeof BaseForm & {
	Field: typeof FormField;
	Submit: typeof FormHandler.FormSubmit;
	Reset: typeof FormHandler.FormReset;
};

Form.Field = FormField;
Form.Submit = FormHandler.FormSubmit;
Form.Reset = FormHandler.FormReset;

export type { FormProps, FormFieldProps, FormInstance };

export { useWatch, useFormState };

export default Form;
