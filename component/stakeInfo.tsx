import {
  Skeleton,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  STAKE_CONTRACT_ADDRESSES,
  STAKE_TOKEN_ADDRESSES,
} from "../constants/addresses";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Stake() {
  const address = useAddress();

  const { contract: stakeTokenContract } = useContract(
    STAKE_TOKEN_ADDRESSES,
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

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);


  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();
    return (
            
  <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
    {stakeInfo && stakeInfo[0] ? (
      <Box>
        <Text>
          <Text fontWeight={"bold"}>
            {"STAKED $" + stakeTokenBalance?.symbol}
          </Text>
          {" " + ethers.utils.formatEther(stakeInfo[0])}
        </Text>
      </Box>
    ) : (
      <Text>0</Text>
    )}
  </Skeleton>
      );
    }