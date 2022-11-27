import React, { FC, ReactElement, useState } from 'react';
import { MapPoint } from '..';
import { Dashboard } from './pages/dashboard';
import { TempContext } from './utils/TempContext';

const App: FC = (): ReactElement => {
	const [points, setPoints] = useState<MapPoint[]>([]);
	const store = { points, setPoints };

	return (
		<TempContext.Provider value={store}>
			<div className='wrapper'>
				<Dashboard />
			</div>
		</TempContext.Provider>
	);
};

export default App;
