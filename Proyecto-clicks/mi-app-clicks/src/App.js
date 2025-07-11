import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./services/firebaseConfig";
import { getUserClicks, incrementUserClicks } from "./services/clickService";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Scoreboard from "./components/Scoreboard";
import { doc, setDoc } from "firebase/firestore";
import PredictionPanel from "./components/PredictionPanel";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  useColorMode,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function App() {
  const [user, setUser] = useState(null);
  const [clicks, setClicks] = useState(0);

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const text = useColorModeValue("gray.800", "gray.100");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const count = await getUserClicks(firebaseUser.uid);
        setClicks(count);

        const docRef = doc(db, "clicks", firebaseUser.uid);
        await setDoc(docRef, { email: firebaseUser.email }, { merge: true });
      } else {
        setClicks(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleClick = async () => {
    if (!user) return;
    await incrementUserClicks(user.uid, 1, user.email);
    setClicks((prev) => prev + 1);
  };

  return (
    <Box bg={bg} minH="100vh" px={4} py={6} color={text} position="relative">
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        position="absolute"
        top="1rem"
        right="1rem"
        variant="ghost"
      />

      <Box maxW="600px" mx="auto" textAlign="center">
        <Heading mb={4}>ClickApp</Heading>

        {user ? (
          <>
            <Text fontSize="lg" mb={2}>
              Bienvenido: <strong>{user.email}</strong>
            </Text>
            <Text fontSize="xl" mb={4}>
              Total de clics: <strong>{clicks}</strong>
            </Text>

            <Stack direction="row" spacing={4} justify="center" mb={6}>
              <Button colorScheme="teal" onClick={handleClick}>
                ¡Haz clic!
              </Button>
              <Button colorScheme="red" variant="outline" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Stack>

            <Scoreboard />

            {/* PASAMOS clicks aquí */}
            <PredictionPanel clicks={clicks} />
          </>
        ) : (
          <>
            <LoginForm />
            <RegisterForm />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
