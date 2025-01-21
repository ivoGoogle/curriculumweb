import React, { useState } from 'react';
import Work from "../components/Work"
import About from "../components/About"
const SelectionPage = () => {
    const [change, setChange] = useState("false");
    /*  function handleClick(setChange){
        
          console.log(change);
      }*/
    if (change === "false") {
        return (
            <About setChange={setChange} />)
    }
    else if (change === "cameron") {
        return (
            <Work setChange={setChange} />)
    }
};

export default SelectionPage;