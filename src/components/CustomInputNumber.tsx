"use client";

import type { ChangeEvent, FocusEvent } from "react";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

import cn from "@/utils/cn";
import Button from "@/components/Button";

/* TODO
  ■ 長按加減按鈕（非鍵盤按鈕）可以自動連續加減，數字變化需顯示。
  V 點擊加號使 value 等於 max 時繼續點擊，確認 onChange 無後續觸發
  V 點擊減號使 value 等於 min 時繼續點擊，確認 onChange 無後續觸發
  V onBlur 時驗證是否為正確 Event.target.name 跟 Event.target.value，觸
  發時機點為整組元件的 onBlur，包含 Button
  V onChange 時驗證是否為正確 Event.target.name 跟 Event.target.value
  V disabled 等於 true 時，應無法改變或是輸入 value，且需有 disabled 樣
  式
  V 調整 min 或 max 確認加減變化是否在範圍內
  V 調整 step 確認加減變化是否符合 step 間隔
  V 點擊加減號按鈕請觸發 <input> 的 InputEvent 
*/

enum ButtonAction {
  increment = 0,
  decrement = 1,
}

type CustomInputNumberProps = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

function CustomInputNumber({
  min,
  max,
  step = 1,
  name,
  value,
  disabled = false,
  onChange,
  onBlur,
}: CustomInputNumberProps) {
  const handleChange = (action: ButtonAction) => {
    const updateVal =
      action === ButtonAction.increment ? value + step : value - step;
    if (updateVal < min || updateVal > max) return;

    const event = {
      target: { name, value: updateVal.toString() },
    } as ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  const handleButtonBlur = () => {
    const event = {
      target: { name, value: value.toString() },
    } as FocusEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div className="flex gap-2">
      {/* decrement */}
      <Button
        onClick={() => handleChange(ButtonAction.decrement)}
        onBlur={handleButtonBlur}
        disabled={disabled || value === min}
      >
        <BsDashLg className="text-3xl" />
      </Button>
      {/* input */}
      <input
        name={name}
        type="number"
        value={value}
        step={step}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={cn(
          "h-12 w-12 rounded-md border border-gray-300 text-center text-gray-600 outline-gray-300",
          disabled && "bg-gray-100",
        )}
      />
      {/* increment */}
      <Button
        onClick={() => handleChange(ButtonAction.increment)}
        onBlur={handleButtonBlur}
        disabled={disabled || value === max}
      >
        <BsPlusLg className="text-3xl" />
      </Button>
    </div>
  );
}

export default CustomInputNumber;
