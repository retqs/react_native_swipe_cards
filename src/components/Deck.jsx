import { Animated, Dimensions, LayoutAnimation, PanResponder, StyleSheet, UIManager, View } from 'react-native'
import React,{memo, useEffect, useRef, useState} from 'react'

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const SWIPE_THRESHOLD = .25 * SCREEN_WIDTH;
const SWIPE_DURATION = 250;

 function Deck({data,renderCard,onSwipeLeft,onSwipeRight,renderEmptyList}) {
    const position = useRef(new Animated.ValueXY()).current;
    const [index, setIndex] = useState(0);

    const panResponder = useRef(PanResponder.create({
        // if user touch, make this panResponder working otherwise set to false
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            position.setOffset({
                x: position.x._value,
                y: position.y._value
            })
        },
        // will be called many times, every time user moves(gesture is thing that we really care about)
        onPanResponderMove: Animated.event([
            null,
            {dx: position.x, dy: position.y}
        ]),
        onPanResponderRelease: (e,gesture) => {
            resetPosition();
            if(gesture.dx > SWIPE_THRESHOLD) {
                swipeTo('right');
            } else if(gesture.dx < -SWIPE_THRESHOLD) {
                swipeTo('left');
            } else {
                position.flattenOffset();
            }
        }
    })).current 

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2 ,0 ,SCREEN_WIDTH * 2],
            outputRange: ['-120deg','0deg','120deg']
        })

        return { 
            transform: [{translateX: position.x},{translateY: position.y},{rotate}]
        }
    }

    const resetPosition = () => {
        Animated.spring(position,{
            toValue: {x: 0, y: 0}
        }).start();
    }

    const onSwipeComplete = (direction) => {
        const item = data[index];
        
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        position.setValue({x: 0, y: 0});
        setIndex(prevState => prevState + 1);
    }
    
    // useEffect(() => {
    //     return () => {
    //         UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    //         LayoutAnimation.spring();
    //     }
    // },[])

    const swipeTo = (direction) => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(position,{
            toValue: {x, y: 0},
            duration: SWIPE_DURATION
        }).start(() => onSwipeComplete(direction));
    }
    
    const renderCards = () => {
        if(index >= data.length) return renderEmptyList(); 

        return data.map((item,i) => {
            if(i < index) return null;

            if(i === index) {
                return (
                    <Animated.View 
                        key={item.id}
                        style={[getCardStyle(),styles.cardStyle]}
                        {...panResponder.panHandlers}
                    >
                        {renderCard(item)}
                    </Animated.View>
                )
            }

            return (
                // (i - index) is here to remove issue when you swipe
                // you cards got stucked in the same place
                <Animated.View key={item.id} style={[styles.cardStyle,{top: 5 * (i - index)}]}>
                    {renderCard(item)}
                </Animated.View>
            )
        }).reverse();
    }

    return (
        <View style={{marginTop: 50}}>
            {renderCards()}
        </View>
    )
}


const styles = StyleSheet.create({
    cardStyle: {
        position:'absolute',
        width: SCREEN_WIDTH,
        zIndex: 100
    }
})

export default memo(Deck, function(prevProps,nextProps) {
    if(prevProps.data !== nextProps.data) setIndex(0);
})