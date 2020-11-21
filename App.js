import { Button, Card } from 'react-native-elements';
import { Image, StyleSheet, Text, View } from 'react-native';
import React,{useCallback} from 'react';

import Deck from './src/components/Deck'

const DATA = [
  {id: 1, text: 'card #1',uri: 'https://picsum.photos/200/300'},
  {id: 2, text: 'who knows #2',uri: 'https://picsum.photos/200/300'},
  {id: 3, text: 'nice dick #3',uri: 'https://picsum.photos/200/300'},
  {id: 4, text: 'thanks #4',uri: 'https://picsum.photos/200/300'},
  {id: 5, text: 'derived #5',uri: 'https://picsum.photos/200/300'},
  {id: 6, text: 'delegate #6',uri: 'https://picsum.photos/200/300'},
]

export default function App() {

  const renderEmptyList = (text) => (
    <Card>
      <Card.Title>{text}</Card.Title>
      <Card.Divider></Card.Divider>
      <Button title='Load more'></Button>
    </Card>
  )
  
  const renderCard = (item) => {
    return (
      <Card>
        <Card.Title>{item.text}</Card.Title>
        <Card.Divider></Card.Divider>
        <Image style={{width:"100%",height:100}} resizeMode='contain' source={{uri: item.uri}}></Image>
        <Text>
          dummy text
        </Text>
        <Button icon={{name:'code'}} title='Wow! Nice dick :)' backgroundColor='#f2f3'></Button>
      </Card>
    );
  }

  const onSwipeRight = useCallback((item) => {
    console.log(item,'=> item')
  },[])
  
  const onSwipeLeft = useCallback((item) => {
    console.log(item,'=> item')
  },[])

  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        renderEmptyList={renderEmptyList}
      ></Deck>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
