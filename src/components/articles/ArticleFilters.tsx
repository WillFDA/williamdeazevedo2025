import * as Select from "@radix-ui/react-select";
import { useEffect, useRef, useState } from "react";

const ALL_VALUE = "all";
const COMBINING_MARKS = /[\u0300-\u036F]/g;

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  id: string;
  label: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  value: string;
};

type Props = {
  tags: string[];
  years: string[];
};

const normalize = (value: string) =>
  value.toLowerCase().normalize("NFD").replaceAll(COMBINING_MARKS, "");

const filterTriggerClass =
  "flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-snow-50 px-3 text-left text-sm font-light text-gray-900 transition-colors outline-none hover:border-gray-200 focus:border-blue-500 data-[placeholder]:text-gray-400";
const filterContentClass =
  "z-30 max-h-64 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-gray-100 bg-snow-50 p-1 text-sm font-light text-gray-900 shadow-[0_18px_44px_-24px_rgba(17,24,39,0.35)]";
const filterItemClass =
  "relative flex h-9 cursor-pointer select-none items-center rounded-lg px-3 pr-9 outline-none transition-colors data-[highlighted]:bg-gray-100 data-[state=checked]:text-gray-900";

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function FilterSelect({
  id,
  label,
  onValueChange,
  options,
  value,
}: FilterSelectProps) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <Select.Root onValueChange={onValueChange} value={value}>
        <Select.Trigger className={filterTriggerClass} id={id}>
          <span className="min-w-0 flex-1 truncate">{selectedLabel}</span>
          <Select.Icon className="text-gray-400">
            <ChevronIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="start"
            className={filterContentClass}
            position="popper"
            sideOffset={6}
          >
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  className={filterItemClass}
                  key={option.value}
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-3 text-blue-500">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export default function ArticleFilters({ tags, years }: Props) {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(ALL_VALUE);
  const [year, setYear] = useState(ALL_VALUE);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const root = formRef.current?.closest<HTMLElement>("[data-articles-page]");
    if (!root) return;

    const empty = root.querySelector<HTMLElement>("[data-article-empty]");
    const items = [...root.querySelectorAll<HTMLElement>("[data-article]")];
    const query = normalize(search.trim());
    const selectedTag = tag === ALL_VALUE ? "" : normalize(tag);
    const selectedYear = year === ALL_VALUE ? "" : year;
    let visibleCount = 0;

    for (const item of items) {
      const title = normalize(item.dataset.title ?? "");
      const description = normalize(item.dataset.description ?? "");
      const itemTags = normalize(item.dataset.tags ?? "");
      const matchesQuery =
        query.length === 0 ||
        title.includes(query) ||
        description.includes(query) ||
        itemTags.includes(query);
      const matchesTag =
        selectedTag.length === 0 || itemTags.includes(selectedTag);
      const matchesYear =
        selectedYear.length === 0 || item.dataset.year === selectedYear;
      const isVisible = matchesQuery && matchesTag && matchesYear;

      item.hidden = !isVisible;

      if (!isVisible) continue;

      item.style.setProperty("--article-index", String(visibleCount));
      item.classList.remove("is-filtered-in");
      void item.offsetWidth;
      item.classList.add("is-filtered-in");
      visibleCount += 1;
    }

    empty?.classList.toggle("hidden", visibleCount > 0);
  }, [search, tag, year]);

  const tagOptions = [
    { label: "Tous les tags", value: ALL_VALUE },
    ...tags.map((tagName) => ({ label: tagName, value: tagName })),
  ];
  const yearOptions = [
    { label: "Toutes les dates", value: ALL_VALUE },
    ...years.map((yearValue) => ({ label: yearValue, value: yearValue })),
  ];

  return (
    <form
      aria-label="Filtrer les articles"
      className="mb-10 grid gap-3 sm:grid-cols-[minmax(16rem,28rem)_minmax(11rem,12rem)_minmax(10.5rem,11.5rem)] sm:justify-start"
      onSubmit={(event) => event.preventDefault()}
      ref={formRef}
    >
      <label className="sr-only" htmlFor="article-search">
        Rechercher un article
      </label>
      <input
        className="h-11 rounded-xl border border-gray-100 bg-snow-50 px-3 text-sm font-light text-gray-900 transition-colors outline-none placeholder:text-gray-400 hover:border-gray-200 focus:border-blue-500"
        id="article-search"
        name="search"
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder="Rechercher"
        type="search"
        value={search}
      />
      <FilterSelect
        id="article-tag"
        label="Filtrer par tag"
        onValueChange={setTag}
        options={tagOptions}
        value={tag}
      />
      <FilterSelect
        id="article-year"
        label="Filtrer par date"
        onValueChange={setYear}
        options={yearOptions}
        value={year}
      />
    </form>
  );
}
