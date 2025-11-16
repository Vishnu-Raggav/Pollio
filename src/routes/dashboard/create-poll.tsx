import {
  createFileRoute,
  Link,
  useNavigate,
  redirect,
} from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import FormLabelDescription from "@/components/FormLabelDescription";

// Libs
import { toast } from "sonner";
import { useState } from "react";
import { Copy, Minus, Plus, Send, Trash, X } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  useForm,
  useFieldArray,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";

// Schemas
import { type SchemaType } from "@/schemas/createPollSchema";

// Helpers
import cn from "@/utils/cn";
import supabase from "@/lib/supabaseClient";
import insertPoll from "@/utils/insertPoll";
import isAuthenticated from "@/utils/isAuthenticated";

export const Route = createFileRoute("/dashboard/create-poll")({
  component: RouteComponent,
  beforeLoad: async () => {
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  // Query
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: insertPoll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["polls"] }),
  });

  // RHF
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SchemaType>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }],
      duration: 1,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  // UI State
  const [showLink, setShowLink] = useState<number | false>(false);

  const submitFn: SubmitHandler<SchemaType> = async (data) => {
    const { title, description, options, duration } = data;

    // created_by
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      toast.error("Failed to create poll. Please try again");
      return;
    }
    if (!user) return;

    // expires_at
    const now = new Date();
    const expiresAt = new Date(now.getTime() + duration * 60 * 60 * 1000);
    const expiresAtISO = expiresAt.toISOString();

    // options
    const flatOptions = options.map((obj) => obj.value.trim());

    toast.promise(
      mutation.mutateAsync({
        title: title.trim(),
        description: description === "" ? null : description,
        options: flatOptions,
        created_by: user.id,
        expires_at: expiresAtISO,
      }),
      {
        loading: "Loading...",
        success: (pollData) => {
          reset();
          setShowLink(pollData.id);
          return "Your poll is live! 🎉";
        },
        error: "Oops! We couldn’t create your poll",
      }
    );
  };

  const errorFn: SubmitErrorHandler<SchemaType> = (errors) => {
    console.log(errors);
    const errorPriority = [
      "title",
      "description",
      "options",
      "duration",
    ] as const;

    for (const errorName of errorPriority) {
      const fieldError = errors[errorName];
      if (!fieldError) continue;

      if (errorName === "options" && Array.isArray(fieldError)) {
        for (const option of fieldError) {
          const msg = option?.value?.message;
          if (msg) {
            toast.error(msg);
            return; // stop after first option error
          }
        }
        continue;
      }

      if ("message" in fieldError && fieldError.message) {
        toast.error(fieldError.message);
        return;
      }
    }
  };

  return (
    <>
      <div className="relative w-screen min-h-screen max-h-fit bg-off-white pt-20 px-30 max-md:px-10 max-md:pt-10 max-lg:px-20">
        <header className="flex items-center justify-between w-full h-fit">
          <div className="flex items-center gap-6 max-md:gap-4">
            <img src={logo} className="size-7 max-md:size-4" />
            <span className="font-righteous text-4xl max-md:text-2xl">
              Pollio
            </span>
          </div>
          <div className="flex gap-6 max-md:gap-4">
            <Button
              onClick={handleSubmit(submitFn, errorFn)}
              variant={"primary"}
              text={"Publish"}
              size="small"
              disabled={isSubmitting || mutation.isPending}
            >
              <Send className="size-4 max-md:size-3" />
            </Button>
            <Link to="/dashboard">
              <Button variant={"secondary"} text={"Delete"} size="small">
                <Trash className="size-4 max-md:size-3" />
              </Button>
            </Link>
          </div>
        </header>
        <main className="mt-14 pb-20">
          <form
            onSubmit={handleSubmit(submitFn, errorFn)}
            className="w-full h-fit border-2 max-md:border-0 border-black/25 rounded-lg p-10 max-md:p-0 divide-y-2 max-md:divide-y-1 divide-black/25 space-y-[var(--space)] [--space:theme(spacing.12)]"
          >
            <div className="w-full h-fit flex max-md:flex-col pb-[var(--space)]">
              <div className="w-1/2 max-md:w-full flex flex-col gap-2 max-md:gap-1">
                <FormLabel>Poll Title</FormLabel>
                <FormLabelDescription>
                  A short, clear name for your poll
                </FormLabelDescription>
              </div>
              <FormInput
                {...register("title", {
                  required: "Title is required",
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Title cannot be empty or just spaces",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters",
                  },
                })}
                maxLength={100}
                placeholder="Cats or Dogs ?"
              />
            </div>
            <div className="w-full h-fit flex max-md:flex-col pb-[var(--space)]">
              <div className="w-1/2 max-md:w-full flex flex-col gap-2 max-md:gap-1">
                <FormLabel>Description</FormLabel>
                <FormLabelDescription>
                  Optional details about your poll
                  <br />
                  (Hidden by default for voters — expand to view)
                </FormLabelDescription>
              </div>
              <FormTextArea
                {...register("description", {
                  maxLength: {
                    value: 300,
                    message: "Description cannot exceed 300 characters",
                  },
                })}
                maxLength={300}
                rows={5}
                placeholder="Explain what this poll is about..."
              />
            </div>
            <div className="w-full h-fit flex max-md:flex-col pb-[var(--space)]">
              <div className="w-1/2 max-md:w-full flex flex-col gap-2 max-md:gap-1">
                <FormLabel>Options</FormLabel>
                <FormLabelDescription>
                  Enter the choices your voters will select from
                </FormLabelDescription>
              </div>
              <div className="w-1/2 max-md:w-full flex flex-col gap-4 max-md:gap-2 max-md:mt-4">
                {fields.map((field, index) => (
                  <PollOption
                    key={field.id}
                    maxLength={50}
                    disabled={fields.length <= 2}
                    placeholder={`Option ${index + 1}`}
                    onClick={() => {
                      if (fields.length > 2) remove(index);
                    }}
                    {...register(`options.${index}.value`, {
                      required:
                        index > 1
                          ? "Option cannot be empty"
                          : "Add at least 2 options",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Option cannot be empty or just spaces",
                      minLength: {
                        value: 1,
                        message: "Option must be at least 3 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Options cannot exceed 50 characters",
                      },
                    })}
                  />
                ))}
                <Button
                  disabled={fields.length >= 10}
                  type="button"
                  size="small"
                  variant="secondary"
                  text="Add Option"
                  onClick={() => {
                    if (fields.length < 10) append({ value: "" });
                  }}
                >
                  <Plus className="size-4 max-md:size-3" />
                </Button>
              </div>
            </div>
            <div className="w-full h-fit flex max-md:flex-col">
              <div className="w-1/2 max-md:w-full flex flex-col gap-2 max-md:gap-1">
                <FormLabel>Duration</FormLabel>
                <FormLabelDescription>
                  How long the poll stays open for voting (hours)
                </FormLabelDescription>
              </div>
              <FormDurationInput
                incrementFn={() => {
                  const value = getValues("duration");
                  if (!Number.isNaN(value)) setValue("duration", value + 1);
                }}
                decrementFn={() => {
                  const value = getValues("duration");
                  if (!Number.isNaN(value) && value > 1)
                    setValue("duration", value - 1);
                }}
                {...register("duration", {
                  required: "Duration is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Duration must atleast be an hour",
                  },
                  max: {
                    value: 168,
                    message: "Duration cannot exceed 168 hours (7 days)",
                  },
                })}
              />
            </div>
          </form>
        </main>

        {/* Bottom Blur */}
        <div
          className="pointer-events-none fixed bottom-0 left-0 w-screen h-[50px] backdrop-blur-3xl"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          }}
        />
      </div>
      {showLink && (
        <div className="font-satoshi-bold fixed inset-0 w-screen h-screen grid place-items-center bg-black/25">
          <div className="size-fit flex flex-col rounded-xl border border-black/50 bg-white px-8 pt-6 pb-8 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <FormLabel>Poll Link</FormLabel>
                <X
                  className="cursor-pointer"
                  onClick={() => {
                    setShowLink(false);
                    navigate({ to: "/dashboard" });
                  }}
                />
              </div>
              <div className="w-9/10">
                <FormLabelDescription>
                  You can always find and copy this link again from your
                  dashboard.
                </FormLabelDescription>
              </div>
            </div>
            <div className="flex justify-between items-center input text-black">
              <span>{`${window.origin}/vote/${showLink}`}</span>
              <Copy
                className="cursor-pointer size-4"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.origin}/vote/${showLink}`
                  );
                  toast.success("Copied to clipboard");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="w-1/2 max-md:w-full h-fit max-md:mt-4 input" />
  );
}

function FormTextArea({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="resize-none h-fit w-1/2 max-md:w-full max-md:mt-4 input"
    />
  );
}

type PollOptionProps = {
  disabled: boolean;
  onClick: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

function PollOption({ disabled, onClick, ...props }: PollOptionProps) {
  return (
    <div className="w-full h-fit flex gap-2">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "bg-white rounded-lg border border-black/25 py-2 px-3 grid place-items-center cursor-pointer",
          disabled && "cursor-not-allowed"
        )}
      >
        <X className="size-4 max-md:size-3" />
      </button>
      <input {...props} className="w-full h-fit input" />
    </div>
  );
}

type FormDurationInputProps = {
  incrementFn: () => void;
  decrementFn: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

function FormDurationInput({
  incrementFn,
  decrementFn,
  ...props
}: FormDurationInputProps) {
  return (
    <div className="w-1/2 max-md:w-full h-fit flex gap-2 max-md:mt-4">
      <button
        type="button"
        onClick={incrementFn}
        className="bg-white rounded-lg border border-black/25 py-2 px-3 grid place-items-center cursor-pointer"
      >
        <Plus className="size-4 max-md:size-3" />
      </button>
      <input
        type="number"
        className="w-full h-fit input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
      <button
        type="button"
        onClick={decrementFn}
        className="bg-white rounded-lg border border-black/25 py-2 px-3 grid place-items-center cursor-pointer"
      >
        <Minus className="size-4 max-md:size-3" />
      </button>
    </div>
  );
}
