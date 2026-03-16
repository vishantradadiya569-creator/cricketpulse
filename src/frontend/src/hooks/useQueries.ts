import { useQuery } from "@tanstack/react-query";
import type { Match, NewsArticle, Player, Record_ } from "../backend.d";
import { useActor } from "./useActor";

export function useNewsArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<NewsArticle[]>({
    queryKey: ["newsArticles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNewsArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlayers() {
  const { actor, isFetching } = useActor();
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlayers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMatches() {
  const { actor, isFetching } = useActor();
  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMatches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<Record_[]>({
    queryKey: ["records"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecords();
    },
    enabled: !!actor && !isFetching,
  });
}
