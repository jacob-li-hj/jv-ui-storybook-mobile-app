import React from 'react';
import { Heading, Text, Center } from '@basic';

export const Welcome = () => (
	<Center>
		<Heading my={6}>Welcome to Storybook</Heading>
		<Text>
			Storybook helps you build UI components in isolation from your app's business logic, data, and
			context. That makes it easy to develop hard-to-reach states. Save these UI states as stories
			to revisit during development, testing, or QA.
		</Text>
	</Center>
);
