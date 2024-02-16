import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useContactsModule } from "app/native-modules/contacts/ContactsModule"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const { contacts, fetchContacts, hasPermission, requestPermission } = useContactsModule()
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top", "bottom"]}>
      <Text>Has Permission: {String(hasPermission)}</Text>
      {!hasPermission && <Button onPress={requestPermission} text="Request Permission" />}
      {hasPermission && <Button onPress={fetchContacts} text="Fetch Contacts" />}
      {contacts.map((contact, index) => (
        <View key={index} style={$contact}>
          <Text>
            {contact.firstName} {contact.lastName}
          </Text>
          <Text> {contact.phoneNumber}</Text>
        </View>
      ))}
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.sm,
}

const $contact: ViewStyle = {
  flexDirection: "row",
}
