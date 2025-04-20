export type CardProps = {
  name: string;
  image: string;
  powers: {
    up: number;
    down: number;
    left: number;
    right: number;
  };
};
