import React from 'react';
import type { IIconProps } from 'native-base';
import { Icon as IconFactory } from 'native-base';

import type { IconName } from './Icons';
import { iconsMap } from './Icons';

export interface IconProps extends Omit<IIconProps, 'as'> {
	name: IconName;
}

const Icon = (props: IconProps) => {
	const { name, size = 24, ...restProps } = props;
	return <IconFactory as={iconsMap[name]} {...restProps} width={size} height={size} />;
};

export default Icon;

export type { IconName };
