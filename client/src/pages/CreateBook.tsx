import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

type CreateBookProps = {};

const CreateBook: React.FC<CreateBookProps> = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    publisherYear: "",
  });
  const { title, author, publisherYear } = inputs;

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
        .post("http://localhost:5000/books", data)
        .then(() => {
          toast({
            title: "Book Created.",
            description: "We've created your book for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          toast({
            title: "An error occurred.",
            description: `Unable to create book. ${error.toString()}}`,
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
export default CreateBook;
