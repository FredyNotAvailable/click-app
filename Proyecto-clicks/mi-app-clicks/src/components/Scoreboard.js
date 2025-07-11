import React, { useEffect, useState } from "react";
import { getAllClicks } from "../services/clickService";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Spinner,
  Heading,
  useColorModeValue,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

export default function Scoreboard() {
  const [scoreboard, setScoreboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const tableBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  // Función para cargar datos
  async function fetchClicks() {
    setLoading(true);
    const data = await getAllClicks();
    const sorted = data.sort((a, b) => b.count - a.count);
    setScoreboard(sorted);
    setLoading(false);
  }

  useEffect(() => {
    fetchClicks();
  }, []);

  if (loading)
    return (
      <Box textAlign="center" mt={6} color={textColor}>
        <Spinner size="xl" />
        <Text mt={2}>Cargando scoreboard...</Text>
      </Box>
    );

  if (scoreboard.length === 0)
    return (
      <Box textAlign="center" mt={6} color={textColor}>
        <Text>No hay datos aún.</Text>
      </Box>
    );

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={10}
      p={6}
      bg={bgColor}
      boxShadow="2xl"
      borderRadius="xl"
      color={textColor}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          Scoreboard Global
        </Heading>
        <Button colorScheme="teal" size="sm" onClick={fetchClicks}>
          Refrescar
        </Button>
      </Flex>

      <Table
        variant="simple"
        colorScheme="gray"
        bg={tableBg}
        borderRadius="md"
        overflow="hidden"
      >
        <TableCaption placement="top" color={textColor} mb={4}>
          Ranking de clics por usuario
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Ranking</Th>
            <Th>Usuario</Th>
            <Th isNumeric>Clics</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scoreboard.map(({ uid, count, email }, index) => (
            <Tr key={uid}>
              <Td fontWeight="bold">#{index + 1}</Td>
              <Td>{email || uid}</Td>
              <Td isNumeric>{count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
