import type { ButtonTheme } from '@themes/types';

const baseStyle = () => ({
	_disabled: {
		opacity: 1
	}
});

const commonStyle = {
	// todo
	borderRadius: '3px',
	borderWidth: 1
};

const defaultProps = {
	variant: 'secondary'
};

/**
 * Variants
 */
const primary = () => ({
	...commonStyle,
	bg: 'Primary',
	borderColor: 'PrimaryAccent',
	_pressed: {
		// TODO
		bg: '#1978AF'
	},
	_text: {
		color: 'White'
	},
	_disabled: {
		bg: 'Border',
		// TODO
		borderColor: '#9D9EA0'
	}
});

const secondary = () => ({
	...commonStyle,
	bg: 'Secondary',
	// TODO
	borderColor: '#C2D1DD',
	_pressed: {
		// TODO
		bg: '#BECCD8'
	},
	_text: {
		color: 'Primary'
	},
	_disabled: {
		bg: 'Disabled',
		// TODO
		borderColor: '#C4D0D8',
		_text: {
			color: 'Border'
		}
	}
});

const flat = () => ({
	...commonStyle,
	borderColor: 'transparent',
	_pressed: {
		// TODO
		bg: '#CBDAE6',
		borderColor: '#CBDAE6'
	},
	_text: {
		color: 'Primary'
	},
	_disabled: {
		_text: {
			color: 'Border'
		}
	}
});

const ghost = () => ({
	...commonStyle,
	borderColor: 'Border',
	bg: 'White',
	_pressed: {
		bg: 'Primary',
		_text: { color: 'White' }
	},
	_text: {
		color: 'Dark'
	},
	_disabled: {
		bg: 'Disabled',
		// TODO
		borderColor: 'rgba(100,100,100,0.4)',
		_text: {
			color: 'Border'
		}
	}
});

const legacyProps = {
	borderRadius: '2px',
	elevation: 2,
	shadowColor: '#000',
	shadowOpacity: 0.2,
	shadowRadius: 1.2,
	shadowOffset: { height: 2 },
	android_ripple: {
		color: 'rgba(256, 256, 256, 0.3)'
	},
	_pressed: {
		opacity: 0.5
	}
};

const legacyPrimary = () => ({
	bg: 'Primary',
	_text: {
		color: 'White',
		fontWeight: 'semibold'
	},
	...legacyProps
});

const legacySecondary = () => ({
	bg: 'Secondary',
	_text: {
		color: 'Primary',
		fontWeight: 'semibold'
	},
	...legacyProps
});

const legacyFlat = () => ({
	bg: 'transparent',
	_text: {
		color: 'Primary',
		fontWeight: 'semibold'
	},
	...legacyProps,
	elevation: 0
});

/**
 * Sizes
 */

const sizes = {
	lg: {
		px: '12px',
		py: 0,
		height: '48px',
		_text: {
			fontSize: '20px'
		}
	},
	md: {
		px: '8px',
		py: 0,
		height: '40px',
		_text: {
			fontSize: '16px'
		}
	},
	sm: {
		px: '4px',
		py: 0,
		height: '32px',
		_text: {
			fontSize: '16px'
		}
	}
};

export const Button = {
	baseStyle,
	defaultProps,
	variants: {
		primary,
		secondary,
		flat,
		ghost,
		'legacy-primary': legacyPrimary,
		'legacy-secondary': legacySecondary,
		'legacy-flat': legacyFlat
	},
	sizes
} as unknown as ButtonTheme;
