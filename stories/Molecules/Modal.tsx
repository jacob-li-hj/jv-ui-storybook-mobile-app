import React from 'react';

import { Modal, Button } from '@components';
import { VStack } from 'native-base';

const ModalOpener: React.FC<{ text: string }> = ({ text, children }) => {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onPress={() => setOpen(true)}>{text}</Button>
			{React.cloneElement(children as React.ReactElement, {
				isOpen: open,
				onClose: () => setOpen(false)
			})}
		</>
	);
};

export const ModalExample = () => (
	<VStack space={4}>
		<ModalOpener text="Default Modal">
			<Modal isOpen variant="legacy">
				<Modal.Content h="200px">
					<Modal.CloseButton />
					<Modal.Header>Default Modal</Modal.Header>
					<Modal.Body>Default</Modal.Body>
				</Modal.Content>
			</Modal>
		</ModalOpener>
		<ModalOpener text="Success Modal">
			<Modal isOpen variant="legacy-success">
				<Modal.Content h="200px">
					<Modal.CloseButton />
					<Modal.Header>Success Modal</Modal.Header>
					<Modal.Body>Success</Modal.Body>
				</Modal.Content>
			</Modal>
		</ModalOpener>
		<ModalOpener text="Warning Modal">
			<Modal isOpen variant="legacy-warning">
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header>Warning Modal</Modal.Header>
					<Modal.Body>Warning</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" w="100px">
							Ok
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</ModalOpener>
	</VStack>
);

ModalExample.storyName = 'Modal';
