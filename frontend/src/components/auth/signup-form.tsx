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

const registerSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  username: z.string().min(3, 'Username must have at least 3 characters'),
  email: z.email("Email address is not valid"),
  password: z.string().min(6, 'Password must have at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required')
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type registerValues = z.infer<typeof registerSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<registerValues>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: registerValues) => {
    const { confirmPassword, ...payload } = data
    await signUp(payload)
    navigate('/login')
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="mx-auto block w-fit">
                  <img src='/logo.svg' alt='logo' width={40} height={40} />
                </div>
                <p className="text-2xl font-bold">Register</p>
                <span className="text-center text-muted-foreground text-balance">Welcome! Create an account to get started!</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      className={errors.firstName && "border-red-400"}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      className={errors.lastName && "border-red-400"}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-destructive text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
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
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      className={errors.email && "border-red-400"}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs">
                        {errors.email.message}
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
                  <div className="w-full space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={`pr-10 ${errors.email && "border-red-400"}`}
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer "
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Create account
                  </Button>
                  <div className="text-center text-sm">
                    Already have an account? {" "}
                    <Link to='/login' className="underline underline-offset-4 text-muted-foreground hover:text-blue-500">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/register.png"
              alt="register"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
