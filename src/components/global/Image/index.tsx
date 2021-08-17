import React from 'react';
import { Image as BaseImage } from 'native-base';

import type { IImageProps } from 'native-base';

export type ImageProps = Partial<IImageProps>;

const defaultImageUrl = require('./default_product_image.jpg');

const Image = (props: ImageProps) => <BaseImage {...(props as IImageProps)} />;

Image.defaultProps = {
	source: defaultImageUrl,
	fallbackSource: defaultImageUrl,
	resizeMode: 'contain',
	size: 'md',
	alt: 'Default Product Image'
};

export default Image;
