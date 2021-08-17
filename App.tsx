import React from 'react';
import asyncStorage from '@react-native-async-storage/async-storage';
import { getStorybookUI, addDecorator } from '@storybook/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View } from '@basic';

import Navigation from './navigation';

import './stories/loadStories';

addDecorator((story) => <SafeAreaView>{story() as React.ReactElement}</SafeAreaView>);
addDecorator((story) => (
	<View flex={1} p={2} bg="White">
		{story() as React.ReactElement}
	</View>
));

const initialSelection = 'welcome-welcome-to-storybook--welcome';

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
	onDeviceUI: false,
	asyncStorage,
	initialSelection,
	resetStorybook: true
});

export default function App() {
	return <Navigation story={StorybookUIRoot} initialSelection={initialSelection} />;
}
