import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { ReactElement, useContext } from 'react';
import { MdLocationOn } from 'react-icons/md';
import Map, { Marker } from 'react-map-gl';
import { TempContext } from '../../utils/TempContext';

mapboxgl.accessToken = process.env?.REACT_APP_MAP_BOX_TOKEN ?? 'no_token';

export const MapBox = (): ReactElement => {
	const [viewState, setViewState] = React.useState({
		longitude: 0,
		latitude: 0,
		zoom: 0,
	});

	const { points: rawPoints } = useContext(TempContext);

	const cap = (val: number) => {
		let res = val;
		if (val >= 90) {
			res = 89;
		} else if (val <= -90) {
			res = -89;
		}
		console.log({ res, val });
		return res;
	};

	const points = rawPoints.map((point) => {
		//the raw data is flipped between lat and lon
		return {
			lat: cap(Number(point.lon)),
			lon: Number(point.lat),
			temp: Number(point.temp),
		};
	});

	const [centerPoint] = points;

	const mapProps = { ...viewState, ...(!centerPoint ? {} : { longitude: Number(centerPoint.lon), latitude: Number(centerPoint.lat) }) };

	return (
		<Map
			{...mapProps}
			style={{ width: 800, height: 600 }}
			dragPan={true}
			onMove={(evt) => setViewState(evt.viewState)}
			mapStyle='mapbox://styles/mapbox/streets-v9'
		>
			{points.map(({ lat, lon, temp }, index) => (
				<Marker key={lat + '__' + lon + '__' + index} longitude={Number(lon)} latitude={Number(lat)} anchor='bottom'>
					<MdLocationOn />
					{temp}
				</Marker>
			))}
		</Map>
	);
};
