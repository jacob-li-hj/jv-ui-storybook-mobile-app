import React from 'react';

import { ActivityIndicator, Button, useToast } from '@components';

export const Loading = () => {
	const toast = useToast();

	return (
		<Button
			onPress={() => {
				toast.show({
					overlay: true,
					placement: 'center',
					duration: 1500,
					render: () => <ActivityIndicator text="Loading..." />
				});
			}}
		>
			Loading
		</Button>
	);
};
