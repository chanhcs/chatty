import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/stores/useAuthStore";

const loginSchema = z.object({
    username: z.string().min(3, 'Username must have at least 3 characters'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
})

type loginValues = z.infer<typeof loginSchema>;

export function SigninForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false)
    const { signIn } = useAuthStore()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginValues>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: loginValues) => {
        await signIn(data)
        navigate('/')
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 border-border">
                <CardContent className="grid p-0 md:grid-cols-2 h-157">
                    <form className="p-6 md:p-8 self-center" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Link to='/' className="mx-auto block w-fit">
                                    <img src='/logo.svg' alt='logo' />
                                </Link>
                                <p className="text-2xl font-bold">Login</p>
                                <span className="text-center text-muted-foreground text-balance">Log in to your account</span>
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="w-full space-y-2">
                                        <Label htmlFor="username" className="text-sm">
                                            Username
                                        </Label>
                                        <Input
                                            type="text"
                                            id="username"
                                            className={errors.username && "border-red-400"}
                                            {...register("username")}
                                        />
                                        {errors.username && (
                                            <p className="text-destructive text-xs">
                                                {errors.username.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Label htmlFor="password" className="text-sm">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                className={`pr-10 ${errors.password && "border-red-400"}`}
                                                {...register("password")}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer "
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-destructive text-xs">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full mt-2 cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </Button>
                                    <div className="text-center text-sm">
                                        Don't have an account? {" "}
                                        <Link to='/register' className="underline underline-offset-4 text-muted-foreground hover:text-blue-500">Register</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/login.png"
                            alt="login"
                            className="absolute top-1/2 -translate-y-1/2 object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
