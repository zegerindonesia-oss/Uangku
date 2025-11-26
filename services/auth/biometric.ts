import * as LocalAuthentication from 'expo-local-authentication';

export const biometricService = {
    async checkAvailability() {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        return hasHardware && isEnrolled;
    },

    async authenticate() {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate to access Uangku',
                fallbackLabel: 'Use Passcode',
                disableDeviceFallback: false,
            });
            return result.success;
        } catch (error) {
            console.error('Biometric authentication error:', error);
            return false;
        }
    }
};
