import { Badge } from '../shadcn/components/ui/badge';
import { ISelectOption } from './customSelect';

export interface ITagsSelectorProps {
  tags: ISelectOption[];
  selectedTags: ISelectOption[];
  onChange: (tags: ISelectOption[]) => void;
  includeAllTag?: boolean;
  allTagLabel?: string;
}

const TagsSelector = ({
  tags,
  selectedTags,
  onChange,
  includeAllTag,
  allTagLabel = 'Все',
}: ITagsSelectorProps) => {
  const isAllSelected = selectedTags.length === tags.length;

  function handleClick(tag: ISelectOption) {
    if (hasTagInList(tag)) {
      onChange(selectedTags.filter((data) => data.value !== tag.value));
    } else {
      onChange([...selectedTags, tag]);
    }
  }

  function handleAllClick() {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(tags);
    }
  }

  function hasTagInList(tag: ISelectOption) {
    return selectedTags.some((data) => data.value === tag.value);
  }

  return (
    <div className='flex gap-1.5 flex-wrap'>
      {includeAllTag && (
        <Badge
          className='cursor-pointer shadow-2xs text-base px-3'
          variant={isAllSelected ? 'default' : 'white'}
          onClick={() => handleAllClick()}
        >
          {allTagLabel}
        </Badge>
      )}
      {tags.map((tag, idx) => (
        <Badge
          key={idx}
          className='cursor-pointer shadow-2xs text-base px-3'
          variant={hasTagInList(tag) ? 'default' : 'white'}
          onClick={() => handleClick(tag)}
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
};

export default TagsSelector;
