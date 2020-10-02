// Core
import React, { FC, ReactElement } from 'react';
import MatBreadcrumbs, {
  BreadcrumbsProps,
} from '@material-ui/core/Breadcrumbs';
import { withStyles } from '@material-ui/core/styles';
// Utils
import { Color } from '../../../utils';

export const CustomizedBreadcrumbs = withStyles({
  ol: {
    alignItems: 'flex-start',
  },
  li: {
    fontSize: 10,
    color: Color.darkGray,
  },
  separator: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: -4,
  },
})((props) => <MatBreadcrumbs {...props} />);

export const Breadcrumbs: FC<BreadcrumbsProps> = (
  props: BreadcrumbsProps,
): ReactElement => <CustomizedBreadcrumbs {...props} />;
