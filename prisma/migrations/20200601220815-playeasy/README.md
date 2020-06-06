# Migration `20200601220815-playeasy`

This migration has been generated at 6/1/2020, 10:08:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `playeasy`.`match` ADD COLUMN `away_quota` int   ,
ADD COLUMN `away_team_id` int   ,
ADD COLUMN `home_team_id` int   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200601210649-playeasy..20200601220815-playeasy
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
   provider = "prisma-client-js"
 }
 datasource mysql {
-  url = "***"
+  url      = env("DB_URL")
   provider = "mysql"
 }
@@ -58,13 +58,15 @@
   endAt           DateTime    @map("end_at")
   homeQuota       Int         @map("home_quota")
   writer          User        @relation(fields: [writerId], references: [id])
   writerId        Int         @map("writer_id")
+
+  homeTeamId      Int?        @map("home_team_id")
+  awayQuota       Int?        @map("away_quota") 
+  awayTeamId      Int?        @map("away_team_id")
   // homeTeam        Team?       @relation( fields: [homeTeamId], references: [id]) 
   // homeTeamId      Int?        @map("home_team_id")
-  
-
   // awayQuota       Int?        @map("away_quota") 
   // awayTeam        Team        @relation("away" fields: [awayTeamId], references: [id])
   // awayTeamId      Int?        @map("away_team_id")
```


