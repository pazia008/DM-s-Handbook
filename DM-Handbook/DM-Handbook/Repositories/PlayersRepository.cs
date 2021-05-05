using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class PlayersRepository : BaseRepository, IPlayersRepository
    {
        public PlayersRepository(IConfiguration configuration) : base(configuration) { }



        public List<Players> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT p.Id, p.UserId, p.CampaignId, p.[Name], p.Race, p.HowTheyPlay, p.DateCreated, c.[Name]
                            FROM Players p
                            LEFT JOIN Campaigns c on p.Id = c.Id
                            WHERE p.UserId = @UserId
                            ORDER BY p.DateCreated ASC";


                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var players = new List<Players>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var player = new Players()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            Race = reader.GetString(reader.GetOrdinal("Race")),
                            HowTheyPlay = reader.GetString(reader.GetOrdinal("HowTheyPlay")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            CampaignId = reader.GetInt32(reader.GetOrdinal("CampaignId")),
                            Campaigns = new Campaigns()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            },
                        };
                        players.Add(player);
                    }
                    reader.Close();

                    return players;
                }
            }
        }



    }
}
