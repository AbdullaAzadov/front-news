import { ISelectOption } from '@/shared/ui/customSelect';

export const SearchCategoryTags: ISelectOption[] = [
  { value: 'politics', label: 'Политика' },
  { value: 'sports', label: 'Спорт' },
  { value: 'business', label: 'Бизнес' },
  { value: 'technology', label: 'Технологии' },
  { value: 'entertainment', label: 'Развлечения' },
  { value: 'health', label: 'Здоровье' },
  { value: 'science', label: 'Наука' },
  { value: 'lifestyle', label: 'Образ жизни' },
  { value: 'travel', label: 'Путешествия' },
  { value: 'culture', label: 'Культура' },
  { value: 'education', label: 'Образование' },
  { value: 'environment', label: 'Окружающая среда' },
  { value: 'other', label: 'Другое' },
];

export const SearchTextMatchTags: ISelectOption[] = [
  { value: 'title', label: 'В названии' },
  { value: 'content', label: 'В описании' },
];
