using System;
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



        public List<AdventureCampaign> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT ad.Id, ad.UserId, ad.CampaignId, ad.Synopsis, ad.DateCreated, c.[Name], am.AdventureId, am.Id, am.MonsterNpcId, mn.[Name] AS MonsterName
                            FROM AdventureNotes ad
                            JOIN Campaigns c ON ad.CampaignId = c.Id
                            JOIN AdventureMonsters am ON ad.Id = am.Id
                            JOIN MonsterNpcs mn on ad.Id = mn.Id
                            WHERE ad.UserId = @UserId
                            ORDER BY ad.DateCreated ASC";

                    DbUtils.AddParameter(cmd, "@currentDate", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    var adventureCampaigns = new List<AdventureCampaign>();

                    while (reader.Read())
                    {
                        var adventureCampaign = new AdventureCampaign()
                        {
                            Notes = new AdventureNotes()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId")),
                            },
                            Campaigns = new Campaigns()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            },
                            MonsterNpcs = new MonsterNpcs() {
                                Name = reader.GetString(reader.GetOrdinal("MonsterName")),
                            }
                        };
                            adventureCampaigns.Add(adventureCampaign);
                    
                    }
                    reader.Close();

                    return adventureCampaigns;
                }
            }
        }
    


    }
}
