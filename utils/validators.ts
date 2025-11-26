/**
 * Validate email address
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * Returns object with isValid and message
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters' };
    }

    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }

    return { isValid: true, message: 'Password is strong' };
};

/**
 * Validate phone number (Indonesian format)
 */
export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate amount (must be positive number)
 */
export const validateAmount = (amount: string | number): boolean => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return !isNaN(num) && num > 0;
};

/**
 * Validate required field
 */
export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};
