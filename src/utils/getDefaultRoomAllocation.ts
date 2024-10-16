import type { Guest, RoomSpec, ResultRoom } from "@/types";

const getDefaultRoomAllocation = (
  guest: Guest,
  rooms: RoomSpec[],
): ResultRoom[] => {
  const { adult, child } = guest;

  const allocation = [
    {
      adult: 2,
      child: 2,
      price: 2000,
    },
    {
      adult: 2,
      child: 0,
      price: 1100,
    },
    {
      adult: 0,
      child: 0,
      price: 0,
    },
  ];
  return allocation;
};

export default getDefaultRoomAllocation;
