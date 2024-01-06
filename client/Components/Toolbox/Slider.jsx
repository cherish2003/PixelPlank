import * as Slider from "@radix-ui/react-slider";

export const CustomSlider = ({ handleBrushSizeChange }) => {
  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={[5]}
      max={60}
      step={5}
      onValueChange={(value) => {
        handleBrushSizeChange(value);
      }}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};
