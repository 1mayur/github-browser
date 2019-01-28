const grey = (opacity: any) => `rgba(167, 173, 178, ${opacity})`;
const black = (opacity: any) => `rgba(36, 41, 46, ${opacity})`;

const Colors = {
  black: black('1'),
  black400: black('0.5'),
  black500: black('0.6'),
  black600: black('0.7'),
  black700: black('0.8'),
  black800: black('0.9'),
  grey50: grey('0.1'),
  grey100: grey('0.2'),
  grey150: grey('0.25'),
  grey200: grey('0.3'),
  grey300: grey('0.4'),
  grey400: grey('0.5'),
  grey500: grey('0.6'),
  grey600: grey('0.7'),
  grey700: grey('0.8'),
  grey800: grey('0.9'),
  grey900: grey('1'),
  green400: 'rgb(99, 209, 105)',
  green500: 'rgb(83, 198, 88)',
  green700: 'rgb(74, 192, 79)',
  white: 'rgb(255, 255, 255)',
  red: 'rgb(229, 9, 20)',
};

export default Colors;
