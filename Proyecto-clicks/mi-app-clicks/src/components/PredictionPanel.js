import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { getClickPrediction } from "../services/iaService";

export default function PredictionPanel({ clicks }) {
  const [daysAhead, setDaysAhead] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Colores adaptados a modo oscuro
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const boxBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await getClickPrediction({
        days_ahead: Number(daysAhead),
        current_clicks: clicks,
      });
      setPrediction(result.toFixed(2));
    } catch (err) {
      setError(err.message || "Error al obtener predicción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={6}
      p={6}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      color={textColor}
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Predicción de Clics
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Número de días para predecir"
          type="number"
          value={daysAhead}
          onChange={(e) => setDaysAhead(e.target.value)}
          bg={boxBg}
        />
        <Button
          colorScheme="teal"
          onClick={handlePredict}
          isDisabled={!daysAhead || isNaN(Number(daysAhead))}
          isLoading={loading}
          width="full"
        >
          Predecir
        </Button>

        {prediction && (
          <Text fontSize="xl" fontWeight="bold">
            Predicción: {prediction} clics
          </Text>
        )}
        {error && <Text color="red.400">{error}</Text>}
      </VStack>
    </Box>
  );
}
