import React from 'react';

import { Alert } from '@components';
import { Heading, Text, VStack } from '@basic';

export const BlockLevelMessage = () => (
	<VStack space={4}>
		<Heading>Message</Heading>
		<Alert status="info">
			<Alert.Icon />
			<Alert.Description>Alert Info Description</Alert.Description>
			<Alert.CloseIcon />
		</Alert>
		<Alert status="success">
			<Alert.Icon />
			<Alert.Description flexDirection="row">
				<Text>All Filters Removed</Text>
				<Text ml="6px" color="Primary" fontWeight="semibold">
					Undo
				</Text>
			</Alert.Description>
			<Alert.CloseIcon />
		</Alert>
		<Alert alignItems="flex-start" status="warning">
			<Alert.Icon />
			<Alert.Description>
				This quote is no longer valid. It must be removed from your cart before you can checkout.
			</Alert.Description>
			<Alert.CloseIcon />
		</Alert>
		<Alert alignItems="flex-start" status="error">
			<Alert.Icon />
			<Alert.Description>
				<Text>The filter could not be removed. </Text>
				<Text>Please try again.</Text>
			</Alert.Description>
			<Alert.CloseIcon />
		</Alert>
	</VStack>
);
BlockLevelMessage.storyName = 'Block Level Message';
