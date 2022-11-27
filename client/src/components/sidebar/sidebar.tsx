import React, { FC, ReactElement, SyntheticEvent, useContext, useRef, useState } from 'react';
import { ImFolderUpload, ImCancelCircle } from 'react-icons/im';
import { FaMapMarker, FaMapMarkerAlt, FaTemperatureHigh } from 'react-icons/fa';
import { makeRequest, updateFile } from '../../utils/data-utils';
import logo from '../images/weather_logo.svg';
import { MdLocationOn, MdOutlineLocationOn } from 'react-icons/md';
import { TempContext } from '../../utils/TempContext';
import { MapPoint } from '../../..';

export const Sidebar: FC = (): ReactElement => {
	const { setPoints } = useContext(TempContext);
	const formRef = useRef<HTMLFormElement>(null);
	const [file, setFile] = useState('');

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		// handle the input...
		console.log('file', e.target.files);
		console.log('file', e.target.files[0]);
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], 'UTF-8');
		fileReader.onload = (e) => {
			console.log('e.target.result', e.target);
			const target = e.target;
			const result = target?.result as string;
			console.log({ result });
			setFile(result);
		};
	};

	const handleSendUpload = (e: SyntheticEvent) => {
		e.preventDefault();

		const data = new FormData();
		data.append('file', file);
		updateFile(data);
	};

	const resetForm = () => {
		formRef.current?.reset();
		setFile('');
	};

	const loadPoints = (e: SyntheticEvent) => {
		e.preventDefault();
		makeRequest({ url: '/points' })
			.then(async(res) => setPoints(await res.json() as any as MapPoint[]))
			.catch((err) => console.trace(err));
	};

	return (
		<div className='meau'>
			<form  ref={formRef} onSubmit={handleSendUpload}>
				<div className='logo'>
					<img src={logo} alt='Logo Images' />
					<h1>Tem Map</h1>
				</div>

				<input
					type='file'
					onChange={handleFileInputChange}
					// style={{ display: "none" }}
				/>

				<button onClick={resetForm} className='list' disabled={!file.length}>
					<ImCancelCircle />
					<h1>Clear</h1>
				</button>

				<button className='list' type='submit' disabled={!file.length}>
					<ImFolderUpload />
					<h1>Upload File</h1>
				</button>
			</form>
			<button className='list' onClick={loadPoints}>
				<FaMapMarkerAlt />
				<h1>Load points</h1>
			</button>

			<button className='list'>
				<FaTemperatureHigh />
				<h1>Change C/F</h1>
			</button>
		</div>
	);
};
