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
                              SELECT ad.Id AS AdventureNoteId, ad.UserId, ad.CampaignId, ad.Synopsis, ad.DateCreated, c.Id AS CampId, c.[Name]
                            FROM AdventureNotes ad
                            LEFT JOIN Campaigns c ON ad.CampaignId = c.Id
                            WHERE ad.UserId = @UserId
                            ORDER BY ad.DateCreated ASC";

                    DbUtils.AddParameter(cmd, "@currentDate", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
        

                    var adventureNotes = new List<AdventureNotes>();

                    while (reader.Read())
                    {
                        
                           var adventureNote = new AdventureNotes()
                            {
                                Id = DbUtils.GetInt(reader, "AdventureNoteId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Synopsis = DbUtils.GetNullableString(reader, "Synopsis"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                CampaignId = DbUtils.GetInt(reader, "CampaignId"),
                                Campaigns = new Campaigns()
                                {
                                    Id = DbUtils.GetInt(reader, "CampId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                },
         
                            };
                           
                  

                        adventureNotes.Add(adventureNote);
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
