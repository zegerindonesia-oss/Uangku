import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const oauthService = {
    // Placeholder for now as we need client IDs
    async signInWithGoogle() {
        console.log('Google Sign In not configured');
        // TODO: Implement Google Sign In
        return null;
    },

    async signInWithPhone() {
        console.log('Phone Sign In not configured');
        // TODO: Implement Phone Sign In
        return null;
    }
};
