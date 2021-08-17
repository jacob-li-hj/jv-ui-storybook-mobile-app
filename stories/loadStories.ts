/* eslint-disable no-param-reassign, no-return-assign, no-sequences */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import stories from '../storyLoader';

type RenderRoute = Required<Pick<Route, 'component' | 'name'>>;

interface Route {
	name: string;
	component?: string;
	children?: Routes;
}

type Routes = Route[];

type RenderRoutes = { path: string; route: RenderRoute };

const getFlatRenderRoutes = (routes: Routes, path: string = ''): RenderRoutes[] =>
	routes.flatMap((route) => {
		const { name, children } = route;
		if (children) return getFlatRenderRoutes(children, path ? `${path}/${name}` : name);
		return { path, route } as RenderRoutes;
	});

export const storiesOfRoutes = (routes: Routes, module: NodeModule) => {
	const storiesOfRoutesMap = getFlatRenderRoutes(routes).reduce(
		(map, current) => (
			(map.hasOwnProperty(current.path)
				? map[current.path]
				: (map[current.path] = [] as RenderRoute[])
			).push(current.route),
			map
		),
		{} as Record<string, RenderRoute[]>
	);
	const storiesOfMap: Record<string, ReturnType<typeof storiesOf>> = {};

	// eslint-disable-next-line @typescript-eslint/no-shadow
	Object.entries(storiesOfRoutesMap).forEach(([kind, stories]) => {
		if (!storiesOfMap.hasOwnProperty(kind)) {
			storiesOfMap[kind] = storiesOf(kind, module);
		}
		stories.forEach((story) => {
			const { name, component: Component } = story;
			storiesOfMap[kind].add(name, () => React.createElement(Component));
		});
	});
};

storiesOfRoutes(stories, module);
