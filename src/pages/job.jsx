import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
<div className="flex flex-col gap-8 mt-6 text-neutral-800 dark:text-neutral-100">
  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg">

  {/* Header: Title + Logo */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4  p-4 ">
  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">
    {job?.title}
  </h1>
  {job?.company?.logo_url && (
    <img
      src={job.company.logo_url}
      alt={job.title}
      className="h-6 sm:h- object-contain"
    />
  )}
</div>

  {/* Meta Info: Location, Applicants, Status */}
<div className="flex flex-wrap gap-4 text-sm sm:text-base text-muted-foreground   p-4 ">
  <div className="flex items-center gap-2">
    <MapPinIcon size={16} />
    <span>{job?.location}</span>
  </div>
  <div className="flex items-center gap-2">
    <Briefcase size={16} />
    <span>{job?.applications?.length || 0} Applicants</span>
  </div>
  <div className="flex items-center gap-2">
    {job?.isOpen ? (
      <>
        <DoorOpen size={16} />
        <span className="text-green-600 dark:text-green-400 font-medium">Open</span>
      </>
    ) : (
      <>
        <DoorClosed size={16} />
        <span className="text-red-500 dark:text-red-400 font-medium">Closed</span>
      </>
    )}
  </div>
</div>
  </div>

  {/* Status Selector (for Recruiters) */}
  {job?.recruiter_id === user?.id && (
    <div className="w-full sm:max-w-xs mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-white mb-2">
        Update Hiring Status
      </h2>
      <div>
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full text-sm font-medium ring-1 ring-inset ring-gray-300 dark:ring-gray-600 ${
              job?.isOpen ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
            }`}
          >
            <SelectValue
              placeholder={`Hiring Status — ${job?.isOpen ? "Open" : "Closed"}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )}

  {/* Description */}
<section className="space-y-2 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
    <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-white">
      About the Job
    </h2>
    <p className="text-sm sm:text-base leading-relaxed ">
      {job?.description}
    </p>
</section>

  {/* Requirements */}
<section className="space-y-2 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
    <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-white">
      What We’re Looking For
    </h2>
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
      <MDEditor.Markdown source={job?.requirements} className="bg-transparent text-primary" />
    </div>
</section>

  {/* Apply Drawer */}
  {job?.recruiter_id !== user?.id && (
    <section className="mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <ApplyJobDrawer
        job={job}
        user={user}
        fetchJob={fnJob}
        applied={job?.applications?.some(ap => ap.candidate_id === user.id)}
      />
    </section>
  )}

  {/* Loader */}
  {loadingHiringStatus && (
    <BarLoader width="100%" color="#36d7b7" />
  )}

  {/* Applications (If Recruiter) */}
{job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
    <section className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-white">
        Applications
      </h2>
      <div className="space-y-3">
        {job.applications.map(application => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </section>
)}
</div>

  );
};

export default JobPage;
