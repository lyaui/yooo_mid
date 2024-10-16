import type { Guest, RoomSpec, ResultRoom } from "@/types";

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
  return (
    <div className="flex max-w-3xl flex-col gap-5 p-10">
      <h3 className="text-3xl font-extrabold">
        住客人數：{guest.adult} 位大人，{guest.child}位小孩 / {roomsSpec.length}{" "}
        房
      </h3>
      <div className="rounded-md border border-sky-200 bg-sky-100 p-5 text-gray-600">
        尚未分配人數：{guest.adult} 位大人，{guest.child}位小孩
      </div>
      <div className="divide-y">
        {roomsSpec.map((_roomSpec, _idx) => (
          <Room key={_idx} roomSpec={_roomSpec} />
        ))}
      </div>
    </div>
  );
}

export default RoomAllocation;
