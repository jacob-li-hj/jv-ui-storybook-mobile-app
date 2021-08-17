import type { MemoExoticComponent } from 'react';

import { Button } from 'native-base';

import type { IButtonProps } from 'native-base';
import type { IButtonGroupProps } from 'native-base/lib/typescript/components/primitives/Button';

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'flat'
	| 'ghost'
	| 'legacy-primary'
	| 'legacy-secondary'
	| 'legacy-flat';

export interface ButtonProps extends Omit<IButtonProps, 'variant'> {
	variant?: ButtonVariant;
}

export interface ButtonGroupProps extends Omit<IButtonGroupProps, 'variant'> {
	variant?: ButtonVariant;
}

export type ButtonComponentType = ((props: ButtonProps & { ref?: any }) => JSX.Element) & {
	Group: MemoExoticComponent<(props: ButtonGroupProps & { ref?: any }) => JSX.Element>;
};

export default Button as unknown as ButtonComponentType;
