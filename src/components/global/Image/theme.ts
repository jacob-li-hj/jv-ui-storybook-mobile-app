import type { ImageTheme } from '@themes/types';

const defaultImageUrl = require('./default_product_image.jpg');

export const Image = {
	defaultProps: {
		fallbackSource: defaultImageUrl
	}
} as unknown as ImageTheme;
