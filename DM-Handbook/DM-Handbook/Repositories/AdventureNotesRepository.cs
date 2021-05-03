﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class AdventureNotesRepository : BaseRepository, IAdventureNotesRepository
    {
        public AdventureNotesRepository(IConfiguration configuration) : base(configuration) { }



        public List<AdventureNotes> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT ad.Id, ad.UserId, ad.CampaignId, ad.Synopsis, ad.DateCreated, c.[Name], am.AdventureId, am.Id, am.MonsterNpcId
                            FROM AdventureNotes ad
                            JOIN Campaigns c ON ad.CampaignId = c.Id
                            JOIN AdventureMonsters am ON ad.Id = am.Id
                            ORDER BY ad.DateCreated ASC";

                    DbUtils.AddParameter(cmd, "@currentDate", DateTime.Now);

                    var reader = cmd.ExecuteReader();

                    var adventureNotes = new List<AdventureNotes>();

                    while (reader.Read())
                    {
                        var adventureNote = new AdventureNotes()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId")),
                        };
                        adventureNotes.Add(adventureNote);
                    }
                    reader.Close();

                    return adventureNotes;
                }
            }
        }



    }
}