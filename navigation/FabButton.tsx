import React from 'react';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSpring, animated } from '@react-spring/native';
import { AntDesign } from '@expo/vector-icons';

import { Fab, Icon } from '@basic';

interface FabButtonProps {
	onPress: () => void;
}

const FabButton = ({ onPress }: FabButtonProps) => {
	const drawerStatus = useDrawerStatus();
	const rotate = useSpring({ rotateY: drawerStatus === 'open' ? '-180deg' : '0deg' });
	return (
		<Fab
			bg="Brand"
			_pressed={{ bg: 'BrandAlt' }}
			w={12}
			h={12}
			onPress={onPress}
			icon={
				<animated.View style={{ transform: [rotate] }}>
					<Icon color="white" size={6} as={<AntDesign name="menu-fold" />} />
				</animated.View>
			}
		/>
	);
};

export default FabButton;
