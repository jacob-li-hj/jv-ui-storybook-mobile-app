import React, { useContext, useState } from 'react';
import { animated, useSpring } from '@react-spring/native';
import { AntDesign } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';

import { Collapse, HStack, Icon, Pressable, View } from '@basic';

type MenuProps = {
	initialSelection?: string;
	onSelected?: () => void;
};

type SubMenuProp = {
	title: string;
};

type MenuItemProp = {
	name: string;
	itemKey?: string;
	onPress?: () => void;
};

type MenuContextType = {
	selected: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	onSelected?: () => void;
};

const MenuContext = React.createContext({} as MenuContextType);

export const Menu: React.FC<MenuProps> = ({ children, initialSelection, onSelected }) => {
	const [selected, setSelected] = useState(initialSelection ?? '');
	return (
		<MenuContext.Provider value={{ selected, setSelected, onSelected }}>
			{children}
		</MenuContext.Provider>
	);
};

export const SubMenu: React.FC<SubMenuProp> = (props) => {
	const { title, children } = props;
	const [open, setOpen] = useState(false);
	const rotate = useSpring({ rotate: open ? '180deg' : '0deg' });

	return (
		<View>
			<Pressable onPress={() => setOpen((p) => !p)}>
				<HStack alignItems="center" mr={4}>
					<View pointerEvents="none" flex={1}>
						<DrawerItem label={title} onPress={() => {}} />
					</View>
					<animated.View style={[{ transform: [rotate] }]}>
						<Icon size={3} as={<AntDesign name="down" />} />
					</animated.View>
				</HStack>
			</Pressable>
			<Collapse isOpen={open}>
				<View pl={4}>{children}</View>
			</Collapse>
		</View>
	);
};

export const MenuItem = (props: MenuItemProp) => {
	const { name, itemKey, onPress } = props;
	const { selected, setSelected, onSelected } = useContext(MenuContext);
	return (
		<DrawerItem
			focused={selected === itemKey}
			label={name}
			onPress={() => {
				if (itemKey) {
					setSelected(itemKey);
					onSelected?.();
				}
				onPress?.();
			}}
		/>
	);
};
