import { extendTheme } from "@chakra-ui/react";

const dayTheme={
    colors:{
        background:"white",
        text:"black"
    },
};
const nightTheme={
    colors:{
        background:"black",
        text:"white"
    },
};

const combinedTheme=extendTheme({...dayTheme});
export {dayTheme,nightTheme,combinedTheme}
