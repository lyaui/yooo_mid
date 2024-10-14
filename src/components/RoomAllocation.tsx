import type { Guest, Room, ResultRoom } from "@/types";

import CustomInputNumber from "@/components/CustomInputNumber";

type RoomAllocationProps = {
  guest: Guest;
  rooms: Room[];
  onChange: (result: ResultRoom[]) => void;
};
function RoomAllocation({ guest, rooms = [], onChange }: RoomAllocationProps) {
  const handleChange = (result: ResultRoom[]) => {
    onChange(result);
  };
  return (
    <div className="flex max-w-3xl flex-col gap-5 p-10">
      <h3 className="text-3xl font-extrabold">
        住客人數：{guest.adult} 位大人，{guest.children}位小孩 / {rooms.length}{" "}
        房
      </h3>

      <div className="rounded-md border border-sky-200 bg-sky-100 p-5 text-gray-600">
        尚未分配人數：{guest.adult} 位大人，{guest.children}位小孩
      </div>

      <CustomInputNumber
        min={0}
        max={0}
        step={1}
        name={""}
        value={0}
        disabled={false}
        onChange={() => {}}
        onBlur={() => {}}
      />
    </div>
  );
}

export default RoomAllocation;
