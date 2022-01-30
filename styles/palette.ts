// Primary
const primary = {
  primary100: '#eae9ff',
  primary200: '#4642ff',
  primary300: '#16147f',
}

// Default/Neutrals
const neutral = {
  neutral100: '#f9f9f9',
  neutral200: '#f2f2f2',
  neutral300: '#ccc',
  neutral400: '#666',
  neutral500: '#323232',
}

// Destroy/Error
const error = {
  error100: '#fde7e5',
  error200: '#ec1000',
  error300: '#ed0900',
}

// Caution/Alert
const caution = {
  caution100: '#fff0dc',
  caution200: '#ffb450',
  caution300: '#ff7830',
}

// Success
const success = {
  success100: '#e5f6f0',
  success200: '#00aa70',
  success300: '#00774e',
}

// Basics
const basics = {
  white: '#ffffff',
  faintTransparentGrey: 'rgba(0, 0, 0, 0.04)',
  transparentGrey: 'rgba(0, 0, 0, 0.1)',
  transparentBlack: 'rgba(0, 0, 0, 0.75)',
  black: '#000',
}

const accents = {
  
}

const thirdParty = {
  facebookBlue: '#3b5998',
  googleBlue: '#4285f4',
}

const palette = {
  ...primary,
  ...neutral,
  ...error,
  ...caution,
  ...success,
  ...basics,
  ...accents,
  ...thirdParty,
}
export default palette

export const storybook = {
  primary,
  neutral,
  error,
  caution,
  success,
  basics,
  accents,
  thirdParty,
}
