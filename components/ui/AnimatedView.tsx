import React from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    FadeInLeft,
    FadeInRight,
    ZoomIn,
} from 'react-native-reanimated';

interface AnimatedViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
    delay?: number;
    animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoom';
    duration?: number;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
    children,
    style,
    delay = 0,
    animation = 'fade',
    duration = 500,
}) => {
    const getEnteringAnimation = () => {
        const base = (() => {
            switch (animation) {
                case 'slideUp': return FadeInDown;
                case 'slideDown': return FadeInUp;
                case 'slideLeft': return FadeInRight;
                case 'slideRight': return FadeInLeft;
                case 'zoom': return ZoomIn;
                case 'fade': default: return FadeIn;
            }
        })();

        return base.delay(delay).duration(duration);
    };

    return (
        <Animated.View entering={getEnteringAnimation()} style={style}>
            {children}
        </Animated.View>
    );
};
