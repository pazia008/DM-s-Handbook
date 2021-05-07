using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class MonsterNpcsRepository : BaseRepository, IMonsterNpcsRepository
    {

        public MonsterNpcsRepository(IConfiguration configuration) : base(configuration) { }


        public List<MonsterNpcs> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT mn.Id, mn.UserId, mn.MonsterOrNpcTypeId, mn.Synopsis, mn.[Name], mn.Abilities, mn.DateCreated, mt.Id AS MonsterId, mt.[Name] AS MonsterOrNpc
                            FROM MonsterNpcs mn
                            LEFT JOIN MonsterOrNpcType mt on mn.MonsterOrNpcTypeId = mt.Id
                            WHERE mn.UserId = @UserId
                            ORDER BY mn.DateCreated ASC";


                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var monsters = new List<MonsterNpcs>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var monster = new MonsterNpcs()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                            Abilities = reader.GetString(reader.GetOrdinal("Abilities")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            MonsterOrNpcTypeId = reader.GetInt32(reader.GetOrdinal("MonsterOrNpcTypeId")),
                            MonsterOrNpcTypes = new MonsterOrNpcType()
                            {
                                Id = DbUtils.GetInt(reader, "MonsterId"),
                                Name = DbUtils.GetString(reader, "MonsterOrNpc"),
                            },

                        };
                        monsters.Add(monster);
                    }
                    reader.Close();

                    return monsters;
                }
            }
        }


        public MonsterNpcs GetById(int monsterNpcId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT mn.Id, mn.UserId, mn.MonsterOrNpcTypeId, mn.Synopsis, mn.[Name], mn.Abilities, mn.DateCreated, mt.Id AS MonsterId, mt.[Name] AS MonsterOrNpc
                            FROM MonsterNpcs mn
                            LEFT JOIN MonsterOrNpcType mt on mn.MonsterOrNpcTypeId = mt.Id                    
                        WHERE mn.Id = @MonsterNpcsId";

                    DbUtils.AddParameter(cmd, "@MonsterNpcsId", monsterNpcId);

                    var reader = cmd.ExecuteReader();

                    MonsterNpcs monster = null;

                    if (reader.Read())
                    {
                        monster = new MonsterNpcs()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                            Abilities = reader.GetString(reader.GetOrdinal("Abilities")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            MonsterOrNpcTypeId = reader.GetInt32(reader.GetOrdinal("MonsterOrNpcTypeId")),
                            MonsterOrNpcTypes = new MonsterOrNpcType()
                            {
                                Id = DbUtils.GetInt(reader, "MonsterId"),
                                Name = DbUtils.GetString(reader, "MonsterOrNpc"),
                            },
                        };
                    }
                    reader.Close();
                    return monster;
                }
            }
        }


        public void Add(MonsterNpcs monster)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MonsterNpcs (UserId, MonsterOrNpcTypeId, Name, Synopsis, Abilities, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @MonsterOrNpcTypeId, @Name, @Synopsis, @Abilities, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@UserId", monster.UserId);
                    DbUtils.AddParameter(cmd, "@MonsterOrNpcTypeId", monster.MonsterOrNpcTypeId);
                    DbUtils.AddParameter(cmd, "@Name", monster.Name);
                    DbUtils.AddParameter(cmd, "@Synopsis", monster.Synopsis);
                    DbUtils.AddParameter(cmd, "@Abilities", monster.Abilities);
                    DbUtils.AddParameter(cmd, "@DateCreated", monster.DateCreated);                    
                    


                    monster.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Delete(int monsterNpcId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE MonsterNpcs
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", monsterNpcId);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void Update(MonsterNpcs monster)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MonsterNpcs
                           SET MonsterOrNpcTypeId = @MonsterOrNpcTypeId,
                            Name = @Name,
                            Synopsis = @Synopsis,
                            Abilities = @Abilities,
                            DateCreated = @DateCreated
                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", monster.Id);
                    DbUtils.AddParameter(cmd, "@MonsterOrNpcTypeId", monster.MonsterOrNpcTypeId);
                    DbUtils.AddParameter(cmd, "@Name", monster.Name);
                    DbUtils.AddParameter(cmd, "@Synopsis", monster.Synopsis);
                    DbUtils.AddParameter(cmd, "@Abilities", monster.Abilities);
                    DbUtils.AddParameter(cmd, "@DateCreated", monster.DateCreated);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<MonsterNpcs> GetMonsterByAdventureId(int adventureNoteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT mn.Id, mn.UserId, mn.MonsterOrNpcTypeId, mn.[Name], am.Id AS AdventureMonsterId, am.AdventureId, am.MonsterNpcId
                        FROM  MonsterNpcs mn
                         LEFT JOIN AdventureMonsters am on mn.Id = am.Id
                        WHERE am.AdventureId = @AdventureId ";

                    cmd.Parameters.AddWithValue("@AdventureId", adventureNoteId);

                    var reader = cmd.ExecuteReader();

                    List<MonsterNpcs> monsters = new List<MonsterNpcs>();

                    while (reader.Read())
                    {
                        monsters.Add(NewMonsterFromReader(reader));

                    }

                    reader.Close();
                    return monsters;
                }
            }
        }


        private MonsterNpcs NewMonsterFromReader(SqlDataReader reader)
        {
            return new MonsterNpcs()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                AdventureMonsters = new AdventureMonsters()
                {
                    Id = DbUtils.GetInt(reader, "AdventureMonsterId"),


                },
            };
        }


    }
}
