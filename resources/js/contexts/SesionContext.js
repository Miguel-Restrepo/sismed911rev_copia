import React from "react";
export const themes = {
        estado:false
 
  };
  
  export const ThemeContext = React.createContext(
    themes.estado=false // valor por defecto
  );