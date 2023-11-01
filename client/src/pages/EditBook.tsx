import {
  Card,
  CardBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  CardFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type EditBookProps = {};

const EditBook: React.FC<EditBookProps> = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    publisherYear: "",
  });
  const { title, author, publisherYear } = inputs;
  const { id } = useParams();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const publisherYearNumber = Number(publisherYear);
    const data = { title, author, publisherYear: publisherYearNumber };

    try {
      axios
        .put(`http://localhost:5000/books/${id}`, data)
        .then(() => {
          toast({
            title: "Book edited.",
            description: "We've edited your book for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          toast({
            title: "An error occurred.",
            description: `Unable to edit book. ${error.toString()}}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        });
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setInputs({
          title: response.data.title,
          author: response.data.author,
          publisherYear: response.data.publisherYear,
        });
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: `Unable to fetch book. ${error.toString()}}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardBody>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                id="title"
                type="text"
                value={title}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                name="author"
                id="author"
                type="text"
                value={author}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Year Published</FormLabel>
              <Input
                name="publisherYear"
                id="publisherYear"
                type="number"
                value={publisherYear}
                onChange={(e) => onChange(e)}
                required
              />
            </FormControl>
          </Stack>
          <CardFooter px={0}>
            <Button w={"full"} type="submit" isLoading={loading}>
              Submit
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
    </form>
  );
};
export default EditBook;
