import { useState, useEffect, useMemo } from "react";
import type { Guest, RoomSpec, ResultRoom } from "@/types";

import getDefaultRoomAllocation from "@/utils/getDefaultRoomAllocation";
import Room from "@/components/Room";

type RoomAllocationProps = {
  guest: Guest;
  roomsSpec: RoomSpec[];
  onChange: (result: ResultRoom[]) => void;
};

function RoomAllocation({
  guest,
  roomsSpec = [],
  onChange,
}: RoomAllocationProps) {
  const [allocatedRooms, setAllocatedRooms] = useState<ResultRoom[]>([]);
  const defaultRooms = useMemo(
    () => getDefaultRoomAllocation(guest, roomsSpec),
    [guest, roomsSpec],
  );

  const handleRoomChange = (idx: number) => (value: ResultRoom) => {
    setAllocatedRooms((_preState) => {
      const updateVal = [..._preState];
      updateVal[idx] = value;
      return updateVal;
    });
  };

  useEffect(() => {
    setAllocatedRooms(defaultRooms);
  }, [defaultRooms]);

  useEffect(() => {
    onChange(allocatedRooms);
  }, [allocatedRooms, onChange]);

  return (
    <div className="flex max-w-3xl flex-col gap-5 p-10">
      <h3 className="text-3xl font-extrabold">
        住客人數：{guest.adult} 位大人，{guest.child} 位小孩 /{" "}
        {roomsSpec.length} 房
      </h3>
      <div className="rounded-md border border-sky-200 bg-sky-100 p-5 text-gray-600">
        尚未分配人數：{guest.adult} 位大人，{guest.child} 位小孩
      </div>
      <div className="divide-y">
        {roomsSpec.map((_roomSpec, _idx) => (
          <Room
            key={_idx}
            roomSpec={_roomSpec}
            allocatedRoom={allocatedRooms[_idx]}
            onChange={handleRoomChange(_idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default RoomAllocation;
