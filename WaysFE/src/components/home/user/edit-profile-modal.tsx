import { useAppDispatch, useAppSelector } from "@/stores";
import { checkAuthAsync } from "@/stores/auth/async";
import { updateUserAsync } from "@/stores/user/async";
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLButtonElement>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
}) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      updateUserAsync({ data: { ...formData, avatar: file ?? undefined } })
    );
    await dispatch(checkAuthAsync());
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={"4xl"}
    >
      <ModalOverlay />
      <ModalContent bgColor={"brand.background"} h={"90%"} p={"20px"}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Box
              h={"100%"}
              w={"100%"}
              display={"flex"}
              flexDirection={"row"}
              padding={"50px"}
            >
              <Box>
                <Text
                  color={"brand.orange"}
                  fontSize={"30px"}
                  fontWeight={"bold"}
                  paddingBottom={"20px"}
                >
                  My Profile
                </Text>
                <Image
                  h={"400px"}
                  w={"300px"}
                  objectFit={"fill"}
                  src={user?.avatar}
                  alt="avatar"
                  onClick={handleImageClick}
                  cursor="pointer"
                />
                <Input
                  type="file"
                  id="avatar"
                  display="none"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </Box>
              <Box paddingLeft={"50px"} fontSize={"17px"} w={"400px"}>
                <Box paddingTop={"60px"}>
                  <Text fontWeight={"bold"} color={"brand.orange"}>
                    Name
                  </Text>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Box>
                <Box paddingTop={"15px"}>
                  <Text fontWeight={"bold"} color={"brand.orange"}>
                    Email
                  </Text>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Box>
                <Box paddingTop={"15px"}>
                  <Text fontWeight={"bold"} color={"brand.orange"}>
                    Phone
                  </Text>
                  <Input
                    placeholder="Phone"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Box>
                <Box paddingTop={"15px"}>
                  <Text fontWeight={"bold"} color={"brand.orange"}>
                    Gender
                  </Text>
                  <Select
                    placeholder="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="DEMIGOD">DemiGod</option>
                  </Select>
                </Box>
                <Box paddingTop={"15px"}>
                  <Text fontWeight={"bold"} color={"brand.orange"}>
                    Addres
                  </Text>
                  <Input
                    as="textarea"
                    h={"100px"}
                    placeholder="Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Box>
                <Button
                  type="submit"
                  w={"100%"}
                  bg="#56C05A"
                  color={"white"}
                  mr={8}
                  isDisabled={loading}
                >
                  {loading ? <Spinner color="white" /> : "Update Profile"}
                </Button>
              </Box>
            </Box>
          </form>
        </ModalBody>

        <ModalFooter w={"100%"}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
