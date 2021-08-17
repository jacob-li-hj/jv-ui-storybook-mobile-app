import React from 'react';
import { Text as BaseText } from 'native-base';

import type { ITextProps } from 'native-base';

import type { FontSizes, FontWeights } from '@themes/types';

type UsableFontSizes = Pick<FontSizes, 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

type FontSizesProps = {
	[K in keyof UsableFontSizes]?: boolean;
};

type FontWeightsProps = {
	[K in keyof FontWeights]?: boolean;
};

export type TextProps = ITextProps & FontSizesProps & FontWeightsProps;

const ignoreFontSizesProps = (
	props: TextProps
): [{ fontSize?: keyof FontSizesProps }, ITextProps & FontWeightsProps] => {
	const { xxs, xs, sm, md, lg, xl, ...restProps } = props;
	return [
		{
			fontSize:
				(xxs && 'xxs') ||
				(xs && 'xs') ||
				(sm && 'sm') ||
				(md && 'md') ||
				(lg && 'lg') ||
				(xl && 'xl') ||
				undefined
		},
		restProps
	];
};

const ignoreFontWeightsProps = (
	props: ReturnType<typeof ignoreFontSizesProps>[1]
): [{ fontWeight?: keyof FontWeightsProps }, ITextProps] => {
	const { hairline, thin, light, normal, medium, semibold, bold, extrabold, black, ...restProps } =
		props;
	return [
		{
			fontWeight:
				(hairline && 'hairline') ||
				(thin && 'thin') ||
				(light && 'light') ||
				(normal && 'normal') ||
				(medium && 'medium') ||
				(semibold && 'semibold') ||
				(bold && 'bold') ||
				(extrabold && 'extrabold') ||
				(black && 'black') ||
				undefined
		},
		restProps
	];
};

const Text = (props: TextProps) => {
	const [fontSize, omitFontSizesProps] = ignoreFontSizesProps(props);
	const [fontWeight, omitFontWeightsProps] = ignoreFontWeightsProps(omitFontSizesProps);

	const mergedProps = { ...fontSize, ...fontWeight, ...omitFontWeightsProps };

	return <BaseText {...mergedProps} />;
};

export default Text;
