import { ISelectOption } from '@/shared/ui/customSelect';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

type NewsControlsToQueryParamsProps = {
  data: {
    sortBy: string | undefined;
    searchDate: DateRange | undefined;
    selectedCategories: ISelectOption[];
    selectedMatches: ISelectOption[];
  };
};

export function NewsControlsToQueryParams({
  data,
}: NewsControlsToQueryParamsProps) {
  const { sortBy, searchDate, selectedCategories, selectedMatches } = data;
  let params = '';

  if (sortBy) params += `sort=publish-time&sort-direction=${sortBy}`;

  if (selectedMatches.length > 0) {
    const matches = selectedMatches.map((item) => item.value).join(',');
    params += `&text-match-indexes=${matches}`;
  }

  if (selectedCategories.length > 0) {
    const categories = selectedCategories.map((item) => item.value).join(',');
    params += `&categories=${categories}`;
  }

  if (searchDate?.from) {
    params += `&earliest-publish-date=${format(searchDate.from, 'yyyy-MM-dd')}`;
  }

  if (searchDate?.to) {
    params += `&latest-publish-date=${format(
      addDays(searchDate.to, 1),
      'yyyy-MM-dd'
    )}`;
  }

  if (params[0] === '&') params = params.slice(1);
  if (params[params.length - 1] === '&') params = params.slice(0, -1);

  return params;
}
