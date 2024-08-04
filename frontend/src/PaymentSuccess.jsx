import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from 'react'

const PaymentSuccess = () => {

    const navigate = useNavigate()

    const verifyPayment = async() => {
        navigate("/myorders")
    }
    
    useEffect(() => {
        verifyPayment()
    },[])

    return (
        <Box>
            <VStack h="40vh" justifyContent={"center"}>

                <Heading textTransform={"uppercase"}> Order Successfull</Heading>
                <Heading textTransform={"uppercase"} color={"#ff6347"}> Visit soon</Heading>

            </VStack>
        </Box>
    )
}

export default PaymentSuccess
