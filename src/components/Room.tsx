import type { Room } from "@/types";
import CustomInputNumber from "@/components/CustomInputNumber";

type RoomProps = {
  room: Room;
};
function Room({ room }: RoomProps) {
  const totalPeople = 5;
  return (
    <div className={"flex flex-col gap-3 py-6"}>
      <div className="mb-2 text-lg font-medium">
        房間： {totalPeople || 0} 人
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div>大人</div>
          <span className="text-gray-400">年齡 20+</span>
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

      <div className="flex items-center justify-between">
        <div>小孩</div>
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
    </div>
  );
}

export default Room;
