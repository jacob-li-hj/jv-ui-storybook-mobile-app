import React, { useContext } from 'react';
import { Modal as BaseModal, usePropsResolution, Box, HStack } from 'native-base';

import type { IBoxProps } from 'native-base';

import Icon from '@components/global/Icon';

export interface ModalVariants {
	variant?: 'legacy' | 'legacy-warning' | 'legacy-success';
}

export type ModalProps = Parameters<typeof BaseModal>[0] & ModalVariants;

export interface ModalHeaderProps extends IBoxProps {
	statusIcon?: boolean;
}

type PickMemoExoticComponentProps<T> = T extends React.ComponentType<infer R> ? R : never;

const ModalVariantContext = React.createContext<ModalVariants['variant']>(undefined);

const ModalWithVariant = (props: ModalProps) => {
	const { variant, children, closeOnOverlayClick = false, ...restProps } = props;
	return (
		<BaseModal {...restProps} closeOnOverlayClick={closeOnOverlayClick}>
			<ModalVariantContext.Provider value={variant}>{children}</ModalVariantContext.Provider>
		</BaseModal>
	);
};

const legacyHeaderIconMap = {
	legacy: null,
	'legacy-success': 'Success',
	'legacy-warning': 'Warning'
} as const;

const ModalHeaderWithIcon = (props: ModalHeaderProps) => {
	const variant = useContext(ModalVariantContext);
	const {
		_text,
		children,
		statusIcon = true,
		...newProps
	} = usePropsResolution('ModalHeader', {
		...props,
		variant
	});

	const statusIconName = variant && legacyHeaderIconMap[variant];

	return (
		<HStack justifyContent="flex-start" alignItems="center" {...newProps}>
			{statusIcon && statusIconName && <Icon name={statusIconName} mr="8px" size={28} />}
			<Box _text={_text}>{children}</Box>
		</HStack>
	);
};

// native-base base ModalBody wrap in a ScrollView
const ModalBody = (props: IBoxProps) => {
	const variant = useContext(ModalVariantContext);
	const { children, ...newProps } = usePropsResolution('ModalBody', { ...props, variant });
	return <Box {...newProps}>{children}</Box>;
};

const makeVariant =
	<T extends React.ComponentType>(Component: React.MemoExoticComponent<T>) =>
	// Ordinary generic inference will produce Pick<T> type, using infer to get the props type in MemoExoticComponent
	(props: PickMemoExoticComponentProps<T>) =>
		(
			<ModalVariantContext.Consumer>
				{(variant) => <Component variant={variant} {...(props as any)} />}
			</ModalVariantContext.Consumer>
		);

const ModalContent = makeVariant(BaseModal.Content);
const ModalFooter = makeVariant(BaseModal.Footer);
const ModalCloseButton = makeVariant(BaseModal.CloseButton);

const Modal = ModalWithVariant as unknown as {
	(props: ModalProps): JSX.Element;
	Header: typeof ModalHeaderWithIcon;
	Content: typeof ModalContent;
	Body: typeof ModalBody;
	Footer: typeof ModalFooter;
	CloseButton: typeof ModalCloseButton;
};

Modal.Header = ModalHeaderWithIcon;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;

export default Modal;
