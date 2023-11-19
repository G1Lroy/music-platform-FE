import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  step?: number;
}
const SliderComponent: React.FC<SliderProps> = ({ value, onChange, step }) => {
  const [valueVisible, setValueVisible] = useState<boolean>(false);

  const handleChange = (newValue: number[]) => onChange?.(newValue[0]);

  return (
    <>
      {valueVisible && <div className="absolute top-1 left-[50%] text-xs text-green-500">{value * 100}%</div>}
      <Slider.Root
        className="
      cursor-pointer
    relative 
    flex 
    items-center 
    select-none 
        touch-none 
        w-full 
        h-2
      "
        onMouseEnter={() => setValueVisible(true)}
        onMouseLeave={() => setValueVisible(false)}
        defaultValue={[value]}
        value={[value]}
        onValueChange={handleChange}
        max={1}
        step={0.1}
        aria-label="Volume"
      >
        <Slider.Track
          className="
        bg-neutral-600 
        relative 
        grow 
        rounded-full 
        h-[3px]
        "
        >
          <Slider.Range
            className="
          absolute 
            bg-white 
            rounded-full 
            h-full
            "
          />
        </Slider.Track>
      </Slider.Root>
    </>
  );
};

export default SliderComponent;
