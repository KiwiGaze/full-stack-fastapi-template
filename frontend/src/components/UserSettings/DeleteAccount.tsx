import { Container, Heading, Text } from "@chakra-ui/react"

import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  return (
    <Container maxW="full" px={{ base: 2, md: 0 }}>
      <Heading size="sm" py={{ base: 2, md: 4 }}>
        Delete Account
      </Heading>
      <Text mb={{ base: 2, md: 0 }}>
        Permanently delete your data and everything associated with your
        account.
      </Text>
      <DeleteConfirmation />
    </Container>
  )
}
export default DeleteAccount
