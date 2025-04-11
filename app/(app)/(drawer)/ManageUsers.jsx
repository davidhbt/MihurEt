import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection } from 'firebase/firestore'
import { db } from '../../../firebase'

const ManageUsers = () => {
    const userref = collection(db, 'Schools', "Mission", "Users")

    // const getData = () =>{
    //     try{
            
    //     }
    // }

    useEffect(() =>{

    }, [])

  return (
    <View>
      <Text>ManageUsers</Text>
    </View>
  )
}

export default ManageUsers