import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "beeef9109984374aef48861a327667fb",
        redirect_uri: "http://127.0.0.1:3000/sociallogin/kakao",
        response_type: "code",
    }
    const googleParams = {
        client_id: "1051453023789-boperin529q0af3mf1idkqlplqmt60hs.apps.googleusercontent.com",
        redirect_uri: "http://127.0.0.1:3000/sociallogin/google",
        response_type: "token",
        scope: "https://www.googleapis.com/auth/userinfo.profile"
    }
    const kakao = new URLSearchParams(kakaoParams).toString();
    const google = new URLSearchParams(googleParams).toString();
    console.log(google)

    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text textTransform={"uppercase"} color={"gray.500"} fontSize={"xs"} as="b"> Or </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button as="a" href="https://github.com/login/oauth/authorize?client_id=16bae8b220ef727b0311&scope=read:user,user:email" w="100%" leftIcon={<FaGithub/>} colorScheme={"blackAlpha"}>Continue with Github</Button>
                <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${kakao}`} w="100%" leftIcon={<FaComment/>} colorScheme={"yellow"}>Continue with Kakao</Button>
                <Button as="a" href={`https://accounts.google.com/o/oauth2/v2/auth?${google}`} w="100%" leftIcon={<FcGoogle />} colorScheme={"white"} color="black" outline={"1px solid blue"}>Continue with Google</Button>
            </VStack>
        </Box>
    )
}