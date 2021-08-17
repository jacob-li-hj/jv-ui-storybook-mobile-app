import { extendTheme } from 'native-base';

// components
import { Button } from '@components/global/Button/theme';
import { Alert, AlertDescription } from '@components/global/Alert/theme';
import { Input } from '@components/global/Input/theme';
import { Heading, Text } from '@components/global/Text/theme';
import { Image } from '@components/global/Image/theme';
import Modal from '@components/global/Modal/theme';

// design
import fontSizes from './font-sizes';
import colors from './colors';

const theme = extendTheme({
	components: {
		Input,
		Button,
		Alert,
		AlertDescription,
		Heading,
		Text,
		Image,
		...Modal
	},
	fontSizes,
	colors
});

export default theme;
