import { z } from 'zod';
import { Request , Response , NextFunction } from 'express';
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';

const passwordSchema = z
    .string()
    .trim() // Trim whitespace from input
    .min(8, "Password must be at least 8 characters long.") // Minimum length
    .max(20, "Password must be no more than 20 characters long.") // Maximum length
    .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ) // Enforce password strength
    .regex(
        /^[^<>{}%]*$/,
        "Password cannot contain <, >, {, }, %, or similar characters."
    ) // Disallow unsafe characters
    .nonempty("Password cannot be empty."); // No empty password allowed


// Name Schema
const nameSchema = z
    .string()
    .trim() // Removes leading and trailing whitespace
    .min(2, { message: "Name must be at least 2 characters long" }) // Minimum length
    .max(50, { message: "Name must not exceed 50 characters" }) // Maximum length
    .regex(/^[A-Za-zÀ-ÿ' -]+$/, {
        message:
            "Name can only contain letters, spaces, hyphens, and apostrophes. No numbers or special characters are allowed.",
    }) // Allow alphabetic characters, accented characters, spaces, hyphens, and apostrophes
    .refine((name) => !/ {2,}|-{2,}|'{2,}/.test(name), {
        message: "Name cannot have consecutive spaces, hyphens, or apostrophes",
    }); // Disallow consecutive special characters or spaces


//Email Schema
const emailSchema = z
    .string()
    .trim() // Removes leading and trailing whitespace
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(254, { message: "Email must not exceed 254 characters" })
    .email({ message: "Invalid email format" }) // Basic format check
    .regex(/^[^\s<>%]*$/, { message: "Email contains invalid characters" }) // Ensure no spaces, <, >, or %
    .regex(/^[^\.\s][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Email contains invalid formatting in the local part or domain",
    }) // Local part and domain formatting rules
    .nonempty("Email Cannot be empty")
    .refine((email) => {
        const domain = email.split('@')[1];
        const domainParts = domain.split('.');

        // Ensuring domain part has at least 2 segments (e.g., example.com)
        return domainParts.length > 1 && domainParts.every(part => part.length >= 2);
    }, {
        message: "Email domain must have at least two parts with valid segments",
    });

const courseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title must not exceed 100 characters" })
        .nonempty("Title cannot be empty")
        .regex(/^[a-zA-Z0-9\s]+$/, { message: "Title can only contain letters, numbers, and spaces" }),

    description: z
        .string()
        .min(20, { message: "Description must be at least 20 characters long" })
        .nonempty("Title cannot be empty")
        .max(500, { message: "Description must not exceed 500 characters" }),
        

    price: z
        .number()
        .safe()
        .positive({ message: "Price must be a positive number" })
        .max(10000, { message: "Price must not exceed 10,000" }),

    imageUrl: z
        .string()
        .url({ message: "Image URL must be a valid URL" })
        .regex(/\.(jpg|jpeg|png)$/, { message: "Image URL must point to a valid image file (jpg, jpeg, png)" })
});


const signUpSchema = z.object({
    firstname:nameSchema,
    lastname:nameSchema,
    email:emailSchema,
    password:passwordSchema
})
const signInSchema = z.object({
    email:emailSchema,
    password:passwordSchema
})


function signUpValidation(req:Request , res:Response , next:NextFunction) {
    const result = signUpSchema.safeParse(req.body);

    if(!result.success) {
        res.status(ResponseStatusCode.BAD_REQUEST).json({
            error:"Validation failed",
            details:result.error.errors,
        })
        return;
    }

    next();

}

function signInValidation(req:Request , res:Response , next:NextFunction) {
    const result = signInSchema.safeParse(req.body);

    if(!result.success) {
        res.status(ResponseStatusCode.BAD_REQUEST).json({
            error:"Validation failed",
            details:result.error.errors,
        })
        return;
    }

    next();

}

function courseValidation(req:Request , res:Response , next:NextFunction) {
    const result = courseSchema.safeParse(req.body);

    if(!result.success) {
        res.status(ResponseStatusCode.BAD_REQUEST).json({
            error:"Validation failed",
            details:result.error.errors,
        })
        return;
    }

    req.body.title = result.data.title.toLowerCase();
    req.body.description = result.data.description.toLowerCase();
    req.body.price = result.data.price.toFixed(2);

    next();

}


export {
    signInValidation,
    signUpValidation,
    courseValidation
}