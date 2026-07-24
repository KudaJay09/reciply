import type { categoryProps, PaginatedResponseProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CustomInput } from "@/components/CustomInput";
import { itemSchema } from "./schema";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import PortableText from "@/components/text-editor/PortableText";

const Form = ({
  categories,
  setRecipe,
  setItemId,
  setAiSuggestion,
}: {
  categories: PaginatedResponseProps<categoryProps> | undefined;
  setRecipe: (value: string | null) => void;
  setItemId: (value: string | null) => void;
  setAiSuggestion: (value: string | null) => void;
}) => {
  const { id } = useParams();
  const isEditMode = id !== "create";

  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: undefined,
      price: 0,
      discount: 0,
      categoryId: "",
      isAvailable: true,
      image: "",
    },
  });

  const categoryOptions = categories
    ? categories.data.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  // console.log("form errors", form.formState.errors);

  async function onSubmit(data: z.infer<typeof itemSchema>) {
    // console.log("form data", data);
  }
  return (
    <div className="mt-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <CustomInput
          control={form.control}
          name="name"
          label="Title"
          placeholder="eg. Chicken Biryani"
          type="text"
          //   disabled={mutation.isPending}
        />

        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
            Description
          </Label>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <PortableText value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex gap-4">
          <CustomSelect
            control={form.control}
            name="categoryId"
            label="Category"
            options={categoryOptions}
            placeholder="Select a category"
            title="Category"
            // disabled={mutation.isPending || !categories}
            // loading={mutation.isPending}
          />
          <div className="flex flex-col space-y-3 w-1/2">
            <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">
              Available
            </Label>
            <Controller
              name="isAvailable"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center space-x-2 border rounded-xl p-3.5 shadow-sm">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    // disabled={pending}
                  />
                  <Label
                    className="text-sm font-medium text-slate-600 dark:text-slate-300 cursor-pointer"
                    onClick={() => field.onChange(!field.value)}
                  >
                    Is this menu item available?
                  </Label>
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <CustomInput
            control={form.control}
            name="price"
            label="Price"
            placeholder="0.00"
            type="number"
            step="1"
            // disabled={pending}
          />
          <CustomInput
            control={form.control}
            name="discount"
            label="Discount (%)"
            placeholder="0.00"
            type="number"
            step="1"
            // disabled={pending}
          />
        </div>

        {/* <CustomImageDropzone
          control={form.control}
          name="image"
          label="Item Image"
        /> */}
        <Button
          type="submit"
          className="py-6 px-6 float-right mt-4"
          // disabled={pending}
        >
          {isEditMode ? "Update Menu Item" : "Create Menu Item"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
