import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import LogoutButton from "../../components/LogoutButton"
import { Divider, SearchBar } from '@rneui/base'

export default function randomWord() {

  

  return (
    <View style={{flex:1,marginTop:20}}>
    <Divider width={2} />

    <LogoutButton/>
    <Divider width={2} />


    </View>
  )
}