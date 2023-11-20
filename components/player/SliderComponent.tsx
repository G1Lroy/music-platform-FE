import * as Slider from "@radix-ui/react-slider";
interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  step?: number;
  max: number;
}
const SliderComponent: React.FC<SliderProps> = ({ value, onChange, step, max }) => {

  const handleChange = (newValue: number[]) => onChange?.(newValue[0]);

  return (
    <>
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
        defaultValue={[value]}
        value={[value]}
        onValueChange={handleChange}
        max={max}
        step={step}
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
