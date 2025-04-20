export type CardProps = {
  name: string;
  image: string;
  index?: number;
  powers: {
    up: number;
    down: number;
    left: number;
    right: number;
  };
};
