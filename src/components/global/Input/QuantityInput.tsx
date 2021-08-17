import React, { useState } from 'react';

import { useDerivedState } from '@hooks/useDerivedState';
import { animated, useSpring } from '@react-spring/native';
import { HStack } from 'native-base';
import { clamp } from 'lodash-es';

import type { InputProps } from './Input';

import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import type { IBoxProps } from 'native-base';

import Input from './Input';
import Button from '../Button';
import Icon from '../Icon';

export type QuantityInputVariation = 'expanded' | 'condensed';

export interface QuantityInputProps
	extends IBoxProps,
		Pick<InputProps, 'onFocus' | 'onBlur' | 'validateStatus'> {
	value?: number;
	defaultValue?: number;
	variation?: QuantityInputVariation;
	onChange?: (newValue: number, pervValue: number) => void;
	onStep?: (newValue: number) => void;
	step?: number;
	min?: number;
	max?: number;

	warningIfEmpty?: boolean;
}

const getBtnDisabled = (min: number, max: number, value?: number) => {
	if (value === undefined) return null;
	if (value <= min) return 'sub';
	if (value >= max) return 'add';
	return null;
};

const buttonWidth = 40;

const QuantityInput = (props: QuantityInputProps) => {
	const {
		variation = 'expanded',
		value: propsValue,
		defaultValue: propsDefaultValue,
		onChange: propsOnChange,
		min = 1,
		max = 999999,
		step = 1,
		warningIfEmpty = true,
		validateStatus,
		onFocus: propsOnFocus,
		onBlur: propsOnBlur,
		onStep: propsOnStep,
		...restProps
	} = props;

	const defaultValue = propsValue ?? propsDefaultValue ?? min;

	const [value, setValue] = useDerivedState(defaultValue, {
		postState: () => propsValue ?? null,
		onChange: propsOnChange
	});

	const disabledBtn = getBtnDisabled(min, max, value);

	const [open, setOpen] = useState(false);

	const translateSub = useSpring({ translateX: open ? -buttonWidth : 0 });
	const translateAdd = useSpring({ translateX: open ? buttonWidth : 0 });

	const clampValue = (newValue: number) => clamp(newValue, min, max);

	const onChangeText = (text: string) => {
		const newValue = +text;
		const clamped = clampValue(newValue);
		setValue(clamped);
	};

	const buttonProps = {
		w: `${buttonWidth}px`,
		variant: 'ghost',
		_pressed: { bg: 'Secondary' },
		_disabled: { bg: 'white' }
	} as const;

	const subDisabled = disabledBtn === 'sub';
	const addDisabled = disabledBtn === 'add';

	const onStep = (add: boolean) => {
		if ((add && addDisabled) || (!add && subDisabled)) {
			return;
		}
		const newValue = add ? value + step : value - step;
		const clamped = clampValue(newValue);
		propsOnStep?.(clamped);
		setValue(clamped);
	};

	const subButton = (
		<Button
			{...buttonProps}
			borderRightRadius={0}
			borderRightWidth={0}
			isDisabled={subDisabled}
			onPress={() => onStep(false)}
		>
			<Icon color={subDisabled ? 'Disabled' : 'Primary'} size={16} name="Subtract" />
		</Button>
	);

	const addButton = (
		<Button
			{...buttonProps}
			borderLeftRadius={0}
			borderLeftWidth={0}
			isDisabled={addDisabled}
			onPress={() => onStep(true)}
		>
			<Icon color={addDisabled ? 'Disabled' : 'Primary'} size={16} name="Add" />
		</Button>
	);

	const showingValue = value || '';

	// eslint-disable-next-line no-nested-ternary
	const nextValidateStatus = warningIfEmpty
		? !showingValue
			? 'warning'
			: validateStatus
		: validateStatus;

	const onFocus = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		if (variation === 'condensed') {
			setOpen(true);
		}
		propsOnFocus?.(event);
	};

	const onBlur = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
		if (variation === 'condensed') {
			setOpen(false);
		}
		if (!showingValue) {
			setValue(min);
		}
		propsOnBlur?.(event);
	};

	const inputProps = {
		hideValidateIcon: true,
		onBlur,
		onFocus,
		onChangeText,
		value: `${showingValue}`,
		validateStatus: nextValidateStatus,
		_input: { textAlign: 'center' as const }
	};

	if (variation === 'condensed') {
		return (
			<HStack {...restProps}>
				<animated.View
					style={[{ transform: [translateSub], position: 'absolute', left: 0, top: 0 }]}
				>
					{subButton}
				</animated.View>
				<animated.View
					style={[{ transform: [translateAdd], position: 'absolute', right: 0, top: 0 }]}
				>
					{addButton}
				</animated.View>
				<Input flex={1} borderRadius={open ? 0 : undefined} style={{ zIndex: 2 }} {...inputProps} />
			</HStack>
		);
	}
	return (
		<HStack {...restProps}>
			{subButton}
			<Input flex={1} borderRadius={0} {...inputProps} />
			{addButton}
		</HStack>
	);
};

export default QuantityInput;
