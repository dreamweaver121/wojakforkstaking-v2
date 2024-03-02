import {
    Box,
    Skeleton,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import {
    useAddress,
    useContract,
    useContractRead,
    useTokenBalance,
  } from "@thirdweb-dev/react";
  import {
    REWARD_TOKEN_ADDRESSES,
    STAKE_CONTRACT_ADDRESSES,
    STAKE_TOKEN_ADDRESSES,
  } from "../constants/addresses";
  import React, { useEffect, useState } from "react";
  import { ethers } from "ethers";
  
  export default function Stake() {
    const address = useAddress();
  

    const { contract: rewardTokenContract } = useContract(
      REWARD_TOKEN_ADDRESSES,
      "token"
    );
    const { contract: stakeContract } = useContract(
      STAKE_CONTRACT_ADDRESSES,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
        refetchStakeInfo();
      }, 10000);
    }, []);
  
    const toast = useToast();
  
    return (
            
      <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}>
      {stakeInfo && stakeInfo[0] ? (
        <Box>
          <Text>
            <Text fontWeight={"bold"}>
              {"EARNED $" + rewardTokenBalance?.symbol}
            </Text>
            {" " + ethers.utils.formatEther(stakeInfo[1])}
          </Text>
        </Box>
      ) : (
        <Text>0</Text>
      )}
    </Skeleton>
    );
  }