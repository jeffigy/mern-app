import { Flex, HStack, IconButton, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { EditIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Title",
      selector: (row: any) => row.title,
    },
    {
      name: "Author",
      selector: (row: any) => row.author,
    },
    {
      name: "Year Published",
      selector: (row: any) => row.publisherYear,
    },
    {
      name: "",
      selector: (row: any) => (
        <HStack>
          <IconButton
            as={Link}
            colorScheme="teal"
            aria-label={"add"}
            icon={<InfoIcon />}
            to={`/books/details/${row._id}`}
          />
          <IconButton
            as={Link}
            colorScheme="yellow"
            aria-label={"edit"}
            icon={<EditIcon />}
            to={`/books/edit/${row._id}`}
          />
          <IconButton
            as={Link}
            colorScheme="red"
            aria-label={"delete"}
            icon={<DeleteIcon />}
            to={`/books/delete/${row._id}`}
          />
        </HStack>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Flex justifyContent={"center"} w={"1000px"}>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <DataTable columns={columns} data={books} />
      )}
    </Flex>
  );
};
export default Home;
