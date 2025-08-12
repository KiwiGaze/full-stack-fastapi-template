import { Container, Heading, Stack } from "@chakra-ui/react"
import { useTheme } from "next-themes"

import { Radio, RadioGroup } from "@/components/ui/radio"

const Appearance = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Container maxW="full" px={{ base: 2, md: 0 }}>
        <Heading size="sm" py={{ base: 2, md: 4 }}>
          Appearance
        </Heading>

        <RadioGroup
          onValueChange={(e) => setTheme(e.value ?? "system")}
          value={theme ?? "system"}
          colorPalette="blue"
        >
          <Stack gap={{ base: 2, md: 3 }}>
            <Radio value="system">System</Radio>
            <Radio value="light">Light Mode</Radio>
            <Radio value="dark">Dark Mode</Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}
export default Appearance
