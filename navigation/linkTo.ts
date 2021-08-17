import { DeviceEventEmitter } from 'react-native';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import { addons } from '@storybook/addons';

const LinkTo = (storyId: string, name: string) => {
	const channel = addons.getChannel();

	DeviceEventEmitter.emit('setHeaderTitle', name);

	channel.emit(SET_CURRENT_STORY, { storyId });
};

export default LinkTo;
