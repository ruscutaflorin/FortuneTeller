import "./Painter.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import noInputImage from "../../assets/pictor_no_input.png";
import ChatPopUp from "../../components/ChatPopUp/ChatPopUp";

function Painter() {

    const image = document.createElement("img");
    image.setAttribute("class", "resulted-image");


    async function createPainting(prompt) {
        const mainEl = document.getElementById("main");

        const apiBody = {
            "prompt": "Create " + prompt + " as if it were drawn with acrylics",
            "n": 1,
            "size": "256x256",
        };

        if (prompt !== "") {
            await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
                },
                body: JSON.stringify(apiBody),
            })
                .then((data) => data.json())
                .then((response) => {
                    image.setAttribute("src", response.data[0].url);
                })
                .catch((err) => {
                    const fallbackImageUrl =
                        "https://pusheen.com/wp-content/uploads/2019/02/Im-Busy.gif";
                    image.setAttribute("src", fallbackImageUrl);
                });
        } else {
            image.setAttribute("src", noInputImage);
        }
        mainEl.appendChild(image);
    }

    let navigate = useNavigate();
    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="painter-page-container">
            <Button onClick={handleBackToHome}/>
            <main className="main-section" id="main"></main>
            <Input
                handleResult={createPainting}
                message={"What do you want me to draw today?"}
            ></Input>
            <ChatPopUp/>
        </div>
    );
}

export default Painter;
