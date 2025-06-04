import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<header className="text-left mb-8 mt-4">
    <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-2xl sm:text-3xl tracking-wide">
      Latest Jobs
    </h1>
    <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md">
      Explore thousands of job listings or find the perfect candidate.
    </p>
  </header>

  <form
    onSubmit={handleSearch}
    className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6"
    aria-label="Job search form"
  >
    <Input
      type="text"
      name="search-query"
      placeholder="Search jobs by title..."
      className="flex-grow h-12 rounded-md border border-gray-300 dark:border-gray-700 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      aria-label="Search jobs by title"
    />
    <Button
      type="submit"
      variant="blue"
      className="w-full sm:w-36 h-12 rounded-md text-white font-semibold shadow-md hover:shadow-lg transition"
      aria-label="Search jobs"
    >
      Search
    </Button>
  </form>

  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8">
    <Select value={location} onValueChange={setLocation} className="flex-grow sm:max-w-xs">
      <SelectTrigger className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary transition">
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({ name }) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select value={company_id} onValueChange={setCompany_id} className="flex-grow sm:max-w-xs">
      <SelectTrigger className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary transition">
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies?.map(({ name, id }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Button
      variant="destructive"
      onClick={clearFilters}
      className="w-full sm:w-40 h-12 rounded-md font-semibold transition hover:bg-red-700"
      aria-label="Clear filters"
    >
      Clear Filters
    </Button>
  </div>

  {loadingJobs && (
    <BarLoader className="mx-auto" width="100%" color="#36d7b7" />
  )}

  {!loadingJobs && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs?.length ? (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onJobAction={fnJobs}
            savedInit={job?.saved?.length > 0}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-12">
          No jobs found 😢
        </p>
      )}
    </div>
  )}
</div>


  );
};

export default JobListing;
