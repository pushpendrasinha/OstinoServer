export const registrationSchema = {
    "name": {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid Email"
        }
    },
    "email": {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid Email"
        }
    },
    "contact": {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid Email"
        }
    },
    "password": {
        notEmpty: true,
        matches: {
            options: ["^(?=.*?[A-Z])(?=.*?[0-9]).{6,}$"],
            errorMessage: "Password should be of minimum 6 characters in length and must contain at least 1 uppercase & 1 numeral"
        },
        errorMessage: "Invalid Password"
    },
    "gender": {
        notEmpty: true,
        errorMessage: "Invalid Password"
    }
}