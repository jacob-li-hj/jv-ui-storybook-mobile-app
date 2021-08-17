import React from 'react';

import { HStack, VStack } from 'native-base';
import Text from '@components/global/Text';
import Image from '@components/global/Image';
import Icon from '@components/global/Icon';

interface ScanItemProps {
	description: string;
	productCode: String;
	qtyValue: string | number;
	hideCode?: boolean;
	notFind?: boolean;
}

const ScanItem: React.FC<ScanItemProps> = (props) => {
	const { description, productCode, hideCode, qtyValue, notFind } = props ?? {};
	return (
		<VStack mt="7px" borderColor="#b8b9bc" borderBottomWidth="0.3px">
			<HStack>
				<Image size="36px" />
				<VStack mb="10px" ml="15px" flex={1}>
					<Text color="Dark" sm semibold>
						{description.length > 75 ? `${description.substring(0, 74)}...` : description}
					</Text>
					{!hideCode && (
						<Text color="#b8b9bc" xs>
							Part #{productCode}
						</Text>
					)}
				</VStack>
				<HStack w="66px" flexDirection="row" justifyContent="space-between">
					<Text mx="5px" color="Dark" sm semibold>
						Qty:
					</Text>
					<Text textAlign="right" flex={1} sm semibold>
						{qtyValue}
					</Text>
				</HStack>
			</HStack>
			{notFind && (
				<HStack alignItems="center" py="8px">
					<Icon name="Warning" size={14.4} />
					<Text ml="5px" xs>
						Could not find item.
					</Text>
				</HStack>
			)}
		</VStack>
	);
};

export default ScanItem;
