import type { ChangeEvent, FocusEvent } from "react";
import { Identity, Guest, RoomSpec, ResultRoom } from "@/types";
import CustomInputNumber from "@/components/CustomInputNumber";

type RoomProps = {
  roomSpec: RoomSpec;
  allocatedRoom: ResultRoom;
  onChange: (val: ResultRoom) => void;
  guest: Guest;
  currentTotal: Guest;
};

function Room({
  roomSpec = {
    roomPrice: 0,
    adultPrice: 0,
    childPrice: 0,
    capacity: 0,
  },
  allocatedRoom = { adult: 0, child: 0, price: 0 },
  onChange = () => {},
  guest = { adult: 0, child: 0 },
  currentTotal = { adult: 0, child: 0 },
}: RoomProps) {
  const { adult = 0, child = 0 } = allocatedRoom || {};
  const totalPeople = allocatedRoom?.adult + allocatedRoom?.child;

  const validateResult = (identity: Identity, updateVal: ResultRoom) => {
    // 確認人數是否在 capacity 內
    if (updateVal.adult + updateVal.child > roomSpec.capacity) return false;

    // 確認更新的 adult 或 child 的剩餘人數必 >=0
    const upcomingTotal =
      currentTotal[identity] - allocatedRoom[identity] + updateVal[identity];
    const upcomingRemain = guest[identity] - upcomingTotal;
    if (upcomingRemain < 0) return false;

    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { roomPrice, adultPrice, childPrice } = roomSpec;
    const updateValue = {
      ...allocatedRoom,
      [name]: +value,
    };
    updateValue.price =
      roomPrice +
      adultPrice * updateValue.adult +
      childPrice * updateValue.child;

    if (!validateResult(name as Identity, updateValue)) return;

    onChange(updateValue);
  };

  const getIdentityMax = (identity: Identity) => {
    // 情境 1: 不超過單房規格的 capacity
    const remainCapacity = roomSpec.capacity - (allocatedRoom[identity] || 0);

    // 情境 2：剩餘人數 + 現 identity 人數
    const remainIdentity = guest[identity] - currentTotal[identity];
    return Math.max(remainCapacity, remainIdentity + allocatedRoom[identity]);
  };

  const guests = [
    {
      title: "大人",
      desc: "年齡 20+",
      props: {
        min: 0,
        max: getIdentityMax(Identity.adult),
        name: Identity.adult,
        value: adult,
        disabled: false,
      },
    },
    {
      title: "小孩",
      desc: null,
      props: {
        min: 0,
        max: getIdentityMax(Identity.child),
        name: Identity.child,
        value: child,
        disabled: false,
      },
    },
  ];

  return (
    <div className={"flex flex-col gap-3 py-6"}>
      <div className="mb-2 text-lg font-medium">
        房間： {totalPeople || 0} 人
      </div>
      {guests.map((_guest) => (
        <div key={_guest.title} className="flex items-center justify-between">
          <div>
            <div>{_guest.title}</div>
            {_guest.desc && (
              <span className="text-gray-400">{_guest.desc}</span>
            )}
          </div>
          <CustomInputNumber
            {..._guest.props}
            step={1}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>
      ))}
    </div>
  );
}

export default Room;
