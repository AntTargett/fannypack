import { palette, theme } from 'styled-tools';
import Field from 'reakit/Field';

import styled, { space } from '../styled';
import { Omit } from '../types';
// @ts-ignore
import _Label from '../Label';
import Button from '../Button';
import Popover from '../Popover';
// @ts-ignore
import _Text from '../Text';
import { FieldWrapperProps } from './FieldWrapper';

export const Label = styled(_Label)`
  margin-bottom: 0 !important;

  & {
    ${theme('fannypack.FieldWrapper.label')};
  }
`;

export const DescriptionText = styled(_Text)`
  display: block;
  font-size: 0.8rem;

  & {
    ${theme('fannypack.FieldWrapper.description')};
  }
`;

export const HintText = styled(_Text)`
  display: block;
  font-size: 0.8rem;
  margin-top: ${space(1)}rem;

  & {
    ${theme('fannypack.FieldWrapper.hint')};
  }
`;

export const OptionalText = styled(_Text)`
  font-size: 0.8rem;
  color: ${palette('text100')};
  margin-left: ${space(2)}rem;
  line-height: 1;

  & {
    ${theme('fannypack.FieldWrapper.optional')};
  }
`;

export const RequiredText = styled(_Text)`
  color: ${palette('danger')};
  margin-left: ${space(1)}rem;
  font-weight: ${theme('fannypack.fontWeights.semibold')};
  font-size: ${theme('fannypack.fontSizes.150')}rem;

  & {
    ${theme('fannypack.FieldWrapper.required')};
  }
`;

export const TooltipButton = styled(Button)`
  margin-left: ${space(1)}rem;
  min-height: unset;
  height: 14px;
  padding: 0.1em 0.5em;

  & {
    ${theme('fannypack.FieldWrapper.TooltipButton.base')};
  }
`;

export const TooltipPopover = styled(Popover)`
  padding: ${space(1, 'major')}rem;
  width: max-content;
  max-width: 400px;

  & {
    ${theme('fannypack.FieldWrapper.TooltipPopover.base')};
  }
`;

export const ValidationText = styled(_Text)`
  display: block;
  font-size: 0.8rem;
  margin-top: ${space(1)}rem;

  & {
    ${theme('fannypack.FieldWrapper.validation')};
  }
`;

export const FieldWrapper = styled(Field)<Omit<FieldWrapperProps, 'children'>>`
  & {
    ${theme('fannypack.FieldWrapper.base')};
  }
`;

export default FieldWrapper;
