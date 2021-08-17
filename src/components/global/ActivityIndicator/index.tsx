import React from 'react';
import { ActivityIndicator as Indicator } from 'react-native';
import { View, Text } from 'native-base';

export interface ActivityIndicatorProps {
	color?: string;
	animating?: boolean;
	size?: 'large' | 'small';
	text?: string;
}

const ActivityIndicator = (props: ActivityIndicatorProps) => {
	const { color = 'white', animating = true, size = 'large', text } = props;

	if (!animating) return null;

	return (
		<View flex={1} alignItems="center" justifyContent="center" bg="transparent">
			<View
				alignItems="center"
				justifyContent="center"
				w="89px"
				h="89px"
				borderRadius="5px"
				bg="rgba(0, 0, 0, .8)"
			>
				<Indicator color={color} size={size} />
				{text && (
					<Text color="white" fontSize="sm" mt="6px">
						{text}
					</Text>
				)}
			</View>
		</View>
	);
};

export default ActivityIndicator;
