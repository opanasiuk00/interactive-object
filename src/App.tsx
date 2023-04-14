import React from 'react';
import styles from './App.module.css';
import { SquareBlock } from './components/SquareBlock/SquareBlock';

export type CurrentPositionType = {
	x: number,
	y: number
}

const initialPostion = {
	x: 50,
	y: 50,
}

export const App = () => {
	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [currentPosition, setCurrentPosition] = React.useState<CurrentPositionType>(initialPostion);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setIsDragging(true);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setIsDragging(false);
	};

	React.useEffect(() => {
		const moveHandler = (e: { pageX: number; pageY: number; }) => {
			if (isDragging) {
				const newPosition = {
					x: e.pageX,
					y: e.pageY,
				};
				setCurrentPosition(newPosition);
			}
		}

		document.addEventListener('pointermove', moveHandler);
		return () => {
			document.removeEventListener('pointermove', moveHandler);
		}
	}, [isDragging])

	return (
		<div className={styles.wrapper} onMouseUp={handleMouseUp} >
			<SquareBlock {...currentPosition}
				onMouseDown={handleMouseDown}
				isDragging={isDragging}
			/>
		</div>
	);
};
