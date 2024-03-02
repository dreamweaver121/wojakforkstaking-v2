import { Card, Heading, Skeleton, Stack, Text, Image, Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "../constants/addresses";
import Claim from "../component/claim";
import Reward from "../component/Reward"

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(REWARD_TOKEN_ADDRESSES);

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
    
    return (
        <Card 
        p={5}
        overflow='hidden'
        variant='outline'
        border='1px'
        borderColor='#747792'
        backgroundColor="#21222b" >
            <Stack color='blue.500'>
                <Flex justifyContent={"center"} alignItems={"center"}>
                    <Box boxSize={{base: '150px', lg: '350px'}} >
                    <Image boxSize= {{base: '150px', lg: '350px'}} src='https://i.ibb.co/vBKKJV3/wojak.png' alt='Play' />
                    </Box>
                </Flex>
                <Stack p={2} m={2}>
                <Heading>EARN $PLAY</Heading>
                    <SimpleGrid minChildWidth="140px" columns={2} spacing={4}>
                        <Stack>
                            <Skeleton h={4} w={"50%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                                <Text fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                            </Skeleton>
                            <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                                <Text>{tokenBalance?.displayValue}</Text>
                            </Skeleton>
                        </Stack>
                        <Stack>
                            <Reward />
                        </Stack>
                    </SimpleGrid>
                </Stack>
                <Claim />
            </Stack>
        </Card>
    )
}