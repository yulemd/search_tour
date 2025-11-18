import type { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormContainer } from '@/components/ui/FormContainer';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Layout } from '@/components/ui/Layout';

import type { SearchScreenProps } from '@/screens/SearchScreen/types';

interface SearchFormProps extends SearchScreenProps {
  heading?: string;
  buttonLabel?: string;
}

export const SearchForm: FC<SearchFormProps> = ({
  heading = 'Форма пошуку турів',
  buttonLabel = 'Знайти',
  ...props
}) => (
  <Layout variant="main">
    <FormContainer onSubmit={props.onSubmit}>
      <Layout variant="default">
        <Label variant="heading">{heading}</Label>
      </Layout>
      <Input variant="dropdown" {...props} />
      <Button
        id="search_button"
        onClick={() => {}}
        variant="primary"
        title={buttonLabel}
        type="submit"
      />
    </FormContainer>
  </Layout>
);
