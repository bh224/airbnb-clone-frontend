import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import GoogleConfirm from "./routes/GoogleConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";


const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            path: "",
            element: <Home />
        },
        {
            path: "rooms/upload",
            element: <UploadRoom />
        },
        {
            path: "rooms/:roomPk",
            element: <RoomDetail />
        },
        {
            path: "rooms/:roomPk/photos",
            element: <UploadPhotos />
        },
        {
            path: "sociallogin",
            children: [
                {
                    path: "github",
                    element: <GithubConfirm />
                },
                {
                    path: "kakao",
                    element: <KakaoConfirm />
                },
                {
                    path: "google",
                    element: <GoogleConfirm />
                },
                
            ]
        }
    ]

}])

export default router;