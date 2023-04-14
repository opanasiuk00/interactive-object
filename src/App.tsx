import React from 'react';
import styles from './App.module.css';
import { SquareBlock } from './components/SquareBlock/SquareBlock';

export type CurrentPositionType = {
	x: number,
	y: number
}

const initialPostion: CurrentPositionType = {
	x: 50,
	y: 50,
}

export const App = () => {
	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [currentPosition, setCurrentPosition] = React.useState<CurrentPositionType>(initialPostion);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
		setIsDragging(true);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
		setIsDragging(false);
	};

	React.useEffect(() => {
		const moveHandler = (e: PointerEvent) => {
			if (isDragging) {
				const newPosition = {
					x: e.pageX,
					y: e.pageY,
				};
				setCurrentPosition(newPosition);
			}
		}
		const touchHandler = (e: TouchEvent) => {
			if (isDragging) {
				const newPosition = {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY,
				};
				setCurrentPosition(newPosition);
			}
		}

		document.addEventListener('pointermove', moveHandler);
		document.addEventListener('touchmove', touchHandler);
		return () => {
			document.removeEventListener('pointermove', moveHandler);
			document.removeEventListener('touchmove', touchHandler);
		}
	}, [isDragging])

	return (
		<div className={styles.wrapper} onTouchEnd={handleMouseUp} onMouseUp={handleMouseUp} >
			<SquareBlock {...currentPosition}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseDown}
				isDragging={isDragging}
			/>
		</div>
	);
};
