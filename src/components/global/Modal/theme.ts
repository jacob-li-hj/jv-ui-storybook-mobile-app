import type {
	ModalTheme,
	ModalHeaderTheme,
	ModalContentTheme,
	ModalBodyTheme,
	ModalFooterTheme,
	ModalCloseButtonTheme
} from '@themes/types';

/**
 * Legacy common style
 */

const legacyHeaderBaseStyle = {
	borderTopRadius: '2px',
	pl: '16px',
	pr: '46px',
	pb: 0,
	h: '56px',
	_text: {
		color: 'Dark',
		fontSize: '24px',
		fontWeight: 'semibold'
	}
};

const legacyContentBaseStyle = {
	pl: 0,
	pt: 0,
	rounded: '3px',
	borderWidth: '2px'
};

const legacyBodyBaseStyle = {
	pt: '14px',
	pr: '14px',
	pb: '14px',
	pl: '14px'
};

const legacyFooterBaseStyle = {
	pt: '14px',
	pr: '14px',
	pb: '14px',
	pl: '14px'
};

const legacyCloseButtonBaseStyle = {
	top: '10px',
	right: '10px',
	border: 'none',
	bg: 'transparent',
	_pressed: {
		bg: 'transparent'
	},
	_icon: {
		size: '16px'
	}
};

/**
 * Legacy Modal variants config
 */

const legacyModalVariants = {
	default: {
		header: {
			...legacyHeaderBaseStyle,
			pl: 0,
			pr: '30px',
			ml: '16px',
			mr: '16px',
			borderBottomWidth: '1px',
			borderColor: 'Border'
		},
		content: {
			...legacyContentBaseStyle,
			borderWidth: 0
		},
		body: {
			...legacyBodyBaseStyle
		},
		footer: {
			...legacyFooterBaseStyle
		},
		closeButton: {
			...legacyCloseButtonBaseStyle,
			_icon: {
				color: 'Primary'
			}
		}
	},
	warning: {
		header: {
			...legacyHeaderBaseStyle,
			bg: 'WarningAlt'
		},
		content: {
			...legacyContentBaseStyle,
			borderColor: 'Warning'
		},
		body: {
			...legacyBodyBaseStyle
		},
		footer: {
			...legacyFooterBaseStyle
		},
		closeButton: {
			...legacyCloseButtonBaseStyle,
			_icon: {
				color: 'Warning'
			}
		}
	},
	success: {
		header: {
			...legacyHeaderBaseStyle,
			bg: 'SuccessAlt'
		},
		content: {
			...legacyContentBaseStyle,
			borderColor: 'Success'
		},
		body: {
			...legacyBodyBaseStyle
		},
		footer: {
			...legacyFooterBaseStyle
		},
		closeButton: {
			...legacyCloseButtonBaseStyle,
			_icon: {
				color: 'Success'
			}
		}
	}
};

const Modal = {} as unknown as ModalTheme;

const ModalHeader = {
	variants: {
		legacy: legacyModalVariants.default.header,
		'legacy-warning': legacyModalVariants.warning.header,
		'legacy-success': legacyModalVariants.success.header
	}
} as unknown as ModalHeaderTheme;

const ModalContent = {
	variants: {
		legacy: legacyModalVariants.default.content,
		'legacy-warning': legacyModalVariants.warning.content,
		'legacy-success': legacyModalVariants.success.content
	}
} as unknown as ModalContentTheme;

const ModalBody = {
	variants: {
		legacy: legacyModalVariants.default.body,
		'legacy-warning': legacyModalVariants.warning.body,
		'legacy-success': legacyModalVariants.success.body
	}
} as unknown as ModalBodyTheme;

const ModalFooter = {
	variants: {
		legacy: legacyModalVariants.default.footer,
		'legacy-warning': legacyModalVariants.warning.footer,
		'legacy-success': legacyModalVariants.success.footer
	}
} as unknown as ModalFooterTheme;

const ModalCloseButton = {
	variants: {
		legacy: legacyModalVariants.default.closeButton,
		'legacy-warning': legacyModalVariants.warning.closeButton,
		'legacy-success': legacyModalVariants.success.closeButton
	}
} as unknown as ModalCloseButtonTheme;

export default {
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	ModalFooter,
	ModalCloseButton
};
