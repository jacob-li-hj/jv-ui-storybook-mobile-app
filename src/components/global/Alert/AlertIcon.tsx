import React from 'react';

import AlertContext from '@components/global/Alert/context';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

type AlertIconProps = Omit<IconProps, 'name'>;

const iconMap = {
	info: 'Info',
	success: 'Success',
	warning: 'Warning',
	error: 'Error'
} as const;

export const AlertIcon = (props: AlertIconProps) => {
	const { status } = React.useContext(AlertContext);
	const iconName = iconMap[status];
	return <Icon {...props} name={iconName} />;
};

export const AlertCloseIcon = (props: AlertIconProps) => {
	const { status } = React.useContext(AlertContext);
	const iconColor = iconMap[status];
	return <Icon name="CrossError" alignSelf="center" color={iconColor} {...props} />;
};
