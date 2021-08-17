import React, { useState } from 'react';
import { HStack, VStack, View, Center, Pressable } from 'native-base';
import Icon from '@components/global/Icon';

export interface ScanCameraMaskProps {
	onPressAdd?: () => void;
	onPressFlash?: (flashOpen: boolean) => void;
	barcodeRead?: boolean;
}

interface MaskBorderProps {
	top?: boolean;
	borderColor: string;
}

const MaskBorder: React.FC<MaskBorderProps> = (props) => {
	const { top, children, borderColor } = props;
	const transform = top ? { transform: [{ rotate: '180deg' }] } : {};
	const borderStyles = { w: '55px', h: '55px', p: '10px', borderBottomWidth: '1px', borderColor };
	const [flashButton, addButton] = React.Children.toArray(children);
	return (
		<HStack
			p="10px"
			pt="0"
			bg="rgba(56, 56, 56, 0.75)"
			w="100%"
			style={transform}
			justifyContent="space-between"
		>
			<Center {...borderStyles} borderLeftWidth="1px">
				{flashButton}
			</Center>
			<Center {...borderStyles} borderRightWidth="1px">
				{addButton}
			</Center>
		</HStack>
	);
};

const ScanCameraMask = (props: ScanCameraMaskProps) => {
	const { onPressFlash: propsOnPressFlash, onPressAdd, barcodeRead } = props;

	const [flashOpen, setFlash] = useState(false);

	const borderColor = barcodeRead ? '#008000' : 'white';
	const scanLineColor = barcodeRead ? '#008000' : '#ff0000';

	const buttonStyles = {
		_pressed: { opacity: 0.5 },
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '2px',
		w: '40px',
		h: '40px',
		border: '1px solid rgba(255,255,255,0.2)'
	};

	const onPressFlash = () => {
		setFlash((prev) => {
			const next = !prev;
			propsOnPressFlash?.(next);
			return next;
		});
	};

	return (
		<VStack flex={1} alignItems="center" justifyContent="space-between">
			<MaskBorder borderColor={borderColor} top />
			<View w="80%" h="2px" bg={scanLineColor} />
			<MaskBorder borderColor={borderColor}>
				<Pressable {...buttonStyles} onPress={onPressFlash}>
					<Icon color="white" size="16" name={flashOpen ? 'FlashlightOn' : 'FlashlightOff'} />
				</Pressable>
				<Pressable {...buttonStyles} onPress={onPressAdd}>
					<Icon color="white" size="16" name="Add" />
				</Pressable>
			</MaskBorder>
		</VStack>
	);
};

export default ScanCameraMask;
