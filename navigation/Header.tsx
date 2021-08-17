import React, { useState, useLayoutEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Heading, Center } from 'native-base';

const NavigationHeader = () => {
	const [header, setHeader] = useState('Welcome');

	useLayoutEffect(() => {
		DeviceEventEmitter.addListener('setHeaderTitle', setHeader);
		return () => {
			DeviceEventEmitter.removeListener('setHeaderTitle', setHeader);
		};
	}, []);

	return (
		<Center h="55px" bg="white" pt={`${getStatusBarHeight()}px`}>
			<Heading size="sm">{header}</Heading>
		</Center>
	);
};

export default NavigationHeader;
