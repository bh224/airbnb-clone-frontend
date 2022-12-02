import { Heading, VStack, Text, Button, Spinner, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogin, kakaoLogIn } from "../api";

export default function GoogleConfirm() {
    //현재 유저가 있는 페이지를 알려준다 (필요한 파라미터 추출)
    const { hash } = useLocation()
    const toast = useToast()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const confirmLogin = async() => {
        // const params = new URLSearchParams(search)
        // const code = params.get("code")
        if (hash) {
            const status = await googleLogin(hash);
            if (status === 200) {
                toast({
                    status: 'success',
                    title: "welcome",
                    description: "I'm happy to see you"
                });
                //로그인이 성공하면 헤더를 다시 렌더한다
                queryClient.refetchQueries(['me']);
                navigate('/')
            }
        }
    }
    useEffect(() => {
        confirmLogin()
    }, [])
    
    return <VStack justifyContent={"center"} mt={40} >
        <Heading> Processing log in... </Heading>
        <Text>Don't go anywhere</Text>
        <Spinner size="lg" />
    </VStack>
}