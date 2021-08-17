import { raw } from '@storybook/react-native';

import type { StoreItem } from '@storybook/client-api/dist/types';

export type Route = {
	kind?: string;
	name: string;
	id?: string;
	children: Route[];
};

const createRouteFromStoreItem = (storeItem: StoreItem) => {
	const path = storeItem.kind.split('/');
	const route = {
		kind: storeItem.kind,
		name: storeItem.name,
		id: storeItem.id,
		children: []
	};
	return [path, route] as [string[], Required<Route>];
};

const generateRoute = (
	routes: Route[],
	[path, route]: ReturnType<typeof createRouteFromStoreItem>
) => {
	let parent: Route;
	let currentLevel = routes;
	while (path.length !== 0) {
		const parentName = path.shift()!;
		const current = currentLevel.find((item) => item.name === parentName);
		if (!current) {
			parent = {
				name: parentName,
				children: []
			};
			currentLevel.push(parent);
		} else {
			parent = current;
		}
		currentLevel = parent!.children;
	}
	parent!.children.push(route);
	return routes;
};

const getRoute = () =>
	raw()
		.map(createRouteFromStoreItem)
		.reduce(generateRoute, [] as Route[]);

const builtInOrder = ['Welcome', 'Atoms', 'Molecules', 'Organisms', 'Experiences'];

const sortRoute = (route: Route[]) => {
	const skipSort = route.some((item) => item.id);
	if (skipSort) {
		return route;
	}
	route.sort((a, b) => {
		if (builtInOrder.includes(a.name) && builtInOrder.includes(b.name)) {
			return builtInOrder.indexOf(a.name) - builtInOrder.indexOf(b.name);
		}
		return a.name > b.name ? 1 : -1;
	});
	// eslint-disable-next-line no-return-assign
	route.forEach((item) => {
		// eslint-disable-next-line no-param-reassign
		item.children = sortRoute(item.children);
	});
	return route;
};

export default () => sortRoute(getRoute());
