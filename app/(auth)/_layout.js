import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { UserAuth } from '../_layout'
import { useContext } from 'react'


const _layout = () => {
    const {user, setUser} = useContext(UserAuth)

  useEffect(() =>{
    if(user !== null){
      router.replace('/(app)')
    }
  },[user])

  return (
    <>
    <Stack screenOptions={{headerShown: false}}/>
    </>
  )
}

export default _layout
