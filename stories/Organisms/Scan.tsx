import React from 'react';

import { ScanCameraMask, ScanItem, Button } from '@components';
import { View, VStack, Center } from '@basic';

export const ScanCameraMaskExample = () => (
	<VStack space={4}>
		<View h="220px" bg="#000">
			<ScanCameraMask />
		</View>
		<View h="220px" bg="#000">
			<ScanCameraMask barcodeRead />
		</View>
	</VStack>
);

ScanCameraMaskExample.storyName = 'ScanCameraMask';

export const ScanItemExample = () => (
	<VStack space={4}>
		<ScanItem description="1/2 in. Copper 90 Degree Elbow" productCode="#C9D" qtyValue={1} />
		<ScanItem
			description="KOHLER lron/Impressions Vanity Top Batjroom Sink with Elongated Pval Basi more"
			productCode="#K3052-1-0"
			qtyValue={1}
			notFind
		/>
	</VStack>
);

ScanItemExample.storyName = 'ScanItem';

export const ScanListButtonGroupExample = () => {
	return (
		<Center bg="White">
			<Button.Group space={0} variant="ghost" size="sm" my="10px" w="90%">
				<Button
					flex={1}
					borderRadius={0}
					borderTopLeftRadius={5}
					borderBottomLeftRadius={5}
					_text={{ fontSize: 'xs', fontWeight: 'bold' }}
				>
					Add To Cart
				</Button>
				<Button
					flex={1}
					borderRadius={0}
					borderTopRightRadius={5}
					borderBottomRightRadius={5}
					borderLeftWidth={0}
					_text={{ fontSize: 'xs', fontWeight: 'bold' }}
				>
					Email List
				</Button>
			</Button.Group>
		</Center>
	);
};
ScanListButtonGroupExample.storyName = 'ScanListButtonGroup';
