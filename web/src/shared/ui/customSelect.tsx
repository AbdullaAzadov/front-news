import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select';
import { cn } from '../shadcn/lib/utils';

export interface ISelectOption {
  value: string;
  label: string;
}

type Props = {
  triggerClassName?: string;
  itemClassName?: string;
  triggerPlaceholder?: string;
  customTrigger?: React.ReactNode;
  options: ISelectOption[];
  onChange: (value: string) => void;
  defaultValue?: string;
};

export function CustomSelect(props: Props) {
  function handleSelectChange(value: string) {
    props.onChange(value);
  }

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger
        className={cn('bg-white text-indigo-950', props.triggerClassName)}
      >
        {props.customTrigger || (
          <SelectValue
            placeholder={props.triggerPlaceholder}
            defaultValue={props.defaultValue}
          />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn('', props.itemClassName)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
