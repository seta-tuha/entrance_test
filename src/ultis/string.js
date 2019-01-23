import { trim, isEmpty } from 'lodash';

export const isBlank = (string) => {
  return isEmpty(trim(string));
}
