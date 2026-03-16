import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type NewsCategory = { #international; #ipl; #domestic };
  type PlayerRole = { #batsman; #bowler; #allrounder; #wicketkeeper };
  type MatchFormat = { #test; #odi; #t20; #ipl };
  type MatchStatus = { #upcoming; #live; #completed };
  type RecordCategory = { #batting; #bowling; #team };

  type BattingStats = {
    matches : Nat;
    runs : Nat;
    average : Float;
    strikeRate : Float;
    centuries : Nat;
    halfCenturies : Nat;
    highScore : Int;
  };

  type BowlingStats = {
    wickets : Nat;
    economy : Float;
    average : Float;
    bestFigures : Text;
  };

  type NewsArticle = {
    id : Nat;
    title : Text;
    summary : Text;
    category : NewsCategory;
    date : Time.Time;
    imageUrl : Text;
    featured : Bool;
  };

  type Player = {
    id : Nat;
    name : Text;
    country : Text;
    role : PlayerRole;
    battingStats : BattingStats;
    bowlingStats : BowlingStats;
    imageUrl : Text;
    bio : Text;
  };

  type Match = {
    id : Nat;
    team1 : Text;
    team2 : Text;
    venue : Text;
    date : Time.Time;
    format : MatchFormat;
    status : MatchStatus;
    result : Text;
    score1 : Text;
    score2 : Text;
  };

  type Record = {
    id : Nat;
    category : RecordCategory;
    title : Text;
    holder : Text;
    value : Text;
    year : Nat;
    format : MatchFormat;
  };

  module NewsArticle {
    public func compare(a : NewsArticle, b : NewsArticle) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Player {
    public func compare(a : Player, b : Player) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Match {
    public func compare(a : Match, b : Match) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module Record {
    public func compare(a : Record, b : Record) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Persistent storage
  let newsArticles = Map.empty<Nat, NewsArticle>();
  let players = Map.empty<Nat, Player>();
  let matches = Map.empty<Nat, Match>();
  let records = Map.empty<Nat, Record>();

  var newsId = 1;
  var playerId = 1;
  var matchId = 1;
  var recordId = 1;

  // CRUD Operations for NewsArticles
  public shared ({ caller }) func createNewsArticle(title : Text, summary : Text, category : NewsCategory, date : Time.Time, imageUrl : Text, featured : Bool) : async Nat {
    let article : NewsArticle = {
      id = newsId;
      title;
      summary;
      category;
      date;
      imageUrl;
      featured;
    };
    newsArticles.add(article.id, article);
    newsId += 1;
    article.id;
  };

  public query ({ caller }) func getNewsArticle(id : Nat) : async NewsArticle {
    switch (newsArticles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?article) { article };
    };
  };

  public query ({ caller }) func getAllNewsArticles() : async [NewsArticle] {
    newsArticles.values().toArray().sort();
  };

  public shared ({ caller }) func updateNewsArticle(id : Nat, title : Text, summary : Text, category : NewsCategory, date : Time.Time, imageUrl : Text, featured : Bool) : async () {
    switch (newsArticles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?_) {
        let updatedArticle : NewsArticle = {
          id;
          title;
          summary;
          category;
          date;
          imageUrl;
          featured;
        };
        newsArticles.add(id, updatedArticle);
      };
    };
  };

  public shared ({ caller }) func deleteNewsArticle(id : Nat) : async () {
    if (not newsArticles.containsKey(id)) {
      Runtime.trap("News article does not exist");
    };
    newsArticles.remove(id);
  };

  // CRUD Operations for Players
  public shared ({ caller }) func createPlayer(name : Text, country : Text, role : PlayerRole, battingStats : BattingStats, bowlingStats : BowlingStats, imageUrl : Text, bio : Text) : async Nat {
    let player : Player = {
      id = playerId;
      name;
      country;
      role;
      battingStats;
      bowlingStats;
      imageUrl;
      bio;
    };
    players.add(player.id, player);
    playerId += 1;
    player.id;
  };

  public query ({ caller }) func getPlayer(id : Nat) : async Player {
    switch (players.get(id)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?player) { player };
    };
  };

  public query ({ caller }) func getAllPlayers() : async [Player] {
    players.values().toArray().sort();
  };

  public shared ({ caller }) func updatePlayer(id : Nat, name : Text, country : Text, role : PlayerRole, battingStats : BattingStats, bowlingStats : BowlingStats, imageUrl : Text, bio : Text) : async () {
    switch (players.get(id)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?_) {
        let updatedPlayer : Player = {
          id;
          name;
          country;
          role;
          battingStats;
          bowlingStats;
          imageUrl;
          bio;
        };
        players.add(id, updatedPlayer);
      };
    };
  };

  public shared ({ caller }) func deletePlayer(id : Nat) : async () {
    if (not players.containsKey(id)) {
      Runtime.trap("Player does not exist");
    };
    players.remove(id);
  };

  // CRUD Operations for Matches
  public shared ({ caller }) func createMatch(team1 : Text, team2 : Text, venue : Text, date : Time.Time, format : MatchFormat, status : MatchStatus, result : Text, score1 : Text, score2 : Text) : async Nat {
    let match : Match = {
      id = matchId;
      team1;
      team2;
      venue;
      date;
      format;
      status;
      result;
      score1;
      score2;
    };
    matches.add(match.id, match);
    matchId += 1;
    match.id;
  };

  public query ({ caller }) func getMatch(id : Nat) : async Match {
    switch (matches.get(id)) {
      case (null) { Runtime.trap("Match does not exist") };
      case (?match) { match };
    };
  };

  public query ({ caller }) func getAllMatches() : async [Match] {
    matches.values().toArray().sort();
  };

  public shared ({ caller }) func updateMatch(id : Nat, team1 : Text, team2 : Text, venue : Text, date : Time.Time, format : MatchFormat, status : MatchStatus, result : Text, score1 : Text, score2 : Text) : async () {
    switch (matches.get(id)) {
      case (null) { Runtime.trap("Match does not exist") };
      case (?_) {
        let updatedMatch : Match = {
          id;
          team1;
          team2;
          venue;
          date;
          format;
          status;
          result;
          score1;
          score2;
        };
        matches.add(id, updatedMatch);
      };
    };
  };

  public shared ({ caller }) func deleteMatch(id : Nat) : async () {
    if (not matches.containsKey(id)) {
      Runtime.trap("Match does not exist");
    };
    matches.remove(id);
  };

  // CRUD Operations for Records
  public shared ({ caller }) func createRecord(category : RecordCategory, title : Text, holder : Text, value : Text, year : Nat, format : MatchFormat) : async Nat {
    let record : Record = {
      id = recordId;
      category;
      title;
      holder;
      value;
      year;
      format;
    };
    records.add(record.id, record);
    recordId += 1;
    record.id;
  };

  public query ({ caller }) func getRecord(id : Nat) : async Record {
    switch (records.get(id)) {
      case (null) { Runtime.trap("Record does not exist") };
      case (?record) { record };
    };
  };

  public query ({ caller }) func getAllRecords() : async [Record] {
    records.values().toArray().sort();
  };

  public shared ({ caller }) func updateRecord(id : Nat, category : RecordCategory, title : Text, holder : Text, value : Text, year : Nat, format : MatchFormat) : async () {
    switch (records.get(id)) {
      case (null) { Runtime.trap("Record does not exist") };
      case (?_) {
        let updatedRecord : Record = {
          id;
          category;
          title;
          holder;
          value;
          year;
          format;
        };
        records.add(id, updatedRecord);
      };
    };
  };

  public shared ({ caller }) func deleteRecord(id : Nat) : async () {
    if (not records.containsKey(id)) {
      Runtime.trap("Record does not exist");
    };
    records.remove(id);
  };
};
