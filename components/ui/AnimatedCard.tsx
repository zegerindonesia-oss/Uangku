import React from 'react';
import Animated, {
    FadeInDown,
    FadeInUp,
    ZoomIn,
} from 'react-native-reanimated';
import { GlassCard, GlassCardProps } from './GlassCard';

interface AnimatedCardProps extends GlassCardProps {
    delay?: number;
    animation?: 'fade' | 'slide' | 'zoom';
    direction?: 'up' | 'down';
    duration?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    style,
    delay = 0,
    animation = 'fade',
    direction = 'up',
    duration = 500,
    ...props
}) => {
    const getEnteringAnimation = () => {
        switch (animation) {
            case 'slide':
                return direction === 'up'
                    ? FadeInDown.delay(delay).duration(duration)
                    : FadeInUp.delay(delay).duration(duration);
            case 'zoom':
                return ZoomIn.delay(delay).duration(duration);
            case 'fade':
            default:
                // Default to a nice springy fade in up
                return FadeInDown.delay(delay).duration(duration).springify();
        }
    };

    return (
        <Animated.View entering={getEnteringAnimation()} style={style}>
            <GlassCard {...props}>
                {children}
            </GlassCard>
        </Animated.View>
    );
};
