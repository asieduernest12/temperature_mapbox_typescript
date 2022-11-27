import { createContext } from 'react';
import { MapPoint } from '../..';

export const TempContext = createContext<{ points: MapPoint[]; setPoints: (points: MapPoint[]) => void | MapPoint[] }>({
	points: [],
	setPoints: null,
} as any);
