import { Button, Card, CardBody, CardFooter, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type DeleteBookProps = {};

const DeleteBook: React.FC<DeleteBookProps> = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      axios
        .delete(`http://localhost:5000/books/${id}`)
        .then(() => {
          setLoading(false);
          toast({
            title: "Book deleted.",
            description: "We've deleted your book for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: "An error occurred.",
            description: `Unable to delete book. ${error.toString()}}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.log(error);
        });
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  return (
    <Card>
      <CardBody>
        Are you sure on Deleting this book? this action cannot be undone
      </CardBody>
      <CardFooter>
        <Button
          colorScheme={"red"}
          isLoading={loading}
          onClick={handleDeleteBook}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DeleteBook;
