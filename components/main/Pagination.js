import { Box, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const Pagination = ({ total }) => {
  const [pages, setPages] = useState([1, 2]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    var tempPages = pages;

    if (total > 7) {
      tempPages.push(1); //first page always visible

      tempPages.push(total); //add the last page in the end
    } else {
      tempPages = Array.from(Array(total).keys());
      setPages(tempPages);
    }
  }, [currentPage]);

  return (
    <HStack pl="120px" spacing="1">
      {/* 4, 48, 92... */}
      <Button
        position={"absolute"}
        w="25px"
        colorScheme={"red"}
        zIndex="1"
        borderRadius={"12px"}
        ml="48px"
      ></Button>
      <Button w="25px" colorScheme={"messenger"} borderRadius={"12px"}>
        {"<"}
      </Button>
      {pages.map((page) => {
        return (
          <Button
            w="25px"
            key={page + 1}
            colorScheme={"messenger"}
            borderRadius={"12px"}
          >
            {page + 1}
          </Button>
        );
      })}
      <Button w="25px" colorScheme={"messenger"} borderRadius={"12px"}>
        {">"}
      </Button>
    </HStack>
  );
};

export default Pagination;
