import type { Guest, Room as TRoom, ResultRoom } from "@/types";

import Room from "@/components/Room";

type RoomAllocationProps = {
  guest: Guest;
  rooms: TRoom[];
  onChange: (result: ResultRoom[]) => void;
};

function RoomAllocation({ guest, rooms = [], onChange }: RoomAllocationProps) {
  return (
    <div className="flex max-w-3xl flex-col gap-5 p-10">
      <h3 className="text-3xl font-extrabold">
        住客人數：{guest.adult} 位大人，{guest.children}位小孩 / {rooms.length}{" "}
        房
      </h3>
      <div className="rounded-md border border-sky-200 bg-sky-100 p-5 text-gray-600">
        尚未分配人數：{guest.adult} 位大人，{guest.children}位小孩
      </div>
      <div className="divide-y">
        {rooms.map((_room, _idx) => (
          <Room key={_idx} room={_room} />
        ))}
      </div>
    </div>
  );
}

export default RoomAllocation;
