'use client';
import { CustomSelect, ISelectOption } from '@/shared/ui/customSelect';
import TagsSelector from '@/shared/ui/tagsSelector';
import React, { useState } from 'react';
import { SearchCategoryTags, SearchTextMatchTags } from '../model/data';

const NewsControls = () => {
  const [selectedCategories, setSelectedCategories] = useState<ISelectOption[]>(
    []
  );
  const [selectedMatches, setSelectedMatches] = useState<ISelectOption[]>([]);

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-semibold text-indigo-950'>Фильтры</h2>
        <div className='flex gap-2.5 items-center'>
          <span className='text-lg'>Сортирововать по:</span>
          <CustomSelect
            options={[
              { value: 'new', label: 'Сначала новые' },
              { value: 'old', label: 'Сначала старые' },
            ]}
            triggerClassName='py-5 text-base'
            triggerPlaceholder='Сначала...'
            itemClassName='text-base'
            onChange={() => {}}
          />
        </div>
      </div>
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
      <div className='space-y-2'>
        <p className='text-xl'>Категории:</p>
        <hr />
        <TagsSelector
          tags={SearchCategoryTags}
          selectedTags={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>
    </div>
  );
};

export default NewsControls;
