import React from 'react';
import { HStack, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { Icon } from '../../global';

const HistoryItem: React.FC = ({ children }) => (
	<View>
		<TouchableOpacity>
			<HStack py={3} alignItems="center">
				<Icon name="Clock" size={18} />
				<Text flex={1} ml="10px">
					{children}
				</Text>
				<TouchableOpacity hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}>
					<Icon name="CrossError" />
				</TouchableOpacity>
			</HStack>
		</TouchableOpacity>
		<View borderBottomWidth="1px" borderColor="#F0F3F5" />
	</View>
);

export default HistoryItem;
