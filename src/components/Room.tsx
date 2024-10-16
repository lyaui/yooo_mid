import { memo } from "react";
import type { ChangeEvent } from "react";
import type { RoomSpec, ResultRoom } from "@/types";
import CustomInputNumber from "@/components/CustomInputNumber";

type RoomProps = {
  roomSpec: RoomSpec;
  allocatedRoom: ResultRoom;
  onChange: (val: ResultRoom) => void;
};
function Room({ roomSpec, allocatedRoom, onChange }: RoomProps) {
  const { adult = 0, child = 0 } = allocatedRoom || {};
  const totalPeople = allocatedRoom?.adult + allocatedRoom?.child;

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
    onChange(updateValue);
  };

  const guests = [
    {
      title: "大人",
      desc: "年齡 20+",
      props: {
        min: 0,
        max: 100,
        step: 1,
        name: "adult",
        value: adult,
        disabled: false,
      },
    },
    {
      title: "小孩",
      desc: null,
      props: {
        min: 0,
        max: 100,
        step: 1,
        name: "child",
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

export default memo(Room);
