// Core
import React, { FC, ReactElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiChip, { ChipProps } from '@material-ui/core/Chip';
// Utils
import { styledBy, Color } from '../../../utils';

type CustomChipType = {
  chipColor: keyof typeof Color;
  textUpper?: boolean;
  small?: boolean;
} & ChipProps;

const CustomizedChip = withStyles({
  root: {
    backgroundColor: styledBy('chipColor', Color),
    height: ({ small }: CustomChipType): number => (small ? 20 : 25),
    fontWeight: 'bold',
    fontSize: ({ small }: CustomChipType): number => (small ? 8 : 13),
    color: Color.white,
    borderRadius: 2,
    textTransform: ({ textUpper }: CustomChipType): 'uppercase' | 'none' =>
      textUpper ? 'uppercase' : 'none',
  },
  label: {
    padding: ({ small }: CustomChipType): string =>
      small ? '5px 6px' : '5px 7px',
  },
  icon: {
    width: ({ small }: CustomChipType): number => (small ? 6 : 12),
    height: ({ small }: CustomChipType): number => (small ? 6 : 12),
    marginRight: ({ small }: CustomChipType): number => (small ? -1 : -2),
    marginTop: ({ small }: CustomChipType): number => (small ? -1 : -2),
  },
})(({ chipColor, textUpper, small, ...rest }: CustomChipType) => (
  <MuiChip {...rest} />
));

export const Chip: FC<CustomChipType> = (
  props: CustomChipType,
): ReactElement => <CustomizedChip {...props} />;
