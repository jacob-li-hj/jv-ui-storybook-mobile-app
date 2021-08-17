import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HistoryItem, SuggestionItem, ProductItem } from '@components';
import { Input, HStack, View, Text, SearchIcon, Button, VStack, ScrollView } from '@basic';

export const Search = () => (
	<VStack h="100%">
		<HStack>
			<HStack
				flex={1}
				alignItems="center"
				h="40px"
				bg="#F8FAFC"
				borderWidth="1px"
				borderColor="#B3C6E0"
				borderRadius="4px"
			>
				<Input
					flex={1}
					py={0}
					pr={0}
					pl="8px"
					h="40px"
					borderColor="transparent"
					placeholder="Search all products"
					returnKeyType="search"
					_focus={{
						borderColor: 'transparent'
					}}
				/>
				<TouchableOpacity onPress={() => {}}>
					<SearchIcon px="14px" color="#545759" size={11.6} />
				</TouchableOpacity>
			</HStack>
			<VStack alignItems="center">
				<Button px={0} variant="unstyled">
					<TouchableOpacity>
						<Text mx="16px" fontSize="xs">
							Cancel
						</Text>
					</TouchableOpacity>
				</Button>
			</VStack>
		</HStack>
		<View my={2} borderBottomWidth="1px" borderColor="#F0F3F5" />
		<ScrollView px={1}>
			{['toilets', 'toilets paper', 'toilet seal'].map((v) => (
				<HistoryItem key={v}>{v}</HistoryItem>
			))}
			{['Toilet & Urinal Parts', 'Toilets, Toilet Seats & Urinals', 'Toilet Levers'].map((v) => (
				<SuggestionItem key={v}>{v}</SuggestionItem>
			))}
			{[
				'K4387-0 - KOHLER Memoirs® 1.28 gpf Round Toilet Bowl in White',
				'PFCT103HEWH - PROFLO® 1.28 gpf Complete Toilet with ADA-Compliant…',
				'PFCT103HEWH - PROFLO® 1.29 gpf Complete Toilet with ADA-Compliant…'
			].map((v) => (
				<ProductItem key={v}>{v}</ProductItem>
			))}
		</ScrollView>
	</VStack>
);
