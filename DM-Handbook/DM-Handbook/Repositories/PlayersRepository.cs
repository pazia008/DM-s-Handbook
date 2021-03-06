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
                            SELECT p.Id, p.UserId, p.CampaignId, p.[Name], p.Race, p.HowTheyPlay, p.DateCreated, c.[Name] AS CampaignName
                            FROM Players p
                            LEFT JOIN Campaigns c on p.CampaignId = c.Id
                            WHERE p.UserId = @UserId
                            ORDER BY p.DateCreated ASC";


                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var players = new List<Players>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var player = new Players()
                        {
                            Id = DbUtils.GetInt(reader,"Id"),
                            Name = DbUtils.GetNullableString(reader,"Name"),
                            UserId = DbUtils.GetInt(reader,"UserId"),
                            Race = DbUtils.GetNullableString(reader, "Race"),
                            HowTheyPlay = DbUtils.GetNullableString(reader, "HowTheyPlay"),
                            DateCreated = DbUtils.GetDateTime(reader,"DateCreated"),
                            CampaignId = DbUtils.GetInt(reader,"CampaignId"),
                            Campaigns = new Campaigns()
                            {
                                Id = DbUtils.GetInt(reader,"Id"),
                                Name = DbUtils.GetString(reader,"CampaignName"),
                            },
                        };
                        players.Add(player);
                    }
                    reader.Close();

                    return players;
                }
            }
        }



        public Players GetById(int playerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.CampaignId, p.[Name], p.Race, p.HowTheyPlay, p.DateCreated, c.[Name] AS CampaignName
                            FROM Players p
                            LEFT JOIN Campaigns c on p.CampaignId = c.Id                    
                        WHERE p.Id = @PlayersId";

                    DbUtils.AddParameter(cmd, "@PlayersId", playerId);

                    var reader = cmd.ExecuteReader();

                    Players player = null;

                    if (reader.Read())
                    {
                        player = new Players()
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
                                Name = reader.GetString(reader.GetOrdinal("CampaignName")),
                            },
                        };
                    }
                    reader.Close();
                    return player;
                }
            }
        }



        public void Add(Players player)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Players (UserId, CampaignId, Name, DateCreated, Race, HowTheyPlay)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @CampaignId, @Name, @DateCreated, @Race, @HowTheyPlay)";

                    DbUtils.AddParameter(cmd, "@UserId", player.UserId);
                    DbUtils.AddParameter(cmd, "@CampaignId", player.CampaignId);
                    DbUtils.AddParameter(cmd, "@Name", player.Name);
                    DbUtils.AddParameter(cmd, "@DateCreated", player.DateCreated);
                    DbUtils.AddParameter(cmd, "@Race", player.Race);
                    DbUtils.AddParameter(cmd, "@HowTheyPlay", player.HowTheyPlay);
                    

                    player.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int playerId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE Players
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", playerId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Update(Players players)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Players
                           SET CampaignId = @CampaignId,
                            Name = @Name,
                            Race = @Race,
                            HowTheyPlay = @HowTheyPlay,
                            DateCreated = @DateCreated
                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", players.Id);
                    DbUtils.AddParameter(cmd, "@CampaignId", players.CampaignId);
                    DbUtils.AddParameter(cmd, "@Name", players.Name);
                    DbUtils.AddParameter(cmd, "@Race", players.Race);
                    DbUtils.AddParameter(cmd, "@HowTheyPlay", players.HowTheyPlay);
                    DbUtils.AddParameter(cmd, "@DateCreated", players.DateCreated);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
