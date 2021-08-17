import React from 'react';
import { VStack } from 'native-base';

import type { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

const Emphasis = (props: IVStackProps) => <VStack bg="Emphasis" p="8px" {...props} />;

export default Emphasis;
