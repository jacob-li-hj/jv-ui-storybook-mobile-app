import { createContext } from 'react';

import type { ToastContextTypes } from './types';

const warnFunc = (): any => {
	// eslint-disable-next-line no-console
	console.warn('Toast Overlay Provider is not mount.');
};

const ToastContext = createContext<ToastContextTypes>({
	toastInfo: {} as ToastContextTypes['toastInfo'],
	visibleToasts: {},
	setToastInfo: warnFunc,
	setToast: warnFunc,
	removeToast: warnFunc,
	hideAll: warnFunc,
	setVisibleToasts: warnFunc,
	hideToast: warnFunc,
	isActive: warnFunc
});

export default ToastContext;
