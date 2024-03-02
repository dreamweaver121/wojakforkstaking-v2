import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { Container, Flex, SimpleGrid, Image, Box, Heading, Center } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "../component/StakeWork";
import RewardToken from "../component/RewardToken";



const Home: NextPage = () => {
  const address = useAddress();

  if(!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"50vh"} justifyContent={"center"} mt={"50px"}>
          <Box boxSize='xxxxxl' >
            <Image src='https://i.ibb.co/m9j9TsP/xfgdfgd.png" border="0"></a>' alt='error' />
          </Box>
        </Flex>
      </Container>
    )
  }
  
  return (
    <Container maxW={"1200px"}>
      
      <SimpleGrid minChildWidth="200px" columns={2} spacing={6} mt={10} mb={10}>
        <StakeToken />
        <RewardToken />
      </SimpleGrid>
      
      
    </Container>
  );
};

export default Home;