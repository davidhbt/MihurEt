import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { UserAuth } from '../_layout'
import { useContext } from 'react'



const _layout = () => {
    const {user, setUser} = useContext(UserAuth)

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
      setHasMounted(true)
    }, [])
  
    useEffect(() => {
      if (hasMounted && user !== null) {
        router.replace('/(app)/(drawer)/Home/Index')
      }
    }, [user, hasMounted])

    if (!hasMounted) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

  return (
    <>
    <Stack screenOptions={{headerShown: false}}/>
    </>
  )
}

export default _layout

