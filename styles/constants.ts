// These constants are mirrored in theme.css
export const spacing = (factor: number): string => `${factor * 8}px`;

export const shape = {
  borderRadius: 4,
};

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const zIndices: { [key: string]: string } = {
  // Special cases
  belowPage: '-1',
  page: '0',
  abovePage: '1',

  // Register custom z-indices here, they will get auto-populated with the correct value:
  popup: '0',
  abovePageShadow: '0',
  loading: '0',
  navigation: '0',
  datePickers: '0',
  notificationContainer: '0',

  modalOverlay: '1300',

  // Special case
  important: '2147483647',
};
Object.keys(zIndices).forEach((item, index) => {
  if (zIndices[item] === '0' && item !== 'page') {
    zIndices[item] = (index - parseInt(zIndices['abovePage'])).toString();
  }
});

export const zindex = zIndices;
