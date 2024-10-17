import type { Guest, RoomSpec, ResultRoom } from "@/types";

function getDefaultRoomAllocation(
  guest: Guest,
  rooms: RoomSpec[],
): ResultRoom[] {
  let { adult, child } = guest;
  const result: ResultRoom[] = rooms.map((room: RoomSpec) => ({
    adult: 0,
    child: 0,
    price: 0,
  }));

  // 只有小孩沒有成人回傳預設結果
  if (adult === 0 && child > 0) return result;

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    let roomAdult = 0,
      roomChild = 0;

    // 分配小孩並確保每個小孩在的房間都有成人
    if (child > 0) {
      roomChild = Math.min(child, room.capacity - 1); // 至少留一個位置給成人
      roomAdult = 1;
      child -= roomChild;
      adult -= roomAdult;
    }

    // 如果還有剩餘的成人繼續分配
    if (adult > 0) {
      const availableCapacity = room.capacity - roomAdult - roomChild;
      roomAdult += Math.min(adult, availableCapacity);
      adult -= Math.min(adult, availableCapacity);
    }

    // 計算費用
    if (roomAdult > 0 || roomChild > 0) {
      const price =
        room.roomPrice +
        room.adultPrice * roomAdult +
        room.childPrice * roomChild;
      result[i] = { adult: roomAdult, child: roomChild, price };
    }
  }

  // 如果還有剩下的小孩無法被分配，回傳預設結果
  if (child > 0) {
    return rooms.map(() => ({ adult: 0, child: 0, price: 0 }));
  }

  return result;
}

export default getDefaultRoomAllocation;
