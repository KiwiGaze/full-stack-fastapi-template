import { Container, Heading, Tabs } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Appearance from "@/components/UserSettings/Appearance"
import ChangePassword from "@/components/UserSettings/ChangePassword"
import DeleteAccount from "@/components/UserSettings/DeleteAccount"
import UserInformation from "@/components/UserSettings/UserInformation"
import useAuth from "@/hooks/useAuth"

const tabsConfig = [
  { value: "my-profile", title: "My profile", component: UserInformation },
  { value: "password", title: "Password", component: ChangePassword },
  { value: "appearance", title: "Appearance", component: Appearance },
  { value: "danger-zone", title: "Danger zone", component: DeleteAccount },
]

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const { user: currentUser } = useAuth()
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  if (!currentUser) {
    return null
  }

  return (
    <Container maxW="full">
      <Heading
        size="lg"
        textAlign={{ base: "center", md: "left" }}
        py={{ base: 6, md: 12 }}
      >
        User Settings
      </Heading>

      <Tabs.Root defaultValue="my-profile" variant="subtle">
        <Tabs.List
          display="flex"
          gap={{ base: 2, md: 3 }}
          overflowX="auto"
          whiteSpace="nowrap"
          px={{ base: 2, md: 0 }}
        >
          {finalTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              flexShrink={0}
              px={{ base: 3, md: 4 }}
              py={{ base: 2, md: 2.5 }}
            >
              {tab.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {finalTabs.map((tab) => (
          <Tabs.Content
            key={tab.value}
            value={tab.value}
            px={{ base: 2, md: 0 }}
          >
            <tab.component />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Container>
  )
}
