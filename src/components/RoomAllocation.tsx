import { useState, useEffect, useMemo } from "react";
import type { Guest, RoomSpec, ResultRoom } from "@/types";

import getDefaultRoomAllocation from "@/utils/getDefaultRoomAllocation";
import Room from "@/components/Room";

/* V guest 人數必定在所有 room 總和可容納人數內。
   V CustomInputNumber 的 step 為 1。
   ○ 當 guest 人數抵達上限值時，加號按鈕 disable。
   ○ 當 guest 人數抵達下限值時，減號按鈕 disable。
   ○ 部分 Test Case
   V 調整 guest 跟 room 的數量確認顯示是否正常
   V 調整房間分配人數確認尚未分配人數顯示是否正常
   V onChange 不能收到 result 總合超過 guest 人數的值 */

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

  const currentTotal: Guest = allocatedRooms.reduce(
    (_acc, _cur) => {
      _acc.adult += _cur.adult;
      _acc.child += _cur.child;
      return _acc;
    },
    { adult: 0, child: 0 },
  );

  const remainGuest: Guest = {
    adult: guest.adult - currentTotal.adult,
    child: guest.child - currentTotal.child,
  };

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
        尚未分配人數：{remainGuest.adult} 位大人，{remainGuest.child} 位小孩
      </div>
      <div className="divide-y">
        {roomsSpec.map((_roomSpec, _idx) => (
          <Room
            key={_idx}
            roomSpec={_roomSpec}
            allocatedRoom={allocatedRooms[_idx]}
            onChange={handleRoomChange(_idx)}
            guest={guest}
            currentTotal={currentTotal}
          />
        ))}
      </div>
    </div>
  );
}

export default RoomAllocation;
