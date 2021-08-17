import React from 'react';

import { Toast, Alert } from '@components';
import { Button, VStack } from '@basic';

export const Default = () => (
	<Toast>
		{(toast) => (
			<VStack space={4}>
				<Button
					onPress={() =>
						toast.show({
							placement: 'center',
							closable: true,
							description: 'Info',
							overlay: true
						})
					}
				>
					Alert Info Toast
				</Button>
				<Button
					onPress={() =>
						toast.show({
							placement: 'top',
							render: () => (
								<Alert status="success">
									<Alert.Icon />
									<Alert.Description>Success</Alert.Description>
								</Alert>
							)
						})
					}
				>
					Alert Success Toast
				</Button>
				<Button
					onPress={() =>
						toast.show({
							placement: 'top-right',
							render: () => (
								<Alert status="warning">
									<Alert.Icon />
									<Alert.Description>Warning</Alert.Description>
								</Alert>
							)
						})
					}
				>
					Alert Warning Toast
				</Button>
				<Button
					onPress={() =>
						toast.show({
							render: () => (
								<Alert status="error">
									<Alert.Icon />
									<Alert.Description>Error</Alert.Description>
								</Alert>
							)
						})
					}
				>
					Alert Error Toast
				</Button>
			</VStack>
		)}
	</Toast>
);
