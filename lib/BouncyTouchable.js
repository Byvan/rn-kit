import React, {useState} from "react";
import {TouchableWithoutFeedback, Animated, View} from "react-native";

function BouncyTouchable({onPress, item,  style, children, bounceMin, speedAnim}) {

    const [scale] = useState(new Animated.Value(0));

    const onPressAction = () => {
        pressOut();
        onPress(item);
    }

    const pressIn = () => {
        afterPress()
        Animated.spring(
            scale,
            {
                toValue: 1,
                speed: speedAnim,
                useNativeDriver: true
            }
        ).start()
    }

    const afterPress = () => {

    }

    const pressOut = () => {
        afterPress();
        Animated.spring(
            scale,
            {
                toValue: 0,
                restSpeedThreshold: 3.5,
                speed: 0.9,
                useNativeDriver: true
            }
        ).start();
    };

    const scaleView = scale.interpolate({
        inputRange: [0, 1],
        outputRange: [1, bounceMin],
        extrapolate: 'clamp'
    })

    return <TouchableWithoutFeedback
        onPress={onPressAction}
        onPressIn={pressIn}
        onPressOut={pressOut}>
        <Animated.View style={{transform: [{scale: scaleView}]}}>
            <View style={style}>
                {children}
            </View>
        </Animated.View>
    </TouchableWithoutFeedback>
}

BouncyTouchable.defaultProps = {
    onPress: () => {},
    bounceMin: 0.95,
    style: {},
    item: null,
    children: null,
    speedAnim: 199
};

export default BouncyTouchable;
