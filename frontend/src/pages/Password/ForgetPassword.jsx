
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

import apiUtils from "@/utils/ApiUtils"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
 function ForgetPassword() {
    const {register,handleSubmit,reset,formState:{error,isSubmitting}}=useForm();
   const navigate=useNavigate()

    const handleFogetSubmit=async(data)=>{
        const response= await apiUtils.post('/auth/forgot-password',data);
        console.log(response);
        reset();
        // navigate("/reset-password")
    }

  return (
    <>
    <Header/>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8 bg-zinc-400 p-4 rounded-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(handleFogetSubmit)}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input id="email" name="email" type="email" {...register("email",{required:"email is required"})} autoComplete="email" required placeholder="Email address" />
          </div>
          <Button type="submit" className="w-full" >
            Reset password
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ForgetPassword ;