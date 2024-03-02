import { Card, Heading, Skeleton, Stack, Text, Image, Flex, Box, SimpleGrid } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance} from "@thirdweb-dev/react";
import { STAKE_TOKEN_ADDRESSES } from "../constants/addresses";
import Stake from "../component/stake";
import StakeInfo from "../component/stakeInfo"

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: LoadingStakeToken } = useContract(STAKE_TOKEN_ADDRESSES);

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);

    return (
        <Card 
        p={5}
        overflow='hidden'
        variant='outline'
        
        border='1px'
        borderColor='#747792'
        backgroundColor="#21222b">
            <Stack color='pink.300'>
                <Flex justifyContent={"center"}>
                    <Box boxSize={{base: '150px', lg: '350px'}}>
                        <Image boxSize={{base: '150px', lg: '350px'}}  src='https://i.ibb.co/HVrdhFw/wojakb.png' alt='Work' />
                    </Box>
                </Flex>
                <Stack p={2} m={2} >
                <Heading>STAKE $WORK</Heading>
                <SimpleGrid minChildWidth="140px" columns={2} spacing={4}>
                <Stack>
                    <Skeleton h={4} w={"50%"} isLoaded={!LoadingStakeToken && !loadingTokenBalance}>
                        <Text fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                    </Skeleton> 
                    <Skeleton h={4} w={"50%"} isLoaded={!LoadingStakeToken && !loadingTokenBalance}>
                        <Text>{tokenBalance?.displayValue}</Text>
                    </Skeleton>
                </Stack>
                    <Stack>
                        <StakeInfo />
                    </Stack>
                </SimpleGrid>
                    </Stack>
                    <Stake />
                </Stack>
        </Card>
    )
}