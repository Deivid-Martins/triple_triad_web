import { PlayerProps } from '../App';

export type CardProps = {
  name: string;
  index?: number;
  powers: {
    up: number;
    down: number;
    left: number;
    right: number;
  };
  owner?: PlayerProps;
};
