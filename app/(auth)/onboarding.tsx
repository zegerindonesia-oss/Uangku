import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors, typography, spacing } from '../../theme';

const { width, height } = Dimensions.get('window');

const slides: {
    key: string;
    titleKey: string;
    descKey: string;
    image: any;
    backgroundColor: readonly [string, string, ...string[]];
}[] = [
        {
            key: '1',
            titleKey: 'onboarding.slide1Title',
            descKey: 'onboarding.slide1Desc',
            image: require('../../assets/images/onboarding1.png'),
            backgroundColor: colors.gradients.purplePink as unknown as readonly [string, string, ...string[]],
        },
        {
            key: '2',
            titleKey: 'onboarding.slide2Title',
            descKey: 'onboarding.slide2Desc',
            image: require('../../assets/images/onboarding2.png'),
            backgroundColor: colors.gradients.purpleBlue as unknown as readonly [string, string, ...string[]],
        },
        {
            key: '3',
            titleKey: 'onboarding.slide3Title',
            descKey: 'onboarding.slide3Desc',
            image: require('../../assets/images/onboarding3.png'),
            backgroundColor: colors.gradients.bluePink as unknown as readonly [string, string, ...string[]],
        },
    ];

export default function OnboardingScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const scrollX = useSharedValue(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        scrollX.value = offsetX;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            scrollViewRef.current?.scrollTo({
                x: (currentIndex + 1) * width,
                animated: true,
            });
        } else {
            router.push('/(auth)/login');
        }
    };

    const handleSkip = () => {
        router.push('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={slides[currentIndex].backgroundColor}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Skip button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>{t('common.skip')}</Text>
            </TouchableOpacity>

            {/* Slides */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                {slides.map((slide, index) => (
                    <View key={slide.key} style={styles.slide}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={slide.image}
                                style={styles.characterImage}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{t(slide.titleKey)}</Text>
                            <Text style={styles.description}>{t(slide.descKey)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Pagination dots */}
            <View style={styles.pagination}>
                {slides.map((_, index) => {
                    const dotStyle = useAnimatedStyle(() => {
                        const inputRange = [
                            (index - 1) * width,
                            index * width,
                            (index + 1) * width,
                        ];
                        const scale = interpolate(
                            scrollX.value,
                            inputRange,
                            [0.8, 1.4, 0.8],
                            'clamp'
                        );
                        const opacity = interpolate(
                            scrollX.value,
                            inputRange,
                            [0.3, 1, 0.3],
                            'clamp'
                        );
                        return {
                            transform: [{ scale }],
                            opacity,
                        };
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, dotStyle]}
                        />
                    );
                })}
            </View>

            {/* Next/Get Started button */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)']}
                    style={styles.nextButtonGradient}
                >
                    <Text style={styles.nextButtonText}>
                        {currentIndex === slides.length - 1
                            ? t('common.continue')
                            : t('common.next')}
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Swipe up indicator */}
            <View style={styles.swipeIndicator}>
                <Ionicons name="chevron-up" size={24} color="rgba(255,255,255,0.6)" />
                <Text style={styles.swipeText}>{t('onboarding.swipeToStart')}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    skipText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
    },
    scrollView: {
        flex: 1,
    },
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing['2xl'],
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20,
    },
    characterImage: {
        width: 300,
        height: 300,
    },
    textContainer: {
        paddingBottom: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: spacing.base,
    },
    description: {
        fontSize: typography.fontSize.base,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 120,
        alignSelf: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    nextButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        borderRadius: 30,
        overflow: 'hidden',
    },
    nextButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
    },
    swipeIndicator: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    swipeText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: typography.fontSize.sm,
        marginTop: 4,
    },
});
