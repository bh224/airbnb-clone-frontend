import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IProtectedPageProps{
    children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) { //children 은 UploadRoom 컴포넌트
    const { user, isLoggedIn, userLoading } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (!userLoading) {
            if (!isLoggedIn) {
                navigate('/')
            }
        }
    }, [userLoading, isLoggedIn, navigate])
    return (
        <>
        {children}
        </>
    )
}