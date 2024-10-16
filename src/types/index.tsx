export type Guest = {
  adult: number;
  child: number;
};

export type RoomSpec = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
};

export type ResultRoom = {
  adult: number;
  child: number;
  price: number;
};
