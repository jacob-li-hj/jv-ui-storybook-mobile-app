import React from 'react';

import iconNames from '@components/global/Icon/IconNames';
import { Icon } from '@components';

import {
	AddIcon,
	ArrowBackIcon,
	ArrowDownIcon,
	ArrowForwardIcon,
	ArrowUpIcon,
	Center,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronUpIcon,
	CircleIcon,
	HamburgerIcon,
	InfoIcon,
	InfoOutlineIcon,
	MinusIcon,
	MoonIcon,
	QuestionIcon,
	QuestionOutlineIcon,
	ScrollView,
	SearchIcon,
	SimpleGrid,
	SmallCloseIcon,
	SunIcon,
	WarningIcon,
	WarningTwoIcon
} from '@basic';

export const Default = () => (
	<ScrollView w="100%">
		<Center>
			<SimpleGrid
				// Todo
				// @ts-ignore
				columns={{
					base: 6,
					md: 9
				}}
				space={8}
			>
				<AddIcon />
				<ArrowBackIcon />
				<ArrowForwardIcon />
				<ArrowUpIcon />
				<ArrowDownIcon />
				<CheckIcon />
				<CheckCircleIcon />
				<ChevronDownIcon />
				<ChevronLeftIcon />
				<ChevronUpIcon />
				<CircleIcon />
				<SmallCloseIcon />
				<HamburgerIcon />
				<InfoIcon />
				<InfoOutlineIcon />
				<MinusIcon />
				<MoonIcon />
				<QuestionIcon />
				<QuestionOutlineIcon />
				<SearchIcon />
				<SunIcon />
				<WarningIcon />
				<WarningTwoIcon />
			</SimpleGrid>
		</Center>
	</ScrollView>
);

export const Custom = () => (
	<ScrollView w="100%">
		<Center>
			<SimpleGrid
				// @ts-ignore
				columns={{
					base: 6,
					md: 9
				}}
				space={8}
			>
				{iconNames.map((name) => (
					<Icon name={name} key={name} />
				))}
			</SimpleGrid>
		</Center>
	</ScrollView>
);
