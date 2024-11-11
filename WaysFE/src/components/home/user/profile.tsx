import { useAppSelector } from "@/stores";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditProfileModal from "./edit-profile-modal";
import { MyTransaction } from "./transaction";

export function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <Box
      h={"100%"}
      w={"100%"}
      display={"flex"}
      flexDirection={"row"}
      padding={"50px"}
    >
      <Flex h={"100%"} w={"100%"} flexDirection={"column"}>
        <Text
          color={"brand.orange"}
          fontSize={"30px"}
          fontWeight={"bold"}
          paddingBottom={"20px"}
        >
          My Profile
        </Text>
        <Image
          h={"300px"}
          w={"300px"}
          objectFit={"contain"}
          src={user?.avatar}
          alt="avatar"
        />

        <EditProfileModal
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
        />
      </Flex>

      <Flex
        flexDirection={"column"}
        paddingLeft={"50px"}
        fontSize={"17px"}
        w={"100%"}
      >
        <Box paddingTop={"60px"}>
          <Text fontWeight={"bold"} color={"brand.orange"}>
            Name
          </Text>
          <Text>{user?.name || "asdasd"}</Text>
        </Box>
        <Box paddingTop={"15px"}>
          <Text fontWeight={"bold"} color={"brand.orange"}>
            Email
          </Text>
          <Text>{user?.email}</Text>
        </Box>
        <Box paddingTop={"15px"}>
          <Text fontWeight={"bold"} color={"brand.orange"}>
            Phone
          </Text>
          <Text>{user?.phone}</Text>
        </Box>
        <Box paddingTop={"15px"}>
          <Text fontWeight={"bold"} color={"brand.orange"}>
            Gender
          </Text>
          <Text>{user?.gender}</Text>
        </Box>
        <Box paddingTop={"15px"}>
          <Text fontWeight={"bold"} color={"brand.orange"}>
            Address
          </Text>
          <Text>{user?.address}</Text>
        </Box>
        <Flex w={"100%"}>
          <Button
            mt={"30px"}
            _hover={{ bgColor: "transparent" }}
            bgColor={"brand.coklat"}
            color={"white"}
            onClick={onOpen}
            w={"100%"}
          >
            Edit Profile
          </Button>
        </Flex>
      </Flex>
      <Box w={"70%"}>
        <Box
          color={"brand.orange"}
          fontSize={"30px"}
          fontWeight={"bold"}
          paddingBottom={"20px"}
        >
          <Text>My Transaction</Text>
        </Box>
        <MyTransaction />
      </Box>
    </Box>
  );
}
