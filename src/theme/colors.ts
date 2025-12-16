export const colors = {
  // Grouped scopes for organized access and documentation
  scopes: {
    base: {
      white: '#ffffff',
      black: '#000000',
    },
    neutral: {
      gray: {
        50: '#F4F4F4',
        100: '#E6E6E6',
        150: '#D9D9D9',
        200: '#CCCCCC',
        250: '#C0C0C0',
        300: '#B3B3B3',
        350: '#A6A6A6',
        400: '#999999',
        450: '#8D8D8D',
        500: '#808080',
        550: '#737373',
        600: '#666666',
        650: '#5A5A5A',
        700: '#4D4D4D',
        750: '#404040',
        800: '#333333',
        850: '#262626',
        900: '#1A1A1A',
        950: '#0B0B0B',
      },
    },
    brand: {
      dolful_blue: '#0000FF',
      dolful_blue_01: '#8080FF',
      dolful_blue_02: '#B3B3FF',
      super_violet: '#BB00FF',
      super_pink: '#FF005E',
      super_red: '#FF0011',
    },
    semantic: {
      success: '#05DF72',
      danger: '#EC003F',
      warning: '#FFDA00',
    },
  },
};

export type ColorScopes = typeof colors.scopes;
