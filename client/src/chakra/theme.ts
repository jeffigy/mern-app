import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";

const theme = extendTheme({
  components: {
    Button: Button,
  },
});
export default theme;
