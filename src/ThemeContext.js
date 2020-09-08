import { createContext } from 'react';

const ThemeContext = createContext(["green", () => { }]);

export default ThemeContext;

// In order to make it work, make sure to use Link tag instead of an anchor tag to the childs.
// An anchor tag destroys current DOM and rebuilds it again, whereas Link tag does not.