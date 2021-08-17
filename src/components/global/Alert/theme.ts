import type { AlertDescriptionTheme, AlertTheme } from '@themes/types';

/**
 * Variants
 */
const info = () => ({
	borderColor: 'Info',
	bg: 'InfoAlt'
});
const success = () => ({
	borderColor: 'Success',
	bg: 'SuccessAlt'
});
const warning = () => ({
	borderColor: 'Warning',
	bg: 'WarningAlt'
});
const error = () => ({
	borderColor: 'Error',
	bg: 'ErrorAlt'
});

export const Alert = {
	baseStyle: {
		// TODO use space instead of px
		p: '10px',
		// TODO use space instead of px
		borderRadius: '3px',
		// TODO use space instead of px
		space: 2.5,
		// TODO use space instead of px
		borderWidth: '2px',
		_text: {
			fontSize: 'md',
			lineHeight: '19.2px',
			color: 'Dark'
		}
	},
	variants: {
		info,
		success,
		warning,
		error
	}
} as unknown as AlertTheme;

export const AlertDescription = {
	baseStyle: {
		_text: {
			fontSize: 'md'
		},
		flexGrow: 1
	}
} as unknown as AlertDescriptionTheme;
