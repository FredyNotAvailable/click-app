import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  VStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Registro exitoso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error al registrarse",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg="gray.700"
      color="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Crear Cuenta
      </Heading>
      <form onSubmit={handleRegister}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.600"
              _placeholder={{ color: "gray.300" }}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.600"
                _placeholder={{ color: "gray.300" }}
              />
              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  variant="ghost"
                  color="gray.300"
                  _hover={{ color: "teal.300" }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Registrarse
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
