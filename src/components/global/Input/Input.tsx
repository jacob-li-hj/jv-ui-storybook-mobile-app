import React, { useState } from 'react';
import { HStack, Input as BaseInput, usePropsResolution, View } from 'native-base';
import { omit, pick, upperFirst } from 'lodash-es';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import type { IInputProps } from 'native-base';

import { useResolvedFontFamily } from '@hooks/useResolvedFontFamily';
import Icon from '@components/global/Icon';

export interface InputProps
	extends Omit<IInputProps, 'InputLeftElement' | 'InputRightElement' | 'variant' | 'isFullWidth'> {
	validateStatus?: 'info' | 'success' | 'warning' | 'error';
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;

	hideValidateIcon?: boolean;

	_input?: IInputProps;
}

const calcInnerInputHeight = (height?: string) => {
	if (!height) return undefined;
	const heightNumber = parseInt(height, 10);
	return `${heightNumber - 4}px`;
};

const omitBorderProps = (
	props: Record<string, any>
): [Record<string, any>, Record<string, any>] => {
	const keys = ['border', 'borderWidth', 'borderColor', 'borderRadius'];
	return [omit(props, keys), pick(props, keys)];
};

const Input = (props: InputProps) => {
	const {
		prefix,
		suffix,
		value,
		defaultValue,
		onKeyPress,
		onChange,
		onChangeText,
		onFocus: propsOnFocus,
		onBlur: propsOnBlur,
		hideValidateIcon,
		_input,
		...restProps
	} = props;

	const [focus, setFocus] = useState(false);

	const {
		// TODO
		isFullWidth,
		isDisabled,
		isInvalid,
		isReadOnly,
		ariaLabel,
		accessibilityLabel,
		placeholderTextColor,
		selectionColor,
		underlineColorAndroid,
		type,
		// TODO
		_hover,
		_focus,
		_disabled,
		_invalid,
		fontFamily,
		fontWeight,
		fontStyle,
		variant,
		validateStatus,
		...themedProps
	} = usePropsResolution('Input', { ...restProps });

	const inputHeight = calcInnerInputHeight(themedProps.height);

	const resolvedFontFamily = useResolvedFontFamily({
		fontFamily,
		fontWeight,
		fontStyle
	});

	const onFocus = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setFocus(true);
		propsOnFocus?.(event);
	};

	const onBlur = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setFocus(false);
		propsOnBlur?.(event);
	};

	const [mergedThemedProps, borderProps] = omitBorderProps({
		...themedProps,
		...(focus && _focus)
	});

	const { px: gapValue } = mergedThemedProps;

	const borderElement = (
		<View position="absolute" top={0} bottom={0} left={0} right={0} {...borderProps} bg="#fff" />
	);

	const validateIcon = validateStatus && (
		<Icon ml={gapValue} name={upperFirst(validateStatus) as any} />
	);

	const prefixElement = prefix && <View mr={gapValue}>{prefix}</View>;
	const suffixElement = suffix && <View ml={gapValue}>{suffix}</View>;

	return (
		<HStack
			alignItems="center"
			{...mergedThemedProps}
			borderRadius={borderProps.borderRadius}
			border="none"
		>
			{borderElement}
			{prefixElement}
			<BaseInput
				flex={1}
				p={0}
				border="none"
				height={inputHeight}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
				onChangeText={onChangeText}
				value={value}
				defaultValue={defaultValue}
				{...resolvedFontFamily}
				{..._input}
			/>
			{suffixElement}
			{!hideValidateIcon && validateIcon}
		</HStack>
	);
};

export default Input;
