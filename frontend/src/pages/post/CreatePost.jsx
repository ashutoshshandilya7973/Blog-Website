import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { X, ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Editor from './Editor'

const CreatePost = () => {
    const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = (e) => {
            setImage(e.target?.result)
        }
        reader.readAsDataURL(file)

    }
    const removeImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log("File selected:", e.target.files[0].name);
            handleImageChange(e.target.files[0]);
        } else {
            console.log("nhi cahal")
        }
    };
    
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return (
        <div className='container max-w-5xl mx-auto py-10 px-4 '>
            <div className="text-3xl font-bold mt-10">
                <h1 className='text-primary'>Create New Blog Post</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-4">
                    <div className="border border-gray-400 rounded-2xl w-full  p-6 mt-6 ">
                        <h1 className='m-3 font-bold text-xl'>Cover Image</h1>
                        <div>
                            {
                                image ? (
                                    <div style={{ position: "relative" }}>
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                                        >
                                            <X size={16} />
                                        </button>
                                        <img src={image} alt="Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                                    </div>
                                ) : (
                                    <div className="border border-dashed border-gray-400 rounded-2xl w-full h-60  p-4 flex flex-col items-center justify-center">
                                        <Button onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Button clicked!");
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
                                onChange={handleFileInputChange}
                            />
                        </div>

                    </div>
                    {/* code for the title section of the blog post */}
                    <div className=" border border-gray-500 w-full rounded-xl p-6 flex flex-col gap-2 ">
                        <h1 className="text-primary text-2xl ">Blog Title</h1>
                        <Input type="text" placeholder="Enter a engaging title....." className="p-5 placeholder:font-semibold border border-gray-500 rounded-xl placeholder-black placeholder:text-xl" />

                    </div>
                </div>
                <hr className='mt-5' />
                <div className="tiptap mt-8 focus:border-transparent ">
                    <Editor />

                </div>
            </form>


        </div>
    )
}

export default CreatePost
