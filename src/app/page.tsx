"use client";

import type { ResultRoom } from "@/types";
import RoomAllocation from "@/components/RoomAllocation";

export default function Home() {
  const guest = {
    adult: 7,
    children: 3,
  };
  const rooms = [
    { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  ];
  const handleChange = (result: ResultRoom[]) => {
    console.log(result);
  };
  return <RoomAllocation guest={guest} rooms={rooms} onChange={handleChange} />;
}
