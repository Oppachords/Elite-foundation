import { useQuery } from "@tanstack/react-query";
import { getGallery, getProjects, getSponsoredChildren } from "./api/cms.functions";
import { GALLERY, PROJECTS } from "./site-data";

export function useSponsoredChildren() {
  const { data } = useQuery({
    queryKey: ["sponsored-children"],
    queryFn: () => getSponsoredChildren(),
  });
  return data ?? [];
}

export function useProjects() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  return data?.length ? data : PROJECTS;
}

export function useGallery() {
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGallery(),
  });
  return data?.length ? data : GALLERY;
}
