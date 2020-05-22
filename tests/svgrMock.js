/*
a simple mock for the svgr loader
https://react-svgr.com/docs/jest/
*/
import React from 'react';

const SvgrMock = React.forwardRef((props, ref) => (
  <span ref={ref} {...props} />
));
SvgrMock.displayName = 'SvgrMock';
export default SvgrMock;
