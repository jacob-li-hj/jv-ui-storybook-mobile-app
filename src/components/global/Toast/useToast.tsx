import React, { useState } from 'react';
import { AccessibilityInfo, Easing, Platform } from 'react-native';
import { PresenceTransition, VStack, View, Box } from 'native-base';
import { OverlayContainer } from '@react-native-aria/overlays';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import type { IBoxProps } from 'native-base';

import Alert from '@components/global/Alert';
import ToastContext from './ToastContext';

import type { Placement, Positions, ToastComponent, ToastInfo, ToastRenderProps } from './types';

export interface ToastProps extends IBoxProps {
	title?: React.ReactNode;
	description?: React.ReactNode;
	duration?: number | null;
	id?: React.Key;
	preventDuplicate?: boolean;
	closable?: boolean;
	onClose?: () => void;
	overlay?: boolean;
	placement?: Placement;
	render?: (props: ToastRenderProps) => React.ReactNode;
	status?: 'info' | 'warning' | 'error' | 'success';
	accessibilityAnnouncement?: string;
	accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
}

const TOP_INSET = getStatusBarHeight() + 56 + 16;
const BOTTOM_INSET = 50;

const POSITIONS: Record<Placement, Positions> = {
	top: {
		top: TOP_INSET,
		left: 0,
		right: 0
	},
	'top-right': {
		top: TOP_INSET,
		right: 0
	},
	'top-left': {
		top: TOP_INSET,
		left: 0
	},
	bottom: {
		bottom: BOTTOM_INSET,
		left: 0,
		right: 0
	},
	'bottom-left': {
		bottom: BOTTOM_INSET,
		left: 0
	},
	'bottom-right': {
		bottom: BOTTOM_INSET,
		right: 0
	},
	center: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	'center-left': {
		top: 0,
		bottom: 0,
		left: 0
	},
	'center-right': {
		top: 0,
		bottom: 0,
		right: 0
	}
};

const initialAnimationOffset = 24;

const transitionConfig: Record<Placement, number> = {
	bottom: initialAnimationOffset,
	top: -initialAnimationOffset,
	'top-right': -initialAnimationOffset,
	'top-left': -initialAnimationOffset,
	'bottom-left': initialAnimationOffset,
	'bottom-right': initialAnimationOffset,
	center: 0,
	'center-left': 0,
	'center-right': 0
};

const ToastContainer = () => {
	const { toastInfo, visibleToasts, removeToast } = React.useContext(ToastContext);

	const getPositions = () => Object.keys(toastInfo) as Placement[];

	const showOverlay = Object.entries(visibleToasts)
		.filter(([, state]) => state)
		.map(([key]) => key)
		.some((key) =>
			Object.values(toastInfo)
				.flat()
				// eslint-disable-next-line eqeqeq
				.some((info) => info.id == key && info.config?.overlay)
		);

	return getPositions().length > 0 ? (
		<OverlayContainer>
			{showOverlay && <View position="absolute" top={0} right={0} bottom={0} left={0} />}
			{getPositions().map((position) => {
				if (Object.keys(POSITIONS).includes(position))
					return (
						<VStack
							margin="auto"
							key={position}
							{...POSITIONS[position]}
							space={2}
							pointerEvents="box-none"
							position="absolute"
							alignItems="center"
							justifyContent="center"
						>
							{toastInfo[position].map((toast: ToastComponent) => {
								return (
									<PresenceTransition
										key={toast.id}
										visible={visibleToasts[toast.id]}
										onTransitionComplete={(status) => {
											if (status === 'exited') {
												removeToast(toast.id);
												toast.config?.onClose?.();
											}
										}}
										initial={{
											opacity: 0,
											translateY: transitionConfig[position]
										}}
										animate={{
											opacity: 1,
											transition: { easing: Easing.ease, duration: 250 }
										}}
										exit={{
											opacity: 0,
											scale: 0.85,
											transition: { easing: Easing.ease, duration: 100 }
										}}
									>
										{toast.component}
									</PresenceTransition>
								);
							})}
						</VStack>
					);
				return null;
			})}
		</OverlayContainer>
	) : null;
};

export const ToastProvider: React.FC = ({ children }) => {
	const [toastInfo, setToastInfo] = useState<ToastInfo>({} as ToastInfo);
	const [visibleToasts, setVisibleToasts] = useState<Record<React.Key, boolean>>({});
	const toastIndex = React.useRef(1);

	const hideAll = () => {
		setVisibleToasts({});
	};

	const hideToast = (id: React.Key) => {
		setVisibleToasts((prevVisibleToasts) => ({
			...prevVisibleToasts,
			[id]: false
		}));
	};

	const isActive = (id: React.Key) =>
		Object.values(toastInfo).some((positionArray) =>
			positionArray.some((toastData) => toastData.id === id)
		);

	const removeToast = (id: React.Key) => {
		setToastInfo((prev) => {
			// eslint-disable-next-line no-restricted-syntax
			for (const toastPosition of Object.keys(prev)) {
				const positionArray = prev[toastPosition as Placement];
				const isToastPresent = positionArray.find((toastData) => toastData.id === id);

				if (isToastPresent) {
					const newPositionArray = positionArray.filter((item) => item.id !== id);
					return { ...prev, [toastPosition]: newPositionArray };
				}
			}
			return prev;
		});
	};

	const setToast = (props: ToastProps) => {
		const {
			placement = 'top',
			render,
			status,
			// eslint-disable-next-line no-plusplus
			id = toastIndex.current++,
			title,
			description,
			preventDuplicate = true,
			closable = true,
			onClose: propsOnClose,
			overlay: propsOverlay,
			duration = 5000,
			accessibilityAnnouncement,
			accessibilityLiveRegion = 'polite',
			...rest
		} = props;
		const positionToastArray = toastInfo[placement] ?? [];

		if (preventDuplicate) {
			if (isActive(id)) {
				return id;
			}
		}

		let component;

		const onClose = () => {
			hideToast(id);
		};

		if (render) {
			component = render({ id: toastIndex.current, onClose });
		} else {
			component = (
				<Box w="100%" px="8px">
					<Alert
						status={status}
						accessibilityLiveRegion={accessibilityLiveRegion}
						w="100%"
						{...rest}
					>
						<Alert.Icon />
						{title && <Alert.Title>{title}</Alert.Title>}
						{description && <Alert.Description>{description}</Alert.Description>}
						{closable && <Alert.CloseIcon onPress={onClose} />}
					</Alert>
				</Box>
			);
		}

		toastInfo[placement] = [...positionToastArray, { component, id, config: props }];

		setToastInfo({ ...toastInfo });

		setVisibleToasts({ ...visibleToasts, [id]: true });

		if (duration !== null) {
			setTimeout(() => {
				onClose();
			}, duration);
		}

		// iOS doesn't support accessibilityLiveRegion
		if (accessibilityAnnouncement && Platform.OS === 'ios') {
			AccessibilityInfo.announceForAccessibility(accessibilityAnnouncement);
		}

		return id;
	};
	return (
		<ToastContext.Provider
			value={{
				toastInfo,
				setToastInfo,
				setToast,
				removeToast,
				hideAll,
				isActive,
				visibleToasts,
				setVisibleToasts,
				hideToast
			}}
		>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
};

const useToast = () => {
	// Todo useContextSelector
	const { setToast, hideAll, isActive, hideToast } = React.useContext(ToastContext);

	const toast = {
		show: setToast,
		close: hideToast,
		closeAll: hideAll,
		isActive
	};

	return toast;
};

export default useToast;
