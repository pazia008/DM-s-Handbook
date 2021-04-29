USE [DM-Handbook]
GO

set identity_insert [UserProfiles] on
insert into UserProfiles (Id, Username, Email, FirebaseId) values (1, 'Master-P','paz@gmail.com', '9b8ljPFUnSSGvVNu5aDZUAsXKYg1');
insert into UserProfiles (Id, Username, Email, FirebaseId) values (2, 'C-Wiz','cob@gmail.com', 'bu4rGJJXk9hDxVG3qrRdKNeS4zF2');
set identity_insert [UserProfiles] off

set identity_insert [Campaigns] on
insert into Campaigns (Id, UserId, [Name]) values (1, 1,'Puppets of Greed');
insert into Campaigns (Id, UserId, [Name]) values (2, 2, 'Magical Land of Aerys');
insert into Campaigns (Id, UserId, [Name]) values (3, 2, 'Dungeon Crawl');
set identity_insert [Campaigns] off

set identity_insert [AdventureNotes] on
insert into AdventureNotes (Id, UserId, CampaignId, Synopsis, DateCreated) values (1, 1, 1, 'Players woke up in an empty cell and spent the enitre time trying to get out or fighting each other', '2021-4-29');
insert into AdventureNotes (Id, UserId, CampaignId, Synopsis, DateCreated) values (2, 2, 2, 'Players met during a festival that celevrates the 500th year the Elves have been free from Dragons (session ended early they mostly played bongos with the locals)', '2021-4-30');
insert into AdventureNotes (Id, UserId, CampaignId, Synopsis, DateCreated) values (3, 2, 3, 'Players met on a farm and essentially helped an old man protect his goats from giant spiders the whole time', '2021-4-26');
set identity_insert [AdventureNotes] off

set identity_insert [MonsterOrNpcType] on
insert into MonsterOrNpcType (Id, [Name]) values (1, 'Monster');
insert into MonsterOrNpcType (Id, [Name]) values (2, 'Nonplayer Character (NPC)');
set identity_insert [MonsterOrNpcType] off

set identity_insert [MonsterNpcs] on
insert into MonsterNpcs (Id, UserId, MonsterOrNpcTypeId, [Name], Synopsis, Abilities, DateCreated) values (1, 1, 1, 'Balin', 'Elvish God of selfishness and greed. He is testing the characters to see who is the most selfless', 'God-like strength, mind control, telepathy', '2021-4-29');
insert into MonsterNpcs (Id, UserId, MonsterOrNpcTypeId, [Name], Synopsis, Abilities, DateCreated) values (2, 2, 1, 'Darvin', 'Dragon that just escaped a portal.', 'Fire breathing, can crush you easily, HUGE, flight', '2021-4-30');
insert into MonsterNpcs (Id, UserId, MonsterOrNpcTypeId, [Name], Synopsis, Abilities, DateCreated) values (3, 2, 1, 'The Tanner', 'Friendly farmer that payed the players to defend his goats', 'Old man smell', '2021-4-26');
set identity_insert [MonsterNpcs] off

set identity_insert [Players] on
insert into Players (Id, UserId, CampaignId, [Name], Race, HowTheyPlay, DateCreated) values (1, 1, 1, 'Remwald The Great', 'Half Orc', 'Very anti-violence, tries to always be calm, people pleaser.', '2021-4-29');
insert into Players (Id, UserId, CampaignId, [Name], Race, HowTheyPlay, DateCreated) values (2, 2, 2, 'Rue', 'Changeling', 'Very curious and perceptive. 100% chaotic neutral', '2021-4-30');
insert into Players (Id, UserId, CampaignId, [Name], Race, HowTheyPlay, DateCreated) values (3, 2, 3, 'Marryweather', 'Elf', 'Very perceptive. Uses her high charisma stats to her advantage', '2021-4-26');
set identity_insert [Players] off

set identity_insert [AdventureMonsters] on
insert into AdventureMonsters (Id, AdventureId, MonsterNpcId) values (1, 1, 1);
insert into AdventureMonsters (Id, AdventureId, MonsterNpcId) values (2, 2, 2);
insert into AdventureMonsters (Id, AdventureId, MonsterNpcId) values (3, 3, 3);
set identity_insert [AdventureMonsters] off