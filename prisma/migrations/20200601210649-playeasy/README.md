# Migration `20200601210649-playeasy`

This migration has been generated at 6/1/2020, 9:06:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200521144729-playeasy_v1..20200601210649-playeasy
--- datamodel.dml
+++ datamodel.dml
@@ -2,12 +2,26 @@
   provider = "prisma-client-js"
 }
 datasource mysql {
-  url = "***"
+  url      = env("DB_URL")
   provider = "mysql"
 }
+
+enum MatchType {
+  SOCCKER
+  FUTSAL5 
+  FUTSAL6
+}
+
+enum StatusType {
+  WAITING
+  CONFIRMED
+  DENIED
+  CANCEL
+}
+
 model User {
   id              Int         @default(autoincrement()) @id
   name            String?   
   age             Int?      
@@ -27,9 +41,9 @@
 model Team {
   id              Int         @default(autoincrement()) @id
   name            String   
   description     String?
-  users           User[]      
+  users           User[]
   @@map("team")   
 }
@@ -56,7 +70,16 @@
   @@map("match")
 }
-enum MatchType {
-  SOCCKER FUTSAL5 FUTSAL6
+model MatchTeamApplication {
+  id              Int         @default(autoincrement()) @id
+  matchId         Int         @map("match_id")
+  homeQuota       Int         @map("home_quota")
+  //team            Team?       @relation(fields: [teamId], references: [id])
+  //teamId          Int?        @map("team_id")
+  teamId          Int?        @map("team_id")
+  status        StatusType         @default(value: WAITING)
+  
+  @@unique([matchId, teamId], name:"matchId_teamId")
+  @@map("matchTeamApplication")
 }
```


