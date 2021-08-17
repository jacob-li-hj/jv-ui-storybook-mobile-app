/* eslint-disable no-multi-assign */
import type { InputTheme } from '@themes/types';

type ValidateStatus = 'info' | 'success' | 'warning' | 'error';

// TODO other size
const sizes = {
	md: {
		px: '8px',
		py: '10px',
		height: '40px',
		_text: {
			fontSize: 'md'
		}
	}
};

const pickPadding = (size: keyof typeof sizes) => ({ px: sizes[size].px, py: sizes[size].py });

// TODO px to space

const baseStyle = (props: Record<string, any>) => {
	const validateStatus = props.validateStatus as ValidateStatus;
	const size = props.size as keyof typeof sizes;

	const padding = size in sizes ? pickPadding(size) : {};

	let borderColor: string;
	let defaultBorderColor: string;
	switch (validateStatus) {
		case 'info':
			borderColor = defaultBorderColor = 'Info';
			break;
		case 'success':
			borderColor = defaultBorderColor = 'Success';
			break;
		case 'warning':
			borderColor = defaultBorderColor = 'Warning';
			break;
		case 'error':
			borderColor = defaultBorderColor = 'Error';
			break;
		default:
			borderColor = 'Primary';
			defaultBorderColor = 'Border';
			break;
	}

	const styles = {
		...padding,
		_focus: {
			borderWidth: '2px',
			borderColor
		}
	};

	return {
		_ios: styles,
		_android: styles,

		bg: '#fff',
		borderWidth: '1px',
		borderColor: defaultBorderColor,
		borderRadius: '3px',
		_text: {
			color: 'Dark'
		},
		color: 'Dark'
	};
};

const defaultProps = {
	size: 'md'
};

export const Input = {
	baseStyle,
	defaultProps,
	sizes
} as unknown as InputTheme;
