import React, { useImperativeHandle } from 'react';
import useToast from './useToast';

export type ToastHandler = ReturnType<typeof useToast>;

export interface ToastProps {
	children?: (toast: ToastHandler) => JSX.Element;
}

const Toast = React.forwardRef<ToastHandler, ToastProps>((props, ref) => {
	const toast = useToast();

	useImperativeHandle(ref, () => toast, [toast]);

	const { children } = props;
	return children ? children(toast) : null;
});

export function withToast<T>(Component: React.ComponentType<T>) {
	return (props: T) => <Toast>{(toast) => <Component {...props} toast={toast} />}</Toast>;
}

export { useToast };

export default Toast;
