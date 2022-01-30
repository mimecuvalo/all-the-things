import { spacing } from './constants';

const SYSTEM_FONTS =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const constants = {
  fontFamily: `${SYSTEM_FONTS}`,
  fontFamilyHeader: `${SYSTEM_FONTS}`,
  fontFamilyCondensed: `${SYSTEM_FONTS}`,
  fontMonospace:
    'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // NB: These are only meant to be used in conjunction with font sizes below.
  lineHeightXS: '1.5',
  lineHeightS: '1.5',
  lineHeightBase: '1.5',
  lineHeightM: '1.2',
  lineHeightL: '1.2',
  lineHeightXL: '1.1',

  // Font sizes (in rems)
  fontSizeXS: '0.75rem',
  fontSizeS: '0.875rem',
  fontSizeBase: '1rem',
  fontSizeM: '1.125rem',
  fontSizeL: '1.5rem',
  fontSizeXL: '2rem',
};

const typography = {
  ...constants,
};
export default typography;

export const muiTypography = {
  fontFamily: typography.fontFamily,
  h1: {
    fontFamily: typography.fontFamilyHeader,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeXL,
    lineHeight: typography.lineHeightXL,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  h2: {
    fontFamily: typography.fontFamilyHeader,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeL,
    lineHeight: typography.lineHeightL,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  h3: {
    fontFamily: typography.fontFamilyHeader,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeM,
    lineHeight: typography.lineHeightM,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  h4: {
    fontFamily: typography.fontFamilyHeader,
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeBase,
    lineHeight: typography.fontSizeBase,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  body1: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizeBase,
    lineHeight: typography.fontSizeBase,
  },
  body2: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizeS,
    lineHeight: typography.fontSizeS,
  },
  overline: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightMedium,
    fontSize: typography.fontSizeXS,
    lineHeight: typography.lineHeightXS,
  },
  subtitle1: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizeXS,
    lineHeight: typography.fontSizeXS,
  },
  subtitle2: {
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizeXS,
    lineHeight: typography.lineHeightXS,
  },
}

export const storybook = {
  constants,
};
