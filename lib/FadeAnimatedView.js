import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';

function FadeAnimatedView ({inverted, children, style, ...props}) {
    const [anim] = useState(new Animated.Value(0))
    useEffect(() => {
        Animated.spring(anim, {toValue: 1,
            restSpeedThreshold: 5.0,
            damping: 35,
            useNativeDriver: true}).start();
    }, []);

    const pos = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [inverted ? -50 : 100, 0],
    });

    return <Animated.View {...props} style={[style, {transform: [{translateY: pos}], opacity: anim}]} >
        {children}
    </Animated.View>
}

FadeAnimatedView.defaultProps = {
    inverted: false,
    children: null,
    style: {}
};

export default FadeAnimatedView;
