import { type RegisterOptions } from "react-hook-form";

const EMAIL_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

const NAME_PATTERN = /^[a-z ,.'-]+$/i

const GPA_PATTERN = /^\d*(\.\d+)?$/

export const Validations: {
    [x: string]: RegisterOptions;
} = {
    firstName: {
        required: { value: true, message: "Enter first name" },
        // minLength: {
        //     value: 1,
        //     message: "First name must be at least 1 character",
        // },
        pattern: {
            value: NAME_PATTERN,
            message: "First name must be in the correct format e.g. John",
        },
    },
    lastName: {
        required: { value: true, message: "Enter last name" },
        // minLength: {
        //     value: 1,
        //     message: "Last name is required",
        // },
        pattern: {
            value: NAME_PATTERN,
            message: "Last name must be in the correct format e.g. Doe ",
        },
    },
    emailAddress: {
        required: { value: true, message: "Enter email address" },
        pattern: {
            value: EMAIL_REGEX_PATTERN,
            message: "Must be an email",
        },
    },
    password: {
        required: { value: true, message: "Enter a password" },
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
        },
    },
    terms: {
        required: { value: true, message: 'Please accept the Terms of Service' }
    },
    gpa: {
        required: { value: true, message: 'Please provide your GPA' },
        pattern: {
            value: GPA_PATTERN,
            message: 'Please provide a valid GPA e.g., 3.9'
        }
    }
};