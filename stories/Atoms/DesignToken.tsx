// @ts-nocheck
// TODO fontSize type
import React from 'react';

import fontSizes from '@themes/font-sizes';
import colors from '@themes/colors';

import { Text, VStack, ScrollView } from '@basic';

const typographyMap = {
	xxsmall: 'xxs',
	xsmall: 'xs',
	small: 'sm',
	medium: 'md',
	large: 'lg',
	xlarge: 'xl',
	xxlarge: '2xl'
} as const;

export const Typography = () => (
	<ScrollView>
		<VStack space={2}>
			{Object.entries(typographyMap).map(([name, size]) => (
				<React.Fragment key={name}>
					<Text p={1} fontSize={size} bg="Brand" color="White">
						{name} - {fontSizes[size]}
					</Text>
					<Text fontSize={size}>xxsmall</Text>
					<Text fontSize={size} fontWeight="semibold">
						semibold {name}
					</Text>
					<Text fontSize={size} fontWeight="bold">
						bold {name}
					</Text>
				</React.Fragment>
			))}
		</VStack>
	</ScrollView>
);

export const Colors = () => (
	<ScrollView>
		<VStack space={2}>
			{Object.entries(colors).map(([color, raw]) => (
				<VStack key={color}>
					<Text p={2}>
						{color} - <Text fontSize="xs">{raw}</Text>
					</Text>
					<Text flex bg={color} p={2} />
				</VStack>
			))}
		</VStack>
	</ScrollView>
);

export const Layout = () => (
	<ScrollView>
		<VStack space={2}></VStack>
	</ScrollView>
);
