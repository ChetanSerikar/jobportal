/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { EditIcon } from "lucide-react";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob , {alreadySaved : savedInit ? true : false});


  const handleSaveJob = async () => {
    if(saved){
      await fnSavedJob({
        user_id: user.id,
        job_id: job.id,
      });
      onJobAction();
      return
    }
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
<Card className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900">
  {loadingDeleteJob && (
    <BarLoader className="mb-4" width="100%" color="#36d7b7" />
  )}

  <CardHeader className="flex flex-row items-center justify-between px-4 py-3">
    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
      {job.title}
    </CardTitle>
    <div>

    {isMyJob && (
      <Button
        size="icon"
        variant="ghost"
        disabled={loadingDeleteJob}
        aria-label="Delete job">
      <Trash2Icon
        size={18}
        className=" cursor-pointer "
        onClick={handleDeleteJob}
        aria-label="Delete job"
      />
      </Button>
    )}

    {isMyJob && (
      <Button
        size="icon"
        variant="ghost"
        disabled={loadingDeleteJob}
        aria-label="Delete job">
          <Link to={`/edit-job/${job.id}`} >
      <EditIcon
        size={18}
        className=" cursor-pointer "
        onClick={ ()=> navigator(`/edit-job/${job.id}`)}
        aria-label="Delete job"
      />
          </Link>
      </Button>
    )}
    </div>
  </CardHeader>

  <CardContent className="flex flex-col gap-6 px-4 pb-4 text-gray-700 dark:text-gray-300 text-sm">
    <div className="flex items-center justify-between">
      {job.company && (
        <img
          src={job.company.logo_url}
          alt={`${job.company.name} logo`}
          className="h-4 object-contain"
        />
      )}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <MapPinIcon size={14} />
        <span>{job.location}</span>
      </div>
    </div>

    <p className="truncate" title={job.description}>
      {job.description.split(".")[0]}.
    </p>
  </CardContent>

  <CardFooter className="flex gap-2 px-4 pb-4">
    <Link to={`/job/${job.id}`} className="flex-1">
      <Button variant="secondary" className="w-full text-sm py-2">
        More Details
      </Button>
    </Link>

    {!isMyJob && (
      <Button
        variant="outline"
        className="w-12 flex justify-center items-center p-2"
        onClick={handleSaveJob}
        disabled={loadingSavedJob}
        aria-pressed={saved}
        aria-label={saved ? "Unsave job" : "Save job"}
      >
        {saved ? (
          <Heart size={18} fill="red" stroke="red" />
        ) : (
          <Heart size={18} />
        )}
      </Button>
    )}
  </CardFooter>
</Card>


  );
};

export default JobCard;
