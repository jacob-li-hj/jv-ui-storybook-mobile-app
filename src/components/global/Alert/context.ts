import React from 'react';

import type { Status } from '@components/global/interface';

type AlertContextType = { status: Status };

const AlertContext = React.createContext({} as AlertContextType);

export default AlertContext;
