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

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                description: "You can now Log in to your account.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
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
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    // variant="flushed"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputEmail"
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        // variant="flushed"
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputRightAddon width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@gmail.com");
                    setPassword("123456789");
                }}
            >
                Get User Credentials
            </Button>
        </VStack>
    );
};

export default Login;
