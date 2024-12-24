import { Request, Response, Router } from 'express';
import { ResponseStatusCode } from '../../statusCodes/responseStatuscode';
import { adminModel, courseModel } from '../../db';
import { hashPassword, verifyPassword } from '../../middlewares/hash&verifyPass/handleHashing';
import { generateToken } from '../../utils/token';
import adminVerification from '../../middlewares/hash&verifyPass/authentication/adminVerification';
import mongoose from 'mongoose';

const adminRouter = Router();

const JwtSecret: string = process.env.JWT_ADMIN_SECRET || "";

adminRouter.post('/signUp', hashPassword, async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !email || !password) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "All the fields are required , except lastname"
            });
            return;
        }

        // check if existing Admin
        const existingAdmin = await adminModel.findOne({ email });

        if (existingAdmin) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "Admin already exists"
            })
        }

        const savedAdmin = await adminModel.create({
            firstname,
            lastname: lastname || '',
            email,
            password
        });

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully signed Up as Admin",
            data: savedAdmin
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error admin signUp: ${error.message}`)
        return;
    }
})


adminRouter.post('/signIn', verifyPassword, async (req: Request, res: Response) => {
    try {
        const admin = req.verifiedUser;

        const payload = {
            id: admin._id,
            timestamp: Date.now()
        }

        const token = generateToken(payload, JwtSecret);

        res.status(ResponseStatusCode.OK).json({
            message: "You are Successfully signed In",
            token: token
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error admin signUp: ${error.message}`)
        return;
    }
})


adminRouter.use(adminVerification);

// admin purchased courses
adminRouter.get('/purchase', (req: Request, res: Response) => {
    try {
        res.status(ResponseStatusCode.FORBIDDEN).json({
            Error: "This route is not available right now"
        })
    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error:${error.message}`
        })
    }
})
adminRouter.get('/purchase/:id', (req: Request, res: Response) => {
    try {
        res.status(ResponseStatusCode.FORBIDDEN).json({
            Error: "This route is not available right now"
        })
    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error:${error.message}`
        })
    }
})

//admin can create, read , update and delete course
adminRouter.post('/create-course', async (req: Request, res: Response) => {
    try {
        const adminId = req.adminId;
        const { title, description, imageUrl, price } = req.body;

        if (!title || !description || !imageUrl || !price) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "All the fields are required"
            });
            return;
        }

        const courseCreated = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        })

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully created the course",
            course: courseCreated
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error creating course: ${error.message}`)
        return;
    }
})

adminRouter.get('/course', async (req: Request, res: Response) => {
    try {
        const adminId = req.adminId;

        const courses = await courseModel.find({ creatorId: adminId });

        if (courses.length === 0) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: "No Courses Found for this admin"
            })
        }

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully retrived all the courses",
            courses: courses
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error retriving courses for admin: ${error.message}`)
        return;
    }
})

adminRouter.get('/course/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "Invalid course id"
            })
        }

        const course = await courseModel.findOne({ _id: courseId });

        if (!course) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: "Course Not Found"
            })
        }

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully retrived all the course",
            course: course
        })
    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error retriving particular course for admin: ${error.message}`)
        return;
    }
})

adminRouter.put('/course/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;
        const { title, description, imageUrl, price } = req.body;

        if (!title || !description || !imageUrl || !price) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "All the fields are required"
            });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "Invalid course id"
            });
            return;
        }

        const courseUpdated = await courseModel.findByIdAndUpdate(
            courseId,
            {title,description,imageUrl,price},
            { new: true } // this ensures that updated course is returned to us
        );

        if (!courseUpdated) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: "course not found"
            })
            return;
        }

        res.status(ResponseStatusCode.OK).json({
            message: "Successfully updated the course",
            course: courseUpdated
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error: please wait`
        })
        console.error(`Error updating course for admin: ${error.message}`)
        return;
    }
})

adminRouter.delete('/course/:id', async (req: Request, res: Response) => {
    try {
        const courseId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            res.status(ResponseStatusCode.BAD_REQUEST).json({
                error: "Invalid course id"
            });
            return;
        }

        const deletedCourse = await courseModel.findByIdAndDelete(courseId , {new:true});

        if(!deletedCourse) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message:"Course Not Found"
            })
            return;
        }

        res.status(ResponseStatusCode.OK).json({
            message:"Successfully Deleted the course",
            course:deletedCourse
        })

    } catch (error: any) {
        res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
            Error: `Internal server error:${error.message}`
        })
    }
})


export default adminRouter;