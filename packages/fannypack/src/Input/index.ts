import { formikField, reduxFormField } from '../utils';
import * as styles from './styles';
import { Input as _Input, InputIcon, InputField as _InputField } from './Input';

export * from './Input';
export const Input = Object.assign(_Input, {
  Icon: InputIcon,
  Formik: formikField(_Input),
  ReduxForm: reduxFormField(_Input)
});
export const InputField = Object.assign(_Input, {
  Formik: formikField(_InputField, { hasFieldWrapper: true }),
  ReduxForm: reduxFormField(_InputField, { hasFieldWrapper: true })
});
export { styles as inputStyles };
