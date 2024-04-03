import React, { useEffect } from "react";
import {
    Container,
    Box,
    Text,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Center,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("userInfo"));

    //     if (user) {
    //         navigate("/chats");
    //     }
    // }, [navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                bgGradient="linear(to-r, #fdfcfb, #c3cfe2)"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="2px"
                borderColor="lightgray"
            >
                <Tabs variant="soft-rounded" colorScheme="blue">
                    <TabList>
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <Center>
                        <Text fontSize="6xl" fontFamily="East Sea Dokdo" as="b">
                            chatBuzz
                        </Text>
                    </Center>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;
