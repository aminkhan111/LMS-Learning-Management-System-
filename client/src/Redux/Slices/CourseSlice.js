import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get ", async (data) => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: 'Wait! fetching all courses ...',
            success: "Courses loaded successfully," ,
            error: 'Failed to load courses'
        });
        return (await response).data.courses;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourse = createAsyncThunk("/course/delete ", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: 'Wait! Deleting courses ...',
            success: "Courses Deleted successfully," ,
            error: 'Failed to Delete courses'
        });
        return (await response).data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})



export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
        
        const response = axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: 'Wait! Creating new course',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create course'
        });
        return (await response).data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})




const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action?.payload) {
                
                state.courseData = [...action.payload];
            }
        })
        
    }
});

export default courseSlice.reducer;