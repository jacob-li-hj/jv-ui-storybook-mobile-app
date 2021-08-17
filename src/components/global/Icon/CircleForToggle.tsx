// @ts-nocheck
// GENERATE BY scripts/icon.js
// DON NOT EDIT IT MANUALLY
import * as React from 'react';
import Svg, { SvgProps, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

function CircleForToggle(props: SvgProps) {
	return (
		<Svg
			data-token-name="CircleforToggle"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2.955A9.045 9.045 0 002.955 12 9.046 9.046 0 1012 2.955z"
				fill="white"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 17.052a5.052 5.052 0 110-10.104 5.052 5.052 0 010 10.104z"
				fill="url(#prefix__paint0_linear)"
			/>
			<Defs>
				<LinearGradient
					id="prefix__paint0_linear"
					x1={17.052}
					y1={17.052}
					x2={17.052}
					y2={6.948}
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor="white" />
					<Stop offset={1} stopColor="#DFE4EB" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

export default CircleForToggle;
