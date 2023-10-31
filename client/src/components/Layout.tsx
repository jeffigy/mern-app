import { Center, Flex } from "@chakra-ui/react";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      p={5}
      h={"100vh"}
      //   align={"center"}
      justify={"center"}
      //   border={"5px solid red"}
    >
      <Center>{children}</Center>
    </Flex>
  );
};
export default Layout;
