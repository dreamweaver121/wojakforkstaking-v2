import {
  Card,
  Flex,
  useToast,
} from "@chakra-ui/react";
  import {
    Web3Button,
    useAddress,
    useContract,
    useContractRead,
  } from "@thirdweb-dev/react";
  import {
    STAKE_CONTRACT_ADDRESSES,
  } from "../constants/addresses";
  import React, { useEffect, useState } from "react";
  
  export default function Stake() {
    const address = useAddress();
  

    const { contract: stakeContract } = useContract(
      STAKE_CONTRACT_ADDRESSES,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
  
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
      <Card p={2} m={2} mt={16} backgroundColor="#21222b" border={0}>
            <Flex
              h={"100%"}
              justifyContent={"space-between"}
              direction={"column"}
              textAlign={"center"}
            >
            

          
            </Flex>
          </Card>
    );
  }