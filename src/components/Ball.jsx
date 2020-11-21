import { Animated, StyleSheet, Text, View } from 'react-native'

import React from 'react'

const styles = StyleSheet.create({
    ball: {
        height: 40,
        width: 40,
        backgroundColor: '#212121',
        borderRadius: 50
    }
})

export default function Ball() {
    return (
        <View style={styles.ball}>
            <Text></Text>
        </View>
    )
}
