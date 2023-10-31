import { Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ShowBookProps = {};

const ShowBook: React.FC<ShowBookProps> = () => {
  const [book, setBook] = useState<{
    title?: string;
    author?: string;
    publisherYear?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  });
  return (
    <Stack>
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
      <Text>{book.publisherYear}</Text>
    </Stack>
  );
};
export default ShowBook;
