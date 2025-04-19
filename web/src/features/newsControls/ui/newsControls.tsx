'use client';
import { CustomSelect, ISelectOption } from '@/shared/ui/customSelect';
import TagsSelector from '@/shared/ui/tagsSelector';
import React, { useState } from 'react';
import {
  SearchCategoryTags,
  SearchSortOptions,
  SearchTextMatchTags,
} from '../model/data';
import DateRangePicker from '@/shared/ui/dateRangePicker';
import { DateRange } from 'react-day-picker';
import { Button } from '@/shared/shadcn/components/ui/button';
import { NewsControlsToQueryParams } from '../lib/format';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/shadcn/lib/utils';

type Props = {
  params: string;
  setParams: (params: string) => void;
};

const NewsControls = ({ params, setParams }: Props) => {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [searchDate, setSearchDate] = useState<DateRange | undefined>(
    undefined
  );
  const [selectedCategories, setSelectedCategories] = useState<ISelectOption[]>(
    []
  );
  const [selectedMatches, setSelectedMatches] = useState<ISelectOption[]>([]);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const data = {
    sortBy,
    searchDate,
           selectedCategories,
    selectedMatches,
  };
  console.log(params, NewsControlsToQueryParams({ data }));

  const isEdited = !!(params !== NewsControlsToQueryParams({ data }));

  function handleAccept() {
    setParams(
      NewsControlsToQueryParams({
        data,
      })
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <Button
          variant={'outline'}
          className={cn(
            'text-lg font-semibold text-indigo-950 flex justify-between cursor-pointer transition-all',
            isOpened &&
              'bg-indigo-950 hover:bg-indigo-950/90 hover:text-white text-white'
          )}
          onClick={() => setIsOpened((v) => !v)}
        >
          Фильтры
          <ChevronDown
            className={cn('transition-transform', isOpened && 'rotate-180')}
          />
        </Button>

        <div className='flex gap-2.5 items-center'>
          <span className='text-lg'>Сортирововать по:</span>
          <CustomSelect
            onChange={setSortBy}
            options={SearchSortOptions}
            triggerClassName='py-5 text-base'
            triggerPlaceholder='Сначала...'
            itemClassName='text-base'
          />
        </div>
      </div>
      {isOpened && (
        <>
          <div className='flex items-end justify-between'>
            <div className='space-y-2'>
              <p className='text-xl'>Искать в:</p>
              <TagsSelector
                tags={SearchTextMatchTags}
                selectedTags={selectedMatches}
                onChange={setSelectedMatches}
                includeAllTag
                allTagLabel='Все'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-lg'>Дата:</p>
              <DateRangePicker onChangeDate={setSearchDate} />
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-xl'>
              Категории:{' '}
              <span className='text-gray-500 text-base'>по умолчанию: все</span>
            </p>
            <hr />
            <TagsSelector
              tags={SearchCategoryTags}
              selectedTags={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
        </>
      )}

      {isEdited && (
        <div className={cn('flex', !isOpened && 'justify-end')}>
          <Button
            onClick={handleAccept}
            className='bg-indigo-700 rounded-full text-lg hover:bg-indigo-500 cursor-pointer'
          >
            Применить
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsControls;
