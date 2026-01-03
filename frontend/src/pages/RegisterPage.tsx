import { SignupForm } from "../components/auth/signup-form";

const Register = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-y-auto bg-gradient-green">
            <div className="w-full max-w-sm md:max-w-4xl">
                <SignupForm />
            </div>
        </div>
    );
};

export default Register;