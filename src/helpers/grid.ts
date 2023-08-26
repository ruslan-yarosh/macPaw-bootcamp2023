export const grid = (index: number) => {
  switch ((index + 1) % 10) {
    case 1: 
      return {
        'gridColumn': '1 / 2',
        'gridRow': `${Math.floor(index / 10) * 6 + 1} / span 2`,
      };
    
    case 4: 
      return {
        'gridColumn': '2 / span 2',
        'gridRow': `${Math.floor(index / 10) * 6 + 2} / span 2`,
      };

    case 8: 
      return {
        'gridColumn': '3 / 4',
        'gridRow': `${Math.floor(index / 10) * 6 + 4} / span 2`,
      };

    case 9: 
      return {
        'gridColumn': '1 / span 2',
        'gridRow': `${Math.floor(index / 10) * 6 + 5} / span 2`,
      };

    default: 
      return undefined;
  }
}
