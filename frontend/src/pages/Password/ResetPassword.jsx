
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import apiUtils from "@/utils/ApiUtils"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
    
    const { register, handleSubmit, reset, formState: { error, isSubmitting } } = useForm()
    const navigate = useNavigate()

    const location= useLocation();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");  // Get the token from URL
    console.log("Token from URL:", token); // Debugging
    

    const handleResetSubmit = async (data) => {
        const newdata={
            password:data.password,
            token:token
        }
        const response = await apiUtils.post('/auth/reset-password', newdata);
        console.log(response)
        reset()
        navigate('/login')
    }


    return (
        <form onSubmit={handleSubmit(handleResetSubmit)}>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>Please enter your email and new password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                       
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" name="password" {...register("password",{required:"password is required"})} type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password"  type="password" required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Reset Password
                    </Button>
                </CardContent>
            </Card>
        </form>
    )
}