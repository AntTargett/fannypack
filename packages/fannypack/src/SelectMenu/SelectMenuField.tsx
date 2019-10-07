import * as React from 'react';
import * as PropTypes from 'prop-types';
// @ts-ignore
import ConditionalWrap from 'conditional-wrap';
// @ts-ignore
import _omit from 'lodash/omit';

import Group from '../Group';
import SelectMenu, {
  LocalSelectMenuProps,
  SelectMenuProps,
  selectMenuPropTypes,
  selectMenuDefaultProps
} from './SelectMenu';
import FieldWrapper, {
  LocalFieldWrapperProps,
  fieldWrapperPropTypes,
  fieldWrapperDefaultProps
} from '../FieldWrapper/FieldWrapper';
import { Omit } from '../types';
import { useUniqueId } from '../uniqueId';
import { formikField, reduxFormField } from '../adaptors/fields';

export type LocalSelectMenuFieldProps = Omit<LocalFieldWrapperProps, 'children'> &
  LocalSelectMenuProps & {
    /** Addon component to the input (before). Similar to the addon components in Input. */
    addonBefore?: React.ReactElement<any>;
    /** Addon component to the input (after). Similar to the addon components in Input. */
    addonAfter?: React.ReactElement<any>;
    /** If addonBefore or addonAfter exists, then the addons will render vertically. */
    isVertical?: boolean;
    selectMenuProps?: LocalSelectMenuProps;
  };
export type SelectMenuFieldProps = SelectMenuProps & LocalSelectMenuFieldProps;
export type SelectMenuFieldComponents = {
  Formik: React.FunctionComponent<SelectMenuFieldProps>;
  ReduxForm: React.FunctionComponent<SelectMenuFieldProps>;
};

export const SelectMenuField: React.FunctionComponent<LocalSelectMenuFieldProps> & SelectMenuFieldComponents = ({
  a11yId: _a11yId,
  addonBefore,
  addonAfter,
  className,
  defaultKey,
  defaultKeys,
  defaultOption,
  defaultOptions,
  description,
  disabled,
  emptyText,
  filterOptions,
  hint,
  isDropdown,
  isLoading,
  isMultiSelect,
  isOptional,
  isPaginated,
  isRequired,
  isSearchable,
  isVertical,
  label,
  loadQuery,
  loadOptions,
  onChange,
  options,
  placeholder,
  popoverProps,
  renderBottomActions,
  renderEmpty,
  renderError,
  renderOption,
  renderTrigger,
  renderValue,
  selectMenuProps,
  searchInputProps,
  state,
  validationText,
  value,
  useTags,
  ...props
}) => {
  const uniqueId = useUniqueId('SelectMenuField');
  const a11yId = _a11yId || uniqueId;
  return (
    <FieldWrapper
      a11yId={a11yId}
      description={description}
      hint={hint}
      isOptional={isOptional}
      isRequired={isRequired}
      label={label}
      state={state}
      validationText={validationText}
      {...props}
    >
      {({ elementProps }) => (
        <ConditionalWrap
          condition={addonBefore || addonAfter}
          wrap={(children: React.ReactNode) => <Group isVertical={isVertical}>{children}</Group>}
        >
          {addonBefore}
          <SelectMenu
            id={a11yId}
            className={className}
            defaultKey={defaultKey}
            defaultKeys={defaultKeys}
            defaultOption={defaultOption}
            defaultOptions={defaultOptions}
            disabled={disabled}
            emptyText={emptyText}
            filterOptions={filterOptions}
            isDropdown={isDropdown}
            isLoading={isLoading}
            isMultiSelect={isMultiSelect}
            isPaginated={isPaginated}
            isRequired={isRequired}
            isSearchable={isSearchable}
            loadQuery={loadQuery}
            loadOptions={loadOptions}
            // @ts-ignore
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            popoverProps={popoverProps}
            renderBottomActions={renderBottomActions}
            renderEmpty={renderEmpty}
            renderError={renderError}
            renderOption={renderOption}
            renderTrigger={renderTrigger}
            renderValue={renderValue}
            searchInputProps={searchInputProps}
            state={state}
            // @ts-ignore
            value={value}
            useTags={useTags}
            {...elementProps}
            {...selectMenuProps}
          />
          {addonAfter}
        </ConditionalWrap>
      )}
    </FieldWrapper>
  );
};

SelectMenuField.Formik = formikField(SelectMenuField, { hasFieldWrapper: true, isSelectMenu: true });
SelectMenuField.ReduxForm = reduxFormField(SelectMenuField, { hasFieldWrapper: true, isSelectMenu: true });

export const selectMenuFieldPropTypes = {
  addonBefore: PropTypes.element,
  addonAfter: PropTypes.element,
  isVertical: PropTypes.bool,
  selectMenuProps: PropTypes.shape(selectMenuPropTypes),
  ..._omit(fieldWrapperPropTypes, 'children'),
  ...selectMenuPropTypes
};
SelectMenuField.propTypes = selectMenuFieldPropTypes;

export const selectMenuFieldDefaultProps = {
  ...fieldWrapperDefaultProps,
  ...selectMenuDefaultProps,
  addonBefore: undefined,
  addonAfter: undefined,
  a11yId: undefined,
  isVertical: false,
  selectMenuProps: {}
};
SelectMenuField.defaultProps = selectMenuFieldDefaultProps;

// @ts-ignore
const C: React.FunctionComponent<SelectMenuFieldProps> & SelectMenuFieldComponents = SelectMenuField;
export default C;
