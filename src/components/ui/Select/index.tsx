// Core
import React, { FC, ReactElement, ChangeEvent } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MatSelect, { SelectProps } from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

// Utils
import { Color } from '../../../utils';

// Types
import { OptionType, SelectOptions } from './types';

type SelectPropsType = {
  options: SelectOptions;
  placeholder?: string;
  changeHandler: (value: OptionType['value']) => void;
} & SelectProps;

const useStyles = makeStyles({
  placeholder: {
    color: Color.blueGray,
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${Color.e1}`,
    fontSize: 16,
    padding: '8px 26px 8px 10px',
    '&:focus': {
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);

export const Select: FC<SelectPropsType> = ({
  options,
  value,
  placeholder,
  changeHandler,
  ...rest
}: SelectPropsType): ReactElement => {
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<OptionType>): void => {
    if (changeHandler) {
      changeHandler(event.target.value);
    }
  };

  return (
    <MatSelect
      {...rest}
      value={value}
      onChange={handleChange}
      input={<BootstrapInput />}
      displayEmpty
    >
      {placeholder && (
        <MenuItem disabled value="">
          <span className={classes.placeholder}>{placeholder}</span>
        </MenuItem>
      )}

      {options &&
        options.length > 0 &&
        options.map(({ value: val, name }) => (
          <MenuItem key={name} value={val as string}>
            {name}
          </MenuItem>
        ))}
    </MatSelect>
  );
};
