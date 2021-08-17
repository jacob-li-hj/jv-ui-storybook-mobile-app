import React from 'react';
import { Emphasis, Text } from '@components';

export const EmphasisExample = () => (
	<Emphasis>
		<Text sm semibold>
			AVAILABILITY
		</Text>
		<Text sm>
			<Text semibold>0</Text>
			available at you location.
		</Text>
	</Emphasis>
);
EmphasisExample.storyName = 'Emphasis';
