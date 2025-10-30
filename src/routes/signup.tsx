import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Button from "@/components/Button";
import Input from "@/components/Input";

// Libs
import * as z from "zod";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

const formSchema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string().min(8, "Password must contain atleast 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormType = z.infer<typeof formSchema>;

function RouteComponent() {
  const { register, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const submitForm: SubmitHandler<FormType> = (data) => console.log(data);
  const errorForm: SubmitErrorHandler<FormType> = (data) =>
    console.log("error", data);

  return (
    <div className="w-screen h-screen bg-off-white flex flex-col items-center pt-38 gap-12">
      <img src={logo} className="size-7" />
      <div className="flex flex-col items-center gap-2">
        <span className="font-satoshi-bold text-3xl">Create An Account</span>
        <span className="font-satoshi-medium text-lg text-black/50">
          Get started for free and make your first poll today.
        </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(submitForm, errorForm)}
        className="flex flex-col items-center w-[30vw] gap-8 font-satoshi-medium mt-4"
      >
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <div className="flex flex-col items-center gap-4 mt-10">
          <Button type="submit" text="Sign Up" variant={"primary"}>
            <Mail className="size-4" />
          </Button>
          <span className="text-md text-black/50">
            Already have an account?{" "}
            <span className="text-black cursor-pointer">Log In</span>
          </span>
        </div>
      </form>
    </div>
  );
}
