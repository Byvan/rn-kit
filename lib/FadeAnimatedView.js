import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';

function FadeAnimatedView ({inverted, children, style, offsetPosition, restSpeedThreshold, damping, ...props}) {
    const [anim] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.spring(anim, {toValue: 1,
            restSpeedThreshold: restSpeedThreshold,
            damping: damping,
            useNativeDriver: true}).start();
    }, []);

    const pos = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [inverted ? -offsetPosition : offsetPosition, 0],
    });

    return <Animated.View {...props} style={[style, {transform: [{translateY: pos}], opacity: anim}]} >
        {children}
    </Animated.View>
}

FadeAnimatedView.defaultProps = {
    inverted: false,
    children: null,
    offsetPosition: 100,
    restSpeedThreshold: 5.0,
    damping: 35,
    style: {}
};

export default FadeAnimatedView;
