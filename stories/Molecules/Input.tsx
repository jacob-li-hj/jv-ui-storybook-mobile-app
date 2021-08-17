import React from 'react';
import { Input, QuantityInput, Icon } from '@components';

import { VStack, HStack, Heading } from '@basic';

export const InputExample = () => (
	<VStack space={4}>
		<Heading fontSize="md">Input Default</Heading>
		<Input />
		<Heading fontSize="md">Input Info</Heading>
		<Input validateStatus="info" />
		<Heading fontSize="md">Input Success</Heading>
		<Input validateStatus="success" />
		<Heading fontSize="md">Input Warning</Heading>
		<Input validateStatus="warning" />
		<Heading fontSize="md">Input Error</Heading>
		<Input validateStatus="error" />
		<Heading fontSize="md">Input Prefix Icon, Suffix Icon</Heading>
		<Input
			prefix={<Icon name="Account" color="Primary" />}
			suffix={<Icon name="Clock" color="Success" />}
			validateStatus="success"
		/>
	</VStack>
);
InputExample.storyName = 'Input';

export const QuantityInputExample = () => (
	<VStack space={4} alignItems="center">
		<Heading fontSize="md">Quantity Input Expanded</Heading>
		<QuantityInput />
		<Heading fontSize="md">Quantity Input Condensed</Heading>
		<HStack w="50%" alignItems="center">
			<QuantityInput variation="condensed" />
		</HStack>
	</VStack>
);
QuantityInputExample.storyName = 'Quantity Input';
