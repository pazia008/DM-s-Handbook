USE [master]


IF db_id('DM-Handbook') IS NULL
  CREATE DATABASE [DM-Handbook]
GO

USE [DM-Handbook]
GO


DROP TABLE IF EXISTS [AdventureMonsters];
DROP TABLE IF EXISTS [Players];
DROP TABLE IF EXISTS [AdventureNotes];
DROP TABLE IF EXISTS [MonsterNpcs];
DROP TABLE IF EXISTS [MonsterOrNpcType];
DROP TABLE IF EXISTS [Campaigns];
DROP TABLE IF EXISTS [UserProfiles];
GO

CREATE TABLE [UserProfiles] (
  [Id] int PRIMARY KEY IDENTITY,
  [Username] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseId] NVARCHAR(255) NOT NULL,

  CONSTRAINT UQ_FirebaseId UNIQUE(FirebaseId)
)
GO

CREATE TABLE [Campaigns] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [Name] nvarchar(255),

  CONSTRAINT [FK_Campaigns_UserProfiles] FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id])
)
GO


CREATE TABLE [AdventureNotes] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [CampaignId] integer NOT NULL,
  [Synopsis] nvarchar(255),
  [DateCreated] datetime NOT NULL,

  CONSTRAINT [FK_AdventureNotes_UserProfiles] FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id]),
  CONSTRAINT [FK_AdventureNotes_Campaigns] FOREIGN KEY ([CampaignId]) REFERENCES [Campaigns] ([Id])
)
GO

CREATE TABLE [MonsterOrNpcType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [MonsterNpcs] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [MonsterOrNpcTypeId] integer NOT NULL,
  [Name] nvarchar(255),
  [Synopsis] nvarchar(255),
  [Abilities] nvarchar(255),
  [DateCreated] datetime NOT NULL,

  CONSTRAINT [FK_MonsterNpcs_UserProfiles] FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id]),
  CONSTRAINT [FK_MonsterNpcs_MonsterOrNpcType] FOREIGN KEY ([MonsterOrNpcTypeId]) REFERENCES [MonsterOrNpcType] ([Id]),
)
GO

CREATE TABLE [Players] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [CampaignId] integer NOT NULL,
  [Name] nvarchar(255),
  [Race] nvarchar(255),
  [HowTheyPlay] nvarchar(255),
  [DateCreated] datetime NOT NULL,

   CONSTRAINT [FK_Players_UserProfiles] FOREIGN KEY ([UserId]) REFERENCES [UserProfiles] ([Id]),
   CONSTRAINT [FK_Players_Campaigns] FOREIGN KEY ([CampaignId]) REFERENCES [Campaigns] ([Id]),
)
GO

CREATE TABLE [AdventureMonsters] (
  [Id] int PRIMARY KEY IDENTITY,
  [AdventureId] integer NOT NULL,
  [MonsterNpcId] integer NOT NULL,

  CONSTRAINT [FK_AdventureMonsters_AdventureNotes] FOREIGN KEY ([AdventureId]) REFERENCES [AdventureNotes] ([Id]),
  CONSTRAINT [FK_AdventureMonsters_MonsterNpcs] FOREIGN KEY ([MonsterNpcId]) REFERENCES [MonsterNpcs] ([Id])
)
GO
