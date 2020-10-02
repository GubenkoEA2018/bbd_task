// Core
import React, { FC, ReactElement } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// Utils
import { Color } from '../../../utils';

const CustomSlider = withStyles({
  root: {
    color: Color.darkBlue,
    height: 4,
    padding: 0,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: `1px solid ${Color.blueGray}`,
    marginTop: -7.5,
    marginLeft: -9,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
  },
  active: {},
  track: {
    height: 4,
  },
  rail: {
    color: Color.e1,
    opacity: 1,
    height: 4,
    width: '100%',
    minWidth: 200,
    marginLeft: -9,
  },
})((props) => <Slider {...props} />);

export const RangePicker: FC<any> = (props: any): ReactElement => {
  return <CustomSlider {...props} />;
};
