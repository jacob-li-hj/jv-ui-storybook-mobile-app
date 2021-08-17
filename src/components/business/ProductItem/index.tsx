import React from 'react';
import { HStack, Text, View, Pressable } from 'native-base';

const ProductItem: React.FC = ({ children }) => (
	<Pressable
		mt={2}
		bg="#F8FAFC"
		_pressed={{
			bg: '#E6F2FE'
		}}
	>
		<HStack borderRadius="4px" p={1} alignItems="center">
			<View mx="8px" w="32px" h="32px" bg="#E4E3E3" />
			<Text flex={1} fontSize="sm">
				{children}
			</Text>
		</HStack>
	</Pressable>
);

export default ProductItem;
