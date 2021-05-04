﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class CampaignsRepository : BaseRepository, ICampaignsRepository
    {
        public CampaignsRepository(IConfiguration configuration) : base(configuration) { }



        public List<Campaigns> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id, c.UserId, c.[Name]
                            FROM Campaigns c
                            WHERE c.UserId = @UserId";


                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var campaigns = new List<Campaigns>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var campaign = new Campaigns()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                        campaigns.Add(campaign);
                    }
                    reader.Close();

                    return campaigns;
                }
            }
        }



    }
}