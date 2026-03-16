import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    id: bigint;
    bio: string;
    bowlingStats: BowlingStats;
    country: string;
    name: string;
    role: PlayerRole;
    battingStats: BattingStats;
    imageUrl: string;
}
export type Time = bigint;
export interface Record_ {
    id: bigint;
    title: string;
    value: string;
    year: bigint;
    category: RecordCategory;
    holder: string;
    format: MatchFormat;
}
export interface NewsArticle {
    id: bigint;
    title: string;
    featured: boolean;
    date: Time;
    summary: string;
    imageUrl: string;
    category: NewsCategory;
}
export interface BowlingStats {
    economy: number;
    average: number;
    wickets: bigint;
    bestFigures: string;
}
export interface BattingStats {
    centuries: bigint;
    runs: bigint;
    average: number;
    highScore: bigint;
    matches: bigint;
    strikeRate: number;
    halfCenturies: bigint;
}
export interface Match {
    id: bigint;
    status: MatchStatus;
    result: string;
    team1: string;
    team2: string;
    venue: string;
    date: Time;
    score1: string;
    score2: string;
    format: MatchFormat;
}
export enum MatchFormat {
    ipl = "ipl",
    odi = "odi",
    t20 = "t20",
    test = "test"
}
export enum MatchStatus {
    upcoming = "upcoming",
    live = "live",
    completed = "completed"
}
export enum NewsCategory {
    ipl = "ipl",
    domestic = "domestic",
    international = "international"
}
export enum PlayerRole {
    bowler = "bowler",
    allrounder = "allrounder",
    wicketkeeper = "wicketkeeper",
    batsman = "batsman"
}
export enum RecordCategory {
    bowling = "bowling",
    team = "team",
    batting = "batting"
}
export interface backendInterface {
    createMatch(team1: string, team2: string, venue: string, date: Time, format: MatchFormat, status: MatchStatus, result: string, score1: string, score2: string): Promise<bigint>;
    createNewsArticle(title: string, summary: string, category: NewsCategory, date: Time, imageUrl: string, featured: boolean): Promise<bigint>;
    createPlayer(name: string, country: string, role: PlayerRole, battingStats: BattingStats, bowlingStats: BowlingStats, imageUrl: string, bio: string): Promise<bigint>;
    createRecord(category: RecordCategory, title: string, holder: string, value: string, year: bigint, format: MatchFormat): Promise<bigint>;
    deleteMatch(id: bigint): Promise<void>;
    deleteNewsArticle(id: bigint): Promise<void>;
    deletePlayer(id: bigint): Promise<void>;
    deleteRecord(id: bigint): Promise<void>;
    getAllMatches(): Promise<Array<Match>>;
    getAllNewsArticles(): Promise<Array<NewsArticle>>;
    getAllPlayers(): Promise<Array<Player>>;
    getAllRecords(): Promise<Array<Record_>>;
    getMatch(id: bigint): Promise<Match>;
    getNewsArticle(id: bigint): Promise<NewsArticle>;
    getPlayer(id: bigint): Promise<Player>;
    getRecord(id: bigint): Promise<Record_>;
    updateMatch(id: bigint, team1: string, team2: string, venue: string, date: Time, format: MatchFormat, status: MatchStatus, result: string, score1: string, score2: string): Promise<void>;
    updateNewsArticle(id: bigint, title: string, summary: string, category: NewsCategory, date: Time, imageUrl: string, featured: boolean): Promise<void>;
    updatePlayer(id: bigint, name: string, country: string, role: PlayerRole, battingStats: BattingStats, bowlingStats: BowlingStats, imageUrl: string, bio: string): Promise<void>;
    updateRecord(id: bigint, category: RecordCategory, title: string, holder: string, value: string, year: bigint, format: MatchFormat): Promise<void>;
}
