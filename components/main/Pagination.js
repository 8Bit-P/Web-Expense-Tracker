import { IconButton, Button, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion  } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const MotionButton = motion(Button);

const Pagination = ({ total = 1 }) => {
  const TOTAL_PAGES = 7;
  const POINTER_POSITIONS = [0,44,88,132,176,220,264];

  const [pages, setPages] = useState([]);
  const [arrayIndex, setArrayIndex] = useState(0); //start on the first element of the array
  const [currentPage, setCurrentPage] = useState(1); // 1 - total

  const [isHovering, setIsHovering] = useState({ left: false, right: false });

  const handleMouseOver = (p) => {
    if (p === ">>>") setIsHovering({ left: false, right: true });
    else if (p === "<<<") setIsHovering({ left: true, right: false });
  };

  const handleMouseOut = (p) => {
    if (p === ">>>" || p === "<<<")
      setIsHovering({ left: false, right: false });
  };

  //first time to create pages accordingly to total
  useEffect(() => {
    var tempPages = [];

    if (total > TOTAL_PAGES) {
      for (let index = 1; index < 6; index++) {
        tempPages.push(index.toString());
      }

      tempPages.push(">>>");
      tempPages.push(total.toString()); //add the last page in the end */
      setPages(tempPages);

    } else {
      for (let index = 1; index <= total; index++) {
        tempPages.push(index.toString());
      }
      setPages(tempPages);
    }
  }, []);

  const moveRight = () => {
    if (currentPage < total) {
      //we wont get a pointing error in array index with this

      if (arrayIndex === 3) {
        //POINTER IS IN THE MIDDLE
        //Now we have to check whether it keeps in the middle or goes on
        if (currentPage + 3 !== total) {
          //still pages to go through
          let temp = []; //create new array
          temp.push("1");
          temp.push("<<<");
          for (let i = 0; i < 3; i++) temp.push((currentPage + i).toString());
          temp.push(">>>");
          temp.push(total.toString());

          setCurrentPage(currentPage + 1);
          setPages(temp);
        } else {
          //last 3 pages
          let temp = [];
          temp.push("1");
          temp.push("<<<");
          for (let i = -1; i < 4; i++) temp.push((currentPage + i).toString());

          setArrayIndex(arrayIndex + 1);
          setCurrentPage(currentPage + 1);
          setPages(temp);
          
        }
      } else {
        //MOVING RIGHT WITHOUT CHANGING PAGES
        let temp = currentPage;
        let tempArrayIndex = arrayIndex;

        setCurrentPage(temp + 1);
        setArrayIndex(tempArrayIndex + 1);

      }
    }
  };

  const moveLeft = () => {
    if (currentPage > 1) {
      //we wont get a pointing error in array index with this
      if (arrayIndex === 3 ) {
        //POINTER IS IN THE MIDDLE
        //Now we have to check wheter it keeps in the middle or goes on
        if (currentPage - 3 !== 1) {
          //still pages to go through
          let temp = []; //create new array
          temp.push("1");
          temp.push("<<<");
          for (let i = -2; i < 1; i++) temp.push((currentPage + i).toString());
          temp.push(">>>");
          temp.push(total.toString());

          setCurrentPage(currentPage - 1);
          setPages(temp);
        } else if(currentPage -3 === 1){
          //first 3 pages
          let temp = [];
          for (let i = 1; i <= 5; i++) temp.push((i).toString());

          temp.push(">>>");
          temp.push(total.toString());

          setArrayIndex(arrayIndex - 1);
          setCurrentPage(currentPage -1);
          setPages(temp);
          
        }
      } else {
        //MOVING RIGHT WITHOUT CHANGING PAGES
        let temp = currentPage;
        let tempArrayIndex = arrayIndex;
      
        setCurrentPage(temp - 1);
        setArrayIndex(tempArrayIndex - 1);

      }

    }
  };

  function createMiddlePos(){
    let temp = ["1","<<<"];
    let middle = Math.floor(total/2);
    for (let i = middle; i < middle+3; i++) temp.push((i).toString());
    temp.push(">>>");
    temp.push(total);
    setArrayIndex(3); //middle
    setCurrentPage(middle);
    setPages(temp);
  }

  const goToPage = (p) => {
    if (p === ">>>") {
      if (arrayIndex === 3) {
        
        let temp = [];
        temp.push("1");
        temp.push("<<<");
        for(let i = total-4; i<=total;i++) temp.push(i);
        
        setArrayIndex(TOTAL_PAGES - 1);
        setCurrentPage(total);
        setPages(temp);

      }else{
        createMiddlePos();
      }

    } else if (p === "<<<") {
      if (arrayIndex === 3) {
        
        let temp = [];

        for(let i = 1; i<=5;i++) temp.push(i);
        temp.push(">>>");
        temp.push(total);
        
        setArrayIndex(0);
        setCurrentPage(1);
        setPages(temp);

      }else{
        createMiddlePos();
      }
    } else {

      if(arrayIndex === 3){
        if(parseInt(p) === currentPage + 1){
          //right
          moveRight();
        }else if(parseInt(p) === currentPage - 1){
          //left
          moveLeft();
        }
      }else{
        //both ends
        if(p === "1"){

        }else if(p === total.toString()){
          
        }
      }
      //setCurrentPage(parseInt(p));
      //setArrayIndex(pages.indexOf(p)); //search for the element index and stablish array index
    }
  };

  return (
    <HStack pl="120px" spacing="1">
      {/* 4, 48, 92... */}
      <MotionButton
        position={"absolute"}
        w="25px"
        colorScheme="purple"
        boxShadow="rgba(121, 108, 186, 0.35) 0px 5px 15px;"
        zIndex="1"
        borderRadius={"12px"}
        ml="48px"
        animate={{x: POINTER_POSITIONS[arrayIndex]}}
        transition={{ type: "spring",duration:0.3 }}
      ></MotionButton>

      <IconButton
        borderRadius={"12px"}
        onClick={moveLeft}
        colorScheme="blackAlpha"
      >
        <FontAwesomeIcon
          style={{
            width: "12px",
            height: "12px",
          }}
          icon={faChevronLeft}
        />
      </IconButton>
      {pages.map((page, index) => {
        return (
          <Button
            w="25px"
            key={index}
            colorScheme="blackAlpha"
            borderRadius={"12px"}
            onClick={() => goToPage(page)}
            onMouseOver={() => handleMouseOver(page)}
            onMouseLeave={() => handleMouseOut(page)}
          >
            {isHovering.right && page === ">>>" ? (
              <ArrowRightIcon w="2" />
            ) : isHovering.left && page == "<<<" ? (
              <ArrowLeftIcon w="2" />
            ) : (
              <Text zIndex={4}>
                {page === ">>>" && !isHovering.right
                  ? "..."
                  : page === "<<<" && !isHovering.left
                  ? "..."
                  : page}
              </Text>
            )}
          </Button>
        );
      })}
      <IconButton
        borderRadius={"12px"}
        onClick={moveRight}
        colorScheme="blackAlpha"
      >
        <FontAwesomeIcon
          style={{
            width: "12px",
            height: "12px",
          }}
          icon={faChevronRight}
        />
      </IconButton>
    </HStack>
  );
};

export default Pagination;
