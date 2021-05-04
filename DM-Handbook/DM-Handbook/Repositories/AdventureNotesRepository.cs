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



        public List<AdventureNotes> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT ad.Id AS AdventureNoteId, ad.UserId, ad.CampaignId, ad.Synopsis, ad.DateCreated, c.[Name], am.AdventureId, am.Id, am.MonsterNpcId, mn.[Name] AS MonsterName
                            FROM AdventureNotes ad
                            LEFT JOIN Campaigns c ON ad.CampaignId = c.Id
                            LEFT JOIN AdventureMonsters am ON ad.Id = am.Id
                            LEFT JOIN MonsterNpcs mn on ad.Id = mn.Id
                            WHERE ad.UserId = @UserId
                            ORDER BY ad.DateCreated ASC";

                    DbUtils.AddParameter(cmd, "@currentDate", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    var adventureNotes = new List<AdventureNotes>();

                    while (reader.Read())
                    {
                        var adventureNoteId = DbUtils.GetInt(reader, "AdventureNoteId");

                        var adventureNote = adventureNotes.FirstOrDefault(a => a.Id == adventureNoteId);

                        if (adventureNote == null)
                        {
                            var adventure = new AdventureNotes()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId")),
                                Campaigns = new Campaigns()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                },
                                MonsterNpcs = new List<MonsterNpcs>()
                            };

                            if (DbUtils.IsNotDbNull(reader, "MonsterNpcId"))
                            {
                                adventure.MonsterNpcs.Add(new MonsterNpcs()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Abilities = DbUtils.GetString(reader, "Abilities"),
                                    Name = DbUtils.GetString(reader, "MonsterName"),
                                    MonsterOrNpcTypeId = DbUtils.GetInt(reader, "MonsterNpcId"),
                                    UserId = DbUtils.GetInt(reader, "UserId")
                                });
                            }
                            ;
                            adventureNotes.Add(adventureNote);

                        }


                    }

                    reader.Close();

                    return adventureNotes;
                }
                 
               
            }
        }
    




        public void Add(AdventureNotes adventureNotes)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO AdventureNotes (UserId, CampaignId, Synopsis, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @CampaignId, @Synopsis, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@UserId", adventureNotes.UserId);
                    DbUtils.AddParameter(cmd, "@CampaignId", adventureNotes.CampaignId);
                    DbUtils.AddParameter(cmd, "@Synopsis", adventureNotes.Synopsis);
                    DbUtils.AddParameter(cmd, "@DateCreated", adventureNotes.DateCreated);
            
                    adventureNotes.Id = (int)cmd.ExecuteScalar();
                }
            }
        }




    }
}
