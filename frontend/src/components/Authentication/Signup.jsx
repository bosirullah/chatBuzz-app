import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightAddon,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image.",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chatBuzz-app");
            data.append("cloud_name", "dqvq06vxm");

            const CLOUDINARY_URL =
                "https://api.cloudinary.com/v1_1/dqvq06vxm/image/upload";

            fetch(CLOUDINARY_URL, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                description: "An image needs to be selected.",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please Fill out all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Password Do not Match!",
                description: "Please re-check your password.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }

        try {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "https://chatbuzz-app.onrender.com/api/user",
                { name, email, password, pic },
                config
            );

            toast({
                title: "Registered Successful!",
                description: "We have created an Account for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occoured!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputRightAddon width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Re-enter Your Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <InputRightAddon width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </FormControl>

            <FormControl id="pic" isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
