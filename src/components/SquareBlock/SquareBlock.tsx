import React from 'react';
import styles from './SquareBlock.module.css';
import { CurrentPositionType } from '../../App';

export interface SquareBlockProps extends CurrentPositionType, React.ComponentPropsWithRef<'div'> {
	isDragging: boolean
}

export const SquareBlock = ({ x, y, isDragging, ...props }: SquareBlockProps) => {

	const style = {
		top: `${y - 50}px`,
		left: `${x - 50}px`,
	};


	return (
		<div className={`${styles.square} ${isDragging ? styles.active : ''}`} style={style} {...props}>

		</div>
	);
};