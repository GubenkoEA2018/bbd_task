// Core
import React, { FC, ReactElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MatTooltip, { TooltipProps } from '@material-ui/core/Tooltip';
// Utils
import { Color } from '../../../utils';

const CustomizedTooltip = withStyles({
  tooltip: {
    borderRadius: 2,
    backgroundColor: Color.darkBlue,
    padding: '5px 7px',
    fontSize: 10,
    color: Color.white,
  },
})(MatTooltip);

export const Tooltip: FC<TooltipProps> = ({
  ...props
}: TooltipProps): ReactElement => {
  return <CustomizedTooltip {...props} />;
};

Tooltip.defaultProps = {
  placement: 'bottom-start',
};
