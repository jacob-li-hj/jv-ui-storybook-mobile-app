import React from 'react';

import { HistoryItem, ProductItem, SuggestionItem } from '@components';
import { VStack } from '@basic';

export const HistoryItemExample = () => (
	<VStack space={4}>
		<HistoryItem>toilets</HistoryItem>
	</VStack>
);

HistoryItemExample.storyName = 'HistoryItem';

export const SuggestionItemExample = () => (
	<VStack space={4}>
		<SuggestionItem>Toilets, Toilet Seats & Urinals</SuggestionItem>
	</VStack>
);
SuggestionItemExample.storyName = 'SuggestionItem';

export const ProductItemExample = () => (
	<VStack space={4}>
		<ProductItem>PFCT103HEWH - PROFLO® 1.28 gpf Complete Toilet with ADA-Compliant…</ProductItem>
	</VStack>
);
ProductItemExample.storyName = 'ProductItem';
