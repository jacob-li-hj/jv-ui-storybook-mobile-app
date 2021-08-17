import type { Dispatch, Key, SetStateAction, ReactNode } from 'react';
import type { ToastProps } from './useToast';

export type ToastComponent = {
	id: Key;
	component: ReactNode;
	config?: ToastProps;
};

export type ToastRenderProps = {
	id: Key;
	onClose: () => void;
};

export type ToastInfo = Record<Placement, ToastComponent[]>;

export type Placement =
	| 'top'
	| 'top-right'
	| 'top-left'
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'center'
	| 'center-left'
	| 'center-right';

export type Positions = {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
};

export interface ToastContextTypes {
	toastInfo: Record<Placement, ToastComponent[]>;
	visibleToasts: Record<Key, boolean>;
	setToast: (props: ToastProps) => Key;
	removeToast: (id: Key) => void;
	hideAll: () => void;
	hideToast: (id: Key) => void;
	isActive: (id: Key) => boolean;
	setToastInfo: Dispatch<SetStateAction<ToastContextTypes['toastInfo']>>;
	setVisibleToasts: Dispatch<SetStateAction<ToastContextTypes['visibleToasts']>>;
}
