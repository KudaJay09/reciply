import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Route } from "../../+types/home";
import { Button } from "@/components/ui/button";
import Category from "@/components/category/Category";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/Loader";
import type { categoryProps, PaginatedResponseProps } from "@/types";
import { customFetch } from "@/lib/api";
import Form from "@/components/menu/Form";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CreateMenu Items" },
    {
      name: "description",
      content: "Welcome to the categories & create items Page",
    },
  ];
}

const CategoriesCreateItems = () => {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const {
    data: categories,
    refetch,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return customFetch<PaginatedResponseProps<categoryProps>>("/category");
    },
  });

  if (isDataLoading) {
    return (
      <LoadingScreen title="Loading Categories..." className="min-h-screenS" />
    );
  }

  // console.log(categories);

  return (
    <div>
      <header className="border-b sticky w-full top-0 z-10 bg-card/80">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex gap-2">
            <SidebarTrigger className="ml-1" />
            <h1 className="text-lg font-bold">Categories & Create Items</h1>
          </div>

          <div className="flex gap-2 items-center">
            <Button className="" onClick={() => {}} variant="destructive">
              Discard
            </Button>
            <Button className="" onClick={() => {}}>
              Save
            </Button>
            <Button className="" onClick={() => {}} variant="outline">
              Smart Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full lg:flex">
        <div className="lg:border-r p-4 lg:min-h-screen lg:w-[75%]">
          <div className="flex justify-between">
            <div className="flex w-full items-center justify-between gap-2">
              <h1 className="text-primary text-xl font-bold">Items</h1>
            </div>

            <div className="flex gap-2">
              <Button className="p-5">Recipe Dialog</Button>
              <Button className="p-5">Ai Suggestions</Button>
            </div>

            <div className="lg:hidden">
              <Category categories={categories} refetch={refetch} />
            </div>
          </div>

          <Form
            categories={categories}
            setRecipe={setRecipe}
            setItemId={setItemId}
            setAiSuggestion={setAiSuggestion}
          />
        </div>
        <div className="hidden lg:block lg:w-[25%]">
          <Category categories={categories} refetch={refetch} />
        </div>
      </main>
    </div>
  );
};

export default CategoriesCreateItems;
