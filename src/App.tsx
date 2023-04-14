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
		const handleMove = (event: PointerEvent | TouchEvent) => {
			if (isDragging) {
				setCurrentPosition({
					x: event instanceof PointerEvent ? event.pageX : event.touches[0].pageX,
					y: event instanceof PointerEvent ? event.pageY : event.touches[0].pageY,
				});
			}
		};

		document.addEventListener('pointermove', handleMove);
		document.addEventListener('touchmove', handleMove);
		return () => {
			document.removeEventListener('pointermove', handleMove);
			document.removeEventListener('touchmove', handleMove);
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
