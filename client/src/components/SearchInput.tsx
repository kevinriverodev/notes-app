import { ChangeEvent } from "react";
import { Form, useSearchParams, useSubmit } from "react-router-dom";

export default function SearchInput() {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  function handleSearchNotes(event: ChangeEvent<HTMLInputElement>) {
    const isFirstSearch = q === "";
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,
    });
  }

  return (
    <Form name="search-form" role="search">
      <div className="w-full mb-6 flex gap-x-2">
        <input type="search" name="q" defaultValue={q} onChange={handleSearchNotes} className="w-full h-10 p-5 rounded-4xl bg-[#282A3A] focus:outline-0" placeholder="Find note..." />
      </div>
    </Form>
  )
}