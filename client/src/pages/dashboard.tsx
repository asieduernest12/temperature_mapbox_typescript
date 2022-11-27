import React, { FC, ReactElement } from 'react';
// import { useState, ChangeEvent, FormEvent } from "react";
// import { useForm } from "react-hook-form";
import { Sidebar } from '../components/sidebar/sidebar';
import { MapBox } from '../components/map/map';

export const Dashboard: FC = (): ReactElement => {
	return (
		<>
			<Sidebar />
			<div className='right'>
				<MapBox />
			</div>
		</>
	);
};
