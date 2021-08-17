import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import { ThemeProvider } from '@components';

import getRoute from './getRoute';
import linkTo from './linkTo';
import { Menu, SubMenu, MenuItem } from './Menu';
import FabButton from './FabButton';
import NavigationHeader from './Header';

import type { Route } from './getRoute';

const Drawer = createDrawerNavigator();

const renderRoute = (routes: Route[]) =>
	routes.map((item) => {
		if (item.name === 'Welcome') {
			const [welcomeItem] = item.children[0].children;
			return (
				<MenuItem
					key={welcomeItem.id}
					itemKey={welcomeItem.id}
					name={welcomeItem.name}
					onPress={() => linkTo(welcomeItem.id!, welcomeItem.name)}
				/>
			);
		}
		if (item.children.length !== 0) {
			return (
				<SubMenu key={item.name} title={item.name}>
					{renderRoute(item.children)}
				</SubMenu>
			);
		}
		return (
			<MenuItem
				key={item.id}
				itemKey={item.id}
				name={item.name}
				onPress={() => linkTo(item.id!, item.name)}
			/>
		);
	});

type NavigationProps = { story: React.ComponentType; initialSelection?: string };

const Navigation = ({ story, initialSelection }: NavigationProps) => {
	const route = getRoute();
	return (
		<ThemeProvider>
			<NavigationContainer>
				<Drawer.Navigator
					screenOptions={{
						header: () => <NavigationHeader />
					}}
					backBehavior="none"
					drawerContent={({ navigation }) => (
						<DrawerContentScrollView>
							<Menu initialSelection={initialSelection} onSelected={navigation.closeDrawer}>
								{renderRoute(route)}
							</Menu>
							<FabButton onPress={() => navigation.toggleDrawer()} />
						</DrawerContentScrollView>
					)}
				>
					<Drawer.Screen name="Storybook" component={story} />
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
};

export default Navigation;
