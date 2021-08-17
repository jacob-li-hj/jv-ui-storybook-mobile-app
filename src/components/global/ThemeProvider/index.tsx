import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { ToastProvider } from '@components/global/Toast/useToast';

import theme from '@themes';

import type { NativeBaseProviderProps } from 'native-base';

const ThemeProvider = ({ children, ...restProps }: NativeBaseProviderProps) => (
	<NativeBaseProvider theme={theme} {...restProps}>
		<ToastProvider>{children}</ToastProvider>
	</NativeBaseProvider>
);

export default ThemeProvider;
