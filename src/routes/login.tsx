import { createFileRoute, Link } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Input from "@/components/Input";
import Button from "@/components/Button";

// Libs
import cn from "@/utils/cn";
import { toast } from "sonner";
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";

// Schemas
import { formSchema, type SchemaType } from "@/schemas/loginSchema";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
  });

  const submitForm: SubmitHandler<SchemaType> = (data) => {
    setLoading(true);
    // fake login function
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
    const errorPriority = ["email", "password"] as const;

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
    <div className="w-screen h-screen bg-off-white flex flex-col items-center pt-38 max-lg:pt-64 max-md:pt-30 gap-12">
      <img src={logo} className="size-7 max-md:size-5" />
      <div className="flex flex-col items-center gap-2">
        <span className="font-satoshi-bold text-3xl max-md:text-2xl">
          Welcome Back
        </span>
        <span className="font-satoshi-medium text-lg max-md:text-sm text-black/50">
          Log in to continue creating and sharing polls
        </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(submitForm, errorForm)}
        className="flex flex-col items-center w-[30vw] max-lg:w-[50vw] max-md:w-[70vw] gap-8 font-satoshi-medium mt-4"
      >
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <div className="flex flex-col items-center gap-4 mt-10">
          <Button
            type="submit"
            text="Log In"
            variant={"primary"}
            disabled={loading}
          >
            <KeyRound className="size-4" />
          </Button>
          <span className="text-md max-md:text-sm text-black/50">
            Don't have an account?{" "}
            <span
              className={cn(
                "relative text-black cursor-pointer duration-150",
                "after:absolute after:transition-transform ease-out",
                "after:bg-black after:w-full after:scale-x-0 after:h-[2px] after:top-full after:left-0 after:origin-left",
                "hover:after:scale-x-100"
              )}
            >
              <Link to="/signup">Sign Up</Link>
            </span>
          </span>
        </div>
      </form>
    </div>
  );
}
