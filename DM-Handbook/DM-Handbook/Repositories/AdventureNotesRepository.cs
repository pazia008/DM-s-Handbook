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
                              SELECT ad.Id AS AdventureNoteId, ad.UserId, ad.CampaignId, ad.Synopsis, ad.DateCreated, ad.DateDeleted, c.Id AS CampId, c.[Name]
                            FROM AdventureNotes ad
                            LEFT JOIN Campaigns c ON ad.CampaignId = c.Id
                            WHERE ad.UserId = @UserId AND ad.DateDeleted IS NULL
                            
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


        public AdventureNotes GetById(int adventureNoteId)
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
                            WHERE ad.Id = @AdventureNotesid";

                    DbUtils.AddParameter(cmd, "@AdventureNotesId", adventureNoteId);

                    var reader = cmd.ExecuteReader();

                    AdventureNotes adventureNotes = null;

                    if (reader.Read())
                    {
                        adventureNotes = new AdventureNotes()
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



        public void Delete(int adventureNoteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE AdventureNotes
                                        SET DateDeleted = @dateDeleted
                                        WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@Id", adventureNoteId);
                    DbUtils.AddParameter(cmd, "@dateDeleted", DateTime.Now);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        public void Update(AdventureNotes adventureNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE AdventureNotes
                           SET CampaignId = @CampaignId,                       
                            Synopsis = @Synopsis,
                            DateCreated = @DateCreated
                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", adventureNote.Id);
                    DbUtils.AddParameter(cmd, "@CampaignId", adventureNote.CampaignId);
                    DbUtils.AddParameter(cmd, "@Synopsis", adventureNote.Synopsis);
                    DbUtils.AddParameter(cmd, "@DateCreated", adventureNote.DateCreated);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
