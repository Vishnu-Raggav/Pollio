import { createFileRoute } from "@tanstack/react-router";

// Images
import logo from "/logo.svg";

// Components
import Button from "@/components/Button";
import FormLabel from "@/components/FormLabel";
import FormLabelDescription from "@/components/FormLabelDescription";

// Libs
import { Minus, Plus, Send, Trash, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

// Schemas
import { type SchemaType } from "@/schemas/createPollSchema";

// Helpers
import cn from "@/utils/cn";

export const Route = createFileRoute("/dashboard/create-poll")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register, control, getValues, setValue } = useForm<SchemaType>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }],
      duration: 1,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  return (
    <div className="relative w-screen h-fit bg-off-white pt-20 px-30 max-md:px-10 max-md:pt-10 max-lg:px-20">
      <header className="flex items-center justify-between w-full h-fit">
        <div className="flex items-center gap-6 max-md:gap-4">
          <img src={logo} className="size-7 max-md:size-4" />
          <span className="font-righteous text-4xl max-md:text-2xl">
            Pollio
          </span>
        </div>
        <div className="flex gap-6">
          <Button variant={"primary"} text={"Publish"} size="small">
            <Send className="size-4 max-md:size-3" />
          </Button>
          <Button variant={"secondary"} text={"Delete"} size="small">
            <Trash className="size-4 max-md:size-3" />
          </Button>
        </div>
      </header>
      <main className="mt-14 pb-20">
        <form className="w-full h-fit border-2 border-black/25 rounded-lg p-10 divide-y-2 divide-black/25 space-y-[var(--space)] [--space:theme(spacing.12)]">
          <div className="w-full h-fit flex pb-[var(--space)]">
            <div className="w-1/2 flex flex-col gap-2">
              <FormLabel>Poll Title</FormLabel>
              <FormLabelDescription>
                A short, clear name for your poll
              </FormLabelDescription>
            </div>
            <FormInput
              {...register("title", { required: true, maxLength: 100 })}
              maxLength={100}
              placeholder="Cats or Dogs ?"
            />
          </div>
          <div className="w-full h-fit flex pb-[var(--space)]">
            <div className="w-1/2 flex flex-col gap-2">
              <FormLabel>Description</FormLabel>
              <FormLabelDescription>
                Optional details about your poll
                <br />
                (Hidden by default for voters — expand to view)
              </FormLabelDescription>
            </div>
            <FormTextArea
              {...register("description", { maxLength: 300 })}
              maxLength={300}
              rows={5}
              placeholder="Explain what this poll is about..."
            />
          </div>
          <div className="w-full h-fit flex pb-[var(--space)]">
            <div className="w-1/2 flex flex-col gap-2">
              <FormLabel>Options</FormLabel>
              <FormLabelDescription>
                Enter the choices your voters will select from
              </FormLabelDescription>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              {fields.map((field, index) => (
                <PollOption
                  key={field.id}
                  disabled={fields.length <= 2}
                  placeholder={`Option ${index + 1}`}
                  onClick={() => {
                    if (fields.length > 2) remove(index);
                  }}
                  {...register(`options.${index}.value`)}
                />
              ))}
              <Button
                type="button"
                size="small"
                variant="secondary"
                text="Add Option"
                onClick={() => append({ value: "" })}
              >
                <Plus className="size-4 max-md:size-3" />
              </Button>
            </div>
          </div>
          <div className="w-full h-fit flex">
            <div className="w-1/2 flex flex-col gap-2">
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
              {...register("duration", { required: true, valueAsNumber: true })}
            />
          </div>
        </form>
      </main>
      <div
        className="pointer-event-none fixed bottom-0 left-0 w-screen h-[160px] backdrop-blur-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))",
        }}
      />
    </div>
  );
}

function FormInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-1/2 h-fit input" />;
}

function FormTextArea({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="resize-none h-fit w-1/2 input" />;
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
    <div className="w-1/2 h-fit flex gap-2">
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
