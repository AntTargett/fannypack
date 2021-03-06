import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FieldProps as ReakitFieldProps } from 'reakit/ts/Field/Field';
// @ts-ignore
import _omit from 'lodash/omit';
// @ts-ignore
import _get from 'lodash/get';

import { Box, Flex } from '../primitives';
import Hidden from '../Hidden';
import Icon from '../Icon';
import Text from '../Text';
import { LocalPopoverProps, popoverPropTypes } from '../Popover/Popover';
import { useUniqueId } from '../uniqueId';
import VisuallyHidden from '../VisuallyHidden';
import OutsideClickHandler from '../_utils/OutsideClickHandler';
import { withTheme } from '../styled';
import { Omit } from '../types';
import _FieldWrapper, {
  Label,
  DescriptionText,
  HintText,
  OptionalText,
  RequiredText,
  TooltipButton,
  TooltipPopover,
  ValidationText
} from './styled';

export type LocalFieldWrapperProps = {
  a11yId?: string;
  children: (({ elementProps }: { elementProps: FieldElementProps }) => React.ReactNode) | React.ReactElement<any>;
  className?: string;
  description?: string | React.ReactElement<any>;
  hint?: string | React.ReactElement<any>;
  isOptional?: boolean;
  isRequired?: boolean;
  label?: string | React.ReactElement<any>;
  state?: string;
  tooltip?: string | React.ReactElement<any>;
  tooltipPopoverProps?: Omit<Omit<LocalPopoverProps, 'children'>, 'content'>;
  tooltipTrigger?: React.ReactElement<any>;
  validationText?: string;
};
export type FieldWrapperProps = Omit<ReakitFieldProps, 'label'> & LocalFieldWrapperProps;
export type FieldElementProps = {
  a11yId?: LocalFieldWrapperProps['a11yId'];
  isRequired?: LocalFieldWrapperProps['isRequired'];
  state?: LocalFieldWrapperProps['state'];
  marginTop?: string;
};

export const FieldWrapper: React.FunctionComponent<LocalFieldWrapperProps> = ({
  a11yId: _a11yId,
  children,
  description,
  hint,
  isOptional,
  isRequired,
  label,
  state,
  tooltip,
  tooltipPopoverProps: _tooltipPopoverProps,
  tooltipTrigger: _tooltipTrigger,
  validationText,
  ...props
}) => {
  const tooltipPopoverProps = _get(
    props,
    'theme.fannypack.FieldWrapper.defaultProps.tooltipPopoverProps',
    _tooltipPopoverProps
  );
  const tooltipTrigger = _get(props, 'theme.fannypack.FieldWrapper.defaultProps.tooltipTrigger', _tooltipTrigger);
  const uid = useUniqueId('FieldWrapper');
  const a11yId = _a11yId || uid;
  const elementProps: FieldElementProps = { isRequired, a11yId, state };
  return (
    <_FieldWrapper {...props}>
      {label && (
        <Box marginBottom="minor-2">
          <Flex alignItems="center" lineHeight="1">
            {typeof label === 'string' ? <Label htmlFor={a11yId}>{label}</Label> : label}
            {isOptional && <OptionalText>OPTIONAL</OptionalText>}
            {isRequired && <RequiredText>*</RequiredText>}
            {tooltip && (
              <Hidden.Container>
                {hidden => (
                  // @ts-ignore
                  <OutsideClickHandler onOutsideClick={hidden.hide}>
                    <Box relative>
                      {tooltipTrigger ? (
                        // @ts-ignore
                        React.cloneElement(tooltipTrigger, { onClick: hidden.toggle })
                      ) : (
                        // @ts-ignore
                        <TooltipButton onClick={hidden.toggle} kind="ghost" size="small">
                          <VisuallyHidden>Toggle tooltip</VisuallyHidden>
                          <Icon a11yHidden icon="question-circle" />
                        </TooltipButton>
                      )}
                      {hidden.isVisible && (
                        <TooltipPopover elevation="200" {...tooltipPopoverProps}>
                          {typeof tooltip === 'string' ? <Text fontSize="150">{tooltip}</Text> : tooltip}
                        </TooltipPopover>
                      )}
                    </Box>
                  </OutsideClickHandler>
                )}
              </Hidden.Container>
            )}
          </Flex>
          {typeof description === 'string' ? (
            <DescriptionText>{description}</DescriptionText>
          ) : (
            <div>{description}</div>
          )}
        </Box>
      )}

      {typeof children === 'function'
        ? children({ elementProps })
        : React.cloneElement(children as React.ReactElement<any>, elementProps)}

      {typeof hint === 'string' ? <HintText>{hint}</HintText> : <div>{hint}</div>}

      {validationText && <ValidationText color={state}>{validationText}</ValidationText>}
    </_FieldWrapper>
  );
};

export const fieldWrapperPropTypes = {
  a11yId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  className: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isOptional: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  state: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tooltipPopoverProps: PropTypes.shape(_omit(popoverPropTypes, 'children', 'content')),
  tooltipTrigger: PropTypes.element,
  validationText: PropTypes.string
};
FieldWrapper.propTypes = fieldWrapperPropTypes;

export const fieldWrapperDefaultProps = {
  a11yId: undefined,
  className: undefined,
  description: undefined,
  hint: undefined,
  isOptional: undefined,
  isRequired: undefined,
  label: undefined,
  state: undefined,
  tooltip: undefined,
  tooltipPopoverProps: undefined,
  tooltipTrigger: undefined,
  validationText: undefined
};
FieldWrapper.defaultProps = fieldWrapperDefaultProps;

// @ts-ignore
const C: React.FunctionComponent<FieldWrapperProps> = withTheme(FieldWrapper);
export default C;
