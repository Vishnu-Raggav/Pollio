import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Input from "@/components/Input";
import Button from "@/components/Button";

// Libs
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";

// Schemas
import { formSchema, type SchemaType } from "@/schemas/signupSchema";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submitForm: SubmitHandler<SchemaType> = (data) => {
    // fake signup function
    const promise = async () =>
      new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Success",
    });
    console.log(data);
  };

  const errorForm: SubmitErrorHandler<SchemaType> = (errors) => {
    let errorShown = false;
    const errorKeys = Object.keys(errors);
    const errorPriority = ["email", "password", "confirmPassword"] as const;

    for (const key of errorPriority) {
      if (!errorShown && errorKeys.includes(key)) {
        const message = errors[key]?.message;
        if (message) {
          toast.error(message);
          errorShown = true;
        }
      }
    }
  };

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
