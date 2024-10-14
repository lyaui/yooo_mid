export type Guest = {
  adult: number;
  children: number;
};

export type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
};

export type ResultRoom = {
  adult: number;
  children: number;
  price: number;
};
