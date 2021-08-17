import React from 'react';
import { Button } from '@components';
import { VStack, Heading, ScrollView } from '@basic';

export const Collection = () => (
	<ScrollView>
		<VStack space={2}>
			<Heading size="md">Primary</Heading>
			<Button.Group direction="column" variant="primary">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
				<Button size="lg" isDisabled>
					Large
				</Button>
			</Button.Group>
			<Heading size="md">Secondary</Heading>
			<Button.Group direction="column" variant="secondary">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
				<Button size="lg" isDisabled>
					Large
				</Button>
			</Button.Group>
			<Heading size="md">Flat</Heading>
			<Button.Group direction="column" variant="flat">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
				<Button size="lg" isDisabled>
					Large
				</Button>
			</Button.Group>
			<Heading size="md">Legacy</Heading>
			<Button.Group direction="column">
				<Button variant="legacy-primary">Legacy Primary</Button>
				<Button variant="legacy-secondary">Legacy Secondary</Button>
				<Button variant="legacy-flat">Legacy Flat</Button>
			</Button.Group>
		</VStack>
	</ScrollView>
);
