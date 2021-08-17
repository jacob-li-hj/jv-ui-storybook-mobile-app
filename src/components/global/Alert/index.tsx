import React from 'react';
import { Alert as BaseAlert } from 'native-base';

import type { IAlertProps } from 'native-base';

import AlertContext from './context';
import { AlertCloseIcon, AlertIcon } from './AlertIcon';

import type { Status } from '@components/global/interface';

export interface AlertProps extends Omit<IAlertProps, 'status' | 'variant'> {
	status?: Status;
}

const InternalAlert: React.ForwardRefRenderFunction<any, AlertProps> = (props, ref?) => {
	const { status, ...restProps } = props;
	return (
		<AlertContext.Provider value={{ status: status! }}>
			<BaseAlert
				{...restProps}
				ref={ref}
				status={status}
				// @ts-ignore TODO
				variant={status}
			/>
		</AlertContext.Provider>
	);
};

const Alert = React.forwardRef(InternalAlert) as React.ForwardRefExoticComponent<
	React.PropsWithoutRef<AlertProps> & React.RefAttributes<any>
> & {
	Icon: typeof AlertIcon;
	CloseIcon: typeof AlertCloseIcon;
	Title: typeof BaseAlert.Title;
	Description: typeof BaseAlert.Description;
};

Alert.Icon = AlertIcon;
Alert.CloseIcon = AlertCloseIcon;
Alert.Title = BaseAlert.Title;
Alert.Description = BaseAlert.Description;

Alert.defaultProps = {
	status: 'info'
};

export default Alert;
