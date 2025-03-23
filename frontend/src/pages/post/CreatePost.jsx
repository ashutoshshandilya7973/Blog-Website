import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { X, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Editor from './Editor'
import { useForm } from 'react-hook-form'
const CreatePost = () => {
    const fileInputRef = useRef(null)

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset, setValue } = useForm()
    const imageFile = watch("image")
    const content = watch("content")

    const removeImage = () => {
        setValue("image", null)
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    const handleFormSubmit = (data) => {
        console.log(data)
        reset();
    }

    return (
        <div className="bg-black">
        <div className='container max-w-5xl h-full bg-black text-white mx-auto py-10 px-4 '>
            <div className="text-3xl font-bold mt-10">
                <h1 className=''>Create New Blog Post</h1>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} >
                <div className="flex flex-col gap-4">
                    <div className="border border-gray-400 rounded-2xl w-full  p-6 mt-6 ">
                        <h1 className='m-3 font-bold text-xl'>Cover Image</h1>
                        <div>
                            {
                                imageFile?.length > 0 ? (
                                    <div style={{ position: "relative" }}>
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                                        >
                                            <X size={25} />
                                        </button>
                                        <img src={URL.createObjectURL(imageFile[0])} alt="Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-gray-400 rounded-2xl bg-gray-800 w-full h-60  p-4 flex flex-col items-center justify-center">
                                        <Button type="button" onClick={() => {
                                            fileInputRef.current?.click();
                                        }}>
                                            <ImagePlus />
                                            <p>Choose image</p>
                                        </Button>
                                        <p className='text-gray-500 '>Drag and drop your image here, or click to browse</p>
                                        <p className='text-gray-500'>Recommended size: 1200 x 600px</p>
                                    </div>
                                )
                            }
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setValue("image",Array.from(e.target.files));
                                    }
                                }} />
                        </div>

                    </div>
                    
                    <div className=" border border-gray-500 w-full rounded-xl p-6 flex flex-col gap-2 ">
                        <h1 className=" text-2xl ">Blog Title</h1>
                        <Input type="text" placeholder="Enter a engaging title....." {...register("title", { required: "title is required" })} className="p-6 placeholder:font-medium  border border-gray-500 rounded-xl placeholder-black placeholder:text-xl" />

                    </div>
                </div>
                <hr className='mt-5' />
                <div className="tiptap mt-8 focus:border-transparent ">
                    <Editor setValue={setValue} />

                </div>
                <div className="">
                    <button >submit</button>
                </div>
            </form>


        </div>
        </div>
    )
}

export default CreatePost
